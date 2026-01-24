/**
 * VoiceButton Component
 * Production-grade tap-to-toggle voice recording button
 * 
 * Interaction: Tap once to start recording, tap again to stop
 * Animation: Minimal Siri-like with subtle pulse when recording
 * States: idle | recording | processing | speaking
 */

import { Button } from 'heroui-native';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ThemedIcon } from '../ThemedIcon';

const AnimatedButton = Animated.createAnimatedComponent(Button);

export type VoiceButtonState = 'idle' | 'recording' | 'processing' | 'speaking';

interface VoiceButtonProps {
  /**
   * Current state of voice interaction
   */
  state: VoiceButtonState;
  
  /**
   * Callback when button is pressed (tap to toggle)
   */
  onPress: () => void;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Button size
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * VoiceButton - Production-grade voice recording button
 * 
 * Features:
 * - Tap-to-toggle interaction
 * - Subtle pulse animation when recording
 * - State-aware icon and styling
 * - Minimal, professional design
 * 
 * States:
 * - idle: Static mic icon, accent color
 * - recording: Pulsing animation, danger color
 * - processing: Static with spinner overlay (handled by parent)
 * - speaking: Subtle wave animation
 * 
 * @example
 * <VoiceButton 
 *   state={voiceState}
 *   onPress={toggleRecording}
 *   disabled={!hasContext}
 * />
 */
export function VoiceButton({ 
  state, 
  onPress, 
  disabled = false,
  size = 'lg',
}: VoiceButtonProps) {
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Pulse animation when recording
  useEffect(() => {
    if (state === 'recording') {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { 
            duration: 800, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(1, { 
            duration: 800, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        ),
        -1, // Infinite
        false
      );
      
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        false
      );
    } else {
      // Reset to normal
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [state]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Determine icon based on state
  const getIcon = () => {
    switch (state) {
      case 'recording':
        return 'stop-circle'; // Tap again to stop
      case 'processing':
      case 'speaking':
        return 'mic'; // Show mic while processing/speaking
      case 'idle':
      default:
        return 'mic';
    }
  };

  // Determine button variant based on state
  const getVariant = () => {
    switch (state) {
      case 'recording':
        return 'secondary' as const; // Use secondary color when recording
      case 'idle':
      default:
        return 'primary' as const;
    }
  };

  // Determine icon color based on state
  const getIconColor = () => {
    switch (state) {
      case 'recording':
        return 'danger' as const; // Red when recording
      case 'idle':
      default:
        return 'accent-foreground' as const;
    }
  };

  return (
    <AnimatedButton
      variant={getVariant()}
      size={size}
      isIconOnly
      onPress={onPress}
      isDisabled={disabled || state === 'processing'}
      style={animatedStyle}
      className="rounded-full"
    >
      <ThemedIcon 
        name={getIcon()} 
        size={size === 'lg' ? 32 : size === 'md' ? 24 : 20}
        themeColor={getIconColor()}
      />
    </AnimatedButton>
  );
}
