import json
import time
import uuid
from collections.abc import Callable

from fastapi import WebSocket
from loguru import logger
from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.frames.frames import (
    Frame,
    InputTransportMessageFrame,
    InterruptionWorkerFrame,
)
from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.worker import PipelineParams, PipelineWorker
from pipecat.processors.aggregators.llm_context import LLMContext
from pipecat.processors.aggregators.llm_response import LLMFullResponseAggregator
from pipecat.processors.aggregators.llm_response_universal import (
    LLMContextAggregatorPair,
    LLMUserAggregatorParams,
)
from pipecat.processors.frame_processor import FrameDirection, FrameProcessor
from pipecat.services.azure.llm import AzureLLMService
from pipecat.services.azure.stt import AzureSTTService
from pipecat.services.azure.tts import AzureTTSService
from pipecat.transcriptions.language import Language
from pipecat.transports.websocket.fastapi import (
    FastAPIWebsocketParams,
    FastAPIWebsocketTransport,
)
from pipecat.workers.runner import WorkerRunner
from starlette.websockets import WebSocketState

import config
from citation_splitter import CitationSplitterProcessor
from cosmos_db import get_document_cosmos, save_interaction_cosmos
from dialogue_engine import SPEECH_SYSTEM_PROMPT, retrieve_relevant_document_text
from serializer import VoiceQueryFrameSerializer


class ControlMessageProcessor(FrameProcessor):
    """
    Handles bidirectional control events from the mobile client:
    - SET_READING_POSITION: Dynamically updates active page context & RAG system prompt.
    - INTERRUPT: Pushes InterruptionWorkerFrame upstream to cancel ongoing speech generation.
    """

    def __init__(self, on_page_change: Callable[[int], None]):
        super().__init__()
        self._on_page_change = on_page_change

    async def process_frame(self, frame: Frame, direction: FrameDirection):
        await super().process_frame(frame, direction)

        if isinstance(frame, InputTransportMessageFrame):
            msg = frame.message
            if isinstance(msg, dict):
                msg_type = msg.get("type")
                if msg_type == "SET_READING_POSITION":
                    page = msg.get("page")
                    if isinstance(page, int) and page > 0:
                        self._on_page_change(page)
                    return
                if msg_type == "INTERRUPT":
                    logger.info("[VoiceSession] Client requested interruption.")
                    await self.push_frame(InterruptionWorkerFrame(), FrameDirection.UPSTREAM)
                    return

        await self.push_frame(frame, direction)


async def run_voice_session(websocket: WebSocket, doc_id: str, initial_page: int = 1):
    """
    Orchestrates the real-time bidirectional voice loop for VoiceQuery.
    Streams 16kHz audio from the mobile client, executes VAD, STT, LLM reasoning,
    citation tag splitting, and TTS synthesis with zero client-side WebRTC bloat.
    """
    await websocket.accept()

    # 1. Fetch document context from Cosmos DB
    doc = get_document_cosmos(doc_id)
    if not doc:
        logger.warning(f"[VoiceSession] Document {doc_id} not found in Cosmos DB.")
        await websocket.send_text(
            json.dumps({"type": "ERROR", "message": f"Document {doc_id} not found"})
        )
        await websocket.close()
        return

    title = doc.get("title", doc.get("name", "Document"))
    page_count = doc.get("page_count", 1)
    current_reading_page = max(1, min(initial_page, page_count))

    logger.info(f"[VoiceSession] Connected: doc_id={doc_id}, title='{title}', pages={page_count}")

    # 2. Build initial RAG context & VAD analyzer
    doc_text = retrieve_relevant_document_text(doc_id, page_count, current_reading_page)
    reading_hint = f"User is currently reading: Page {current_reading_page} of {page_count}."
    system_content = SPEECH_SYSTEM_PROMPT.format(
        title=title,
        page_count=page_count,
        primary_page=current_reading_page,
        reading_position_hint=reading_hint,
        document_text=doc_text,
    )

    vad = SileroVADAnalyzer()
    context = LLMContext(messages=[{"role": "system", "content": system_content}])
    context_aggregator = LLMContextAggregatorPair(
        context,
        user_params=LLMUserAggregatorParams(vad_analyzer=vad),
    )

    # Dynamic reading position sync from client
    def update_reading_page(new_page: int):
        nonlocal current_reading_page
        current_reading_page = max(1, min(new_page, page_count))
        logger.info(
            f"[VoiceSession] Reading position synced to Page {current_reading_page}/{page_count}"
        )
        new_doc_text = retrieve_relevant_document_text(doc_id, page_count, current_reading_page)
        new_hint = f"User is currently reading: Page {current_reading_page} of {page_count}."
        new_system_content = SPEECH_SYSTEM_PROMPT.format(
            title=title,
            page_count=page_count,
            primary_page=current_reading_page,
            reading_position_hint=new_hint,
            document_text=new_doc_text,
        )
        if (
            context.messages
            and isinstance(context.messages[0], dict)
            and context.messages[0].get("role") == "system"
        ):
            context.messages[0]["content"] = new_system_content

    control_processor = ControlMessageProcessor(on_page_change=update_reading_page)

    # 3. Setup WebSocket transport
    transport = FastAPIWebsocketTransport(
        websocket=websocket,
        params=FastAPIWebsocketParams(
            audio_in_enabled=True,
            audio_in_sample_rate=16000,
            audio_in_channels=1,
            audio_out_enabled=True,
            audio_out_sample_rate=16000,
            audio_out_channels=1,
            add_wav_header=False,
            serializer=VoiceQueryFrameSerializer(),
        ),
    )

    # 4. Initialize AI services
    stt = AzureSTTService(
        api_key=config.AZURE_SPEECH_KEY,
        region=config.AZURE_SPEECH_REGION,
        language=Language.EN_US,
    )

    llm = AzureLLMService(
        endpoint=config.AZURE_AI_ENDPOINT,
        api_key=config.AZURE_AI_KEY,
        settings=AzureLLMService.Settings(model=config.AZURE_AI_MODEL),
    )

    tts = AzureTTSService(
        api_key=config.AZURE_SPEECH_KEY,
        region=config.AZURE_SPEECH_REGION,
        settings=AzureTTSService.Settings(voice="en-US-JennyNeural"),
    )

    # 5. Citation splitter with out-of-band JSON dispatch to client
    last_cited_page = current_reading_page

    async def on_citation_detected(page_num: int):
        nonlocal last_cited_page
        last_cited_page = page_num
        logger.info(
            f"[VoiceSession] Citation detected: Page {page_num} -> navigating client viewer."
        )

    citation_splitter = CitationSplitterProcessor(on_citation=on_citation_detected)

    # 6. Response aggregator for persistence to Cosmos DB
    response_aggregator = LLMFullResponseAggregator()

    @response_aggregator.event_handler("on_completion")
    async def on_completion(agg, completion: str, completed: bool):
        if not completed or not completion.strip():
            return
        logger.info(f"[VoiceSession] Turn completed. Persisting interaction for {doc_id}...")
        try:
            interaction_id = f"int_{int(time.time() * 1000)}_{uuid.uuid4().hex[:6]}"
            now = time.time()
            record = {
                "id": interaction_id,
                "document_id": doc_id,
                "type": "qa",
                "status": "completed",
                "ai_response_text": completion.strip(),
                "citations": [{"page": last_cited_page}],
                "context": {"current_page": current_reading_page},
                "created_at": now,
                "updated_at": now,
            }
            save_interaction_cosmos(record)
        except Exception as err:
            logger.error(f"[VoiceSession] Failed to persist interaction: {err}")

    # 7. Assemble Pipeline
    pipeline = Pipeline(
        [
            transport.input(),
            control_processor,
            stt,
            context_aggregator.user(),
            llm,
            response_aggregator,
            citation_splitter,
            tts,
            transport.output(),
            context_aggregator.assistant(),
        ]
    )

    worker = PipelineWorker(
        pipeline,
        params=PipelineParams(audio_in_sample_rate=16000, audio_out_sample_rate=16000),
    )

    runner = WorkerRunner(handle_sigint=False)
    await runner.add_workers(worker)

    # Send initial session ready event to client
    await websocket.send_text(
        json.dumps(
            {
                "type": "SESSION_READY",
                "doc_id": doc_id,
                "title": title,
                "page_count": page_count,
                "active_page": current_reading_page,
            }
        )
    )

    try:
        await runner.run()
    except Exception as e:
        logger.error(f"[VoiceSession] Pipeline execution error: {e}")
    finally:
        logger.info(f"[VoiceSession] Session ended for doc_id={doc_id}")
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()
