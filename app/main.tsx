/**
 * Main Application Screen
 * Single-page chat interface with custom header
 * 
 * Tech Stack:
 * - HeroUI Native for components
 * - Uniwind for Tailwind CSS styling (with safe area support via HeroUINativeProvider)
 * - React Native + Expo
 * - Type-safe contracts for business layer
 */

import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

// Components
import {
  ChatInput,
  CustomHeader,
  DocumentUploadBottomSheet,
  DocumentUploadTrigger,
  EmptyState,
} from '@/components';

// Business Layer Hooks
import { useDatabase } from '@/lib/hooks/useDatabase';
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';

const StyledText = withUniwind(Text);

export default function MainScreen() {
  // ========================================================================
  // BUSINESS LAYER - Real hooks
  // ========================================================================
  
  const database = useDatabase();
  const documentContext = useDocumentContext(database.db);
  const documentProcessor = useDocumentProcessor();

  // ========================================================================
  // CONTEXT LOADING & LIFECYCLE
  // ========================================================================
  
  // Load existing context from SQLite on mount
  useEffect(() => {
    if (database.isReady) {
      documentContext.loadContext();
    }
  }, [database.isReady]);

  // ========================================================================
  // LOCAL STATE
  // ========================================================================
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // ========================================================================
  // HANDLERS
  // ========================================================================
  
  /**
   * Handle document replacement flow
   * 1. Delete existing context from database
   * 2. Open upload bottom sheet for new document
   */
  const handleChangeDocument = async () => {
    try {
      // Remove current context from database
      await documentContext.remove();
      // Open upload sheet for new document
      setIsUploadOpen(true);
    } catch (error) {
      console.error('[MainScreen] Failed to remove context:', error);
      // Still open upload sheet even if delete fails
      setIsUploadOpen(true);
    }
  };

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <>
      {/* Custom Header via Stack.Screen */}
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader 
              documentContext={documentContext}
              onChangeDocument={handleChangeDocument}
            />
          ),
        }}
      />

      {/* Main Chat Container */}
      <View className="flex-1 bg-background">
        
        {/* Scrollable Chat Messages Area */}
        <ScrollView 
          className="flex-1"
          contentContainerClassName="p-4 gap-4"
        >
          {!documentContext.context ? (
            <EmptyState />
          ) : (
            <StyledText className="text-sm text-muted">
              Chat messages will appear here...
            </StyledText>
          )}
        </ScrollView>

        {/* Conditional Bottom Input Area */}
        <View className="border-t border-border p-4 pb-safe-offset-3">
          {!documentContext.context ? (
            <DocumentUploadTrigger onPress={() => setIsUploadOpen(true)} />
          ) : (
            <ChatInput />
          )}
        </View>

      </View>

      {/* Document Upload BottomSheet */}
      <DocumentUploadBottomSheet
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        documentProcessor={documentProcessor}
        documentContext={documentContext}
      />
    </>
  );
}
