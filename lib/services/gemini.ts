import { ERROR_MESSAGES } from '@/constants/limits';
import { QA_SYSTEM_PROMPT, QA_USER_PROMPT, SUMMARIZATION_PROMPT } from '@/constants/prompts';
import { parseJSONSafely, validateDocumentSummary } from '@/lib/services/validation';
import type { DocumentSummary } from '@/lib/types/context';
import Constants from 'expo-constants';

/**
 * Gemini AI Service
 * Handles summarization and Q&A using direct API calls
 * 
 * Note: For v1, we'll use direct Gemini REST API for simplicity
 * File API requires different handling which we'll implement incrementally
 */

const API_KEY = Constants.expoConfig?.extra?.GOOGLE_GENERATIVE_AI_API_KEY || 
                process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
  console.warn('[Gemini] API key not found in config');
}

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';
const TIMEOUT_MS = 30000; // 30 seconds

class GeminiService {
  private model: string = 'gemini-2.5-flash';
  private apiKey: string;

  constructor() {
    if (!API_KEY) {
      throw new Error('Google Gemini API key not configured');
    }
    this.apiKey = API_KEY;
  }

  /**
   * Call Gemini API directly with timeout
   */
  private async callAPI(prompt: string): Promise<string> {
    const url = `${BASE_URL}/models/${this.model}:generateContent?key=${this.apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini');
      }

      const text = data.candidates[0].content.parts[0].text;
      return text;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Gemini API timeout. Please try again.');
      }
      
      throw error;
    }
  }

  /**
   * Summarize text content (for now, both PDF and URL will be text)
   * TODO: Implement File API for PDF upload in next iteration
   */
  async summarize(text: string): Promise<DocumentSummary> {
    try {
      console.log('[Gemini] Generating summary...');

      const prompt = `${text}\n\n${SUMMARIZATION_PROMPT}`;
      const responseText = await this.callAPI(prompt);

      console.log('[Gemini] Summary generated');

      // Parse and validate JSON response
      const summaryData = parseJSONSafely(responseText.trim(), ERROR_MESSAGES.SUMMARY_FAILED);
      return validateDocumentSummary(summaryData);
    } catch (error) {
      console.error('[Gemini] Summarization failed:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.SUMMARY_FAILED);
    }
  }

  /**
   * Answer question based on context
   */
  async answerQuestion(question: string, contextString: string): Promise<string> {
    try {
      console.log('[Gemini] Answering question...');

      const prompt = `${QA_SYSTEM_PROMPT}\n\n${QA_USER_PROMPT(question, contextString)}`;
      const answer = await this.callAPI(prompt);

      console.log('[Gemini] Answer generated');
      return answer.trim();
    } catch (error) {
      console.error('[Gemini] Q&A failed:', error);
      throw new Error('Failed to generate answer');
    }
  }

  /**
   * Transcribe audio to text (Speech-to-Text)
   * Uses Gemini's multimodal capabilities
   */
  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      console.log('[Gemini] Transcribing audio...');

      // Read audio file as base64 using new expo-file-system API
      const { File } = await import('expo-file-system');
      const audioFile = new File(audioUri);
      const audioBase64 = await audioFile.base64();

      // Call Gemini with audio data
      const url = `${BASE_URL}/models/${this.model}:generateContent?key=${this.apiKey}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: 'audio/wav',
                    data: audioBase64,
                  },
                },
                {
                  text: 'Transcribe this audio to text. Return only the transcription, nothing else.',
                },
              ],
            },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No transcription from Gemini');
      }

      const transcription = data.candidates[0].content.parts[0].text.trim();
      console.log('[Gemini] Transcription:', transcription);

      return transcription;
    } catch (error) {
      console.error('[Gemini] Transcription failed:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Transcription timeout. Please try again.');
      }
      
      throw new Error('Failed to transcribe audio');
    }
  }

  /**
   * Convert text to speech (Text-to-Speech)
   * Note: Gemini doesn't have native TTS, so we'll use a placeholder
   * In production, use Google Cloud TTS or another service
   */
  async textToSpeech(text: string): Promise<string> {
    try {
      console.log('[Gemini] Text-to-Speech requested for:', text.substring(0, 50));
      
      // TODO: Implement actual TTS service
      // Options:
      // 1. Google Cloud Text-to-Speech API
      // 2. expo-speech (on-device TTS)
      // 3. Third-party TTS service
      
      // For now, return placeholder
      console.warn('[Gemini] TTS not yet implemented - using placeholder');
      throw new Error('TTS not yet implemented');
    } catch (error) {
      console.error('[Gemini] TTS failed:', error);
      throw error;
    }
  }
}

// Singleton instance
let geminiInstance: GeminiService | null = null;

export function getGeminiService(): GeminiService {
  if (!geminiInstance) {
    geminiInstance = new GeminiService();
  }
  return geminiInstance;
}

export { GeminiService };
