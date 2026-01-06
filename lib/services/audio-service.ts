import { 
  useAudioRecorder, 
  useAudioRecorderState,
  RecordingPresets,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
  type RecorderState,
} from 'expo-audio';
import { LIMITS } from '@/constants/limits';

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
 */
export function validateRecordingDuration(durationMs: number): void {
  if (durationMs > LIMITS.AUDIO_MAX_DURATION_MS) {
    throw new Error('Recording too long (max 60 seconds)');
  }
}

// Export hooks from expo-audio for direct use
export { useAudioRecorder, useAudioRecorderState, RecordingPresets };
