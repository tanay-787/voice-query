import * as SQLite from 'expo-sqlite';
import { CREATE_CONTEXT_TABLE, CREATE_INDICES, DB_NAME } from './schema';

/**
 * Database migration system
 * Handles version upgrades and schema changes
 */

export async function migrateDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  try {
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

    // Add future migrations here
    // if (currentVersion < 2) {
    //   await migrateToV2(db);
    // }

    console.log('[Migration] Database up to date');
  } catch (error) {
    console.error('[Migration] Failed:', error);
    throw error;
  }
}

/**
 * Migration to version 1 - initial schema
 */
async function migrateToV1(db: SQLite.SQLiteDatabase): Promise<void> {
  console.log('[Migration] Migrating to v1...');

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
