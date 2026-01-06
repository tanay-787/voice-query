/**
 * API types for Gemini and external services
 */

export interface GeminiFileUploadResult {
  file: {
    name: string;
    mimeType: string;
    uri: string;
    sizeBytes?: number;
  };
}

export interface URLToMarkdownRequest {
  url: string;
}

export interface URLToMarkdownResponse {
  markdown: string;
  title?: string;
  url: string;
}

export interface AudioTranscription {
  text: string;
  confidence?: number;
}

export interface TTSResult {
  audioData: string; // base64 encoded audio
  mimeType: string;
}
