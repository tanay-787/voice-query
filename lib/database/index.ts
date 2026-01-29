/**
 * Database barrel export
 * SQLite database layer and context management
 */

export { migrateDatabase, initDatabase, DB_NAME } from './migrations';
export { 
  getContext, 
  saveContext, 
  deleteContext, 
  hasContext, 
  formatContextForPrompt 
} from './context-store';
export * from './schema';
