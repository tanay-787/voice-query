import { useState, useCallback } from 'react';
import type { DocumentPickerResult } from 'expo-document-picker';
import { processPDF, processURL, askQuestion, type ProcessingResult } from '@/lib/services/document-processor';

/**
 * Hook for document processing operations
 */
export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleProcessPDF = useCallback(async (pickerResult: DocumentPickerResult): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await processPDF(pickerResult);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('PDF processing failed');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleProcessURL = useCallback(async (url: string): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await processURL(url);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('URL processing failed');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleAskQuestion = useCallback(async (question: string, contextString: string): Promise<string> => {
    setIsProcessing(true);
    setError(null);

    try {
      const answer = await askQuestion(question, contextString);
      return answer;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Question processing failed');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isProcessing,
    error,
    processPDF: handleProcessPDF,
    processURL: handleProcessURL,
    askQuestion: handleAskQuestion,
  };
}
