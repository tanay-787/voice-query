import { create } from "zustand";
import { Paths, Directory, File } from "expo-file-system";
import {
  type DocumentItem,
  getAllDocuments,
  insertDocument,
  updateDocumentProgress as repoUpdateProgress,
  updateDocumentLastOpened,
  updateDocumentSyncStatus,
  deleteDocumentRecord,
  getActiveDocId,
  setActiveDocId,
} from "@/db/document-repository";
import { uploadPdfDocument } from "@/services/api";

export type { DocumentItem };

interface ImportAssetInput {
  uri: string;
  name: string;
  size?: number;
}

interface DocumentStore {
  documents: DocumentItem[];
  activeDocId: string | null;
  isInitialized: boolean;
  isImporting: boolean;

  // Actions
  initialize: () => Promise<void>;
  importDocument: (asset: ImportAssetInput) => Promise<DocumentItem>;
  syncDocument: (id: string) => Promise<void>;
  selectDocument: (id: string) => void;
  updatePageProgress: (id: string, page: number, totalPages?: number) => void;
  deleteDocument: (id: string) => Promise<void>;
  getActiveDoc: () => DocumentItem | null;
}

let initPromise: Promise<void> | null = null;

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  activeDocId: null,
  isInitialized: false,
  isImporting: false,

  initialize: async () => {
    if (get().isInitialized) return;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      try {
        const storedDocs = await getAllDocuments();
        const storedActiveId = await getActiveDocId();

        let resolvedActiveId: string | null = null;
        if (storedActiveId && storedDocs.some((d) => d.id === storedActiveId)) {
          resolvedActiveId = storedActiveId;
        } else if (storedDocs.length > 0) {
          resolvedActiveId = storedDocs[0].id;
        }

        set({
          documents: storedDocs,
          activeDocId: resolvedActiveId,
          isInitialized: true,
        });
      } catch (error) {
        console.warn("[DocumentStore] Failed to initialize from SQLite:", error);
        set({ isInitialized: true });
      } finally {
        initPromise = null;
      }
    })();

    return initPromise;
  },

  importDocument: async (asset: ImportAssetInput) => {
    set({ isImporting: true });
    try {
      // 1. Ensure sandboxed 'documents' directory exists using the new File System API
      const docsDir = new Directory(Paths.document, "documents");
      if (!docsDir.exists) {
        docsDir.create({ intermediates: true, idempotent: true });
      }

      const id = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const targetFile = new File(docsDir, `${id}.pdf`);
      const sourceFile = new File(asset.uri);

      // 2. Copy the file into app sandbox
      await sourceFile.copy(targetFile);

      const now = Date.now();
      const newDoc: DocumentItem = {
        id,
        name: asset.name,
        uri: targetFile.uri,
        size: asset.size,
        pageCount: 1,
        currentPage: 1,
        createdAt: now,
        lastOpenedAt: now,
        syncStatus: "syncing",
      };

      // 3. Persist to SQLite
      await insertDocument(newDoc);
      await setActiveDocId(newDoc.id);

      // 4. Update Zustand reactive state
      set((state) => ({
        documents: [newDoc, ...state.documents.filter((d) => d.id !== id)],
        activeDocId: newDoc.id,
        isImporting: false,
      }));

      // 5. Asynchronously sync to backend in background (non-blocking)
      get()
        .syncDocument(newDoc.id)
        .catch((err) => {
          console.warn("[DocumentStore] Background sync failed:", err);
        });

      return newDoc;
    } catch (error) {
      set({ isImporting: false });
      throw error;
    }
  },

  syncDocument: async (id: string) => {
    const doc = get().documents.find((d) => d.id === id);
    if (!doc || doc.syncStatus === "synced") return;

    set((state) => ({
      documents: state.documents.map((d) =>
        d.id === id ? { ...d, syncStatus: "syncing" } : d
      ),
    }));

    try {
      const response = await uploadPdfDocument(doc.uri, doc.id);
      const serverDocId = response.document.id;
      const serverPageCount = response.document.page_count;

      await updateDocumentSyncStatus(id, "synced", serverDocId);
      if (serverPageCount && serverPageCount > 0) {
        await repoUpdateProgress(id, doc.currentPage, serverPageCount);
      }

      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === id
            ? {
                ...d,
                serverDocId,
                pageCount: serverPageCount || d.pageCount,
                syncStatus: "synced",
              }
            : d
        ),
      }));
    } catch (error) {
      console.warn(`[DocumentStore] Sync failed for doc ${id}:`, error);
      await updateDocumentSyncStatus(id, "error");
      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === id ? { ...d, syncStatus: "error" } : d
        ),
      }));
    }
  },

  selectDocument: (id: string) => {
    const now = Date.now();
    set((state) => ({
      activeDocId: id,
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, lastOpenedAt: now } : doc
      ),
    }));

    // Async persist to SQLite
    updateDocumentLastOpened(id, now).catch((err) =>
      console.warn("[DocumentStore] Failed to persist last opened:", err)
    );
    setActiveDocId(id).catch((err) =>
      console.warn("[DocumentStore] Failed to persist activeDocId:", err)
    );
  },

  updatePageProgress: (id: string, page: number, totalPages?: number) => {
    set((state) => ({
      documents: state.documents.map((doc) => {
        if (doc.id !== id) return doc;
        return {
          ...doc,
          currentPage: page,
          pageCount:
            totalPages !== undefined && totalPages > 0
              ? totalPages
              : doc.pageCount,
        };
      }),
    }));

    // Async persist to SQLite
    repoUpdateProgress(id, page, totalPages).catch((err) =>
      console.warn("[DocumentStore] Failed to persist progress:", err)
    );
  },

  deleteDocument: async (id: string) => {
    const docToDelete = get().documents.find((d) => d.id === id);
    if (docToDelete) {
      try {
        const fileToDelete = new File(docToDelete.uri);
        if (fileToDelete.exists) {
          fileToDelete.delete();
        }
      } catch (err) {
        console.warn("[DocumentStore] Failed to remove file from disk:", err);
      }
    }

    // Delete record from SQLite
    try {
      await deleteDocumentRecord(id);
    } catch (err) {
      console.warn("[DocumentStore] Failed to delete record from SQLite:", err);
    }

    const remainingDocs = get().documents.filter((d) => d.id !== id);
    let nextActiveId = get().activeDocId;

    if (get().activeDocId === id) {
      nextActiveId = remainingDocs.length > 0 ? remainingDocs[0].id : null;
      await setActiveDocId(nextActiveId).catch((err) =>
        console.warn("[DocumentStore] Failed to persist activeDocId after delete:", err)
      );
    }

    set({
      documents: remainingDocs,
      activeDocId: nextActiveId,
    });
  },

  getActiveDoc: () => {
    const { documents, activeDocId } = get();
    if (!activeDocId) {
      return documents.length > 0 ? documents[0] : null;
    }
    return documents.find((doc) => doc.id === activeDocId) ?? null;
  },
}));
