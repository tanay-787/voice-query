import { getDatabase } from "./index";

export interface DocumentRow {
  id: string;
  name: string;
  uri: string;
  size: number | null;
  page_count: number;
  current_page: number;
  created_at: number;
  last_opened_at: number;
  server_doc_id: string | null;
  sync_status: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  uri: string;
  size?: number;
  pageCount: number;
  currentPage: number;
  createdAt: number;
  lastOpenedAt: number;
  serverDocId?: string;
  syncStatus?: "local" | "syncing" | "synced" | "error";
}

function mapRowToDocument(row: DocumentRow): DocumentItem {
  return {
    id: row.id,
    name: row.name,
    uri: row.uri,
    size: row.size ?? undefined,
    pageCount: row.page_count,
    currentPage: row.current_page,
    createdAt: row.created_at,
    lastOpenedAt: row.last_opened_at,
    serverDocId: row.server_doc_id ?? undefined,
    syncStatus: (row.sync_status as DocumentItem["syncStatus"]) ?? "local",
  };
}

export async function getAllDocuments(): Promise<DocumentItem[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<DocumentRow>(
    "SELECT * FROM documents ORDER BY last_opened_at DESC;"
  );
  return rows.map(mapRowToDocument);
}

export async function insertDocument(doc: DocumentItem): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO documents (
      id, name, uri, size, page_count, current_page, created_at, last_opened_at, server_doc_id, sync_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    doc.id,
    doc.name,
    doc.uri,
    doc.size ?? null,
    doc.pageCount,
    doc.currentPage,
    doc.createdAt,
    doc.lastOpenedAt,
    doc.serverDocId ?? null,
    doc.syncStatus ?? "local"
  );
}

export async function updateDocumentProgress(
  id: string,
  page: number,
  totalPages?: number
): Promise<void> {
  const db = await getDatabase();
  if (totalPages !== undefined && totalPages > 0) {
    await db.runAsync(
      "UPDATE documents SET current_page = ?, page_count = ? WHERE id = ?;",
      page,
      totalPages,
      id
    );
  } else {
    await db.runAsync(
      "UPDATE documents SET current_page = ? WHERE id = ?;",
      page,
      id
    );
  }
}

export async function updateDocumentLastOpened(
  id: string,
  timestamp: number
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    "UPDATE documents SET last_opened_at = ? WHERE id = ?;",
    timestamp,
    id
  );
}

export async function deleteDocumentRecord(id: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM documents WHERE id = ?;", id);
}

export async function getActiveDocId(): Promise<string | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM app_meta WHERE key = 'active_doc_id';"
  );
  return row?.value ?? null;
}

export async function setActiveDocId(id: string | null): Promise<void> {
  const db = await getDatabase();
  if (id === null) {
    await db.runAsync("DELETE FROM app_meta WHERE key = 'active_doc_id';");
  } else {
    await db.runAsync(
      "INSERT OR REPLACE INTO app_meta (key, value) VALUES ('active_doc_id', ?);",
      id
    );
  }
}
