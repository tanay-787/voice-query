import os

# Load .env file if present in the backend directory
_env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(_env_path):
    with open(_env_path, encoding="utf-8") as _f:
        for _line in _f:
            _line = _line.strip()
            if _line and not _line.startswith("#") and "=" in _line:
                _k, _v = _line.split("=", 1)
                os.environ.setdefault(_k.strip(), _v.strip().strip('"').strip("'"))

AZURE_AI_ENDPOINT = os.getenv(
    "AZURE_AI_ENDPOINT", "https://tanaygupte22-1956-resource.services.ai.azure.com/models"
)
AZURE_AI_KEY = os.getenv("AZURE_AI_KEY", "")
AZURE_AI_MODEL = os.getenv("AZURE_AI_MODEL", "gpt-4-1-mini")

AZURE_SPEECH_KEY = os.getenv("AZURE_SPEECH_KEY", "")
AZURE_SPEECH_REGION = os.getenv("AZURE_SPEECH_REGION", "southeastasia")

AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING", "")
AZURE_STORAGE_CONTAINER = os.getenv("AZURE_STORAGE_CONTAINER", "documents")

AZURE_COSMOS_ENDPOINT = os.getenv("AZURE_COSMOS_ENDPOINT", "")
AZURE_COSMOS_KEY = os.getenv("AZURE_COSMOS_KEY", "")
AZURE_COSMOS_DATABASE = os.getenv("AZURE_COSMOS_DATABASE", "voicequery")
AZURE_COSMOS_CONTAINER = os.getenv("AZURE_COSMOS_CONTAINER", "documents")
AZURE_COSMOS_CONTAINER_PAGES = os.getenv("AZURE_COSMOS_CONTAINER_PAGES", "document_pages")
AZURE_COSMOS_CONTAINER_INTERACTIONS = os.getenv(
    "AZURE_COSMOS_CONTAINER_INTERACTIONS", "interactions"
)

PORT = int(os.getenv("PORT", "5000"))
DEBUG = os.getenv("DEBUG", "true").lower() == "true"
