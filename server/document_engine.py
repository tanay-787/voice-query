import io
import re
import json
import sqlite3
import time
import httpx
from pypdf import PdfReader
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import os
from config import AZURE_AI_ENDPOINT, AZURE_AI_KEY, AZURE_AI_MODEL

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "documents.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        source_type TEXT NOT NULL,
        source_uri TEXT,
        page_count INTEGER,
        full_text TEXT NOT NULL,
        pages_json TEXT NOT NULL,
        overview TEXT,
        spoken_briefing TEXT,
        key_takeaways_json TEXT,
        definitions_json TEXT,
        created_at REAL NOT NULL
    );
    """)
    conn.commit()
    conn.close()

init_db()

def get_azure_client():
    return ChatCompletionsClient(
        endpoint=AZURE_AI_ENDPOINT,
        credential=AzureKeyCredential(AZURE_AI_KEY)
    )

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
    # Provide up to 40k chars for the initial briefing
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
        # Fallback if markdown fence was included
        match = re.search(r'\{.*\}', raw_json, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        raise e

def save_document(doc_id: str, title: str, source_type: str, source_uri: str, 
                  page_count: int, full_text: str, pages: list[dict], briefing: dict):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO documents 
    (id, title, source_type, source_uri, page_count, full_text, pages_json, overview, spoken_briefing, key_takeaways_json, definitions_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        doc_id,
        briefing.get("title", title),
        source_type,
        source_uri,
        page_count,
        full_text,
        json.dumps(pages),
        briefing.get("overview", ""),
        briefing.get("spoken_briefing", ""),
        json.dumps(briefing.get("key_takeaways", [])),
        json.dumps(briefing.get("definitions", [])),
        time.time()
    ))
    conn.commit()
    conn.close()

def get_document(doc_id: str) -> dict | None:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM documents WHERE id = ?", (doc_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "id": row[0],
        "title": row[1],
        "source_type": row[2],
        "source_uri": row[3],
        "page_count": row[4],
        "full_text": row[5],
        "pages": json.loads(row[6]),
        "overview": row[7],
        "spoken_briefing": row[8],
        "key_takeaways": json.loads(row[9]),
        "definitions": json.loads(row[10]),
        "created_at": row[11]
    }
