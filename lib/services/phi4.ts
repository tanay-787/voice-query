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
          temperature: 0.7,
          max_tokens: 1000
        }
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      console.log('[Phi-4] Answer generated');
      const text = response.body.choices[0].message.content;
      return text ? text.trim() : "I don't know.";

    } catch (error) {
      console.error('[Phi-4] Q&A failed:', error);
      throw new Error('Failed to generate answer');
    }
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
