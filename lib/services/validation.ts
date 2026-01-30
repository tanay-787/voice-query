import {
  documentSummarySchema,
  markdownContentSchema,
  pdfFileSchema,
  urlSchema,
  type DocumentSummaryInput,
  type MarkdownContent,
  type PDFFileInput,
  type URLInput,
} from '@/constants';
import { ERROR_MESSAGES } from '@/lib/constants/limits';
import type { DocumentSummary } from '@/lib/types/context';

/**
 * Validation service
 * Provides validation functions with clear error messages
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Validate PDF file
 */
export function validatePDF(file: PDFFileInput): void {
  const result = pdfFileSchema.safeParse(file);

  if (!result.success) {
    const error = result.error.issues[0];
    throw new ValidationError(error.message || ERROR_MESSAGES.PDF_TOO_LARGE);
  }
}

/**
 * Validate URL
 */
export function validateURL(url: URLInput): void {
  const result = urlSchema.safeParse(url);

  if (!result.success) {
    throw new ValidationError(ERROR_MESSAGES.URL_INVALID);
  }
}

/**
 * Validate markdown content length
 */
export function validateMarkdownContent(content: MarkdownContent): void {
  const result = markdownContentSchema.safeParse(content);

  if (!result.success) {
    throw new ValidationError(ERROR_MESSAGES.URL_TOO_LARGE);
  }
}

/**
 * Validate and parse document summary from AI
 */
export function validateDocumentSummary(
  data: DocumentSummaryInput
): DocumentSummary {
  const result = documentSummarySchema.safeParse(data);

  if (!result.success) {
    console.error('[Validation] Invalid summary:', result.error);
    throw new ValidationError('Invalid summary format from AI');
  }

  return result.data;
}

/**
 * Parse JSON safely with validation
 * Handles markdown-wrapped JSON from LLMs
 */
export function parseJSONSafely<T>(
  jsonString: string,
  errorMessage: string = 'Invalid JSON'
): T {
  try {
    // Remove markdown code blocks if present
    let cleanedString = jsonString.trim();
    
    // Check for markdown-wrapped JSON
    const markdownJsonMatch = cleanedString.match(/```json\s*([\s\S]*?)\s*```/);
    if (markdownJsonMatch) {
      cleanedString = markdownJsonMatch[1].trim();
    }
    
    // Also handle plain ``` blocks
    const plainBlockMatch = cleanedString.match(/```\s*([\s\S]*?)\s*```/);
    if (plainBlockMatch && cleanedString.startsWith('```')) {
      cleanedString = plainBlockMatch[1].trim();
    }
    
    return JSON.parse(cleanedString);
  } catch (error) {
    console.error('[Validation] JSON parse failed:', error);
    console.error('[Validation] Original string:', jsonString);
    throw new ValidationError(errorMessage);
  }
}
