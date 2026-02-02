/**
 * VoiceInterface Component
 * Main voice interaction interface for Agentic Vocal UI
 * 
 * States:
 * - Idle: Mic icon in dotted circle
 * - Listening: Waveform animation
 * - Processing: Processing animation (pulse)
 * - Answering: Waveform at bottom, transcript at top
 */

import { ThemedIcon } from '@/components/ThemedIcon';
import { useThemeColor } from 'heroui-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

import { AudioWave } from './AudioWave';

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledPressable = withUniwind(Pressable);
const AnimatedView = withUniwind(Animated.View);

type VoiceState = 'idle' | 'listening' | 'processing' | 'answering';

interface VoiceInterfaceProps {
  state: VoiceState;
  transcript?: string;
  answer?: string;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * Voice Interaction Interface
 * Main UI component for agentic vocal interface
 */
export function VoiceInterface({
  state,
  transcript = '',
  answer = '',
  onPress,
  disabled = false,
}: VoiceInterfaceProps) {
  const [accentColor] = useThemeColor(['accent']);

  // State label
  const getStateLabel = () => {
    switch (state) {
      case 'idle':
        return 'Tap to speak';
      case 'listening':
        return 'Tap to stop';
      case 'processing':
        return 'Processing...';
      case 'answering':
        return 'Speaking...';
      default:
        return '';
    }
  };

  // Pulsing animation for processing state
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    if (state === 'processing') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 300 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]); // pulseScale is Reanimated useSharedValue (stable reference); doesn't trigger rerenders

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <StyledView className="flex-1 items-center justify-center px-6">
      {/* Answering State: Transcript at top */}
      {state === 'answering' && answer && (
        <StyledView className="mb-8 w-full max-h-64">
          <ScrollView 
            className="w-full" 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingVertical: 16 }}
          >
            <StyledText className="text-foreground text-base leading-relaxed text-center">
              {answer}
            </StyledText>
          </ScrollView>
        </StyledView>
      )}

      {/* Central Circle */}
      <StyledPressable
        onPress={onPress}
        disabled={disabled || state === 'processing' || state === 'answering'}
      >
        <AnimatedView 
          style={[
            pulseStyle,
            {
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 2,
              borderStyle: state === 'idle' ? 'dashed' : 'solid',
              borderColor: accentColor,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            },
          ]}
        >
          {/* Idle: Mic Icon */}
          {state === 'idle' && (
            <ThemedIcon 
              name="mic" 
              size={64}
              themeColor="accent"
            />
          )}

          {/* Listening: Waveform */}
          {state === 'listening' && (
            <AudioWave isActive={true} size={120} barCount={7} />
          )}

          {/* Processing: Animated Dots */}
          {state === 'processing' && (
            <StyledView className="flex-row gap-2">
              <ProcessingDot delay={0} />
              <ProcessingDot delay={200} />
              <ProcessingDot delay={400} />
            </StyledView>
          )}

          {/* Answering: Subtle Waveform */}
          {state === 'answering' && (
            <AudioWave isActive={true} size={100} barCount={5} />
          )}
        </AnimatedView>
      </StyledPressable>

      {/* State Label */}
      <StyledView className="mt-6">
        <StyledText className="text-muted text-lg font-medium">
          {getStateLabel()}
        </StyledText>
      </StyledView>

      {/* Listening: Live transcript preview */}
      {state === 'listening' && transcript && (
        <StyledView className="mt-4 px-6 w-full">
          <StyledText className="text-muted text-sm text-center italic">
            &quot;{transcript}&quot;
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
}

/**
 * Processing Dot Animation
 * Animated dot for processing state
 */
function ProcessingDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);
  const [accentColor] = useThemeColor(['accent']);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // opacity is Reanimated useSharedValue (stable reference); initialization-only effect

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedView
      style={[
        animatedStyle,
        {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: accentColor,
        },
      ]}
    />
  );
}
