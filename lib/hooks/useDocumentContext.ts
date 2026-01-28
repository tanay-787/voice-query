import { useState, useCallback } from 'react';
import type { SQLiteDatabase } from 'expo-sqlite';
import type { DocumentContextInput, FormattedContext } from '@/lib/types/context';
import {
  getContext,
  saveContext,
  deleteContext,
  hasContext,
  formatContextForPrompt,
} from '@/lib/database/context-store';

/**
 * Hook to manage document context
 * Provides methods to get, save, delete context
 * Note: db is guaranteed to be ready via SQLiteProvider
 */
export function useDocumentContext(db: SQLiteDatabase) {
  const [context, setContext] = useState<FormattedContext | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadContext = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loaded = await getContext(db);
      setContext(loaded);
      return loaded;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load context');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  const save = useCallback(
    async (input: DocumentContextInput) => {
      setIsLoading(true);
      setError(null);

      try {
        const saved = await saveContext(db, input);
        setContext(saved);
        return saved;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to save context');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [db]
  );

  const remove = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteContext(db);
      setContext(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete context');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  const checkExists = useCallback(async () => {
    try {
      return await hasContext(db);
    } catch (err) {
      console.error('[useDocumentContext] checkExists failed:', err);
      return false;
    }
  }, [db]);

  const getPromptContext = useCallback(() => {
    if (!context) return null;
    return formatContextForPrompt(context);
  }, [context]);

  return {
    context,
    isLoading,
    error,
    loadContext,
    save,
    remove,
    checkExists,
    getPromptContext,
  };
}
