/**
 * AudioWaveform Component
 * Minimal Siri-like waveform animation for voice recording feedback
 * 
 * Design: Clean, professional, subtle animation
 * Uses react-native-reanimated for smooth 60fps performance
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useThemeColor } from 'heroui-native';

const AnimatedView = withUniwind(Animated.View);

interface AudioWaveformProps {
  /**
   * Whether the waveform should be animating
   */
  isActive: boolean;
  
  /**
   * Size of the waveform container
   * @default 120
   */
  size?: number;
  
  /**
   * Number of waveform bars
   * @default 5
   */
  barCount?: number;
}

/**
 * Minimal Siri-like AudioWaveform
 * 
 * Features:
 * - Smooth, subtle bar animations
 * - Responsive to active state
 * - Theme-aware accent color
 * - 60fps performance with reanimated
 * 
 * @example
 * <AudioWaveform isActive={isRecording} size={100} />
 */
export function AudioWaveform({ 
  isActive, 
  size = 120,
  barCount = 5,
}: AudioWaveformProps) {
  const [accentColor] = useThemeColor(['accent']);
  
  // Create animated values for each bar
  const bars = Array.from({ length: barCount }, () => ({
    scale: useSharedValue(0.3),
  }));

  useEffect(() => {
    if (isActive) {
      // Animate each bar with different timing for organic feel
      bars.forEach((bar, index) => {
        const delay = index * 100; // Stagger animation
        const duration = 800 + Math.random() * 400; // Randomize duration slightly
        
        bar.scale.value = withRepeat(
          withSequence(
            withTiming(1, { 
              duration: duration / 2, 
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0.3, { 
              duration: duration / 2, 
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          ),
          -1, // Infinite repeat
          false
        );
      });
    } else {
      // Reset to idle state
      bars.forEach((bar) => {
        bar.scale.value = withTiming(0.3, { duration: 300 });
      });
    }
  }, [isActive]);

  return (
    <View className="flex-row items-center justify-center gap-1.5" style={{ height: size }}>
      {bars.map((bar, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scaleY: bar.scale.value }],
        }));

        return (
          <AnimatedView
            key={index}
            className="rounded-full"
            style={[
              animatedStyle,
              {
                width: 4,
                height: size * 0.6,
                backgroundColor: accentColor,
                opacity: 0.8,
              },
            ]}
          />
        );
      })}
    </View>
  );
}
