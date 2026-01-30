import { LIMITS } from '@/constants';
import { z } from 'zod';

/**
 * Validation schemas using Zod
 */

export const pdfFileSchema = z.object({
  uri: z.string(),
  size: z.number().max(
    LIMITS.PDF_MAX_FILE_SIZE_BYTES,
    `PDF must be under ${LIMITS.PDF_MAX_FILE_SIZE_MB}MB`
  ),
  mimeType: z.string().refine(
    (type) => type === 'application/pdf',
    'File must be a PDF'
  ),
});

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .refine(
    (url) => url.startsWith('http://') || url.startsWith('https://'),
    'URL must start with http:// or https://'
  );

export const markdownContentSchema = z
  .string()
  .max(LIMITS.URL_MAX_CHARS, 'Webpage content is too large for v1');

export const documentSummarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  overview: z.string().min(1, 'Overview is required'),
  key_points: z.array(z.string()).min(1, 'At least one key point required'),
  definitions: z.array(z.string()),
});

export type PDFFileInput = z.infer<typeof pdfFileSchema>;
export type URLInput = z.infer<typeof urlSchema>;
export type MarkdownContent = z.infer<typeof markdownContentSchema>;
export type DocumentSummaryInput = z.infer<typeof documentSummarySchema>;