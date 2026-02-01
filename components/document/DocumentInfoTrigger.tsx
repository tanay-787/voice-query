/**
 * DocumentInfoTrigger Component
 * Pressable trigger component that displays current document info
 * Compatible with Popover.Trigger asChild pattern using forwardRef
 */

import type { FormattedContext } from '@/types/context';
import { PressableFeedback } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);

interface DocumentInfoTriggerProps {
  context: FormattedContext;
}

/**
 * Using forwardRef to make it compatible with Popover.Trigger asChild
 * The Popover.Trigger will pass onPress and other props to this component
 */
export const DocumentInfoTrigger = React.forwardRef<View, DocumentInfoTriggerProps & { onPress?: () => void }>(
  ({ context, onPress, ...props }, ref) => {
    return (
      <PressableFeedback
        ref={ref as any}
        onPress={onPress}
        className="bg-background rounded-2xl shadow-sm"
        {...props}
      >
        <PressableFeedback.Highlight />
        <StyledView className="p-4">
          <StyledText className="text-muted text-xs uppercase tracking-wide mb-1">
            Current Document
          </StyledText>
          <StyledText className="text-foreground text-sm font-medium">
            {context.title || 'Untitled Document'}
          </StyledText>
        </StyledView>
      </PressableFeedback>
    );
  }
);

DocumentInfoTrigger.displayName = 'DocumentInfoTrigger';
