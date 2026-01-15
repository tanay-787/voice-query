/**
 * CustomHeader Component
 * Displays app title and current document info in the header
 * Shows "Change Document" button when a document is loaded
 * 
 * @param documentContext - Document context from useDocumentContext hook (type inferred)
 * @param onChangeDocument - Callback to trigger document replacement flow
 */

import type { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { ThemedIcon } from './ThemedIcon';

const StyledText = withUniwind(Text);
const StyledIonicons = withUniwind(Ionicons);

interface CustomHeaderProps {
  // Type inferred from hook return type - follows pattern from test.tsx
  documentContext: ReturnType<typeof useDocumentContext>;
  // Callback when user wants to change/replace the current document
  onChangeDocument?: () => void;
}

export function CustomHeader({ documentContext, onChangeDocument }: CustomHeaderProps) {
  return (
    <View className="bg-background border-b border-border pt-safe-offset-3">
      <View className="px-4 pb-3 flex-row items-center justify-between gap-x-2">
        {/* Left: Title & Document Info */}
        <View className="flex-1">
          {documentContext.context && (
            <StyledText className="text-xl font-bold text-foreground" numberOfLines={1}>
              {documentContext.context.title}
            </StyledText>
          )}

          {documentContext.context && (
            <StyledText className="text-xs text-muted mt-1" numberOfLines={1}>
              {documentContext.context.createdAt.toLocaleDateString()} | {documentContext.context.updatedAt.toLocaleTimeString()}
            </StyledText>
          )}
        </View>

        {/* Right: Change Document Button (only when context exists) */}
        {documentContext.context && onChangeDocument && (
          <Button variant="ghost" isIconOnly onPress={onChangeDocument}>
            <ThemedIcon name="trash-bin-outline" size={20} themeColor='danger' />
          </Button>
        )}
      </View>
    </View>
  );
}
