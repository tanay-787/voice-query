import time
import uuid
import hashlib
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from config import PORT, DEBUG
from document_engine import (
    extract_pdf_pages,
    extract_url_content,
    generate_document_briefing,
    save_document_and_pages,
    clone_document_content,
    get_document,
    get_document_pages,
    get_document_interactions,
    get_document_by_hash,
    delete_document,
    calculate_sha256,
)
from storage import upload_document_blob, generate_sas_url
from dialogue_engine import stream_speech_answer

app = Flask(__name__)
CORS(app)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "VoiceQuery Intelligence Backend",
        "model": "gpt-4-1-mini",
        "provider": "Azure AI Foundry",
        "storage": "Azure Blob Storage (voicequerystorage)",
        "database": "Azure Cosmos DB (voicequery-db / voicequery)",
        "containers": ["documents", "document_pages", "interactions"]
    })

@app.route("/api/documents/upload", methods=["POST"])
def upload_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files["file"]
    if not uploaded_file.filename or not uploaded_file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    # Client-generated canonical ID (e.g. doc_1728... or client_doc_id)
    client_id = request.form.get("id") or request.form.get("client_doc_id")
    doc_id = client_id or f"doc_{int(time.time() * 1000)}_{uuid.uuid4().hex[:6]}"

    try:
        file_bytes = uploaded_file.read()
        if not file_bytes:
            return jsonify({"error": "Uploaded file is empty"}), 400

        # 1. Compute SHA-256 checksum for instant deduplication
        file_hash = calculate_sha256(file_bytes)
        existing = get_document_by_hash(file_hash)
        if existing:
            if existing["id"] == doc_id:
                # Same exact document session re-uploaded / retried
                existing_interactions = get_document_interactions(existing["id"])
                briefing = next((i for i in existing_interactions if i.get("type") == "briefing"), None)
                return jsonify({
                    "success": True,
                    "deduplicated": True,
                    "document": existing,
                    "briefing": briefing
                })
            else:
                # Content duplicate! Fast-clone pages & briefing under client's canonical ID
                cloned = clone_document_content(
                    source_doc_id=existing["id"],
                    target_doc_id=doc_id,
                    filename=uploaded_file.filename,
                    file_hash=file_hash,
                    file_size=len(file_bytes),
                )
                return jsonify({
                    "success": True,
                    "deduplicated": True,
                    "document": cloned["document"],
                    "briefing": cloned["briefing"]
                })

        # 2. Extract pages and text
        full_text, pages, page_count = extract_pdf_pages(file_bytes)
        if not full_text.strip():
            return jsonify({"error": "Could not extract readable text from PDF"}), 400

        filename = uploaded_file.filename

        # 3. Upload content-addressed blob to Azure Blob Storage
        try:
            blob_url = upload_document_blob(file_hash, file_bytes, filename)
        except Exception as storage_err:
            app.logger.error(f"Azure Blob upload failed: {storage_err}")
            return jsonify({"error": f"Failed to upload document to storage: {str(storage_err)}"}), 500

        # 4. Generate proactive spoken briefing via Azure AI Foundry
        briefing = generate_document_briefing(filename, full_text)

        # 5. Persist document metadata, pages, and briefing interaction to Cosmos DB
        saved = save_document_and_pages(
            doc_id=doc_id,
            title=briefing.get("title", filename),
            source_type="pdf",
            page_count=page_count,
            pages=pages,
            briefing=briefing,
            file_hash=file_hash,
            blob_url=blob_url,
            file_size=len(file_bytes),
        )

        return jsonify({
            "success": True,
            "deduplicated": False,
            "document": saved["document"],
            "briefing": saved["briefing"]
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

    if not raw_url.startswith("http://") and not raw_url.startswith("https://"):
        url = f"https://{raw_url}"
    else:
        url = raw_url

    client_id = data.get("id") or data.get("client_doc_id")
    doc_id = client_id or f"doc_{int(time.time() * 1000)}_{uuid.uuid4().hex[:6]}"

    try:
        full_text, title = extract_url_content(url)
        if not full_text.strip():
            return jsonify({"error": "Could not extract readable text from URL"}), 400

        pages = [{"page": 1, "text": full_text}]
        file_hash = hashlib.sha256(full_text.encode("utf-8")).hexdigest()

        # Check deduplication
        existing = get_document_by_hash(file_hash)
        if existing:
            if existing["id"] == doc_id:
                existing_interactions = get_document_interactions(existing["id"])
                briefing = next((i for i in existing_interactions if i.get("type") == "briefing"), None)
                return jsonify({
                    "success": True,
                    "deduplicated": True,
                    "document": existing,
                    "briefing": briefing
                })
            else:
                cloned = clone_document_content(
                    source_doc_id=existing["id"],
                    target_doc_id=doc_id,
                    filename=title,
                    file_hash=file_hash,
                    file_size=len(full_text.encode("utf-8")),
                )
                return jsonify({
                    "success": True,
                    "deduplicated": True,
                    "document": cloned["document"],
                    "briefing": cloned["briefing"]
                })

        # Generate proactive briefing
        briefing = generate_document_briefing(title, full_text)

        # Save to Cosmos DB
        saved = save_document_and_pages(
            doc_id=doc_id,
            title=briefing.get("title", title),
            source_type="url",
            page_count=1,
            pages=pages,
            briefing=briefing,
            file_hash=file_hash,
        )

        return jsonify({
            "success": True,
            "deduplicated": False,
            "document": saved["document"],
            "briefing": saved["briefing"]
        })

    except Exception as e:
        app.logger.error(f"URL ingestion failed: {e}")
        return jsonify({"error": f"Failed to process URL: {str(e)}"}), 500

@app.route("/api/documents/<doc_id>", methods=["GET"])
def fetch_document(doc_id: str):
    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    return jsonify(doc)

@app.route("/api/documents/<doc_id>/interactions", methods=["GET"])
def fetch_document_interactions(doc_id: str):
    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    interactions = get_document_interactions(doc_id)
    return jsonify({
        "document_id": doc_id,
        "interactions": interactions
    })

@app.route("/api/documents/<doc_id>/pages", methods=["GET"])
def fetch_document_pages(doc_id: str):
    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    start_page = request.args.get("start_page", type=int)
    end_page = request.args.get("end_page", type=int)

    pages = get_document_pages(doc_id, start_page, end_page)
    return jsonify({
        "document_id": doc_id,
        "count": len(pages),
        "pages": pages
    })

@app.route("/api/documents/<doc_id>/download-url", methods=["GET"])
def get_download_url(doc_id: str):
    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    # Verify downloadable PDF exists in Blob Storage
    if not doc.get("blob_url") or doc.get("source_type") != "pdf":
        return jsonify({"error": "No downloadable PDF file exists for this document"}), 404

    try:
        blob_identifier = doc.get("file_hash") or doc_id
        sas_url = generate_sas_url(blob_identifier, expiry_hours=24)
        return jsonify({"download_url": sas_url})
    except Exception as e:
        return jsonify({"error": f"Could not generate SAS download URL: {str(e)}"}), 500

@app.route("/api/documents/<doc_id>", methods=["DELETE"])
def remove_document(doc_id: str):
    deleted = delete_document(doc_id)
    if not deleted:
        return jsonify({"error": "Document not found"}), 404

    return jsonify({
        "success": True,
        "deleted_id": doc_id
    })

@app.route("/api/chat", methods=["POST"])
def chat_sync():
    data = request.get_json() or {}
    doc_id = data.get("document_id") or data.get("doc_id")
    question = (data.get("question") or data.get("query", "")).strip()
    conversation_history = data.get("conversation_history", [])
    context = data.get("context", {})
    current_page = context.get("current_page")
    interaction_id = data.get("interaction_id")

    if not doc_id or not question:
        return jsonify({"error": "document_id and question are required"}), 400

    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    page = current_page or 1
    answer = ""
    for event in stream_speech_answer(
        question=question,
        document=doc,
        conversation_history=conversation_history,
        current_page=current_page,
        interaction_id=interaction_id
    ):
        lines = event.strip().split("\n")
        if len(lines) >= 2:
            event_name = lines[0].replace("event: ", "").strip()
            data_str = lines[1].replace("data: ", "").strip()
            if event_name == "citation":
                try:
                    import json
                    citation_data = json.loads(data_str)
                    if isinstance(citation_data, dict):
                        page = citation_data.get("page", page)
                except Exception:
                    pass
            elif event_name == "done":
                try:
                    import json
                    done_data = json.loads(data_str)
                    answer = done_data.get("answer", "")
                    page = done_data.get("citation", {}).get("page", page)
                except Exception:
                    pass

    return jsonify({
        "answer": answer,
        "citation": {"page": page}
    })

@app.route("/api/chat/stream", methods=["POST"])
def chat_stream():
    data = request.get_json() or {}
    doc_id = data.get("document_id") or data.get("doc_id")
    question = (data.get("question") or data.get("query", "")).strip()
    conversation_history = data.get("conversation_history", [])
    context = data.get("context", {})
    current_page = context.get("current_page")
    interaction_id = data.get("interaction_id")

    if not doc_id:
        return jsonify({"error": "document_id is required"}), 400

    if not question:
        return jsonify({"error": "question is required"}), 400

    doc = get_document(doc_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404

    return Response(
        stream_speech_answer(
            question=question,
            document=doc,
            conversation_history=conversation_history,
            current_page=current_page,
            interaction_id=interaction_id
        ),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
