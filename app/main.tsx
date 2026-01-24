/**
 * Main Application Screen
 * Single-page chat interface with custom header
 * 
 * Tech Stack:
 * - HeroUI Native for components
 * - Uniwind for Tailwind CSS styling (with safe area support via HeroUINativeProvider)
 * - React Native + Expo
 * - Type-safe business layer hooks
 * - Voice-first interaction with text fallback
 */

import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import Constants from 'expo-constants';

// Components
import {
  ChatMessageList,
  CustomHeader,
  DocumentUploadBottomSheet,
  DocumentUploadTrigger,
  EmptyState,
  VoiceInputArea,
} from '@/components';

// Business Layer Hooks
import { useDatabase } from '@/lib/hooks/useDatabase';
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';
import { useVoiceInteraction } from '@/lib/hooks/useAudio';
import { useErrorHandler, ErrorType } from '@/lib/hooks/useErrorHandler';
import type { AzureSpeechConfig } from '@/lib/services/azure-speech';

// Types
import { createMessage, type Message } from '@/lib/types/conversation';

const StyledText = withUniwind(Text);

export default function MainScreen() {
  // ========================================================================
  // BUSINESS LAYER - Real hooks
  // ========================================================================
  
  const database = useDatabase();
  const documentContext = useDocumentContext(database.db);
  const documentProcessor = useDocumentProcessor();
  const { showError, showSuccess, handleError } = useErrorHandler();

  // ========================================================================
  // AZURE SPEECH CONFIGURATION
  // ========================================================================
  
  // Retrieve Azure Speech credentials from environment
  const azureKey = Constants.expoConfig?.extra?.AZURE_SPEECH_SERVICE_KEY || 
                   process.env.AZURE_SPEECH_SERVICE_KEY;
  const azureRegion = Constants.expoConfig?.extra?.AZURE_REGION || 
                     process.env.AZURE_REGION || 
                     'southeastasia';

  const azureConfig: AzureSpeechConfig = {
    apiKey: azureKey,
    region: azureRegion,
    language: 'en-US'
  };

  // Initialize voice interaction hook
  // Pass document context for AI to reference, undefined for default voice
  const voiceInteraction = useVoiceInteraction(
    documentContext.context ? documentContext.getPromptContext() : null,
    undefined, // Use default TTS voice (can be customized later)
    azureConfig
  );

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
  
  // Conversation state (in-memory for MVP)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);

  // ========================================================================
  // HANDLERS
  // ========================================================================
  
  /**
   * Handle document replacement flow
   * 1. Clear conversation history (tied to document)
   * 2. Delete existing context from database
   * 3. Open upload bottom sheet for new document
   */
  const handleChangeDocument = async () => {
    try {
      // Clear messages (conversation is tied to document)
      setMessages([]);
      
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

  /**
   * Handle text message sent from text input fallback
   * Processes text question using documentProcessor.askQuestion
   * 
   * @param message - User's text question
   */
  const handleTextMessage = async (message: string) => {
    if (!documentContext.context) {
      showError(ErrorType.NO_DOCUMENT_CONTEXT);
      return;
    }

    try {
      setIsProcessingMessage(true);
      
      // Get formatted context for AI
      const contextString = documentContext.getPromptContext();
      
      if (!contextString) {
        showError(ErrorType.NO_DOCUMENT_CONTEXT);
        setIsProcessingMessage(false);
        return;
      }

      // Add user message to chat history
      const userMessage = createMessage('user', message, 'text');
      setMessages(prev => [...prev, userMessage]);

      // Ask AI question using document processor
      const answer = await documentProcessor.askQuestion(message, contextString);
      
      // Add AI response to chat history
      const aiMessage = createMessage('assistant', answer, 'text');
      setMessages(prev => [...prev, aiMessage]);
      
      setIsProcessingMessage(false);
    } catch (error) {
      setIsProcessingMessage(false);
      showError(
        ErrorType.TEXT_PROCESSING_FAILED,
        error,
        () => handleTextMessage(message) // Retry callback
      );
    }
  };

  // ========================================================================
  // VOICE INTERACTION - Track messages from voice flow & handle errors
  // ========================================================================
  
  // Monitor voice interaction errors
  useEffect(() => {
    if (voiceInteraction.error) {
      handleError(voiceInteraction.error, () => {
        // Retry by restarting voice interaction
        voiceInteraction.startVoiceQuestion();
      });
    }
  }, [voiceInteraction.error]);
  
  // Monitor voice interaction state changes to save messages
  useEffect(() => {
    // When transcription is available, save user's voice message
    if (voiceInteraction.transcription && !voiceInteraction.isTranscribing) {
      const existingUserMessage = messages.find(
        m => m.role === 'user' && m.content === voiceInteraction.transcription
      );
      
      if (!existingUserMessage) {
        const userMessage = createMessage(
          'user',
          voiceInteraction.transcription,
          'voice',
          voiceInteraction.duration
        );
        setMessages(prev => [...prev, userMessage]);
      }
    }

    // When answer is available, save AI's response
    if (voiceInteraction.answer && !voiceInteraction.isProcessing) {
      const existingAiMessage = messages.find(
        m => m.role === 'assistant' && m.content === voiceInteraction.answer
      );
      
      if (!existingAiMessage) {
        const aiMessage = createMessage(
          'assistant',
          voiceInteraction.answer,
          'voice'
        );
        setMessages(prev => [...prev, aiMessage]);
      }
    }
  }, [
    voiceInteraction.transcription,
    voiceInteraction.answer,
    voiceInteraction.isTranscribing,
    voiceInteraction.isProcessing,
    voiceInteraction.duration,
  ]);

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
        
        {/* Chat Messages or Empty State */}
        {!documentContext.context ? (
          <View className="flex-1 items-center justify-center p-4">
            <EmptyState />
          </View>
        ) : (
          <ChatMessageList 
            messages={messages}
            isLoading={isProcessingMessage || voiceInteraction.isProcessing}
          />
        )}

        {/* Conditional Bottom Input Area */}
        <View className="border-t border-border p-4 pb-safe-offset-3">
          {!documentContext.context ? (
            /* No document loaded - Show upload trigger */
            <DocumentUploadTrigger onPress={() => setIsUploadOpen(true)} />
          ) : (
            /* Document loaded - Show voice-first input */
            <VoiceInputArea 
              voiceInteraction={voiceInteraction}
              onSendText={handleTextMessage}
              disabled={!documentContext.context}
            />
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
