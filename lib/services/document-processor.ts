import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { validatePDF } from '@/lib/services/validation';
import { convertURLToMarkdown } from '@/lib/services/url-to-markdown';
import { getGeminiService } from '@/lib/services/gemini';
import type { DocumentSummary } from '@/lib/types/context';
import type { DocumentContextInput } from '@/lib/types/context';
import { ERROR_MESSAGES } from '@/constants/limits';

/**
 * Document processing orchestrator
 * Handles PDF upload and URL ingestion end-to-end
 * 
 * Note: For v1 MVP, we extract PDF as text. 
 * File API integration will be added in next iteration
 */

export type ProcessingResult = {
  contextInput: DocumentContextInput;
  summary: DocumentSummary;
};

/**
 * Extract text from PDF (simplified for MVP)
 * TODO: Implement proper Gemini File API integration
 */
async function extractPDFText(fileUri: string): Promise<string> {
  // For now, read as base64 using new API and add placeholder
  // In production, we'd use Gemini File API
  const file = new File(fileUri);
  const content = await file.base64();
  
  // Placeholder - in reality, Gemini File API will handle this
  return `[PDF Content - File API integration pending]\n\nNote: This is a simplified MVP. The PDF will be processed properly via Gemini File API in the next iteration.`;
}

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
    // Extract PDF text (simplified for MVP)
    const text = await extractPDFText(fileUri);

    // Generate summary
    const summary = await gemini.summarize(text);

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
    const gemini = getGeminiService();
    const summary = await gemini.summarize(markdown);

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

  const gemini = getGeminiService();
  return await gemini.answerQuestion(question, contextString);
}
