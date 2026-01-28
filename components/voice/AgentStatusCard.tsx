/**
 * AgentStatusCard Component
 * Status indicator card for voice interaction states
 * 
 * Displays status messages instead of full content to avoid duplication
 * with ChatMessageList. Shows:
 * - Waveform + live transcript during recording
 * - "Thinking..." during processing
 * - "Speaking response..." during TTS playback
 * 
 * Full transcripts and answers are stored in ChatMessageList only.
 */

import { Card, Spinner } from 'heroui-native';
import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AudioWaveform } from './AudioWaveform';
import type { VoiceButtonState } from './VoiceButton';

const StyledText = withUniwind(Text);
const AnimatedCard = withUniwind(Animated.View);

interface AgentStatusCardProps {
  /**
   * Current state of voice interaction
   */
  state: VoiceButtonState;
  
  /**
   * Live transcript text (shown during recording only)
   */
  transcript?: string;
  
  /**
   * Recording duration in seconds (for display during recording)
   */
  duration?: number;
}

/**
 * AgentStatusCard - Status feedback for voice interactions
 * 
 * Replaces TranscriptCard to avoid content duplication with ChatMessageList.
 * Shows progress indicators and status messages only.
 */
export function AgentStatusCard({ 
  state, 
  transcript, 
  duration = 0,
}: AgentStatusCardProps) {
  // Only show card when not idle
  if (state === 'idle') return null;

  // Format duration for display
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine card content based on state
  const renderContent = () => {
    switch (state) {
      case 'recording':
        return (
          <>
            {/* Waveform Animation */}
            <AudioWaveform isActive={true} size={80} barCount={7} />
            
            {/* Duration Timer */}
            <StyledText className="text-xs text-muted mt-2">
              Listening...
            </StyledText>
            
            {/* Live Transcript (if available) */}
            {transcript && (
              <StyledText className="text-base text-foreground mt-3 text-center px-4">
                "{transcript}"
              </StyledText>
            )}
          </>
        );

      case 'processing':
        return (
          <>
            {/* Processing Spinner */}
            <Spinner size="lg" />
            
            {/* Status Message */}
            <StyledText className="text-base text-foreground mt-3">
              Processing...
            </StyledText>
            
            {/* Show what was transcribed
            {transcript && (
              <StyledText className="text-sm text-muted mt-2 text-center px-4">
                "{transcript}"
              </StyledText>
            )} */}
          </>
        );

      case 'speaking':
        return (
          <>
            {/* Speaking Waveform (subtle animation) */}
            <AudioWaveform isActive={true} size={60} barCount={5} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatedCard
      entering={FadeInDown.springify().mass(0.5)}
      exiting={FadeOutDown.springify().mass(0.5)}
      className="mb-4"
    >
      <Card variant="secondary">
        <Card.Body className="items-center justify-center py-4 px-4 gap-2">
          {renderContent()}
        </Card.Body>
      </Card>
    </AnimatedCard>
  );
}
