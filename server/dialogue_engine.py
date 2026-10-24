import json
import re
import time
import uuid
from collections.abc import Generator

from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import (
    AssistantMessage,
    ChatRequestMessage,
    SystemMessage,
    UserMessage,
)
from azure.core.credentials import AzureKeyCredential

from config import AZURE_AI_ENDPOINT, AZURE_AI_KEY, AZURE_AI_MODEL
from cosmos_db import get_document_pages_cosmos, save_interaction_cosmos

SPEECH_SYSTEM_PROMPT = """You are VoiceQuery, an intelligent spoken document companion.
The user is speaking to you and listening to your voice response via text-to-speech.

CORE RULES FOR SPOKEN CADENCE:
1. Speak naturally: Formulate your answer specifically for listening ears.
2. NO MARKDOWN: Never use asterisks (**bold**), headers (###), bullet points, or numbered lists. These sound awkward and robotic when spoken aloud. Use natural conversational connectors instead (for example: "First... and also...").
3. Brevity & Precision: Keep answers direct, punchy, and conversational (1 to 3 sentences for direct facts; up to 4 sentences for complex explanations).
4. Citations: If referencing a specific page or section, naturally weave it in verbally (e.g. "According to page 4...").
5. Page Metadata: At the very beginning of your response, write a citation tag in this exact format: [PAGE: <number>] where <number> is the primary page containing the answer (or [PAGE: {primary_page}] if not page-specific).

DOCUMENT CONTEXT:
Title: {title}
Total Pages: {page_count}
{reading_position_hint}

EXTRACTED DOCUMENT CONTENT:
{document_text}
"""

_azure_client: ChatCompletionsClient | None = None


def get_azure_client() -> ChatCompletionsClient:
    """
    Returns a cached ChatCompletionsClient instance.
    Reuses the HTTP connection pool and TLS session across streaming turns.
    """
    global _azure_client
    if _azure_client is None:
        _azure_client = ChatCompletionsClient(
            endpoint=AZURE_AI_ENDPOINT, credential=AzureKeyCredential(AZURE_AI_KEY)
        )
    return _azure_client


def retrieve_relevant_document_text(
    doc_id: str, page_count: int, current_page: int | None = None
) -> str:
    """
    Intelligently retrieves page text from document_pages container.
    If page_count <= 15, loads all pages.
    Otherwise loads page 1 (title/overview) and a 3-page window around current_page.
    """
    if page_count <= 15 or current_page is None:
        pages = get_document_pages_cosmos(doc_id)
    else:
        window_start = max(1, current_page - 1)
        window_end = min(page_count, current_page + 2)
        window_pages = get_document_pages_cosmos(doc_id, window_start, window_end)

        # Include page 1 if not already in window
        if window_start > 1:
            p1_pages = get_document_pages_cosmos(doc_id, 1, 1)
            # Deduplicate by page number
            seen_pages = {p["page"] for p in window_pages}
            pages = [p for p in p1_pages if p["page"] not in seen_pages] + window_pages
            pages.sort(key=lambda x: x["page"])
        else:
            pages = window_pages

    text_parts = []
    total_chars = 0
    max_chars = 60000  # Safe context window for fast latency

    for p in pages:
        p_text = f"--- [Page {p['page']}] ---\n{p.get('text', '')}"
        if total_chars + len(p_text) > max_chars:
            break
        text_parts.append(p_text)
        total_chars += len(p_text)

    return "\n\n".join(text_parts)


def stream_speech_answer(
    question: str,
    document: dict,
    conversation_history: list[dict] | None = None,
    current_page: int | None = None,
    interaction_id: str | None = None,
) -> Generator[str]:
    """
    Stream spoken answer from Azure Foundry gpt-4-1-mini with citation extraction.
    Yields SSE-formatted lines.
    Saves the completed Q&A turn into the interactions container upon completion.
    """
    client = get_azure_client()
    doc_id = document["id"]
    page_count = document.get("page_count", 1)
    title = document.get("name", document.get("title", "Document"))

    active_page = current_page if current_page and current_page > 0 else 1
    reading_hint = f"User is currently reading: Page {active_page} of {page_count}."

    doc_text = retrieve_relevant_document_text(doc_id, page_count, active_page)

    system_content = SPEECH_SYSTEM_PROMPT.format(
        title=title,
        page_count=page_count,
        primary_page=active_page,
        reading_position_hint=reading_hint,
        document_text=doc_text,
    )

    messages: list[ChatRequestMessage] = [SystemMessage(content=system_content)]

    # Add conversation history
    if conversation_history:
        for msg in conversation_history[-6:]:  # Keep last 3 turns
            role = msg.get("role")
            content = msg.get("content", "")
            if role == "user":
                messages.append(UserMessage(content=content))
            elif role == "assistant":
                messages.append(AssistantMessage(content=content))

    # Add current question
    messages.append(UserMessage(content=question))

    response_stream = client.complete(
        messages=messages, model=AZURE_AI_MODEL, temperature=0.3, max_tokens=250, stream=True
    )

    buffer = ""
    citation_sent = False
    full_answer = []
    cited_page = active_page

    for update in response_stream:
        if not update.choices or not update.choices[0].delta.content:
            continue

        token = update.choices[0].delta.content
        # Check for citation tag [PAGE: X]
        if not citation_sent:
            buffer += token
            page_match = re.search(r"\[PAGE:\s*(\d+)\]", buffer)
            if page_match:
                raw_page = int(page_match.group(1))
                cited_page = max(1, min(raw_page, page_count))
                citation_sent = True
                yield f"event: citation\ndata: {json.dumps({'page': cited_page})}\n\n"
                clean_text = buffer[page_match.end() :]
                buffer = ""
                if clean_text:
                    full_answer.append(clean_text)
                    yield f"event: token\ndata: {json.dumps({'token': clean_text})}\n\n"
                continue
            elif len(buffer) > 25:
                # No tag found early, fallback to active reading page clamped to range
                cited_page = max(1, min(active_page, page_count))
                citation_sent = True
                yield f"event: citation\ndata: {json.dumps({'page': cited_page})}\n\n"
                full_answer.append(buffer)
                yield f"event: token\ndata: {json.dumps({'token': buffer})}\n\n"
                buffer = ""
        else:
            full_answer.append(token)
            yield f"event: token\ndata: {json.dumps({'token': token})}\n\n"

    # Flush remaining buffer if tag was never triggered
    if buffer:
        if not citation_sent:
            cited_page = max(1, min(active_page, page_count))
            yield f"event: citation\ndata: {json.dumps({'page': cited_page})}\n\n"
        full_answer.append(buffer)
        yield f"event: token\ndata: {json.dumps({'token': buffer})}\n\n"

    complete_text = "".join(full_answer).strip()

    # Persist the completed interaction turn into Cosmos DB BEFORE signaling completion
    saved_interaction_id = interaction_id or f"int_{int(time.time() * 1000)}_{uuid.uuid4().hex[:6]}"
    try:
        now = time.time()
        interaction_record = {
            "id": saved_interaction_id,
            "document_id": doc_id,
            "type": "qa",
            "status": "completed",
            "user_query": question,
            "ai_response_text": complete_text,
            "citations": [{"page": cited_page}],
            "context": {"current_page": active_page},
            "created_at": now,
            "updated_at": now,
        }
        save_interaction_cosmos(interaction_record)
    except Exception as e:
        print(f"[DialogueEngine] Failed to save interaction: {e}")

    # Yield completion event with persisted interaction ID
    yield f"event: done\ndata: {json.dumps({'answer': complete_text, 'citation': {'page': cited_page}, 'interaction_id': saved_interaction_id})}\n\n"
