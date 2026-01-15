import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

/**
 * Audio waveform animation while speaking
 */

interface AudioWaveformProps {
  isActive: boolean;
  color?: string;
}

export function AudioWaveform({ isActive, color = '#10b981' }: AudioWaveformProps) {
  const bar1Height = useRef(new Animated.Value(20)).current;
  const bar2Height = useRef(new Animated.Value(40)).current;
  const bar3Height = useRef(new Animated.Value(30)).current;
  const bar4Height = useRef(new Animated.Value(50)).current;
  const bar5Height = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    if (isActive) {
      // Animate bars
      const animate = () => {
        Animated.loop(
          Animated.parallel([
            Animated.sequence([
              Animated.timing(bar1Height, { toValue: 50, duration: 400, useNativeDriver: false }),
              Animated.timing(bar1Height, { toValue: 20, duration: 400, useNativeDriver: false }),
            ]),
            Animated.sequence([
              Animated.timing(bar2Height, { toValue: 60, duration: 500, useNativeDriver: false }),
              Animated.timing(bar2Height, { toValue: 30, duration: 500, useNativeDriver: false }),
            ]),
            Animated.sequence([
              Animated.timing(bar3Height, { toValue: 45, duration: 450, useNativeDriver: false }),
              Animated.timing(bar3Height, { toValue: 25, duration: 450, useNativeDriver: false }),
            ]),
            Animated.sequence([
              Animated.timing(bar4Height, { toValue: 70, duration: 550, useNativeDriver: false }),
              Animated.timing(bar4Height, { toValue: 40, duration: 550, useNativeDriver: false }),
            ]),
            Animated.sequence([
              Animated.timing(bar5Height, { toValue: 55, duration: 480, useNativeDriver: false }),
              Animated.timing(bar5Height, { toValue: 25, duration: 480, useNativeDriver: false }),
            ]),
          ])
        ).start();
      };
      animate();
    } else {
      // Reset to default heights
      bar1Height.setValue(20);
      bar2Height.setValue(40);
      bar3Height.setValue(30);
      bar4Height.setValue(50);
      bar5Height.setValue(25);
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { height: bar1Height, backgroundColor: color }]} />
      <Animated.View style={[styles.bar, { height: bar2Height, backgroundColor: color }]} />
      <Animated.View style={[styles.bar, { height: bar3Height, backgroundColor: color }]} />
      <Animated.View style={[styles.bar, { height: bar4Height, backgroundColor: color }]} />
      <Animated.View style={[styles.bar, { height: bar5Height, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 80,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
});
