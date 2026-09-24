import { uploadPDFToBackend, ingestURLToBackend, queryDocumentBackend, type BackendDocument } from '@/services/api-client';
import { getAgentService } from '@/services/agent';
import { validatePDF } from '@/services/validation';
import type { DocumentContextInput, DocumentSummary } from '@/types/context';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';

/**
 * Document processing orchestrator
 * Connects to the Azure AI Foundry Intelligence Backend
 */

export type ProcessingResult = {
  contextInput: DocumentContextInput;
  summary: DocumentSummary;
  spokenBriefing?: string;
  backendDocId?: string;
};

/**
 * Process PDF document via backend intelligence engine
 */
export async function processPDF(
  pickerResult: DocumentPicker.DocumentPickerResult
): Promise<ProcessingResult> {
  if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
    throw new Error('No file selected');
  }

  const asset = pickerResult.assets[0];
  const fileUri = asset.uri;

  // Validate PDF file exists and size
  const file = new File(fileUri);
  if (!file.exists) {
    throw new Error('File not found');
  }

  validatePDF({
    uri: fileUri,
    size: file.size,
    mimeType: 'application/pdf',
  });

  console.log('[DocumentProcessor] Uploading PDF to backend:', asset.name);

  try {
    const backendDoc: BackendDocument = await uploadPDFToBackend(
      fileUri,
      asset.name || 'document.pdf'
    );

    const keyPoints = backendDoc.key_takeaways.map((k) => 
      k.page ? `[Page ${k.page}] ${k.point}` : k.point
    );
    const definitions = backendDoc.definitions.map((d) => `${d.term}: ${d.definition}`);

    const contextInput: DocumentContextInput = {
      title: backendDoc.title || asset.name || 'PDF Document',
      source: 'pdf',
      source_uri: fileUri,
      overview: backendDoc.overview,
      key_points: keyPoints,
      definitions: definitions,
      backend_doc_id: backendDoc.id,
      spoken_briefing: backendDoc.spoken_briefing,
      page_count: backendDoc.page_count,
    };

    const summary: DocumentSummary = {
      title: backendDoc.title,
      overview: backendDoc.overview,
      key_points: keyPoints,
      definitions: definitions,
    };

    return {
      contextInput,
      summary,
      spokenBriefing: backendDoc.spoken_briefing,
      backendDocId: backendDoc.id,
    };
  } catch (error) {
    console.error('[DocumentProcessor] Backend PDF processing failed:', error);
    throw error;
  }
}

/**
 * Process URL via backend intelligence engine
 */
export async function processURL(url: string): Promise<ProcessingResult> {
  console.log('[DocumentProcessor] Ingesting URL via backend:', url);

  try {
    const backendDoc: BackendDocument = await ingestURLToBackend(url);

    const keyPoints = backendDoc.key_takeaways.map((k) => k.point);
    const definitions = backendDoc.definitions.map((d) => `${d.term}: ${d.definition}`);

    const contextInput: DocumentContextInput = {
      title: backendDoc.title || 'Web Page',
      source: 'url',
      source_uri: url,
      overview: backendDoc.overview,
      key_points: keyPoints,
      definitions: definitions,
      backend_doc_id: backendDoc.id,
      spoken_briefing: backendDoc.spoken_briefing,
      page_count: backendDoc.page_count,
    };

    const summary: DocumentSummary = {
      title: backendDoc.title,
      overview: backendDoc.overview,
      key_points: keyPoints,
      definitions: definitions,
    };

    return {
      contextInput,
      summary,
      spokenBriefing: backendDoc.spoken_briefing,
      backendDocId: backendDoc.id,
    };
  } catch (error) {
    console.error('[DocumentProcessor] Backend URL processing failed:', error);
    throw error;
  }
}

/**
 * Ask question with current context
 */
export async function askQuestion(
  question: string,
  contextString: string,
  docId?: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<{ answer: string; citation?: { page: number } }> {
  try {
    if (docId) {
      console.log('[DocumentProcessor] Querying backend engine for doc:', docId);
      return await queryDocumentBackend(docId, question, conversationHistory);
    }

    // Fallback to client agent if docId not present
    console.log('[DocumentProcessor] Querying fallback agent...');
    const agent = getAgentService();
    const answer = await agent.answerQuestion(question, contextString, conversationHistory);
    return { answer };
  } catch (error) {
    console.error('[DocumentProcessor] Q&A failed:', error);
    throw error;
  }
}
