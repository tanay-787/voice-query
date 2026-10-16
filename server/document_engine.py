import io
import re
import json
import time
import httpx
import hashlib
from pypdf import PdfReader
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from config import AZURE_AI_ENDPOINT, AZURE_AI_KEY, AZURE_AI_MODEL
from storage import delete_document_blob
from cosmos_db import (
    save_document_cosmos,
    get_document_cosmos,
    get_document_by_hash_cosmos,
    count_documents_by_hash_cosmos,
    delete_document_cosmos,
    save_document_pages_cosmos,
    get_document_pages_cosmos,
    delete_document_pages_cosmos,
    save_interaction_cosmos,
    get_interactions_cosmos,
    delete_interactions_cosmos,
)

from dialogue_engine import get_azure_client

def calculate_sha256(file_bytes: bytes) -> str:
    """Calculates SHA-256 hash of file bytes for content deduplication."""
    return hashlib.sha256(file_bytes).hexdigest()

def extract_pdf_pages(file_bytes: bytes) -> tuple[str, list[dict], int]:
    """Extract page-by-page text from PDF file bytes."""
    reader = PdfReader(io.BytesIO(file_bytes))
    page_count = len(reader.pages)
    pages = []
    full_text_parts = []

    for i, page in enumerate(reader.pages):
        page_num = i + 1
        text = page.extract_text() or ""
        # Clean excessive whitespace
        cleaned = re.sub(r'[ \t]+', ' ', text).strip()
        pages.append({
            "page": page_num,
            "text": cleaned
        })
        full_text_parts.append(f"--- [Page {page_num}] ---\n{cleaned}")

    full_text = "\n\n".join(full_text_parts)
    return full_text, pages, page_count

def extract_url_content(url: str) -> tuple[str, str]:
    """Fetch and extract clean text from a web URL."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    with httpx.Client(follow_redirects=True, timeout=15.0) as client:
        resp = client.get(url, headers=headers)
        resp.raise_for_status()
        html = resp.text

    # Extract title
    title_match = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "Web Page"

    # Clean scripts, styles, tags
    cleaned = re.sub(r'<(script|style|nav|header|footer)[^>]*>.*?</\1>', ' ', html, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r'<[^>]+>', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()

    return cleaned[:50000], title

BRIEFING_SYSTEM_PROMPT = """You are an Executive Document Intelligence Analyst.
Analyze the provided document and produce a structured JSON response.

CRITICAL INSTRUCTIONS:
1. "spoken_briefing": Write a 30 to 45-second audio briefing script intended to be read aloud via Text-to-Speech immediately upon opening.
   - Do NOT use any markdown, bullet points, headers, asterisks, or citations in "spoken_briefing".
   - It must sound natural, confident, and professional when spoken aloud.
   - Highlight the 2-3 most critical points, surprising clauses, or vital takeaways.
   - Conclude with a conversational prompt suggesting what the user might want to explore.
2. "overview": A concise 2-3 sentence high-level summary.
3. "key_takeaways": Array of objects: [{"point": "description", "page": 1}] citing specific page numbers where possible.
4. "definitions": Array of objects: [{"term": "Term Name", "definition": "Clear explanation"}].

Respond strictly with valid JSON conforming to this schema:
{
  "title": "Document Title",
  "overview": "Overview text...",
  "spoken_briefing": "Spoken script...",
  "key_takeaways": [{"point": "...", "page": 1}],
  "definitions": [{"term": "...", "definition": "..."}]
}
"""

def generate_document_briefing(title_hint: str, document_text: str) -> dict:
    client = get_azure_client()
    preview = document_text[:40000]

    prompt = f"Document Title Hint: {title_hint}\n\nDocument Content:\n{preview}"

    response = client.complete(
        messages=[
            SystemMessage(content=BRIEFING_SYSTEM_PROMPT),
            UserMessage(content=prompt)
        ],
        model=AZURE_AI_MODEL,
        temperature=0.3
    )

    raw_json = response.choices[0].message.content
    try:
        return json.loads(raw_json)
    except Exception as e:
        match = re.search(r'\{.*\}', raw_json, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        raise e

def save_document_and_pages(
    doc_id: str,
    title: str,
    source_type: str,
    page_count: int,
    pages: list[dict],
    briefing: dict,
    file_hash: str | None = None,
    blob_url: str | None = None,
    file_size: int | None = None,
) -> dict:
    """
    Saves document metadata to `documents` container,
    page texts to `document_pages` container,
    and initial briefing to `interactions` container.
    """
    now = time.time()

    # 1. Save document metadata in 'processing' status
    doc_meta = {
        "id": doc_id,
        "name": briefing.get("title", title),
        "source_type": source_type,
        "file_hash": file_hash,
        "blob_url": blob_url,
        "size": file_size,
        "page_count": page_count,
        "status": "processing",
        "created_at": now,
        "updated_at": now,
    }
    save_document_cosmos(doc_meta)

    try:
        # 2. Save individual pages in document_pages container
        if pages:
            save_document_pages_cosmos(doc_id, pages)

        # 3. Save initial briefing interaction in interactions container
        citations = []
        for item in briefing.get("key_takeaways", []):
            if isinstance(item, dict) and "page" in item:
                citations.append({"page": item["page"]})

        briefing_interaction = {
            "id": f"int_{doc_id}_briefing",
            "document_id": doc_id,
            "type": "briefing",
            "status": "completed",
            "user_query": None,
            "ai_response_text": briefing.get("spoken_briefing", ""),
            "overview": briefing.get("overview", ""),
            "key_takeaways": briefing.get("key_takeaways", []),
            "definitions": briefing.get("definitions", []),
            "citations": citations,
            "created_at": now,
            "updated_at": now,
        }
        save_interaction_cosmos(briefing_interaction)

        # 4. Promote to 'ready' only after child persistence succeeds
        doc_meta["status"] = "ready"
        doc_meta["updated_at"] = time.time()
        save_document_cosmos(doc_meta)

        return {
            "document": doc_meta,
            "briefing": briefing_interaction
        }
    except Exception as e:
        doc_meta["status"] = "failed"
        doc_meta["error"] = str(e)
        doc_meta["updated_at"] = time.time()
        try:
            save_document_cosmos(doc_meta)
            delete_document_pages_cosmos(doc_id)
            delete_interactions_cosmos(doc_id)
        except Exception:
            pass
        raise e

def clone_document_content(
    source_doc_id: str,
    target_doc_id: str,
    filename: str,
    file_hash: str,
    file_size: int | None = None,
) -> dict:
    """
    Instantly clones extracted pages and executive briefing from an existing document
    to a new client canonical document ID without re-parsing PDF or re-generating LLM tokens.
    Guarantees the client preserves its requested ID with zero duplicate compute.
    """
    now = time.time()
    source_doc = get_document_cosmos(source_doc_id)
    if not source_doc:
        raise ValueError(f"Source document {source_doc_id} not found for cloning.")

    # 1. Initialize target document in 'processing' status
    target_doc = {
        "id": target_doc_id,
        "name": filename or source_doc.get("name", "Document"),
        "source_type": source_doc.get("source_type", "pdf"),
        "file_hash": file_hash,
        "blob_url": source_doc.get("blob_url"),
        "size": file_size if file_size is not None else source_doc.get("size"),
        "page_count": source_doc.get("page_count", 1),
        "status": "processing",
        "created_at": now,
        "updated_at": now,
    }
    save_document_cosmos(target_doc)

    try:
        # 2. Fetch source pages and save under new target_doc_id
        source_pages = get_document_pages_cosmos(source_doc_id)
        pages_to_save = [
            {"page": p["page"], "text": p.get("text", "")}
            for p in source_pages
        ]
        if pages_to_save:
            save_document_pages_cosmos(target_doc_id, pages_to_save)

        # 3. Fetch source briefing and create independent briefing interaction for target_doc_id
        source_interactions = get_document_interactions(source_doc_id)
        briefing_int = next((i for i in source_interactions if i.get("type") == "briefing"), None)

        target_briefing = {
            "id": f"int_{target_doc_id}_briefing",
            "document_id": target_doc_id,
            "type": "briefing",
            "status": "completed",
            "user_query": None,
            "ai_response_text": briefing_int.get("ai_response_text", "") if briefing_int else "",
            "overview": briefing_int.get("overview", "") if briefing_int else "",
            "key_takeaways": briefing_int.get("key_takeaways", []) if briefing_int else [],
            "definitions": briefing_int.get("definitions", []) if briefing_int else [],
            "citations": briefing_int.get("citations", []) if briefing_int else [],
            "created_at": now,
            "updated_at": now,
        }
        save_interaction_cosmos(target_briefing)

        # 4. Promote to 'ready'
        target_doc["page_count"] = len(source_pages) if source_pages else target_doc["page_count"]
        target_doc["status"] = "ready"
        target_doc["updated_at"] = time.time()
        save_document_cosmos(target_doc)

        return {
            "document": target_doc,
            "briefing": target_briefing
        }
    except Exception as e:
        target_doc["status"] = "failed"
        target_doc["error"] = str(e)
        target_doc["updated_at"] = time.time()
        try:
            save_document_cosmos(target_doc)
            delete_document_pages_cosmos(target_doc_id)
            delete_interactions_cosmos(target_doc_id)
        except Exception:
            pass
        raise e

def get_document(doc_id: str) -> dict | None:
    """Fetches document metadata from documents container."""
    return get_document_cosmos(doc_id)

def get_document_pages(
    doc_id: str,
    start_page: int | None = None,
    end_page: int | None = None
) -> list[dict]:
    """Fetches pages from document_pages container."""
    return get_document_pages_cosmos(doc_id, start_page, end_page)

def get_document_interactions(doc_id: str) -> list[dict]:
    """Fetches all interactions for a document in chronological order."""
    return get_interactions_cosmos(doc_id)

def get_document_by_hash(file_hash: str) -> dict | None:
    """Performs an indexed lookup in Cosmos DB by SHA-256 hash."""
    return get_document_by_hash_cosmos(file_hash)

def delete_document(doc_id: str) -> dict:
    """
    Deletes document metadata, pages, and interactions from Cosmos DB,
    and purges associated storage blob if not referenced by other documents.
    Returns a comprehensive result dictionary tracking each cleanup operation.
    """
    errors = []
    doc = get_document_cosmos(doc_id)
    file_hash = doc.get("file_hash") if doc else None

    doc_deleted = False
    try:
        doc_deleted = delete_document_cosmos(doc_id)
    except Exception as e:
        errors.append(f"document: {str(e)}")

    pages_deleted = 0
    try:
        pages_deleted = delete_document_pages_cosmos(doc_id)
    except Exception as e:
        errors.append(f"pages: {str(e)}")

    interactions_deleted = 0
    try:
        interactions_deleted = delete_interactions_cosmos(doc_id)
    except Exception as e:
        errors.append(f"interactions: {str(e)}")

    blob_deleted = False
    if file_hash:
        try:
            remaining_count = count_documents_by_hash_cosmos(file_hash)
            if remaining_count == 0:
                blob_deleted = delete_document_blob(file_hash)
        except Exception as e:
            errors.append(f"blob: {str(e)}")

    # Legacy fallback blob check
    try:
        delete_document_blob(doc_id)
    except Exception:
        pass

    found_and_cleaned = doc_deleted or pages_deleted > 0 or interactions_deleted > 0

    return {
        "success": found_and_cleaned and len(errors) == 0,
        "deleted_id": doc_id,
        "document_deleted": doc_deleted,
        "pages_deleted": pages_deleted,
        "interactions_deleted": interactions_deleted,
        "blob_deleted": blob_deleted,
        "errors": errors
    }
