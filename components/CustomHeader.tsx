/**
 * CustomHeader Component
 * Displays app title and current document info in the header
 */

import React from 'react';
import { View, Text } from 'react-native';
import { withUniwind } from 'uniwind';
import type { DocumentContextContract } from '@/lib/types/ui-contracts';

const StyledText = withUniwind(Text);

interface CustomHeaderProps {
  documentContext: DocumentContextContract;
}

export function CustomHeader({ documentContext }: CustomHeaderProps) {
  return (
    <View className="bg-background border-b border-border pt-safe-offset-3">
      <View className="px-4 py-3">
        <StyledText className="text-xl font-bold text-foreground">
          Document AI Assistant
        </StyledText>
        {documentContext.context && (
          <StyledText className="text-xs text-muted mt-1" numberOfLines={1}>
            {documentContext.context.source === 'pdf' ? '📄' : '🌐'}{' '}
            {documentContext.context.title}
          </StyledText>
        )}
      </View>
    </View>
  );
}
