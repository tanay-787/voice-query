/**
 * ChatInput Component
 * Message input field with send button
 */

import { Button, TextField } from 'heroui-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

interface ChatInputProps {
  onSend?: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="flex-row gap-2 items-end">
      <View className="flex-1">
        <TextField>
          <TextField.Input
            placeholder="Ask a question..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={1}
          />
        </TextField>
      </View>
      <Button
        variant="primary"
        size="md"
        isIconOnly
        onPress={handleSend}
        isDisabled={!message.trim()}
      >
        <ThemedIcon name="send" size={20} themeColor="accent-foreground" />
      </Button>
    </View>
  );
}
