import * as Speech from 'expo-speech';

/**
 * Text-to-Speech service using expo-speech
 * Provides on-device TTS capabilities
 */

export interface TTSOptions {
  rate?: number; // Speed (0.5 - 2.0)
  pitch?: number; // Pitch (0.5 - 2.0)
  language?: string; // Language code (e.g., 'en-US')
}

class TTSService {
  private isSpeaking: boolean = false;

  /**
   * Speak text aloud
   */
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // Stop any ongoing speech
      if (this.isSpeaking) {
        await this.stop();
      }

      console.log('[TTS] Speaking:', text.substring(0, 50));

      const {
        rate = 1.0,
        pitch = 1.0,
        language = 'en-US',
      } = options;

      this.isSpeaking = true;

      // Use expo-speech
      Speech.speak(text, {
        language,
        pitch,
        rate,
        onDone: () => {
          this.isSpeaking = false;
          console.log('[TTS] Speech completed');
        },
        onError: (error) => {
          this.isSpeaking = false;
          console.error('[TTS] Speech error:', error);
        },
        onStopped: () => {
          this.isSpeaking = false;
          console.log('[TTS] Speech stopped');
        },
      });
    } catch (error) {
      this.isSpeaking = false;
      console.error('[TTS] Failed to speak:', error);
      throw new Error('Failed to speak text');
    }
  }

  /**
   * Stop current speech
   */
  async stop(): Promise<void> {
    if (!this.isSpeaking) {
      return;
    }

    try {
      await Speech.stop();
      this.isSpeaking = false;
      console.log('[TTS] Speech stopped');
    } catch (error) {
      console.error('[TTS] Failed to stop speech:', error);
    }
  }

  /**
   * Check if currently speaking
   */
  getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }

  /**
   * Get available voices
   */
  async getAvailableVoices(): Promise<Speech.Voice[]> {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      return voices;
    } catch (error) {
      console.error('[TTS] Failed to get voices:', error);
      return [];
    }
  }
}

// Singleton instance
let ttsInstance: TTSService | null = null;

export function getTTSService(): TTSService {
  if (!ttsInstance) {
    ttsInstance = new TTSService();
  }
  return ttsInstance;
}

export { TTSService };
