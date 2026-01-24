/**
 * MessageBubble Component
 * Individual chat message bubble with user/assistant styling
 */

import type { Message } from '@/lib/types/conversation';
import { Surface } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledText = withUniwind(Text);

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isVoice = message.type === 'voice';

  return (
    <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <View className={`${isUser ? 'max-w-[80%] items-end' : 'w-full items-start'}`}>
        
        {/* Message Bubble */}
        <Surface
          variant={isUser ? 'quaternary' : 'default'}
          className="rounded-2xl p-3"
        >
          {/* Voice indicator (optional)
          {isVoice && (
            <View className="flex-row items-center gap-1.5 mb-1.5">
              <ThemedIconVariants.Muted
                name="mic"
                size={12}
              />
              <StyledText className="text-xs text-foreground">
                {isUser ? 'You' : 'Agent'}
              </StyledText>
            </View>
          )} */}

          {/* Message Content */}
          <StyledText className="text-base text-foreground">
            {message.content}
          </StyledText>
        </Surface>

        {/* Timestamp */}
        <StyledText className="text-xs text-muted mt-1 px-1">
          {formatTimestamp(message.timestamp)}
        </StyledText>
      </View>
    </View>
  );
}

/**
 * Format duration in milliseconds to readable string
 * Example: 3500ms → "3s", 65000ms → "1m 5s"
 */
function formatDuration(durationMs: number): string {
  const seconds = Math.floor(durationMs / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

/**
 * Format timestamp to readable time
 * Example: "2:34 PM" or "Yesterday 2:34 PM"
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Same day
  if (messageDate.getTime() === today.getTime()) {
    return timeString;
  }

  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${timeString}`;
  }

  // Older - show date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
