/**
 * DocumentDetailsPopover Component
 * Bottom sheet popover showing full document details with delete action
 * Wraps a trigger component (typically DocumentInfoTrigger)
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Divider, Popover } from 'heroui-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

import type { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import type { FormattedContext } from '@/lib/types/context';

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledScrollView = withUniwind(ScrollView);
const StyledIonicons = withUniwind(Ionicons);

interface DocumentDetailsPopoverProps {
  children: React.ReactNode; // Trigger component (e.g., DocumentInfoTrigger)
  context: FormattedContext;
  documentContext: ReturnType<typeof useDocumentContext>;
  onDelete: () => void;
}

export function DocumentDetailsPopover({ 
  children,
  context, 
  documentContext,
  onDelete 
}: DocumentDetailsPopoverProps) {
  
  const handleDelete = async () => {
    try {
      await documentContext.remove();
      onDelete(); // Trigger upload bottom sheet
    } catch (error) {
      console.error('[DocumentDetails] Delete failed:', error);
    }
  };

  return (
    <Popover>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content presentation="bottom-sheet">
          <StyledScrollView className="px-2 py-4">
            {/* Header */}
            <StyledView className="">
              <Popover.Title className="text-2xl font-bold mb-1">
                Context Details
              </Popover.Title>
            </StyledView>

            <Divider className="my-4" />

            {/* Document Title */}
            <StyledView className="">
              <StyledText className="text-muted text-xs uppercase tracking-wide mb-1">
                Title
              </StyledText>
              <StyledText className="text-foreground text-base font-medium">
                {context.title || 'Untitled Document'}
              </StyledText>
            </StyledView>

            <Divider className="my-4" />

            {/* Overview */}
            {context.overview && (
              <StyledView className="mb-4">
                <StyledText className="text-muted text-xs uppercase tracking-wide mb-2">
                  Overview
                </StyledText>
                <StyledText className="text-foreground text-sm leading-relaxed">
                  {context.overview}
                </StyledText>
              </StyledView>
            )}

            {/* Delete Button */}
            <Button 
              variant="danger" 
              onPress={handleDelete}
              className="mt-2"
            >
              <StyledIonicons name="trash-outline" size={20} className="text-white" />
              <Button.Label>Delete Document</Button.Label>
            </Button>

            <StyledText className="text-muted text-xs text-center mt-3">
              This will remove the document and allow you to upload a new one.
            </StyledText>
          </StyledScrollView>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
