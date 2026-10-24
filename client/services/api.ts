import { File, UploadType } from "expo-file-system";
import Constants from "expo-constants";

/**
 * Resolves the backend HTTP base URL dynamically.
 * Prioritizes:
 * 1. Explicit EXPO_PUBLIC_API_URL environment variable
 * 2. Expo dev server host LAN IP (for physical test devices / dev client)
 * 3. Default localhost:8000
 */
export function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:8000`;
  }

  return "http://localhost:8000";
}

/**
 * Resolves the WebSocket base URL from the HTTP base URL.
 */
export function getWebSocketBaseUrl(): string {
  const httpUrl = getApiBaseUrl();
  return httpUrl.replace(/^http/, "ws");
}

export interface IngestDocumentResponse {
  success: boolean;
  deduplicated: boolean;
  document: {
    id: string;
    name: string;
    source_type: string;
    page_count: number;
    status: string;
    file_hash?: string;
    blob_url?: string;
  };
  briefing?: {
    id: string;
    type: string;
    ai_response_text: string;
    overview?: string;
    key_takeaways?: Array<{ point?: string; page?: number }>;
  };
}

/**
 * Uploads a local PDF document to the FastAPI backend.
 * Streams natively through the Expo File System multipart engine without
 * loading whole PDF buffers into JavaScript memory.
 */
export async function uploadPdfDocument(
  fileUri: string,
  canonicalId: string
): Promise<IngestDocumentResponse> {
  const baseUrl = getApiBaseUrl();
  const file = new File(fileUri);

  const result = await file.upload(`${baseUrl}/api/documents/upload`, {
    uploadType: UploadType.MULTIPART,
    fieldName: "file",
    mimeType: "application/pdf",
    parameters: {
      id: canonicalId,
    },
  });

  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Upload failed with HTTP ${result.status}: ${result.body}`);
  }

  return JSON.parse(result.body) as IngestDocumentResponse;
}
