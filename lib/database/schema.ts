/**
 * SQLite database schema for v1
 * Single-context storage - only one document at a time
 */

export const DB_NAME = 'vq_agent.db';
export const DB_VERSION = 1;

/**
 * SQL schema for document_context table
 * Stores exactly one document context (overwrites on new ingestion)
 */
export const CREATE_CONTEXT_TABLE = `
CREATE TABLE IF NOT EXISTS document_context (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  title TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('pdf', 'url')),
  source_uri TEXT,
  overview TEXT NOT NULL,
  key_points TEXT NOT NULL,
  definitions TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
`;

/**
 * Indices for performance
 * Note: No indices needed for single-row table (id = 1)
 * All queries use PRIMARY KEY which is already indexed
 */
export const CREATE_INDICES = `
-- No indices needed for single-row table
-- All queries use PRIMARY KEY (id = 1)
`;

/**
 * Initial data - no default context
 */
export const INITIAL_DATA = [];
