import * as SQLite from 'expo-sqlite';
import type { DocumentContext, DocumentContextInput, FormattedContext } from '@/lib/types/context';

/**
 * Context store - CRUD operations for single document context
 * Enforces single-context constraint (id = 1 always)
 */

/**
 * Get the current document context (if exists)
 */
export async function getContext(
  db: SQLite.SQLiteDatabase
): Promise<FormattedContext | null> {
  try {
    const row = await db.getFirstAsync<DocumentContext>(
      'SELECT * FROM document_context WHERE id = 1'
    );

    if (!row) return null;

    return formatContext(row);
  } catch (error) {
    console.error('[ContextStore] Get failed:', error);
    throw error;
  }
}

/**
 * Save or replace document context
 * Always uses id = 1 (single-context enforcement)
 */
export async function saveContext(
  db: SQLite.SQLiteDatabase,
  input: DocumentContextInput
): Promise<FormattedContext> {
  try {
    const now = Date.now();

    // Use transaction for atomicity
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT OR REPLACE INTO document_context 
         (id, title, source, source_uri, overview, key_points, definitions, created_at, updated_at)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          input.title,
          input.source,
          input.source_uri ?? null,
          input.overview,
          JSON.stringify(input.key_points),
          JSON.stringify(input.definitions),
          now,
          now,
        ]
      );
    });

    const saved = await getContext(db);
    if (!saved) {
      throw new Error('Failed to retrieve saved context');
    }

    return saved;
  } catch (error) {
    console.error('[ContextStore] Save failed:', error);
    throw error;
  }
}

/**
 * Delete the current context
 */
export async function deleteContext(db: SQLite.SQLiteDatabase): Promise<void> {
  try {
    await db.runAsync('DELETE FROM document_context WHERE id = 1');
  } catch (error) {
    console.error('[ContextStore] Delete failed:', error);
    throw error;
  }
}

/**
 * Check if context exists
 */
export async function hasContext(db: SQLite.SQLiteDatabase): Promise<boolean> {
  try {
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM document_context WHERE id = 1'
    );
    return (result?.count ?? 0) > 0;
  } catch (error) {
    console.error('[ContextStore] hasContext check failed:', error);
    throw error;
  }
}

/**
 * Format database row to FormattedContext
 */
function formatContext(row: DocumentContext): FormattedContext {
  return {
    title: row.title,
    source: row.source,
    sourceUri: row.source_uri ?? undefined,
    overview: row.overview,
    keyPoints: JSON.parse(row.key_points),
    definitions: JSON.parse(row.definitions),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

/**
 * Format context for AI prompt (compact string representation)
 */
export function formatContextForPrompt(context: FormattedContext): string {
  const parts = [
    `Title: ${context.title}`,
    `\nOverview: ${context.overview}`,
    `\nKey Points:`,
    ...context.keyPoints.map((point, i) => `${i + 1}. ${point}`),
  ];

  if (context.definitions.length > 0) {
    parts.push('\nDefinitions:');
    parts.push(...context.definitions.map((def) => `- ${def}`));
  }

  return parts.join('\n');
}
