import json

from loguru import logger
from pipecat.frames.frames import (
    Frame,
    InputAudioRawFrame,
    InputTransportMessageFrame,
    OutputAudioRawFrame,
    OutputTransportMessageFrame,
    TranscriptionFrame,
    TTSAudioRawFrame,
)
from pipecat.serializers.base_serializer import FrameSerializer

from citation_splitter import CitationEventFrame


class VoiceQueryFrameSerializer(FrameSerializer):
    """
    Multiplexed serializer for VoiceQuery WebSocket connections.
    - Binary Frames: 16kHz PCM audio stream (in: microphone, out: TTS speech)
    - Text/JSON Frames: Control events (out: NAVIGATE_PAGE, in: SET_READING_POSITION, etc.)
    """

    async def serialize(self, frame: Frame) -> str | bytes | None:
        try:
            # 1. Audio stream frames -> send binary bytes to phone audio player
            if isinstance(frame, (OutputAudioRawFrame, TTSAudioRawFrame)):
                return frame.audio

            # 2. Visual citation navigation event -> send JSON to mobile viewer
            elif isinstance(frame, CitationEventFrame):
                return json.dumps(
                    {"type": "NAVIGATE_PAGE", "page": frame.page, "quote": frame.quote}
                )

            # 3. User spoken transcription event -> send JSON for chat UI transcript
            elif isinstance(frame, TranscriptionFrame):
                return json.dumps({"type": "TRANSCRIPTION", "role": "user", "text": frame.text})

            # 4. Standard out-of-band JSON transport messages
            elif isinstance(frame, OutputTransportMessageFrame):
                return json.dumps(frame.message)

        except Exception as e:
            logger.error(f"[VoiceQuerySerializer] Serialization error: {e}")

        return None

    async def deserialize(self, data: str | bytes) -> Frame | None:
        try:
            # Binary frame from mobile microphone: 16kHz 16-bit mono PCM
            if isinstance(data, bytes):
                return InputAudioRawFrame(audio=data, sample_rate=16000, num_channels=1)

            # JSON control frame from mobile client
            elif isinstance(data, str):
                payload = json.loads(data)
                return InputTransportMessageFrame(message=payload)

        except Exception as e:
            logger.error(f"[VoiceQuerySerializer] Deserialization error: {e}")

        return None
