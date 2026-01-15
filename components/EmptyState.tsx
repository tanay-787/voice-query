/**
 * EmptyState Component
 * Displays when no document is loaded
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { withUniwind } from 'uniwind';

const StyledText = withUniwind(Text);

export function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center py-12">
      <Card variant="secondary" className="w-full max-w-md">
        <Card.Body className="items-center p-8 gap-3">
          <StyledText className="text-6xl">📚</StyledText>
          <Card.Title className="text-center">No Document Loaded</Card.Title>
          <Card.Description className="text-center">
            Upload a PDF or enter a URL to start chatting with your document
          </Card.Description>
        </Card.Body>
      </Card>
    </View>
  );
}
