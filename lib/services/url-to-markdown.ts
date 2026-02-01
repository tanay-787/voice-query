import { ERROR_MESSAGES } from '@/constants/limits';
import { validateMarkdownContent, validateURL } from '@/services/validation';
import type { URLToMarkdownResponse } from '@/types/api';

/**
 * URL to Markdown conversion service
 * Uses urltoany.com API
 */

const API_URL = 'https://www.urltoany.com/api/function/to-markdown';
const TIMEOUT_MS = 30000; // 30 seconds

export async function convertURLToMarkdown(url: string): Promise<URLToMarkdownResponse> {
  // Validate URL first
  validateURL(url);

  try {
    console.log('[URLToMarkdown] Converting:', url);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.markdown) {
      throw new Error('No markdown content in response');
    }

    // Validate content length
    validateMarkdownContent(data.markdown);

    console.log('[URLToMarkdown] Conversion successful');

    return {
      markdown: data.markdown,
      title: data.title || extractTitleFromURL(url),
      url,
    };
  } catch (error) {
    console.error('[URLToMarkdown] Conversion failed:', error);

    if (error instanceof Error) {
      // Handle timeout
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Re-throw validation errors
      if (error.name === 'ValidationError') {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
}

/**
 * Extract a basic title from URL as fallback
 */
function extractTitleFromURL(url: string): string {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const lastSegment = path.split('/').filter(Boolean).pop();
    return lastSegment
      ? lastSegment.replace(/[-_]/g, ' ').replace(/\.\w+$/, '')
      : urlObj.hostname;
  } catch {
    return 'Web Page';
  }
}
