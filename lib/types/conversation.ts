/**
 * Type definitions for conversation messages
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'voice' | 'text';
  timestamp: number; // Unix timestamp (milliseconds)
  duration?: number; // Voice message duration in milliseconds
}

export type ConversationState = {
  messages: Message[];
  documentId?: string; // Tie messages to specific document context
};

/**
 * Helper to create a new message
 */
export function createMessage(
  role: 'user' | 'assistant',
  content: string,
  type: 'voice' | 'text',
  duration?: number
): Message {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role,
    content,
    type,
    timestamp: Date.now(),
    duration,
  };
}
