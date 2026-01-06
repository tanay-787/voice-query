/**
 * Type definitions for document context and API responses
 */

export type DocumentSource = 'pdf' | 'url';

/**
 * Structured summary format from AI
 */
export interface DocumentSummary {
  title: string;
  overview: string;
  key_points: string[];
  definitions: string[];
}

/**
 * Document context stored in SQLite
 */
export interface DocumentContext {
  id: number;
  title: string;
  source: DocumentSource;
  source_uri?: string;
  overview: string;
  key_points: string; // JSON stringified array
  definitions: string; // JSON stringified array
  created_at: number; // Unix timestamp
  updated_at: number; // Unix timestamp
}

/**
 * Insert/Update context (without id and timestamps)
 */
export interface DocumentContextInput {
  title: string;
  source: DocumentSource;
  source_uri?: string;
  overview: string;
  key_points: string[];
  definitions: string[];
}

/**
 * Formatted context for display
 */
export interface FormattedContext {
  title: string;
  source: DocumentSource;
  sourceUri?: string;
  overview: string;
  keyPoints: string[];
  definitions: string[];
  createdAt: Date;
  updatedAt: Date;
}
