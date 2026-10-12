import * as SQLite from "expo-sqlite";

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }
  const db = await SQLite.openDatabaseAsync("voicequery.db");
  await initDatabase(db);
  dbInstance = db;
  return db;
}

export async function initDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      uri TEXT NOT NULL,
      size INTEGER,
      page_count INTEGER NOT NULL DEFAULT 1,
      current_page INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL,
      last_opened_at INTEGER NOT NULL,
      server_doc_id TEXT,
      sync_status TEXT NOT NULL DEFAULT 'local'
    );

    CREATE TABLE IF NOT EXISTS interactions (
      id TEXT PRIMARY KEY,
      document_id TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'qa',
      user_query TEXT,
      user_audio_uri TEXT,
      ai_response_text TEXT,
      ai_audio_uri TEXT,
      citations TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (document_id) REFERENCES documents (id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_interactions_document_id ON interactions(document_id);
    CREATE INDEX IF NOT EXISTS idx_documents_last_opened ON documents(last_opened_at DESC);
  `);
}
