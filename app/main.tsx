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
import React, { useState } from 'react';
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

// Mock implementations (swap with real hooks in production)
import {
  createMockDatabase,
  createMockDocumentContext,
  createMockDocumentProcessor,
  createMockVoiceInteraction,
} from '@/lib/types/mock-factory';

const StyledText = withUniwind(Text);

export default function MainScreen() {
  // ========================================================================
  // BUSINESS LAYER - Replace with real hooks in production
  // ========================================================================
  
  // Production:
  // const database = useDatabase();
  // const documentContext = useDocumentContext(database.db);
  // const documentProcessor = useDocumentProcessor();
  // const voiceInteraction = useVoiceInteraction(
  //   documentContext.getPromptContext(),
  //   undefined,
  //   azureConfig
  // );
  
  const database = createMockDatabase('success');
  const documentContext = createMockDocumentContext('idle'); // Start with no document
  const documentProcessor = createMockDocumentProcessor('idle');
  const voiceInteraction = createMockVoiceInteraction('idle');

  // ========================================================================
  // LOCAL STATE
  // ========================================================================
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <>
      {/* Custom Header via Stack.Screen */}
      <Stack.Screen
        options={{
          header: () => <CustomHeader documentContext={documentContext} />,
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
