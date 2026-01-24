/**
 * Centralized Error Handling Utilities
 * 
 * Provides type-safe error handling with Toast notifications
 */

import { useToast } from 'heroui-native';
import { useCallback } from 'react';

/**
 * Error types for categorized error handling
 */
export enum ErrorType {
  VOICE_NO_SPEECH_DETECTED = 'VOICE_NO_SPEECH_DETECTED',
  VOICE_EMPTY_RECORDING = 'VOICE_EMPTY_RECORDING',
  VOICE_TRANSCRIPTION_FAILED = 'VOICE_TRANSCRIPTION_FAILED',
  VOICE_PROCESSING_FAILED = 'VOICE_PROCESSING_FAILED',
  VOICE_TTS_FAILED = 'VOICE_TTS_FAILED',
  TEXT_PROCESSING_FAILED = 'TEXT_PROCESSING_FAILED',
  DOCUMENT_UPLOAD_FAILED = 'DOCUMENT_UPLOAD_FAILED',
  DOCUMENT_PROCESSING_FAILED = 'DOCUMENT_PROCESSING_FAILED',
  NO_DOCUMENT_CONTEXT = 'NO_DOCUMENT_CONTEXT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Error configuration for each error type
 */
interface ErrorConfig {
  variant: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  actionLabel?: string;
  duration?: number | 'persistent';
}

/**
 * Error configurations mapped by type
 */
const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  [ErrorType.VOICE_NO_SPEECH_DETECTED]: {
    variant: 'warning',
    title: 'No Speech Detected',
    message: 'Could not detect any speech in the recording. Please speak clearly and try again',
    duration: 4000,
  },
  [ErrorType.VOICE_EMPTY_RECORDING]: {
    variant: 'warning',
    title: 'Recording Too Short',
    message: 'Recording duration was too short. Please hold the button and speak your question',
    duration: 3000,
  },
  [ErrorType.VOICE_TRANSCRIPTION_FAILED]: {
    variant: 'danger',
    title: 'Transcription Failed',
    message: 'Could not transcribe the audio. Please try again or use text input',
    actionLabel: 'Retry',
    duration: 5000,
  },
  [ErrorType.VOICE_PROCESSING_FAILED]: {
    variant: 'danger',
    title: 'Processing Failed',
    message: 'Failed to process your question. Please try again',
    actionLabel: 'Retry',
    duration: 5000,
  },
  [ErrorType.VOICE_TTS_FAILED]: {
    variant: 'warning',
    title: 'Speech Playback Failed',
    message: 'Could not play the response. Check the text instead',
    duration: 4000,
  },
  [ErrorType.TEXT_PROCESSING_FAILED]: {
    variant: 'danger',
    title: 'Question Failed',
    message: 'Could not process your question. Please try again',
    actionLabel: 'Retry',
    duration: 5000,
  },
  [ErrorType.DOCUMENT_UPLOAD_FAILED]: {
    variant: 'danger',
    title: 'Upload Failed',
    message: 'Could not upload the document. Please check the file and try again',
    actionLabel: 'Retry',
    duration: 5000,
  },
  [ErrorType.DOCUMENT_PROCESSING_FAILED]: {
    variant: 'danger',
    title: 'Processing Failed',
    message: 'Could not process the document. Please try a different file',
    duration: 5000,
  },
  [ErrorType.NO_DOCUMENT_CONTEXT]: {
    variant: 'warning',
    title: 'No Document Loaded',
    message: 'Please upload a document before asking questions',
    actionLabel: 'Upload',
    duration: 4000,
  },
  [ErrorType.NETWORK_ERROR]: {
    variant: 'danger',
    title: 'Network Error',
    message: 'Please check your internet connection and try again',
    actionLabel: 'Retry',
    duration: 5000,
  },
  [ErrorType.UNKNOWN_ERROR]: {
    variant: 'danger',
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred. Please try again',
    actionLabel: 'Retry',
    duration: 5000,
  },
};

/**
 * Hook for centralized error handling with Toast notifications
 * 
 * @example
 * const { showError } = useErrorHandler();
 * 
 * try {
 *   // ... some operation
 * } catch (error) {
 *   showError(ErrorType.VOICE_TRANSCRIPTION_FAILED, error, () => {
 *     // Retry logic
 *   });
 * }
 */
export function useErrorHandler() {
  const { toast } = useToast();

  /**
   * Show error toast with optional retry action
   * 
   * @param errorType - Type of error from ErrorType enum
   * @param error - Original error object (for logging)
   * @param onRetry - Optional callback for retry action
   * @param customMessage - Optional custom message override
   */
  const showError = useCallback(
    (
      errorType: ErrorType,
      error?: unknown,
      onRetry?: () => void,
      customMessage?: string
    ) => {
      const config = ERROR_CONFIGS[errorType];

      // Log error to console for debugging
      console.error(
        `[ErrorHandler] ${errorType}:`,
        error instanceof Error ? error.message : error
      );

      // Show toast notification
      toast.show({
        variant: config.variant,
        label: config.title,
        description: customMessage || config.message,
        duration: config.duration || 4000,
        actionLabel: onRetry ? config.actionLabel : undefined,
        onActionPress: onRetry
          ? ({ hide }) => {
              hide();
              onRetry();
            }
          : undefined,
      });
    },
    [toast]
  );

  /**
   * Show success toast
   * 
   * @param title - Success title
   * @param message - Success message
   */
  const showSuccess = useCallback(
    (title: string, message: string) => {
      toast.show({
        variant: 'success',
        label: title,
        description: message,
        duration: 3000,
      });
    },
    [toast]
  );

  /**
   * Show info toast
   * 
   * @param title - Info title
   * @param message - Info message
   */
  const showInfo = useCallback(
    (title: string, message: string) => {
      toast.show({
        variant: 'accent',
        label: title,
        description: message,
        duration: 3000,
      });
    },
    [toast]
  );

  /**
   * Parse error object to determine error type
   * Useful for automatic error type detection
   * 
   * @param error - Error object to parse
   * @returns Detected error type
   */
  const parseErrorType = useCallback((error: unknown): ErrorType => {
    if (!(error instanceof Error)) {
      return ErrorType.UNKNOWN_ERROR;
    }

    const message = error.message.toLowerCase();

    // Voice-related errors - check in order of specificity
    if (message.includes('no speech detected') || message.includes('no phrases')) {
      return ErrorType.VOICE_NO_SPEECH_DETECTED;
    }
    if (message.includes('recording too short') || message.includes('duration too short')) {
      return ErrorType.VOICE_EMPTY_RECORDING;
    }
    if (message.includes('transcrib') || message.includes('could not be recognized')) {
      return ErrorType.VOICE_TRANSCRIPTION_FAILED;
    }
    if (message.includes('tts') || message.includes('speak')) {
      return ErrorType.VOICE_TTS_FAILED;
    }

    // Document-related errors
    if (message.includes('no context') || message.includes('no document')) {
      return ErrorType.NO_DOCUMENT_CONTEXT;
    }
    if (message.includes('upload')) {
      return ErrorType.DOCUMENT_UPLOAD_FAILED;
    }

    // Network errors
    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('timeout')
    ) {
      return ErrorType.NETWORK_ERROR;
    }

    return ErrorType.UNKNOWN_ERROR;
  }, []);

  /**
   * Smart error handler that auto-detects error type
   * 
   * @param error - Error to handle
   * @param onRetry - Optional retry callback
   */
  const handleError = useCallback(
    (error: unknown, onRetry?: () => void) => {
      const errorType = parseErrorType(error);
      showError(errorType, error, onRetry);
    },
    [parseErrorType, showError]
  );

  return {
    showError,
    showSuccess,
    showInfo,
    handleError,
    parseErrorType,
  };
}
