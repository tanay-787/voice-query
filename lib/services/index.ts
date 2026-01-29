/**
 * Services barrel export
 * External APIs and integrations
 */

export { getAgentService, AgentService } from './agent';
export { 
  requestAudioPermissions, 
  setupAudioMode, 
  validateRecordingDuration,
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  type AudioRecording
} from './audio-service';
export { 
  synthesizeSpeech, 
  recognizeSpeech,
  type AzureSpeechConfig 
} from './azure-speech';
export { 
  processPDF, 
  processURL, 
  askQuestion,
  type ProcessingResult
} from './document-processor';
export { getGeminiService, GeminiService } from './gemini';
export { getTTSService, TTSService, type TTSOptions } from './tts-service';
export { convertURLToMarkdown } from './url-to-markdown';
export { 
  ValidationError,
  validatePDF,
  validateURL,
  validateMarkdownContent,
  validateDocumentSummary,
  parseJSONSafely
} from './validation';

