/**
 * ChatMessageList Component
 * Scrollable list of chat messages with auto-scroll to latest
 */

import React, { useEffect, useRef } from 'react';
import { FlatList, Text, View, type ListRenderItem } from 'react-native';
import { withUniwind } from 'uniwind';
import { MessageBubble } from './MessageBubble';
import type { Message } from '@/lib/types/conversation';

const StyledText = withUniwind(Text);

interface ChatMessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure layout is complete
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <MessageBubble message={item} />
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center p-8">
      <StyledText className="text-center text-muted text-base">
        Start a conversation by asking a question about your document
      </StyledText>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    
    return (
      <View className="flex-row items-center gap-2 mb-3 ml-3">
        <View className="w-2 h-2 rounded-full bg-muted animate-pulse" />
        <View className="w-2 h-2 rounded-full bg-muted animate-pulse delay-100" />
        <View className="w-2 h-2 rounded-full bg-muted animate-pulse delay-200" />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
      contentContainerClassName="p-4"
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
}
