import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

/**
 * Push-to-talk voice button component
 * Press and hold to record, release to process
 */

interface VoiceButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  disabled?: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  duration?: number;
}

export function VoiceButton({
  isRecording,
  isProcessing,
  disabled = false,
  onPressIn,
  onPressOut,
  duration = 0,
}: VoiceButtonProps) {
  const handlePressIn = async () => {
    if (disabled || isProcessing) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPressIn();
  };

  const handlePressOut = async () => {
    if (disabled || isProcessing) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPressOut();
  };

  const getButtonColor = () => {
    if (disabled || isProcessing) return '#9ca3af';
    if (isRecording) return '#ef4444';
    return '#3b82f6';
  };

  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    if (isRecording) return 'Release to send';
    return 'Hold to speak';
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isProcessing}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: getButtonColor(),
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <Ionicons
          name={isRecording ? 'stop-circle' : isProcessing ? 'hourglass' : 'mic'}
          size={32}
          color="white"
        />
        <Text style={styles.buttonText}>{getButtonText()}</Text>
        {isRecording && duration > 0 && (
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        )}
      </Pressable>

      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  recordingText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});
