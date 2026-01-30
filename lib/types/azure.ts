/**
 * Azure Speech Service types
 */

export interface SpeechPhrase {
  text: string;
  confidence?: number;
}

export interface SpeechRecognitionResult {
  // New API format (2025-10-15)
  combinedPhrases?: SpeechPhrase[];
  // Legacy API format
  phrases?: SpeechPhrase[];
  RecognitionStatus?: 'Success' | 'NoMatch' | 'InitialSilenceTimeout' | 'BabbleTimeout' | 'Error';
  DisplayText?: string;
}

export interface AzureClientConfig {
  endpoint: string;
  token: string;
}

export interface ModelClientResponse<T = unknown> {
  body: {
    choices: Array<{
      message: {
        content: string;
      };
    }>;
    error?: {
      message: string;
      code: string;
    };
  } & T;
}
