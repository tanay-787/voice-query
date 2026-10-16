import os
from datetime import datetime, timedelta, timezone
from azure.storage.blob import (
    BlobServiceClient,
    BlobSasPermissions,
    generate_blob_sas,
    ContentSettings,
)
from config import AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER

_blob_service_client = None

def get_blob_service_client():
    global _blob_service_client
    if _blob_service_client is None:
        if not AZURE_STORAGE_CONNECTION_STRING:
            raise ValueError("AZURE_STORAGE_CONNECTION_STRING is not configured.")
        _blob_service_client = BlobServiceClient.from_connection_string(
            AZURE_STORAGE_CONNECTION_STRING
        )
    return _blob_service_client

def get_container_client():
    client = get_blob_service_client()
    return client.get_container_client(AZURE_STORAGE_CONTAINER)

def resolve_blob_name(identifier: str) -> str:
    return identifier if identifier.endswith(".pdf") else f"{identifier}.pdf"

def upload_document_blob(identifier: str, file_bytes: bytes, filename: str) -> str:
    """
    Uploads document file bytes to Azure Blob Storage container 'documents'.
    If the blob already exists (e.g. content-addressed hash), re-upload is skipped.
    Returns the public blob URL.
    """
    container = get_container_client()
    blob_name = resolve_blob_name(identifier)
    blob_client = container.get_blob_client(blob_name)

    if not blob_client.exists():
        blob_client.upload_blob(
            file_bytes,
            overwrite=True,
            content_settings=ContentSettings(
                content_type="application/pdf",
                content_disposition=f'inline; filename="{filename}"'
            )
        )
    return blob_client.url

def download_document_blob(identifier: str) -> bytes:
    """
    Downloads raw document bytes from Azure Blob Storage.
    """
    container = get_container_client()
    blob_name = resolve_blob_name(identifier)
    blob_client = container.get_blob_client(blob_name)
    return blob_client.download_blob().readall()

def delete_document_blob(identifier: str) -> bool:
    """
    Deletes the document blob from Azure Blob Storage.
    """
    try:
        container = get_container_client()
        blob_name = resolve_blob_name(identifier)
        blob_client = container.get_blob_client(blob_name)
        if blob_client.exists():
            blob_client.delete_blob()
            return True
        return False
    except Exception as e:
        print(f"[Storage] Failed to delete blob {identifier}: {e}")
        return False

def generate_sas_url(identifier: str, expiry_hours: int = 24) -> str:
    """
    Generates a secure temporary SAS URL for direct client reading/downloading.
    """
    container = get_container_client()
    blob_name = resolve_blob_name(identifier)
    blob_client = container.get_blob_client(blob_name)

    client = get_blob_service_client()
    sas_token = generate_blob_sas(
        account_name=client.account_name,
        container_name=AZURE_STORAGE_CONTAINER,
        blob_name=blob_name,
        account_key=client.credential.account_key,
        permission=BlobSasPermissions(read=True),
        expiry=datetime.now(timezone.utc) + timedelta(hours=expiry_hours)
    )

    return f"{blob_client.url}?{sas_token}"
