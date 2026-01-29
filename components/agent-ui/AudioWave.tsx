/**
 * AudioWave Component
 * Minimal Siri-like waveform animation for voice recording feedback
 * 
 * Design: Clean, professional, subtle animation
 * Uses react-native-reanimated for smooth 60fps performance
 */

import { useThemeColor } from 'heroui-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const AnimatedView = withUniwind(Animated.View);

interface AudioWaveProps {
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
 * Minimal Siri-like AudioWave
 * 
 * Features:
 * - Smooth, subtle bar animations
 * - Responsive to active state
 * - Theme-aware accent color
 * - 60fps performance with reanimated
 * 
 * @example
 * <AudioWave isActive={isRecording} size={100} />
 */
export function AudioWave({ 
  isActive, 
  size = 120,
  barCount = 5,
}: AudioWaveProps) {
  const [accentColor] = useThemeColor(['accent']);
  
  // Create animated values for each bar (fixed count to avoid hook violations)
  const bar0 = useSharedValue(0.3);
  const bar1 = useSharedValue(0.3);
  const bar2 = useSharedValue(0.3);
  const bar3 = useSharedValue(0.3);
  const bar4 = useSharedValue(0.3);
  const bar5 = useSharedValue(0.3);
  const bar6 = useSharedValue(0.3);

  // Map to array for iteration (all bars created, use only what's needed)
  const allBars = [bar0, bar1, bar2, bar3, bar4, bar5, bar6];
  const bars = allBars.slice(0, barCount);

  // Animated styles for each bar (hooks called unconditionally)
  const animatedStyle0 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar0.value }] }));
  const animatedStyle1 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar1.value }] }));
  const animatedStyle2 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar2.value }] }));
  const animatedStyle3 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar3.value }] }));
  const animatedStyle4 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar4.value }] }));
  const animatedStyle5 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar5.value }] }));
  const animatedStyle6 = useAnimatedStyle(() => ({ transform: [{ scaleY: bar6.value }] }));

  const animatedStyles = [animatedStyle0, animatedStyle1, animatedStyle2, animatedStyle3, animatedStyle4, animatedStyle5, animatedStyle6];

  useEffect(() => {
    if (isActive) {
      // Animate each bar with different timing for organic feel
      bars.forEach((bar, index) => {
        const delay = index * 100; // Stagger animation
        const duration = 800 + Math.random() * 400; // Randomize duration slightly
        
        bar.value = withRepeat(
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
        bar.value = withTiming(0.3, { duration: 300 });
      });
    }
  }, [isActive, barCount]);

  return (
    <View className="flex-row items-center justify-center gap-1.5" style={{ height: size }}>
      {bars.map((bar, index) => (
        <AnimatedView
          key={index}
          className="rounded-full"
          style={[
            animatedStyles[index],
            {
              width: 4,
              height: size * 0.6,
              backgroundColor: accentColor,
              opacity: 0.8,
            },
          ]}
        />
      ))}
    </View>
  );
}
