/**
 * Services barrel export
 * External APIs and integrations
 */

export { AgentService, getAgentService } from './agent';
export {
  RecordingPresets, requestAudioPermissions,
  setupAudioMode, useAudioRecorder,
  useAudioRecorderState, validateRecordingDuration, type AudioRecording
} from './audio-recording';
export {
  askQuestion, processPDF,
  processURL, type ProcessingResult
} from './document-processor';
export { GeminiService, getGeminiService } from './gemini';
export {
  recognizeSpeech, synthesizeSpeech, type AzureSpeechConfig
} from './speech-to-text';
export { getTTSService, TTSService, type TTSOptions } from './text-to-speech';
export { convertURLToMarkdown } from './url-to-markdown';
export {
  parseJSONSafely, validateDocumentSummary, validateMarkdownContent, validatePDF,
  validateURL, ValidationError
} from './validation';

