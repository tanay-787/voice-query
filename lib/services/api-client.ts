import { Platform } from 'react-native';

export interface BackendDocument {
  id: string;
  title: string;
  source_type: 'pdf' | 'url';
  page_count: number;
  overview: string;
  spoken_briefing: string;
  key_takeaways: Array<{ point: string; page?: number }>;
  definitions: Array<{ term: string; definition: string }>;
}

export interface ChatResponse {
  answer: string;
  citation: {
    page: number;
  };
}

/**
 * Get backend API base URL with multi-platform defaults
 */
export function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Android emulator uses 10.0.2.2 to reach host machine
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }
  return 'http://localhost:5000';
}

/**
 * Health check
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/health`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Upload PDF to backend intelligence engine
 */
export async function uploadPDFToBackend(
  fileUri: string,
  fileName: string
): Promise<BackendDocument> {
  const baseUrl = getApiBaseUrl();
  const formData = new FormData();

  // In React Native, file upload in FormData requires { uri, name, type }
  formData.append('file', {
    uri: fileUri,
    name: fileName || 'document.pdf',
    type: 'application/pdf',
  } as any);

  const response = await fetch(`${baseUrl}/api/documents/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.success || !data.document) {
    throw new Error('Invalid response from backend');
  }

  return data.document;
}

/**
 * Ingest web URL via backend intelligence engine
 */
export async function ingestURLToBackend(url: string): Promise<BackendDocument> {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/api/documents/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `URL ingestion failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.success || !data.document) {
    throw new Error('Invalid response from backend');
  }

  return data.document;
}

/**
 * Query document using speech-native dialogue engine
 */
export async function queryDocumentBackend(
  docId: string,
  question: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<ChatResponse> {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      doc_id: docId,
      question,
      conversation_history: conversationHistory,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Query failed with status ${response.status}`);
  }

  return await response.json();
}
