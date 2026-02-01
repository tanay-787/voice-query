import { LIMITS } from '@/constants/limits';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState
} from 'expo-audio';

/**
 * Audio service utilities for recording
 * Uses expo-audio hooks and functions
 */

export type AudioRecording = {
  uri: string;
  duration: number;
};

/**
 * Request recording permissions
 */
export async function requestAudioPermissions(): Promise<boolean> {
  try {
    const { granted } = await requestRecordingPermissionsAsync();
    
    if (!granted) {
      console.warn('[Audio] Microphone permission denied');
      return false;
    }

    console.log('[Audio] Permissions granted');
    return true;
  } catch (error) {
    console.error('[Audio] Permission request failed:', error);
    return false;
  }
}

/**
 * Configure audio mode for recording
 */
export async function setupAudioMode(): Promise<void> {
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
    console.log('[Audio] Audio mode configured');
  } catch (error) {
    console.error('[Audio] Failed to set audio mode:', error);
    throw error;
  }
}

/**
 * Validate recording duration
 * Minimum: 300ms to avoid accidental button taps
 * Maximum: 60 seconds
 * 
 * Note: This catches extremely short accidental taps.
 * Azure STT will further validate if actual speech was detected (vs silence/noise).
 */
export function validateRecordingDuration(durationMs: number): void {
  const MIN_DURATION_MS = 300; // Reduced from 500ms - Azure handles speech detection
  
  if (durationMs < MIN_DURATION_MS) {
    throw new Error(`Recording too short (${durationMs}ms). Please hold the button and speak your question.`);
  }
  
  if (durationMs > LIMITS.AUDIO_MAX_DURATION_MS) {
    throw new Error('Recording too long (max 60 seconds)');
  }
}

// Export hooks from expo-audio for direct use
export { RecordingPresets, useAudioRecorder, useAudioRecorderState };
