import { ERROR_MESSAGES } from '@/constants/limits';
import { getAgentService } from '@/services/agent';
import { getGeminiService } from '@/services/gemini';
import { convertURLToMarkdown } from '@/services/url-to-markdown';
import { validatePDF } from '@/services/validation';
import type { DocumentContextInput, DocumentSummary } from '@/types/context';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';

/**
 * Document processing orchestrator
 * Handles PDF upload and URL ingestion end-to-end
 */

export type ProcessingResult = {
  contextInput: DocumentContextInput;
  summary: DocumentSummary;
};

/**
 * Process PDF document
 */
export async function processPDF(
  pickerResult: DocumentPicker.DocumentPickerResult
): Promise<ProcessingResult> {
  if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
    throw new Error('No file selected');
  }

  const asset = pickerResult.assets[0];
  const fileUri = asset.uri;

  // Get file info for validation using new API
  const file = new File(fileUri);
  
  if (!file.exists) {
    throw new Error('File not found');
  }

  // Validate PDF
  validatePDF({
    uri: fileUri,
    size: file.size,
    mimeType: 'application/pdf',
  });

  console.log('[DocumentProcessor] Processing PDF:', asset.name);

  const gemini = getGeminiService();

  try {
    // Read PDF as base64
    const pdfBase64 = await file.base64();

    // Generate summary using Gemini with inline PDF data
    // This is more efficient and accurate than text extraction
    const summary = await gemini.summarize({
      inlineData: {
        mimeType: 'application/pdf',
        data: pdfBase64
      }
    });

    const contextInput: DocumentContextInput = {
      title: summary.title || asset.name || 'PDF Document',
      source: 'pdf',
      source_uri: fileUri,
      overview: summary.overview,
      key_points: summary.key_points,
      definitions: summary.definitions,
    };

    return { contextInput, summary };
  } catch (error) {
    console.error('[DocumentProcessor] PDF processing failed:', error);
    throw error;
  }
}

/**
 * Process URL
 */
export async function processURL(url: string): Promise<ProcessingResult> {
  console.log('[DocumentProcessor] Processing URL:', url);

  try {
    // Convert URL to Markdown
    const { markdown, title: urlTitle } = await convertURLToMarkdown(url);

    // Generate summary from markdown
    const agent = getAgentService();
    const summary = await agent.summarize(markdown);

    const contextInput: DocumentContextInput = {
      title: summary.title || urlTitle || 'Web Page',
      source: 'url',
      source_uri: url,
      overview: summary.overview,
      key_points: summary.key_points,
      definitions: summary.definitions,
    };

    return { contextInput, summary };
  } catch (error) {
    console.error('[DocumentProcessor] URL processing failed:', error);
    throw error;
  }
}

/**
 * Ask question with current context
 */
export async function askQuestion(
  question: string,
  contextString: string
): Promise<string> {
  if (!contextString) {
    throw new Error(ERROR_MESSAGES.NO_CONTEXT);
  }

  const agent = getAgentService();
  return await agent.answerQuestion(question, contextString);
}
