import uuid
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from config import PORT, DEBUG
from document_engine import (
    extract_pdf_pages,
    extract_url_content,
    generate_document_briefing,
    save_document,
    get_document,
)
from dialogue_engine import stream_speech_answer

app = Flask(__name__)
CORS(app)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "VoiceQuery Intelligence Backend",
        "model": "gpt-4-1-mini",
        "provider": "Azure AI Foundry"
    })

@app.route("/api/documents/upload", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files["file"]
    if not uploaded_file.filename or not uploaded_file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    try:
        file_bytes = uploaded_file.read()
        full_text, pages, page_count = extract_pdf_pages(file_bytes)

        if not full_text.strip():
            return jsonify({"error": "Could not extract readable text from PDF"}), 400

        doc_id = str(uuid.uuid4())
        filename = uploaded_file.filename

        # Generate proactive briefing
        briefing = generate_document_briefing(filename, full_text)

        # Save to database
        save_document(
            doc_id=doc_id,
            title=briefing.get("title", filename),
            source_type="pdf",
            source_uri=filename,
            page_count=page_count,
            full_text=full_text,
            pages=pages,
            briefing=briefing
        )

        saved = get_document(doc_id)
        return jsonify({
            "success": True,
            "document": {
                "id": saved["id"],
                "title": saved["title"],
                "source_type": saved["source_type"],
                "page_count": saved["page_count"],
                "overview": saved["overview"],
                "spoken_briefing": saved["spoken_briefing"],
                "key_takeaways": saved["key_takeaways"],
                "definitions": saved["definitions"]
            }
        })

    except Exception as e:
        app.logger.error(f"PDF upload failed: {e}")
        return jsonify({"error": f"Failed to process PDF: {str(e)}"}), 500

@app.route("/api/documents/url", methods=["POST"])
def ingest_url():
    data = request.get_json() or {}
    raw_url = data.get("url", "").strip()

    if not raw_url:
        return jsonify({"error": "URL is required"}), 400

    # Ensure URL protocol
    if not raw_url.startswith("http://") and not raw_url.startswith("https://"):
        url = f"https://{raw_url}"
    else:
        url = raw_url

    try:
        full_text, title = extract_url_content(url)

        if not full_text.strip():
            return jsonify({"error": "Could not extract readable text from URL"}), 400

        doc_id = str(uuid.uuid4())
        pages = [{"page": 1, "text": full_text}]

        # Generate proactive briefing
        briefing = generate_document_briefing(title, full_text)

        # Save to database
        save_document(
            doc_id=doc_id,
            title=briefing.get("title", title),
            source_type="url",
            source_uri=url,
            page_count=1,
            full_text=full_text,
            pages=pages,
            briefing=briefing
        )

        saved = get_document(doc_id)
        return jsonify({
            "success": True,
            "document": {
                "id": saved["id"],
                "title": saved["title"],
                "source_type": saved["source_type"],
                "page_count": 1,
                "overview": saved["overview"],
                "spoken_briefing": saved["spoken_briefing"],
                "key_takeaways": saved["key_takeaways"],
                "definitions": saved["definitions"]
            }
        })

    except Exception as e:
        app.logger.error(f"URL ingestion failed: {e}")
        return jsonify({"error": f"Failed to process URL: {str(e)}"}), 500

@app.route("/api/documents/<doc_id>", methods=["GET"])
def fetch_document(doc_id: str):
    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    return jsonify({
        "id": doc["id"],
        "title": doc["title"],
        "source_type": doc["source_type"],
        "page_count": doc["page_count"],
        "overview": doc["overview"],
        "spoken_briefing": doc["spoken_briefing"],
        "key_takeaways": doc["key_takeaways"],
        "definitions": doc["definitions"]
    })

@app.route("/api/chat", methods=["POST"])
def chat_sync():
    import json
    data = request.get_json() or {}
    doc_id = data.get("doc_id")
    question = data.get("question", "").strip()
    conversation_history = data.get("conversation_history", [])

    if not doc_id or not question:
        return jsonify({"error": "doc_id and question are required"}), 400

    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    page = 1
    answer = ""
    for event in stream_speech_answer(question, doc, conversation_history):
        lines = event.strip().split("\n")
        if len(lines) >= 2:
            event_name = lines[0].replace("event: ", "").strip()
            data_str = lines[1].replace("data: ", "").strip()
            if event_name == "citation":
                try:
                    citation_data = json.loads(data_str)
                    page = citation_data.get("page", 1)
                except Exception:
                    pass
            elif event_name == "done":
                try:
                    done_data = json.loads(data_str)
                    answer = done_data.get("answer", "")
                except Exception:
                    pass

    return jsonify({
        "answer": answer,
        "citation": {"page": page}
    })

@app.route("/api/chat/stream", methods=["POST"])
def chat_stream():
    data = request.get_json() or {}
    doc_id = data.get("doc_id")
    question = data.get("question", "").strip()
    conversation_history = data.get("conversation_history", [])

    if not doc_id:
        return jsonify({"error": "doc_id is required"}), 400

    if not question:
        return jsonify({"error": "question is required"}), 400

    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    return Response(
        stream_speech_answer(question, doc, conversation_history),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
