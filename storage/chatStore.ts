import * as SQLite from 'expo-sqlite';
import { Message } from '@/types/chat';

const DB_NAME = 'agent-chats.db';
let initialized = false;

const dbPromise = SQLite.openDatabaseAsync(DB_NAME);

async function getDb() {
  const db = await dbPromise;
  if (!initialized) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS chats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT NOT NULL,
        summary TEXT NOT NULL,
        messages TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
    `);
    initialized = true;
  }
  return db;
}

export async function initializeChatStore() {
  await getDb();
}

export async function saveChatSession(chat: {
  source: string;
  summary: string;
  messages: Message[];
}) {
  if (!chat.source || !chat.summary || !chat.messages?.length) {
    return;
  }

  const db = await getDb();
  await db.runAsync(
    'INSERT INTO chats (source, summary, messages, created_at) VALUES (?, ?, ?, ?)',
    chat.source,
    chat.summary,
    JSON.stringify(chat.messages),
    Date.now()
  );
}
