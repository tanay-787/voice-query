import { File, UploadType } from "expo-file-system";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

const DEFAULT_SERVER_PORT = 5001;

/**
 * Resolves the backend HTTP base URL dynamically.
 * Priority:
 * 1. Explicit EXPO_PUBLIC_API_URL environment variable.
 * 2. Physical device (Device.isDevice === true): dev server host LAN IP.
 * 3. Android Emulator: 10.0.2.2 loopback alias.
 * 4. iOS Simulator / Web / macOS: 127.0.0.1 loopback.
 */
export function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  // Physical device must use host LAN IP to reach dev machine
  if (Device.isDevice) {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      const host = hostUri.split(":")[0];
      return `http://${host}:${DEFAULT_SERVER_PORT}`;
    }
  }

  // Android emulator connects to host machine via 10.0.2.2
  if (Platform.OS === "android") {
    return `http://10.0.2.2:${DEFAULT_SERVER_PORT}`;
  }

  // iOS Simulator shares macOS network stack, 127.0.0.1 directly routes to host
  return `http://127.0.0.1:${DEFAULT_SERVER_PORT}`;
}

/**
 * Resolves the WebSocket base URL from the HTTP base URL.
 */
export function getWebSocketBaseUrl(): string {
  const httpUrl = getApiBaseUrl();
  return httpUrl.replace(/^http/, "ws");
}

export interface ServerHealthResponse {
  status: string;
  service?: string;
  model?: string;
  provider?: string;
  storage?: string;
  database?: string;
}

/**
 * Checks server connectivity on app boot or on demand.
 * Outputs diagnostic logs to Metro/debugger console to verify network reachability.
 */
export async function checkServerHealth(): Promise<boolean> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/health`;

  console.log(`[API] Checking connectivity to backend at ${endpoint}...`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = (await res.json()) as ServerHealthResponse;
      console.log(`[API] Connected to server at ${baseUrl} (status: ${data.status})`);
      return true;
    } else {
      console.warn(
        `[API] Server responded with error status ${res.status} at ${endpoint}`
      );
      return false;
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      console.warn(
        `[API] Health check timed out after 4000ms connecting to ${endpoint}. ` +
          `Ensure the FastAPI backend is running on port ${DEFAULT_SERVER_PORT}.`
      );
    } else {
      console.warn(
        `[API] Could not connect to server at ${endpoint}: ${err?.message ?? err}. ` +
          `Ensure the FastAPI backend is running on port ${DEFAULT_SERVER_PORT}.`
      );
    }
    return false;
  }
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
  const uploadUrl = `${baseUrl}/api/documents/upload`;
  const file = new File(fileUri);

  console.log(
    `[API] Uploading document ${canonicalId} to ${uploadUrl} (sourceUri: ${fileUri})...`
  );

  const controller = new AbortController();
  // Document extraction and AI briefing can take up to ~30s on cold starts
  const timeoutId = setTimeout(() => {
    controller.abort();
    console.warn(`[API] Upload timed out after 30s for document ${canonicalId}`);
  }, 30000);

  try {
    const result = await file.upload(uploadUrl, {
      uploadType: UploadType.MULTIPART,
      fieldName: "file",
      mimeType: "application/pdf",
      parameters: {
        id: canonicalId,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(
      `[API] Upload response status: HTTP ${result.status} for document ${canonicalId}`
    );

    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Upload failed with HTTP ${result.status}: ${result.body}`);
    }

    const data = JSON.parse(result.body) as IngestDocumentResponse;
    console.log(
      `[API] Successfully ingested document: ${data.document?.id ?? canonicalId} (pages: ${data.document?.page_count ?? 0})`
    );
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error(
      `[API] Failed to upload document ${canonicalId} to ${uploadUrl}:`,
      error?.message ?? error
    );
    throw error;
  }
}
