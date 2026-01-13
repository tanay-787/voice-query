/**
 * Mock Factory - Type-safe mock implementations of UI contracts
 * 
 * Provides stub implementations that match the exact interface of real hooks.
 * UI components can be developed and tested against these mocks in isolation.
 * 
 * Usage:
 * 1. During development: const context = createMockDocumentContext('success');
 * 2. In production: const context = useDocumentContext(db);
 * 3. The component code stays identical - only the source changes
 */

import type {
  DatabaseContract,
  DocumentContextContract,
  DocumentProcessorContract,
  TextToSpeechContract,
  SpeechToTextContract,
  VoiceInteractionContract,
  AppBusinessLayerContract,
  UIState,
} from './ui-contracts';

// ============================================================================
// MOCK CREATORS - Return contract-compliant objects
// ============================================================================

/**
 * Create mock database state
 */
export function createMockDatabase(state: UIState = 'success'): DatabaseContract {
  return {
    db: state === 'success' ? ({} as any) : null,
    isReady: state === 'success',
    error: state === 'error' ? new Error('Database initialization failed') : null,
  };
}

/**
 * Create mock document context
 */
export function createMockDocumentContext(state: UIState = 'idle'): DocumentContextContract {
  const hasContext = state === 'success';
  
  return {
    // State
    context: hasContext ? {
      title: '[Mock] Document Title',
      source: 'pdf',
      sourceUri: 'file:///mock/document.pdf',
      overview: '[Mock] This is an overview of the document...',
      keyPoints: [
        '[Mock] First key point',
        '[Mock] Second key point',
        '[Mock] Third key point',
      ],
      definitions: [
        '[Mock] Term 1: Definition of term 1',
        '[Mock] Term 2: Definition of term 2',
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    } : null,
    isLoading: state === 'loading',
    error: state === 'error' ? new Error('Failed to load context') : null,
    
    // Actions (no-op implementations)
    loadContext: async () => null,
    save: async (input) => ({
      title: input.title,
      source: input.source,
      sourceUri: input.source_uri,
      overview: input.overview,
      keyPoints: input.key_points,
      definitions: input.definitions,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    remove: async () => {},
    checkExists: async () => hasContext,
    getPromptContext: () => hasContext ? '[Mock] Formatted context for prompt' : null,
  };
}

/**
 * Create mock document processor
 */
export function createMockDocumentProcessor(state: UIState = 'idle'): DocumentProcessorContract {
  return {
    // State
    isProcessing: state === 'loading',
    error: state === 'error' ? new Error('Processing failed') : null,
    
    // Actions
    processPDF: async () => ({
      contextInput: {
        title: '[Mock] PDF Document',
        source: 'pdf',
        overview: '[Mock] PDF overview',
        key_points: ['[Mock] Point 1', '[Mock] Point 2'],
        definitions: ['[Mock] Definition 1'],
      },
      summary: {
        title: '[Mock] PDF Document',
        overview: '[Mock] PDF overview',
        key_points: ['[Mock] Point 1', '[Mock] Point 2'],
        definitions: ['[Mock] Definition 1'],
      },
    }),
    processURL: async () => ({
      contextInput: {
        title: '[Mock] Web Page',
        source: 'url',
        source_uri: 'https://example.com',
        overview: '[Mock] URL overview',
        key_points: ['[Mock] Point 1'],
        definitions: [],
      },
      summary: {
        title: '[Mock] Web Page',
        overview: '[Mock] URL overview',
        key_points: ['[Mock] Point 1'],
        definitions: [],
      },
    }),
    askQuestion: async () => '[Mock] Answer to your question...',
  };
}

/**
 * Create mock text-to-speech
 */
export function createMockTextToSpeech(state: UIState = 'idle'): TextToSpeechContract {
  return {
    // State
    isSpeaking: state === 'loading',
    error: state === 'error' ? new Error('TTS failed') : null,
    
    // Actions
    speak: async () => {},
    stop: async () => {},
    getVoices: async () => ['en-US-default', 'en-GB-default', 'en-AU-default'],
  };
}

/**
 * Create mock speech-to-text
 */
export function createMockSpeechToText(state: UIState = 'idle'): SpeechToTextContract {
  return {
    // State
    isTranscribing: state === 'loading',
    error: state === 'error' ? new Error('STT failed') : null,
    
    // Actions
    transcribe: async () => '[Mock] Transcribed text from audio',
  };
}

/**
 * Create mock voice interaction
 */
export function createMockVoiceInteraction(state: UIState = 'idle'): VoiceInteractionContract {
  return {
    // State
    isRecording: state === 'loading' ? true : false,
    isTranscribing: false,
    isSpeaking: false,
    isProcessing: state === 'loading',
    duration: 0,
    transcription: state === 'success' ? '[Mock] What is the main topic?' : '',
    answer: state === 'success' ? '[Mock] The main topic is...' : '',
    error: state === 'error' ? new Error('Voice interaction failed') : null,
    
    // Actions
    getVoices: async () => ['en-US-default'],
    startVoiceQuestion: async () => {},
    stopAndProcess: async () => {},
    cancel: async () => {},
    stopSpeaking: async () => {},
  };
}

/**
 * Create complete app business layer mock
 */
export function createMockAppBusinessLayer(state: UIState = 'success'): AppBusinessLayerContract {
  return {
    database: createMockDatabase(state),
    documentContext: createMockDocumentContext(state === 'success' ? 'success' : 'idle'),
    documentProcessor: createMockDocumentProcessor('idle'),
    tts: createMockTextToSpeech('idle'),
    stt: createMockSpeechToText('idle'),
    voiceInteraction: createMockVoiceInteraction('idle'),
  };
}

// ============================================================================
// CONVENIENCE EXPORTS - Pre-configured common states
// ============================================================================

export const MOCK_DB_READY = createMockDatabase('success');
export const MOCK_DB_LOADING = createMockDatabase('loading');
export const MOCK_DB_ERROR = createMockDatabase('error');

export const MOCK_CONTEXT_EMPTY = createMockDocumentContext('idle');
export const MOCK_CONTEXT_LOADING = createMockDocumentContext('loading');
export const MOCK_CONTEXT_LOADED = createMockDocumentContext('success');
export const MOCK_CONTEXT_ERROR = createMockDocumentContext('error');

export const MOCK_PROCESSOR_IDLE = createMockDocumentProcessor('idle');
export const MOCK_PROCESSOR_PROCESSING = createMockDocumentProcessor('loading');
export const MOCK_PROCESSOR_ERROR = createMockDocumentProcessor('error');

export const MOCK_TTS_IDLE = createMockTextToSpeech('idle');
export const MOCK_TTS_SPEAKING = createMockTextToSpeech('loading');
export const MOCK_TTS_ERROR = createMockTextToSpeech('error');

export const MOCK_VOICE_IDLE = createMockVoiceInteraction('idle');
export const MOCK_VOICE_RECORDING = createMockVoiceInteraction('loading');
export const MOCK_VOICE_COMPLETED = createMockVoiceInteraction('success');
export const MOCK_VOICE_ERROR = createMockVoiceInteraction('error');

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Develop a component in isolation
 * 
 * function DocumentCard({ context }: { context: DocumentContextContract }) {
 *   if (context.isLoading) return <Skeleton />;
 *   if (context.error) return <Error message={context.error.message} />;
 *   if (!context.context) return <EmptyState />;
 *   
 *   return <Card title={context.context.title} />;
 * }
 * 
 * // Development - test all states without database
 * <DocumentCard context={MOCK_CONTEXT_LOADING} />
 * <DocumentCard context={MOCK_CONTEXT_LOADED} />
 * <DocumentCard context={MOCK_CONTEXT_ERROR} />
 * 
 * // Production - swap in real hook
 * const realContext = useDocumentContext(db);
 * <DocumentCard context={realContext} />
 */

/**
 * Example 2: Build complete screen with mocked business layer
 * 
 * function HomeScreen({ businessLayer }: { businessLayer: AppBusinessLayerContract }) {
 *   const { database, documentContext, documentProcessor } = businessLayer;
 *   
 *   if (!database.isReady) return <LoadingScreen />;
 *   
 *   return (
 *     <View>
 *       <DocumentViewer context={documentContext} />
 *       <ProcessButton processor={documentProcessor} />
 *     </View>
 *   );
 * }
 * 
 * // Development
 * <HomeScreen businessLayer={createMockAppBusinessLayer('success')} />
 * 
 * // Production
 * const db = useDatabase();
 * const context = useDocumentContext(db.db);
 * const processor = useDocumentProcessor();
 * <HomeScreen businessLayer={{ database: db, documentContext: context, documentProcessor: processor }} />
 */
