import os
import time
import concurrent.futures
from azure.cosmos import CosmosClient, exceptions
from config import (
    AZURE_COSMOS_ENDPOINT,
    AZURE_COSMOS_KEY,
    AZURE_COSMOS_DATABASE,
    AZURE_COSMOS_CONTAINER,
    AZURE_COSMOS_CONTAINER_PAGES,
    AZURE_COSMOS_CONTAINER_INTERACTIONS,
)

_cosmos_client = None
_docs_container = None
_pages_container = None
_interactions_container = None

def get_cosmos_client():
    global _cosmos_client
    if _cosmos_client is None:
        if not AZURE_COSMOS_ENDPOINT or not AZURE_COSMOS_KEY:
            return None
        _cosmos_client = CosmosClient(
            url=AZURE_COSMOS_ENDPOINT,
            credential=AZURE_COSMOS_KEY
        )
    return _cosmos_client

def get_documents_container():
    global _docs_container
    if _docs_container is None:
        client = get_cosmos_client()
        if client is None:
            return None
        database = client.get_database_client(AZURE_COSMOS_DATABASE)
        _docs_container = database.get_container_client(AZURE_COSMOS_CONTAINER)
    return _docs_container

def get_pages_container():
    global _pages_container
    if _pages_container is None:
        client = get_cosmos_client()
        if client is None:
            return None
        database = client.get_database_client(AZURE_COSMOS_DATABASE)
        _pages_container = database.get_container_client(AZURE_COSMOS_CONTAINER_PAGES)
    return _pages_container

def get_interactions_container():
    global _interactions_container
    if _interactions_container is None:
        client = get_cosmos_client()
        if client is None:
            return None
        database = client.get_database_client(AZURE_COSMOS_DATABASE)
        _interactions_container = database.get_container_client(AZURE_COSMOS_CONTAINER_INTERACTIONS)
    return _interactions_container

def is_cosmos_configured() -> bool:
    return bool(AZURE_COSMOS_ENDPOINT and AZURE_COSMOS_KEY)

# ==========================================
# 1. Documents Container Operations (/id)
# ==========================================

def save_document_cosmos(doc_data: dict) -> dict:
    """
    Upserts a document directly into the documents container.
    """
    container = get_documents_container()
    if container is None:
        raise RuntimeError("Cosmos DB is not configured.")
    return container.upsert_item(body=doc_data)

def get_document_cosmos(doc_id: str) -> dict | None:
    """
    Performs an ultra-fast point lookup by document ID.
    """
    container = get_documents_container()
    if container is None:
        return None
    try:
        return container.read_item(item=doc_id, partition_key=doc_id)
    except exceptions.CosmosResourceNotFoundError:
        return None

def get_document_by_hash_cosmos(file_hash: str) -> dict | None:
    """
    Cross-partition indexed query to check if a document with this SHA-256 hash exists.
    """
    container = get_documents_container()
    if container is None:
        return None

    query = "SELECT * FROM c WHERE c.file_hash = @file_hash"
    params = [{"name": "@file_hash", "value": file_hash}]

    items = list(container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=True,
        max_item_count=1
    ))
    return items[0] if items else None

def count_documents_by_hash_cosmos(file_hash: str) -> int:
    """
    Counts how many document sessions currently reference this file hash.
    """
    container = get_documents_container()
    if container is None:
        return 0

    query = "SELECT VALUE COUNT(1) FROM c WHERE c.file_hash = @file_hash"
    params = [{"name": "@file_hash", "value": file_hash}]

    items = list(container.query_items(
        query=query,
        parameters=params,
        enable_cross_partition_query=True
    ))
    return items[0] if items else 0

def delete_document_cosmos(doc_id: str) -> bool:
    """
    Deletes a document from the documents container.
    """
    container = get_documents_container()
    if container is None:
        return False
    try:
        container.delete_item(item=doc_id, partition_key=doc_id)
        return True
    except exceptions.CosmosResourceNotFoundError:
        return False
    except Exception as e:
        print(f"[CosmosDB] Failed to delete document {doc_id}: {e}")
        return False

# ==========================================
# 2. Document Pages Container Operations (/document_id)
# ==========================================

def save_document_pages_cosmos(doc_id: str, pages: list[dict]) -> None:
    """
    Upserts page text chunks into document_pages container.
    Partition key: /document_id
    Uses a worker pool to parallelize batch writes and minimize network latency.
    """
    container = get_pages_container()
    if container is None:
        raise RuntimeError("Cosmos DB pages container is not configured.")

    if not pages:
        return

    now = time.time()

    def _upsert_page(page_entry: dict):
        page_num = page_entry["page"]
        text = page_entry.get("text", "")
        item = {
            "id": f"{doc_id}_p{page_num}",
            "document_id": doc_id,
            "page": page_num,
            "text": text,
            "created_at": now
        }
        container.upsert_item(body=item)

    if len(pages) <= 2:
        for p in pages:
            _upsert_page(p)
    else:
        max_workers = min(10, len(pages))
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            list(executor.map(_upsert_page, pages))

def get_document_pages_cosmos(
    doc_id: str,
    start_page: int | None = None,
    end_page: int | None = None
) -> list[dict]:
    """
    Performs an intra-partition query to fetch page items for a document.
    Partition-targeted using partition_key=doc_id.
    """
    container = get_pages_container()
    if container is None:
        return []

    if start_page is not None and end_page is not None:
        query = (
            "SELECT c.id, c.document_id, c.page, c.text FROM c "
            "WHERE c.document_id = @doc_id AND c.page >= @start_page AND c.page <= @end_page "
            "ORDER BY c.page ASC"
        )
        params = [
            {"name": "@doc_id", "value": doc_id},
            {"name": "@start_page", "value": start_page},
            {"name": "@end_page", "value": end_page},
        ]
    else:
        query = (
            "SELECT c.id, c.document_id, c.page, c.text FROM c "
            "WHERE c.document_id = @doc_id "
            "ORDER BY c.page ASC"
        )
        params = [{"name": "@doc_id", "value": doc_id}]

    return list(container.query_items(
        query=query,
        parameters=params,
        partition_key=doc_id
    ))

def delete_document_pages_cosmos(doc_id: str) -> int:
    """
    Deletes all page items for a document in the document_pages container.
    Parallelizes item deletion over a thread pool.
    """
    container = get_pages_container()
    if container is None:
        return 0

    query = "SELECT c.id FROM c WHERE c.document_id = @doc_id"
    params = [{"name": "@doc_id", "value": doc_id}]
    pages = list(container.query_items(
        query=query,
        parameters=params,
        partition_key=doc_id
    ))

    if not pages:
        return 0

    def _delete_page_item(p: dict) -> int:
        try:
            container.delete_item(item=p["id"], partition_key=doc_id)
            return 1
        except Exception as e:
            print(f"[CosmosDB] Failed to delete page item {p['id']}: {e}")
            return 0

    if len(pages) <= 2:
        return sum(_delete_page_item(p) for p in pages)

    max_workers = min(10, len(pages))
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        return sum(executor.map(_delete_page_item, pages))

# ==========================================
# 3. Interactions Container Operations (/document_id)
# ==========================================

def save_interaction_cosmos(interaction_data: dict) -> dict:
    """
    Upserts an interaction item into the interactions container.
    Partition key: /document_id
    """
    container = get_interactions_container()
    if container is None:
        raise RuntimeError("Cosmos DB interactions container is not configured.")

    return container.upsert_item(body=interaction_data)

def get_interactions_cosmos(doc_id: str) -> list[dict]:
    """
    Fetches all interactions for a document in chronological order.
    Partition-targeted using partition_key=doc_id.
    """
    container = get_interactions_container()
    if container is None:
        return []

    query = (
        "SELECT * FROM c WHERE c.document_id = @doc_id "
        "ORDER BY c.created_at ASC"
    )
    params = [{"name": "@doc_id", "value": doc_id}]

    return list(container.query_items(
        query=query,
        parameters=params,
        partition_key=doc_id
    ))

def delete_interactions_cosmos(doc_id: str) -> int:
    """
    Deletes all interaction items for a document in the interactions container.
    Parallelizes item deletion over a thread pool.
    """
    container = get_interactions_container()
    if container is None:
        return 0

    query = "SELECT c.id FROM c WHERE c.document_id = @doc_id"
    params = [{"name": "@doc_id", "value": doc_id}]
    items = list(container.query_items(
        query=query,
        parameters=params,
        partition_key=doc_id
    ))

    if not items:
        return 0

    def _delete_interaction_item(item: dict) -> int:
        try:
            container.delete_item(item=item["id"], partition_key=doc_id)
            return 1
        except Exception as e:
            print(f"[CosmosDB] Failed to delete interaction item {item['id']}: {e}")
            return 0

    if len(items) <= 2:
        return sum(_delete_interaction_item(item) for item in items)

    max_workers = min(10, len(items))
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        return sum(executor.map(_delete_interaction_item, items))
