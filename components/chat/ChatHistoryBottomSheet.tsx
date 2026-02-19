import { ThemedIcon } from '@/components/ThemedIcon';
import { BottomSheet, Button } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { ChatMessageList } from './ChatMessageList';

const StyledText = withUniwind(Text);
const StyledView = withUniwind(View);

interface ChatHistoryBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messages: any[];
  documentTitle?: string;
  onResetHistory: () => void;
}

export function ChatHistoryBottomSheet({ isOpen, onOpenChange, messages, documentTitle, onResetHistory }: ChatHistoryBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content keyboardBehavior="extend" enableContentPanningGesture={false}>
          <View className="mb-6 flex-row items-center justify-between">
            <BottomSheet.Title className="text-2xl font-bold">
              Conversation History
            </BottomSheet.Title>
            <Button
              isIconOnly
              variant="danger"
              size="sm"
              onPress={onResetHistory}
              className="ml-2"
              accessibilityLabel="Reset conversation history"
            >
              <ThemedIcon name="trash" themeColor="danger-foreground" />
            </Button>
          </View>
          <View className="gap-6 max-h-[60vh]">
            <ChatMessageList messages={messages} isLoading={false} />
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
