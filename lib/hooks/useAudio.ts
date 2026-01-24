import { requestAudioPermissions, setupAudioMode, validateRecordingDuration } from '@/lib/services/audio-service';
import { AzureSpeechConfig, recognizeSpeech } from '@/lib/services/azure-speech';
import { getGeminiService } from '@/lib/services/gemini';
import { getTTSService, type TTSOptions } from '@/lib/services/tts-service';
import {
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook for text-to-speech
 */
export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const tts = getTTSService();

  const speak = useCallback(async (text: string, options?: TTSOptions) => {
    setError(null);
    setIsSpeaking(true);

    try {
      await tts.speak(text, options);
      setTimeout(() => setIsSpeaking(false), 100);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to speak');
      setError(error);
      setIsSpeaking(false);
      throw error;
    }
  }, []);

  const stop = useCallback(async () => {
    await tts.stop();
    setIsSpeaking(false);
  }, []);

  const getVoices = useCallback(async () => {
    return await tts.getAvailableVoices();
  }, []);

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const speaking = tts.getSpeakingStatus();
      setIsSpeaking(speaking);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return {
    speak,
    stop,
    getVoices,
    isSpeaking,
    error,
  };
}

/**
 * Hook for speech-to-text transcription (Switched to Azure)
 */
export function useSpeechToText(azureConfig: AzureSpeechConfig | null) {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // const gemini = getGeminiService(); // Replaced with Azure

  const transcribe = useCallback(async (audioUri: string): Promise<string> => {
    if (!azureConfig) {
      throw new Error('Azure configuration missing');
    }

    setIsTranscribing(true);
    setError(null);

    try {
      const result = await recognizeSpeech(audioUri, azureConfig);
      
      console.log('[STT] Azure result:', result);
      
      // Check if no phrases detected (user was silent or background noise only)
      if (!result.phrases || result.phrases.length === 0) {
        throw new Error('No speech detected. Please speak clearly and try again.');
      }
      
      // Check if DisplayText is empty (no recognizable speech)
      if (!result.DisplayText || result.DisplayText.trim() === '') {
        throw new Error('No speech detected. Please speak clearly and try again.');
      }
      
      // Check for NoMatch status
      if (result.RecognitionStatus === 'NoMatch') {
        throw new Error('Speech could not be recognized. Please speak more clearly.');
      }
      
      return result.DisplayText;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to transcribe audio');
      setError(error);
      throw error;
    } finally {
      setIsTranscribing(false);
    }
  }, [azureConfig]);

  return {
    transcribe,
    isTranscribing,
    error,
  };
}

/**
 * Hook for complete voice interaction flow
 * Records audio → Transcribes (Azure) → Gets answer (Gemini) → Speaks answer (Local TTS)
 */
export function useVoiceInteraction(
  contextString: string | null,
  voiceIdentifier?: string,
  azureConfig: AzureSpeechConfig | null = null
) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const stt = useSpeechToText(azureConfig);
  const tts = useTextToSpeech();
  
  const [transcription, setTranscription] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const gemini = getGeminiService();

  // Setup permissions and audio mode on mount
  useEffect(() => {
    async function setup() {
      const hasPermission = await requestAudioPermissions();
      if (hasPermission) {
        await setupAudioMode();
      }
    }
    setup();
  }, []);

  const startVoiceQuestion = useCallback(async () => {
    if (!contextString) {
      throw new Error('No context available. Please load a document first.');
    }
    if (!azureConfig) {
      throw new Error('Azure configuration missing');
    }

    setError(null);
    setTranscription('');
    setAnswer('');

    try {
      console.log('[VoiceInteraction] Starting recording...');
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start recording');
      setError(error);
      throw error;
    }
  }, [contextString, recorder, azureConfig]);

  const stopAndProcess = useCallback(async () => {
    try {
      setIsProcessing(true);

      // Stop recording
      console.log('[VoiceInteraction] Stopping recording...');
      await recorder.stop();

      const uri = recorder.uri;
      if (!uri) {
        throw new Error('No recording URI available');
      }

      // Validate duration (catches extremely short accidental taps)
      const durationMs = recorderState.durationMillis;
      validateRecordingDuration(durationMs);

      // Transcribe (Azure will validate if actual speech was detected)
      console.log('[VoiceInteraction] Transcribing with Azure...');
      const transcribedText = await stt.transcribe(uri);
      setTranscription(transcribedText);

      if (!contextString) {
        throw new Error('No context available');
      }

      // Get answer
      console.log('[VoiceInteraction] Getting answer...');
      const answerText = await gemini.answerQuestion(transcribedText, contextString);
      setAnswer(answerText);

      // Speak answer
      console.log('[VoiceInteraction] Speaking answer...', voiceIdentifier ? `with voice ${voiceIdentifier}` : 'default voice');
      await tts.speak(answerText, { voice: voiceIdentifier });

      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      const error = err instanceof Error ? err : new Error('Processing failed');
      setError(error);
      throw error;
    }
  }, [contextString, recorder, recorderState, stt, gemini, tts, voiceIdentifier]);

  const cancel = useCallback(async () => {
    if (recorderState.isRecording) {
      await recorder.stop();
    }
    await tts.stop();
    setIsProcessing(false);
    setTranscription('');
    setAnswer('');
    setError(null);
  }, [recorder, recorderState, tts]);

  return {
    // State
    isRecording: recorderState.isRecording,
    isTranscribing: stt.isTranscribing,
    isSpeaking: tts.isSpeaking,
    isProcessing,
    duration: recorderState.durationMillis,
    transcription,
    answer,
    error,
    
    // Actions
    getVoices: tts.getVoices, // Expose getVoices directly
    startVoiceQuestion,
    stopAndProcess,
    cancel,
    stopSpeaking: tts.stop,
  };
}
