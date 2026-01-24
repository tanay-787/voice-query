/**
 * TranscriptCard Component
 * Sliding card that appears above voice button during voice interaction
 * 
 * Shows:
 * - Waveform animation during recording
 * - Live transcript text
 * - Processing/thinking states
 * - AI response during speaking
 * 
 * Animation: Slides up from bottom with smooth transition
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

interface TranscriptCardProps {
  /**
   * Current state of voice interaction
   */
  state: VoiceButtonState;
  
  /**
   * Current transcript text (during/after recording)
   */
  transcript: string;
  
  /**
   * AI response text (during/after generation)
   */
  answer: string;
  
  /**
   * Recording duration in seconds
   */
  duration?: number;
}

/**
 * TranscriptCard - Sliding card for voice interaction feedback
 * 
 * Features:
 * - Appears above voice button when active
 * - Shows waveform during recording
 * - Displays real-time transcript
 * - Processing/thinking indicators
 * - Smooth slide animations
 * 
 * @example
 * <TranscriptCard 
 *   state="recording"
 *   transcript="What are the key points?"
 *   answer=""
 *   duration={3}
 * />
 */
export function TranscriptCard({ 
  state, 
  transcript, 
  answer,
  duration = 0,
}: TranscriptCardProps) {
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
            <Spinner size="md">
              <Spinner.Indicator />
            </Spinner>
            <StyledText className="text-sm text-muted mt-3">
              Processing...
            </StyledText>
            
            {/* Show what was said */}
            {transcript && (
              <StyledText className="text-sm text-foreground mt-2 text-center px-4 opacity-70">
                "{transcript}"
              </StyledText>
            )}
          </>
        );

      case 'speaking':
        return (
          <>
            {/* Subtle waveform during TTS */}
            <AudioWaveform isActive={true} size={60} barCount={5} />
            
            <StyledText className="text-sm text-muted mt-3">
              Speaking...
            </StyledText>
            
            {/* Show AI response */}
            {answer && (
              <StyledText className="text-sm text-foreground mt-2 text-center px-4">
                {answer}
              </StyledText>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatedCard
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(200)}
      className="mb-4"
    >
      <Card variant="secondary">
        <Card.Body className="items-center justify-center py-6 px-4 gap-2">
          {renderContent()}
        </Card.Body>
      </Card>
    </AnimatedCard>
  );
}
