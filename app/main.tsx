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
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

// Business Layer Contracts

// Mock implementations (swap with real hooks in production)
import {
  createMockDatabase,
  createMockDocumentContext,
  createMockDocumentProcessor,
  createMockVoiceInteraction,
} from '@/lib/types/mock-factory';

// Styled components
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
  const documentContext = createMockDocumentContext('success');
  const documentProcessor = createMockDocumentProcessor('idle');
  const voiceInteraction = createMockVoiceInteraction('idle');

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
          <StyledText className="text-sm text-muted">
            Chat messages will appear here...
          </StyledText>
        </ScrollView>

        {/* Fixed Input at Bottom */}
        <View className="border-t border-border p-4 pb-safe-offset-3">
          <StyledText className="text-sm text-muted">
            Input component will be mounted here...
          </StyledText>
        </View>

      </View>
    </>
  );
}

// ============================================================================
// CUSTOM HEADER COMPONENT
// ============================================================================

interface CustomHeaderProps {
  documentContext: any; // Replace with DocumentContextContract
}

function CustomHeader({ documentContext }: CustomHeaderProps) {
  return (
    <View className="bg-background border-b border-border pt-safe-offset-3">
      <View className="px-4 py-3">
        <StyledText className="text-xl font-bold text-foreground">
          Document AI Assistant
        </StyledText>
        {documentContext.context && (
          <StyledText className="text-xs text-muted mt-1" numberOfLines={1}>
            {documentContext.context.source === 'pdf' ? '📄' : '🌐'} {documentContext.context.title}
          </StyledText>
        )}
      </View>
    </View>
  );
}
