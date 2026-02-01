import { QA_SYSTEM_PROMPT, QA_SYSTEM_PROMPT_FOLLOWUP, QA_USER_PROMPT, QA_USER_PROMPT_FOLLOWUP, SUMMARIZATION_PROMPT } from '@/constants/agent-prompts';
import { ERROR_MESSAGES } from '@/constants/limits';
import { parseJSONSafely, validateDocumentSummary } from '@/services/validation';
import type { DocumentSummary } from '@/types/context';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import Constants from 'expo-constants';

/**
 * Agent Multimodal Service
 * Handles summarization and Q&A using Microsoft Agent-multimodal-instruct via GitHub Models
 */

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Use GITHUB_TOKEN from env/config
const TOKEN = Constants.expoConfig?.extra?.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const ENDPOINT = "https://models.github.ai/inference";
const MODEL_NAME = "mistral-ai/Ministral-3B";

if (!TOKEN) {
  console.warn('[Agent] GITHUB_TOKEN not configured');
}

class AgentService {
  private client: ReturnType<typeof ModelClient>;

  constructor() {
    if (!TOKEN) {
      throw new Error('GitHub Token not configured for Agent');
    }
    this.client = ModelClient(
      ENDPOINT,
      new AzureKeyCredential(TOKEN)
    );
  }

  /**
   * Summarize content (text)
   */
  async summarize(content: string): Promise<DocumentSummary> {
    try {
      console.log('[Agent] Generating summary...');

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
        throw new Error((response.body as { error?: { message: string } }).error?.message || 'Unexpected response from agent');
      }

      console.log('[Agent] Summary generated');
      const responseText = (response.body as { choices: Array<{ message: { content: string } }> }).choices[0].message.content;

      if (!responseText) throw new Error('Empty response from Agent');

      const summaryData = parseJSONSafely<DocumentSummary>(responseText, ERROR_MESSAGES.SUMMARY_FAILED);
      return validateDocumentSummary(summaryData as any);

    } catch (error) {
      console.error('[Agent] Summarization failed:', error);
      throw error instanceof Error ? error : new Error(ERROR_MESSAGES.SUMMARY_FAILED);
    }
  }

  /**
   * Answer question based on context
   */
  async answerQuestion(
    question: string,
    contextString: string,
    conversationHistory?: ConversationMessage[]
  ): Promise<string> {
    try {
      console.log('[Agent] Answering question...');
      console.log('[Agent] Question:', question);
      console.log('[Agent] Context length:', contextString?.length || 0, 'chars');
      console.log('[Agent] Conversation history:', conversationHistory?.length || 0, 'messages');

      // Check if this is a repetition request
      if (conversationHistory && conversationHistory.length > 0 && this.isRepetitionRequest(question)) {
        const lastResponse = this.getLastAssistantResponse(conversationHistory);
        if (lastResponse) {
          console.log('[Agent] Detected repetition request, returning previous response');
          return lastResponse;
        }
      }

      // Build messages array with conversation history
      const messages: Array<{ role: string; content: string }> = [
        { 
          role: "system", 
          content: conversationHistory && conversationHistory.length > 0 
            ? QA_SYSTEM_PROMPT_FOLLOWUP 
            : QA_SYSTEM_PROMPT
        }
      ];

      // Add previous conversation history if available
      if (conversationHistory && conversationHistory.length > 0) {
        messages.push(...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        })));
      }

      // Add current question with appropriate prompt
      const userPromptContent = conversationHistory && conversationHistory.length > 0
        ? QA_USER_PROMPT_FOLLOWUP(question, contextString)
        : QA_USER_PROMPT(question, contextString);

      messages.push({
        role: "user",
        content: userPromptContent
      });

      const response = await this.client.path("/chat/completions").post({
        body: {
          messages,
          model: MODEL_NAME,
          temperature: 0.3,
          max_tokens: 100,
          top_p: 0.9,
        }
      });

      if (isUnexpected(response)) {
        throw new Error((response.body as { error?: { message: string } }).error?.message || 'Unexpected response from agent');
      }

      const rawText = (response.body as { choices: Array<{ message: { content: string } }> }).choices[0].message.content;
      if (!rawText) {
        return "I don't know.";
      }

      const answer = rawText.trim();
      
      // Validate answer quality (detect hallucinations/gibberish)
      if (!this.isValidAnswer(answer)) {
        console.warn('[Agent] Invalid answer detected (possible hallucination):', answer.substring(0, 100));
        return "I couldn't generate a proper answer. Please try rephrasing your question.";
      }

      console.log('[Agent] Answer generated:', answer.substring(0, 100));
      return answer;

    } catch (error) {
      console.error('[Agent] Q&A failed:', error);
      throw new Error('Failed to generate answer');
    }
  }

  /**
   * Check if question is asking for repetition
   */
  private isRepetitionRequest(question: string): boolean {
    const repetitionKeywords = [
      'repeat', 'say again', 'say that again', 'what did you say',
      'can you repeat', 'repeat that', 'say it again', 'come again',
      'pardon', 'sorry', 'didn\'t catch', 'clarify',
      'explain that more', 'tell me again'
    ];
    const lowerQuestion = question.toLowerCase();
    return repetitionKeywords.some(keyword => lowerQuestion.includes(keyword));
  }

  /**
   * Get last assistant response from conversation history
   */
  private getLastAssistantResponse(conversationHistory: ConversationMessage[]): string | null {
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
      if (conversationHistory[i].role === 'assistant') {
        return conversationHistory[i].content;
      }
    }
    return null;
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
let agentInstance: AgentService | null = null;

export function getAgentService(): AgentService {
  if (!agentInstance) {
    agentInstance = new AgentService();
  }
  return agentInstance;
}

export { AgentService };
