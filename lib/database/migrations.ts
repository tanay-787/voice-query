import * as SQLite from 'expo-sqlite';
import { CREATE_CONTEXT_TABLE, CREATE_INDICES, DB_NAME } from './schema';

/**
 * Database migration system
 * Handles version upgrades and schema changes
 */

export async function migrateDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  try {
    // Verify database integrity first
    const integrity = await db.getFirstAsync<{ integrity_check: string }>(
      'PRAGMA integrity_check'
    );
    
    if (integrity?.integrity_check !== 'ok') {
      console.error('[Migration] Database corruption detected');
      throw new Error('Database integrity check failed');
    }

    // Get current version
    const result = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    const currentVersion = result?.user_version ?? 0;

    console.log(`[Migration] Current DB version: ${currentVersion}`);

    // Run migrations
    if (currentVersion < 1) {
      await migrateToV1(db);
    }

    if (currentVersion < 2) {
      await migrateToV2(db);
    }

    console.log('[Migration] Database up to date');
  } catch (error) {
    console.error('[Migration] Failed:', error);
    throw error;
  }
}

/**
 * Migration to version 2 - add backend_doc_id, spoken_briefing, page_count
 */
async function migrateToV2(db: SQLite.SQLiteDatabase): Promise<void> {
  console.log('[Migration] Migrating to v2...');
  try {
    await db.execAsync(`
      BEGIN TRANSACTION;
      ALTER TABLE document_context ADD COLUMN backend_doc_id TEXT;
      ALTER TABLE document_context ADD COLUMN spoken_briefing TEXT;
      ALTER TABLE document_context ADD COLUMN page_count INTEGER;
      PRAGMA user_version = 2;
      COMMIT;
    `);
    console.log('[Migration] Successfully migrated to v2');
  } catch (e) {
    console.log('[Migration] v2 migration note (columns may already exist):', e);
    await db.execAsync('PRAGMA user_version = 2;');
  }
}

/**
 * Migration to version 1 - initial schema
 */
async function migrateToV1(db: SQLite.SQLiteDatabase): Promise<void> {
  console.log('[Migration] Migrating to v1...');

  // Enable WAL mode BEFORE transaction (cannot be changed inside transaction)
  await db.execAsync('PRAGMA journal_mode = WAL;');
  
  // Enable foreign key constraints
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Now run the schema migration inside a transaction
  await db.execAsync(`
    BEGIN TRANSACTION;
    
    ${CREATE_CONTEXT_TABLE}
    ${CREATE_INDICES}
    
    PRAGMA user_version = 1;
    
    COMMIT;
  `);

  console.log('[Migration] Successfully migrated to v1');
}

/**
 * Initialize database with migrations
 */
export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await migrateDatabase(db);
    return db;
  } catch (error) {
    console.error('[Database] Initialization failed:', error);
    throw error;
  }
}

export { DB_NAME };
