import { ERROR_MESSAGES } from '@/constants/limits';
import { QA_SYSTEM_PROMPT, QA_USER_PROMPT, SUMMARIZATION_PROMPT } from '@/constants/prompts';
import { parseJSONSafely, validateDocumentSummary } from '@/lib/services/validation';
import type { DocumentSummary } from '@/lib/types/context';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import Constants from 'expo-constants';

/**
 * Phi-4 Multimodal Service
 * Handles summarization and Q&A using Microsoft Phi-4-multimodal-instruct via GitHub Models
 */

// Use GITHUB_TOKEN from env/config
const TOKEN = Constants.expoConfig?.extra?.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const ENDPOINT = "https://models.github.ai/inference";
const MODEL_NAME = "microsoft/Phi-4-multimodal-instruct";

if (!TOKEN) {
  console.warn('[Phi-4] GITHUB_TOKEN not configured');
}

class Phi4Service {
  private client: any; // Type as any for now due to @azure-rest/ai-inference dynamic nature

  constructor() {
    if (!TOKEN) {
      throw new Error('GitHub Token not configured for Phi-4');
    }
    this.client = ModelClient(
      ENDPOINT,
      new AzureKeyCredential(TOKEN)
    );
  }

  /**
   * Summarize content (text)
   * Note: For complex documents/images, we would pass image content types.
   * Currently assumes text input similar to existing Gemini implementation.
   */
  async summarize(content: string): Promise<DocumentSummary> {
    try {
      console.log('[Phi-4] Generating summary...');

      const response = await this.client.path("/chat/completions").post({
        body: {
          messages: [
            { 
              role: "user", 
              content: `${SUMMARIZATION_PROMPT}\n\nContent to summarize:\n${content}` 
            }
          ],
          model: MODEL_NAME,
          temperature: 0.7,
          max_tokens: 2000 
        }
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      console.log('[Phi-4] Summary generated');
      const responseText = response.body.choices[0].message.content;

      if (!responseText) throw new Error('Empty response from Phi-4');

      const summaryData = parseJSONSafely(responseText, ERROR_MESSAGES.SUMMARY_FAILED);
      return validateDocumentSummary(summaryData);

    } catch (error) {
      console.error('[Phi-4] Summarization failed:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.SUMMARY_FAILED);
    }
  }

  /**
   * Answer question based on context
   */
  async answerQuestion(question: string, contextString: string): Promise<string> {
    try {
      console.log('[Phi-4] Answering question...');

      const response = await this.client.path("/chat/completions").post({
        body: {
          messages: [
            { 
              role: "system", 
              content: QA_SYSTEM_PROMPT 
            },
            { 
              role: "user", 
              content: QA_USER_PROMPT(question, contextString)
            }
          ],
          model: MODEL_NAME,
          temperature: 0.3, // Lower temperature to reduce hallucinations
          max_tokens: 100,  // STRICT limit for conversational brevity (~60-80 words)
          top_p: 0.9,       // Nucleus sampling for better quality
        }
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const rawText = response.body.choices[0].message.content;
      if (!rawText) {
        return "I don't know.";
      }

      const answer = rawText.trim();
      
      // Validate answer quality (detect hallucinations/gibberish)
      if (!this.isValidAnswer(answer)) {
        console.warn('[Phi-4] Invalid answer detected (possible hallucination):', answer.substring(0, 100));
        return "I couldn't generate a proper answer. Please try rephrasing your question.";
      }

      console.log('[Phi-4] Answer generated:', answer.substring(0, 100));
      return answer;

    } catch (error) {
      console.error('[Phi-4] Q&A failed:', error);
      throw new Error('Failed to generate answer');
    }
  }

  /**
   * Validate answer quality to detect hallucinations/gibberish
   */
  private isValidAnswer(text: string): boolean {
    // Check 1: Too short or too long
    if (text.length < 10 || text.length > 2000) {
      return false;
    }

    // Check 2: Detect excessive repetition (hallucination sign)
    const words = text.split(/\s+/);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const repetitionRatio = uniqueWords.size / words.length;
    if (repetitionRatio < 0.3) { // More than 70% repetition
      return false;
    }

    // Check 3: Detect random character sequences (gibberish)
    // Count ratio of alphabetic characters to total
    const alphaCount = (text.match(/[a-zA-Z]/g) || []).length;
    const alphaRatio = alphaCount / text.length;
    if (alphaRatio < 0.5) { // Less than 50% alphabetic chars
      return false;
    }

    // Check 4: Detect excessive special characters (malformed output)
    const specialCharCount = (text.match(/[^a-zA-Z0-9\s.,!?'"()-]/g) || []).length;
    const specialCharRatio = specialCharCount / text.length;
    if (specialCharRatio > 0.3) { // More than 30% special chars
      return false;
    }

    return true;
  }
}

// Singleton instance
let phi4Instance: Phi4Service | null = null;

export function getPhi4Service(): Phi4Service {
  if (!phi4Instance) {
    phi4Instance = new Phi4Service();
  }
  return phi4Instance;
}

export { Phi4Service };
