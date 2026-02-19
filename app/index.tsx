import {
  ChatHistoryBottomSheet,
  DocumentDetailsPopover,
  DocumentInfoTrigger,
  DocumentUploadBottomSheet,
  ThemedIcon,
  VoiceInterface
} from '@/components';
import { useDocumentContext, useDocumentProcessor, useErrorHandler, useVoiceInteraction } from '@/hooks';
import { getAzureSpeechConfig } from '@/services/speech-to-text';
import { createMessage, type Message } from '@/types/conversation';
import { Stack } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Button } from 'heroui-native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);

type VoiceState = 'idle' | 'listening' | 'processing' | 'answering';

export default function IndexScreen() {
  const db = useSQLiteContext();
  const documentContext = useDocumentContext(db);
  const documentProcessor = useDocumentProcessor();
  const { handleError } = useErrorHandler();

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

  // Reset conversation history
  const handleResetHistory = () => setMessages([]);

  // ========================================================================
  // LIFECYCLE
  // ========================================================================
  
  useEffect(() => {
    documentContext.loadContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // documentContext is stable (hook object); initialization-only effect

  // Monitor voice interaction errors (prevent infinite toast loop)
  const [lastVoiceError, setLastVoiceError] = useState<string | null>(null);
  useEffect(() => {
    if (voiceInteraction.error) {
      console.log('[VoiceError]', voiceInteraction.error.message, new Date().toISOString());
      if (voiceInteraction.error.message !== lastVoiceError) {
        handleError(voiceInteraction.error);
        setLastVoiceError(voiceInteraction.error.message);
      }
    } else if (lastVoiceError) {
      setLastVoiceError(null);
    }
  }, [voiceInteraction.error, handleError, lastVoiceError]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceInteraction.transcription, voiceInteraction.answer]); // messages intentionally omitted: stale closure prevents infinite loop from setMessages

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
        <StyledView className="absolute top-12 flex-row w-full items-center justify-between z-10">
          <StyledText className='text-4xl text-foreground left-6 pb-1'>VoiceQuery</StyledText>
          <Button
            isIconOnly
            variant='secondary'
            className='bg-background right-6'
            onPress={() => setIsHistoryOpen(!isHistoryOpen)}

          >
            <ThemedIcon 
              name={isHistoryOpen ? "close" : "chatbubbles"} 
              size={24}
              themeColor="foreground"
            />
          </Button>
        </StyledView>

        {/* Main Content: Central Voice Circle */}
        <VoiceInterface
          state={voiceState}
          transcript={voiceInteraction.transcription}
          answer={voiceInteraction.answer}
          onPress={handleVoicePress}
          disabled={voiceInteraction.isProcessing}
        />

        {/* Conversation History BottomSheet */}
        <ChatHistoryBottomSheet
          isOpen={isHistoryOpen}
          onOpenChange={setIsHistoryOpen}
          messages={messages}
          documentTitle={documentContext.context?.title || 'Untitled Document'}
          onResetHistory={handleResetHistory}
        />

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
