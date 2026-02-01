import { QA_SYSTEM_PROMPT, QA_USER_PROMPT, SUMMARIZATION_PROMPT } from '@/constants/agent-prompts';
import { ERROR_MESSAGES } from '@/constants/limits';
import { parseJSONSafely, validateDocumentSummary } from '@/services/validation';
import type { DocumentSummary } from '@/types/context';
import { GoogleGenAI, type Part } from '@google/genai';
import Constants from 'expo-constants';
import { File } from 'expo-file-system';

/**
 * Gemini AI Service
 * Handles summarization and Q&A using Google Gen AI SDK
 */

const API_KEY = Constants.expoConfig?.extra?.GOOGLE_GENERATIVE_AI_API_KEY || 
                process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
  console.warn('[Gemini] API key not found in config');
}

class GeminiService {
  private client: GoogleGenAI;
  private modelId: string = 'gemma-3-27b-it';

  constructor() {
    if (!API_KEY) {
      throw new Error('Google Gemini API key not configured');
    }
    this.client = new GoogleGenAI({ apiKey: API_KEY });
  }

  /**
   * Summarize content (text or PDF base64)
   */
  async summarize(content: string | Part): Promise<DocumentSummary> {
    try {
      console.log('[Gemini] Generating summary...');

      const promptPart: Part = { text: SUMMARIZATION_PROMPT };
      const contentPart: Part = typeof content === 'string' 
        ? { text: content } 
        : content;

      const response = await this.client.models.generateContent({
        model: this.modelId,
        contents: [
          {
            role: 'user',
            parts: [contentPart, promptPart],
          },
        ],
      });

      console.log('[Gemini] Summary generated');
      
      const responseText = response.text;
      if (!responseText) throw new Error('Empty response from Gemini');

      // Parse and validate JSON response
      // We still use parseJSONSafely in case the model wraps it in markdown blocks despite mimeType
      const summaryData = parseJSONSafely<DocumentSummary>(responseText, ERROR_MESSAGES.SUMMARY_FAILED);
      return validateDocumentSummary(summaryData as any);
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

      const response = await this.client.models.generateContent({
        model: this.modelId,
        contents: [
          {
            role: 'user',
            parts: [
              { text: QA_SYSTEM_PROMPT },
              { text: QA_USER_PROMPT(question, contextString) }
            ],
          },
        ],
      });

      console.log('[Gemini] Answer generated');
      const text = response.text;
      return text ? text.trim() : "I don't know.";
    } catch (error) {
      console.error('[Gemini] Q&A failed:', error);
      throw new Error('Failed to generate answer');
    }
  }

  /**
   * Transcribe audio to text (Speech-to-Text)
   */
  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      console.log('[Gemini] Transcribing audio...');

      // Read audio file as base64
      const audioFile = new File(audioUri);
      if (!audioFile.exists) {
        throw new Error('Audio file not found');
      }
      const audioBase64 = await audioFile.base64();

      const response = await this.client.models.generateContent({
        model: this.modelId,
        contents: [
          {
            role: 'user',
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
      });

      const transcription = response.text?.trim();
      if (!transcription) {
        throw new Error('No transcription from Gemini');
      }

      console.log('[Gemini] Transcription:', transcription);
      return transcription;
    } catch (error) {
      console.error('[Gemini] Transcription failed:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  /**
   * Convert text to speech (Text-to-Speech)
   * Placeholder remains as Gemini does not natively support TTS in this SDK yet (or we use a different endpoint)
   */
  async textToSpeech(text: string): Promise<string> {
    try {
      console.log('[Gemini] Text-to-Speech requested (placeholder)');
      // For now, return placeholder or throw
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
