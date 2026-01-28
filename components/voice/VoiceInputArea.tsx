/**
 * VoiceInputArea Component
 * Main container for voice-first input interaction
 * 
 * Features:
 * - Primary: Large voice button (tap-to-toggle)
 * - Secondary: Expandable text input
 * - Transcript card that slides up during interaction
 * - Connects to useVoiceInteraction hook
 * - State management for voice/text modes
 */

import type { useVoiceInteraction } from '@/lib/hooks/useAudio';
import { Button, TextField } from 'heroui-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { ThemedIcon } from '../ThemedIcon';
import { AgentStatusCard } from './AgentStatusCard';
import { VoiceButton, type VoiceButtonState } from './VoiceButton';

const AnimatedView = withUniwind(Animated.View);

interface VoiceInputAreaProps {
  /**
   * Voice interaction hook from useVoiceInteraction
   */
  voiceInteraction: ReturnType<typeof useVoiceInteraction>;
  
  /**
   * Callback when text message is sent
   */
  onSendText?: (message: string) => void;
  
  /**
   * Whether voice/text input is disabled (e.g., no document loaded)
   */
  disabled?: boolean;
}

/**
 * VoiceInputArea - Production-grade voice-first input
 * 
 * Layout:
 * - TranscriptCard (slides up when active)
 * - Text input (expandable, collapsed by default)
 * - Voice button (large, primary CTA)
 * 
 * Interaction Flow:
 * 1. User taps voice button → Start recording
 * 2. TranscriptCard slides up with waveform
 * 3. User taps again → Stop & process
 * 4. Shows processing/thinking states
 * 5. Speaks response, then returns to idle
 * 
 * @example
 * <VoiceInputArea 
 *   voiceInteraction={voiceInteraction}
 *   onSendText={handleTextMessage}
 *   disabled={!hasContext}
 * />
 */
export function VoiceInputArea({ 
  voiceInteraction,
  onSendText,
  disabled = false,
}: VoiceInputAreaProps) {
  // Local state for text input expansion
  const [isTextInputExpanded, setIsTextInputExpanded] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  // Determine current voice button state based on hook state
  const getVoiceState = (): VoiceButtonState => {
    if (voiceInteraction.isRecording) return 'recording';
    if (voiceInteraction.isTranscribing || voiceInteraction.isProcessing) return 'processing';
    if (voiceInteraction.isSpeaking) return 'speaking';
    return 'idle';
  };

  const voiceState = getVoiceState();

  // Handle voice button press (tap to toggle)
  const handleVoicePress = async () => {
    if (voiceState === 'recording') {
      // Stop recording and process
      await voiceInteraction.stopAndProcess();
    } else if (voiceState === 'idle') {
      // Start recording
      // Collapse text input if expanded
      setIsTextInputExpanded(false);
      await voiceInteraction.startVoiceQuestion();
    }
    // Do nothing if processing or speaking
  };

  // Handle text input send
  const handleSendText = () => {
    if (textMessage.trim() && onSendText) {
      onSendText(textMessage.trim());
      setTextMessage('');
      setIsTextInputExpanded(false);
    }
  };

  // Handle text input toggle
  const handleToggleTextInput = () => {
    // Don't allow toggling during voice interaction
    if (voiceState !== 'idle') return;
    setIsTextInputExpanded(!isTextInputExpanded);
  };

  // Auto-collapse text input when voice interaction starts
  useEffect(() => {
    if (voiceState !== 'idle') {
      setIsTextInputExpanded(false);
    }
  }, [voiceState]);

  return (
    <View className="gap-4">
      {/* Agent Status Card - Shows status instead of full content */}
      <AgentStatusCard
        state={voiceState}
        transcript={voiceInteraction.transcription || ''}
        duration={voiceInteraction.duration}
      />

      {/* Input Controls */}
      <AnimatedView layout={Layout.springify()}>
        {isTextInputExpanded ? (
          /* Expanded Text Input Mode */
          <AnimatedView
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            layout={Layout.springify()}
            className="flex-row gap-2 items-end"
          >
            {/* Text Field */}
            <View className="flex-1">
              <TextField>
                <TextField.Input
                  placeholder="Type your question..."
                  value={textMessage}
                  onChangeText={setTextMessage}
                  multiline
                  numberOfLines={1}
                  editable={!disabled}
                />
              </TextField>
            </View>

            {/* Send Button */}
            <Button
              variant="primary"
              size="md"
              isIconOnly
              onPress={handleSendText}
              isDisabled={!textMessage.trim() || disabled}
            >
              <ThemedIcon name="send" size={20} themeColor="accent-foreground" />
            </Button>

            {/* Voice Button (smaller when text expanded) */}
            <VoiceButton
              state={voiceState}
              onPress={handleVoicePress}
              disabled={disabled}
              size="md"
            />
          </AnimatedView>
        ) : (
          /* Collapsed Mode - Voice Primary */
          <AnimatedView
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            layout={Layout.springify()}
            className="flex-row items-center justify-center gap-4"
          >
            {/* Text Input Toggle (small icon) */}
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              onPress={handleToggleTextInput}
              isDisabled={disabled || voiceState !== 'idle'}
            >
              <ThemedIcon 
                name="chatbox-outline" 
                size={20} 
                themeColor="muted" 
              />
            </Button>

            {/* Voice Button (large, primary) */}
            <VoiceButton
              state={voiceState}
              onPress={handleVoicePress}
              disabled={disabled}
              size="lg"
            />
          </AnimatedView>
        )}
      </AnimatedView>
    </View>
  );
}
