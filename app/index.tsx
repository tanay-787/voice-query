import {
  ChatMessageList,
  DocumentDetailsPopover,
  DocumentInfoTrigger,
  DocumentUploadBottomSheet,
  VoiceInterface,
} from '@/components';
import {
  useDocumentContext,
  useDocumentProcessor,
  useErrorHandler,
  useVoiceInteraction
} from '@/hooks';
import { getAzureSpeechConfig } from '@/lib/services/azure-speech';
import { createMessage, type Message } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);
const StyledIonicons = withUniwind(Ionicons);

type VoiceState = 'idle' | 'listening' | 'processing' | 'answering';

export default function IndexScreen() {
  const db = useSQLiteContext();
  const documentContext = useDocumentContext(db);
  const documentProcessor = useDocumentProcessor();
  const { showError, showSuccess, handleError } = useErrorHandler();

  const azureConfig = getAzureSpeechConfig();

  const voiceInteraction = useVoiceInteraction(
    documentContext.context ? documentContext.getPromptContext() : null,
    undefined,
    azureConfig
  );

  // ========================================================================
  // LOCAL STATE
  // ========================================================================
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // ========================================================================
  // LIFECYCLE
  // ========================================================================
  
  useEffect(() => {
    documentContext.loadContext();
  }, []);

  // Monitor voice interaction errors
  useEffect(() => {
    if (voiceInteraction.error) {
      handleError(voiceInteraction.error);
    }
  }, [voiceInteraction.error]);

  // Track voice messages
  useEffect(() => {
    if (!voiceInteraction.transcription || !voiceInteraction.answer) {
      return;
    }

    // Add user message
    if (voiceInteraction.transcription && 
        !messages.some(m => m.content === voiceInteraction.transcription && m.role === 'user')) {
      const userMessage = createMessage(
        'user',
        voiceInteraction.transcription,
        'voice'
      );
      setMessages(prev => [...prev, userMessage]);
    }

    // Add assistant message
    if (voiceInteraction.answer && 
        !messages.some(m => m.content === voiceInteraction.answer && m.role === 'assistant')) {
      const assistantMessage = createMessage(
        'assistant',
        voiceInteraction.answer,
        'voice'
      );
      setMessages(prev => [...prev, assistantMessage]);
    }
  }, [voiceInteraction.transcription, voiceInteraction.answer]);

  // Clear messages when document changes
  useEffect(() => {
    setMessages([]);
  }, [documentContext.context]);

  // ========================================================================
  // HANDLERS
  // ========================================================================
  
  const handleVoicePress = async () => {
    // Check if document context exists
    if (!documentContext.context) {
      // Open upload bottom sheet
      setIsUploadOpen(true);
      return;
    }

    // Start voice interaction
    try {
      if (!voiceInteraction.isRecording && !voiceInteraction.isProcessing) {
        await voiceInteraction.startVoiceQuestion();
      } else if (voiceInteraction.isRecording) {
        await voiceInteraction.stopAndProcess();
      }
    } catch (error) {
      handleError(error as Error);
    }
  };

  const getVoiceState = (): VoiceState => {
    if (voiceInteraction.isRecording) {
      return 'listening';
    }
    if (voiceInteraction.isProcessing) {
      return 'processing';
    }
    if (voiceInteraction.isSpeaking) {
      return 'answering';
    }
    return 'idle';
  };

  const voiceState = getVoiceState();

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <StyledView className="flex-1 bg-surface pb-safe-offset-3">
        {/* Top Bar: Chat History Button */}
        <StyledView className="absolute top-12 right-6 z-10">
          <StyledPressable
            onPress={() => setIsHistoryOpen(!isHistoryOpen)}
            className="bg-background rounded-full p-3 shadow-sm"
          >
            <StyledIonicons 
              name={isHistoryOpen ? "close" : "chatbubbles"} 
              size={24} 
              className="text-foreground" 
            />
          </StyledPressable>
        </StyledView>

        {/* Main Content: Central Voice Circle or Chat History */}
        {isHistoryOpen ? (
          <StyledView className="flex-1 pt-20">
            <StyledView className="px-6 pb-4">
              <StyledText className="text-foreground text-2xl font-bold">
                Chat History
              </StyledText>
              {documentContext.context && (
                <StyledText className="text-muted text-sm mt-1">
                  {documentContext.context.title || 'Untitled Document'}
                </StyledText>
              )}
            </StyledView>
            <ChatMessageList messages={messages} isLoading={false} />
          </StyledView>
        ) : (
          <VoiceInterface
            state={voiceState}
            transcript={voiceInteraction.transcription}
            answer={voiceInteraction.answer}
            onPress={handleVoicePress}
            disabled={voiceInteraction.isProcessing}
          />
        )}

        {/* Document Info Footer (only when idle and has context) */}
        {voiceState === 'idle' && documentContext.context && !isHistoryOpen && (
          <StyledView className="pb-safe-offset-1 absolute bottom-8 left-6 right-6">
            <DocumentDetailsPopover
              context={documentContext.context}
              documentContext={documentContext}
              onDelete={() => setIsUploadOpen(true)}
            >
              <DocumentInfoTrigger context={documentContext.context} />
            </DocumentDetailsPopover>
          </StyledView>
        )}

        {/* Document Upload Bottom Sheet */}
        <DocumentUploadBottomSheet
          isOpen={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          documentProcessor={documentProcessor}
          documentContext={documentContext}
        />
      </StyledView>
    </>
  );
}
