import json
import re
from typing import Generator
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage, AssistantMessage
from azure.core.credentials import AzureKeyCredential
from config import AZURE_AI_ENDPOINT, AZURE_AI_KEY, AZURE_AI_MODEL

SPEECH_SYSTEM_PROMPT = """You are VoiceQuery, an intelligent spoken document companion.
The user is speaking to you and listening to your voice response via text-to-speech.

CORE RULES FOR SPOKEN CADENCE:
1. Speak naturally: Formulate your answer specifically for listening ears.
2. NO MARKDOWN: Never use asterisks (**bold**), headers (###), bullet points, or numbered lists. These sound awkward and robotic when spoken aloud. Use natural conversational connectors instead (for example: "First... and also...").
3. Brevity & Precision: Keep answers direct, punchy, and conversational (1 to 3 sentences for direct facts; up to 4 sentences for complex explanations).
4. Citations: If referencing a specific page or section, naturally weave it in verbally (e.g. "According to page 4...").
5. Page Metadata: At the very beginning of your response, write a citation tag in this exact format: [PAGE: <number>] where <number> is the primary page containing the answer (or [PAGE: 1] if not page-specific).

DOCUMENT CONTEXT:
Title: {title}
Page Count: {page_count}

{document_text}
"""

def get_azure_client():
    return ChatCompletionsClient(
        endpoint=AZURE_AI_ENDPOINT,
        credential=AzureKeyCredential(AZURE_AI_KEY)
    )

def stream_speech_answer(
    question: str,
    document: dict,
    conversation_history: list[dict] | None = None
) -> Generator[str, None, None]:
    """
    Stream spoken answer from Azure Foundry gpt-4-1-mini with citation extraction.
    Yields SSE-formatted lines.
    """
    client = get_azure_client()

    # Build system message with document text
    # Limit context to 100k chars (~25k tokens) to stay safely within fast response window
    doc_text = document["full_text"][:100000]
    system_content = SPEECH_SYSTEM_PROMPT.format(
        title=document["title"],
        page_count=document.get("page_count", 1),
        document_text=doc_text
    )

    messages = [SystemMessage(content=system_content)]

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
        messages=messages,
        model=AZURE_AI_MODEL,
        temperature=0.3,
        max_tokens=250,
        stream=True
    )

    buffer = ""
    citation_sent = False
    full_answer = []

    for update in response_stream:
        if not update.choices or not update.choices[0].delta.content:
            continue

        token = update.choices[0].delta.content
        # Check for citation tag [PAGE: X]
        if not citation_sent:
            buffer += token
            page_match = re.search(r'\[PAGE:\s*(\d+)\]', buffer)
            if page_match:
                page_num = int(page_match.group(1))
                citation_sent = True
                yield f"event: citation\ndata: {json.dumps({'page': page_num})}\n\n"
                # Strip the tag from the text stream
                clean_text = buffer[page_match.end():]
                buffer = ""
                if clean_text:
                    full_answer.append(clean_text)
                    yield f"event: token\ndata: {json.dumps({'token': clean_text})}\n\n"
                continue
            elif len(buffer) > 20:
                # No tag found in first 20 chars, send buffer and default citation
                citation_sent = True
                yield f"event: citation\ndata: {json.dumps({'page': 1})}\n\n"
                full_answer.append(buffer)
                yield f"event: token\ndata: {json.dumps({'token': buffer})}\n\n"
                buffer = ""
        else:
            full_answer.append(token)
            yield f"event: token\ndata: {json.dumps({'token': token})}\n\n"

    # Flush any remaining buffer if citation was never triggered
    if buffer and not citation_sent:
        yield f"event: citation\ndata: {json.dumps({'page': 1})}\n\n"
        full_answer.append(buffer)
        yield f"event: token\ndata: {json.dumps({'token': buffer})}\n\n"

    # Send completion event
    complete_text = "".join(full_answer).strip()
    yield f"event: done\ndata: {json.dumps({'answer': complete_text})}\n\n"
