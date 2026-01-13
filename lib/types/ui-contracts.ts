/**
 * UI Contracts - Type-safe interfaces for UI development
 * 
 * These types are extracted from the business layer hooks,
 * allowing UI components to be built in isolation with predictable state.
 * 
 * Usage:
 * 1. Build UI components against these contracts
 * 2. Use mock implementations during development
 * 3. Swap in real hooks without changing UI code
 */

import type { FormattedContext, DocumentContextInput } from './context';
import type { ProcessingResult } from '@/lib/services/document-processor';
import type { DocumentPickerResult } from 'expo-document-picker';
import type { SQLiteDatabase } from 'expo-sqlite';
import type { AzureSpeechConfig } from '@/lib/services/azure-speech';
import type { TTSOptions } from '@/lib/services/tts-service';

// ============================================================================
// DATABASE HOOK CONTRACT
// ============================================================================

/**
 * Database connection state
 * Source: useDatabase hook
 */
export interface DatabaseContract {
  db: SQLiteDatabase | null;
  isReady: boolean;
  error: Error | null;
}

// ============================================================================
// DOCUMENT CONTEXT HOOK CONTRACT
// ============================================================================

/**
 * Document context management
 * Source: useDocumentContext hook
 */
export interface DocumentContextContract {
  // State
  context: FormattedContext | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  loadContext: () => Promise<FormattedContext | null>;
  save: (input: DocumentContextInput) => Promise<FormattedContext>;
  remove: () => Promise<void>;
  checkExists: () => Promise<boolean>;
  getPromptContext: () => string | null;
}

// ============================================================================
// DOCUMENT PROCESSOR HOOK CONTRACT
// ============================================================================

/**
 * Document processing operations
 * Source: useDocumentProcessor hook
 */
export interface DocumentProcessorContract {
  // State
  isProcessing: boolean;
  error: Error | null;
  
  // Actions
  processPDF: (pickerResult: DocumentPickerResult) => Promise<ProcessingResult>;
  processURL: (url: string) => Promise<ProcessingResult>;
  askQuestion: (question: string, contextString: string) => Promise<string>;
}

// ============================================================================
// AUDIO HOOKS CONTRACTS
// ============================================================================

/**
 * Text-to-speech
 * Source: useTextToSpeech hook
 */
export interface TextToSpeechContract {
  // State
  isSpeaking: boolean;
  error: Error | null;
  
  // Actions
  speak: (text: string, options?: TTSOptions) => Promise<void>;
  stop: () => Promise<void>;
  getVoices: () => Promise<string[]>;
}

/**
 * Speech-to-text
 * Source: useSpeechToText hook
 */
export interface SpeechToTextContract {
  // State
  isTranscribing: boolean;
  error: Error | null;
  
  // Actions
  transcribe: (audioUri: string) => Promise<string>;
}

/**
 * Voice interaction (complete flow)
 * Source: useVoiceInteraction hook
 */
export interface VoiceInteractionContract {
  // State
  isRecording: boolean;
  isTranscribing: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  duration: number;
  transcription: string;
  answer: string;
  error: Error | null;
  
  // Actions
  getVoices: () => Promise<string[]>;
  startVoiceQuestion: () => Promise<void>;
  stopAndProcess: () => Promise<void>;
  cancel: () => Promise<void>;
  stopSpeaking: () => Promise<void>;
}

// ============================================================================
// UI STATE VARIANTS
// ============================================================================

/**
 * Common UI states that every contract can be in
 * Use these to build comprehensive UI coverage
 */
export type UIState = 
  | 'idle'        // Initial state, no data
  | 'loading'     // Operation in progress
  | 'success'     // Operation completed with data
  | 'error';      // Operation failed

/**
 * Helper type for creating state variants
 * Example: StateVariant<DocumentContextContract, 'loading'>
 */
export type StateVariant<T extends Record<string, any>, S extends UIState> = 
  S extends 'loading' ? T & { isLoading: true; error: null } :
  S extends 'error' ? T & { isLoading: false; error: Error } :
  S extends 'success' ? T & { isLoading: false; error: null } :
  T;

// ============================================================================
// COMBINED APP CONTRACT
// ============================================================================

/**
 * Complete application state contract
 * Combines all business layer hooks into one interface
 */
export interface AppBusinessLayerContract {
  database: DatabaseContract;
  documentContext: DocumentContextContract;
  documentProcessor: DocumentProcessorContract;
  tts: TextToSpeechContract;
  stt: SpeechToTextContract;
  voiceInteraction: VoiceInteractionContract;
}

// ============================================================================
// USAGE EXAMPLES (for reference, not runtime code)
// ============================================================================

/**
 * Example: Building a DocumentViewer component
 * 
 * interface DocumentViewerProps {
 *   context: DocumentContextContract;
 * }
 * 
 * function DocumentViewer({ context }: DocumentViewerProps) {
 *   // UI now depends on contract, not implementation
 *   if (context.isLoading) return <Spinner />;
 *   if (context.error) return <ErrorView error={context.error} />;
 *   if (!context.context) return <EmptyState />;
 *   
 *   return <DocumentDetails data={context.context} />;
 * }
 * 
 * // Development: Use with mock
 * <DocumentViewer context={mockDocumentContext} />
 * 
 * // Production: Use with real hook
 * const context = useDocumentContext(db);
 * <DocumentViewer context={context} />
 */
