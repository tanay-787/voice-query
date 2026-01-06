import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { initDatabase } from '@/lib/database/migrations';

/**
 * Hook to manage SQLite database connection
 * Initializes database on mount and provides ready state
 */
export function useDatabase() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const database = await initDatabase();
        if (mounted) {
          setDb(database);
          setIsReady(true);
          console.log('[useDatabase] Database ready');
        }
      } catch (err) {
        console.error('[useDatabase] Initialization failed:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Database init failed'));
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return { db, isReady, error };
}
