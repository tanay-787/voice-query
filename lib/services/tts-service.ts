import * as Speech from 'expo-speech';

/**
 * Text-to-Speech service using expo-speech
 * Provides on-device TTS capabilities
 */

export interface TTSOptions {
  rate?: number; // Speed (0.5 - 2.0)
  pitch?: number; // Pitch (0.5 - 2.0)
  language?: string; // Language code (e.g., 'en-US')
  voice?: string; // Voice identifier
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

      // Validate and truncate text (Expo Speech limit: 4000 chars)
      const MAX_TTS_LENGTH = 3900; // Safety margin
      let textToSpeak = text.trim();
      
      if (textToSpeak.length > MAX_TTS_LENGTH) {
        console.warn(`[TTS] Text too long (${textToSpeak.length} chars), truncating to ${MAX_TTS_LENGTH}`);
        // Truncate at sentence boundary if possible
        textToSpeak = this.truncateAtSentence(textToSpeak, MAX_TTS_LENGTH);
      }

      if (!textToSpeak) {
        throw new Error('No text to speak');
      }

      console.log('[TTS] Speaking:', textToSpeak.substring(0, 50), `(${textToSpeak.length} chars)`);

      const {
        rate = 1.0,
        pitch = 1.0,
        language = 'en-US',
        voice,
      } = options;

      this.isSpeaking = true;

      // Use expo-speech
      Speech.speak(textToSpeak, {
        language,
        pitch,
        rate,
        voice, // Pass voice identifier if present
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
   * Truncate text at sentence boundary
   */
  private truncateAtSentence(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }

    // Try to truncate at last sentence within limit
    const truncated = text.substring(0, maxLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('. '),
      truncated.lastIndexOf('! '),
      truncated.lastIndexOf('? ')
    );

    if (lastSentenceEnd > maxLength * 0.5) {
      // Found a good sentence boundary (at least 50% through)
      return truncated.substring(0, lastSentenceEnd + 1);
    }

    // No good sentence boundary, truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + '...';
    }

    // Fallback: hard truncate
    return truncated + '...';
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
