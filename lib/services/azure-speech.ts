import { File } from 'expo-file-system';
import { fetch } from 'expo/fetch';
import Constants from 'expo-constants';
import type { SpeechRecognitionResult } from '@/types/azure';

export interface AzureSpeechConfig {
  apiKey: string;
  region: string;
  language?: string; // e.g. 'en-US'
  voiceName?: string; // e.g. 'en-US-JennyNeural'
}

/**
 * Get Azure Speech configuration from environment
 */
export function getAzureSpeechConfig(): AzureSpeechConfig {
  const apiKey = Constants.expoConfig?.extra?.AZURE_SPEECH_SERVICE_KEY || 
                 process.env.AZURE_SPEECH_SERVICE_KEY;
  
  const region = Constants.expoConfig?.extra?.AZURE_REGION || 
                 process.env.AZURE_REGION || 
                 'southeastasia';

  return {
    apiKey,
    region,
    language: 'en-US'
  };
}

const getEndpoints = (region: string) => ({
  TTS: `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
  STT: `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`
});

/**
 * Converts text to speech and saves the audio to a file.
 * 
 * @param text The text to synthesize
 * @param fileUri The local URI to save the audio file to (e.g. FileSystem.documentDirectory + 'speech.wav')
 * @param config Azure API configuration
 * @returns The uri of the saved file
 */
export async function synthesizeSpeech(
  text: string,
  fileUri: string,
  config: AzureSpeechConfig
): Promise<string> {
  const { apiKey, region, language = 'en-US', voiceName = 'en-US-JennyNeural' } = config;
  
  if (!apiKey) throw new Error('Azure Speech API Key is required');
  if (!region) throw new Error('Azure Region is required');

  const endpoints = getEndpoints(region);

  const ssml = `
<speak version='1.0' xml:lang='${language}'>
  <voice xml:lang='${language}' xml:gender='Female' name='${voiceName}'>
    ${text}
  </voice>
</speak>`;

  // Use Array for headers to avoid NativeRequest casting issues on Android
  const headers: [string, string][] = [
    ['Ocp-Apim-Subscription-Key', apiKey],
    ['Content-Type', 'application/ssml+xml'],
    ['X-Microsoft-OutputFormat', 'riff-24khz-16bit-mono-pcm'],
    ['User-Agent', 'Expo-Azure-Speech']
  ];

  try {
    const response = await fetch(endpoints.TTS, {
      method: 'POST',
      headers: headers as unknown as Record<string, string>,
      body: ssml,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Azure TTS Error: ${response.status} ${errorText}`);
    }

    // Get the binary data
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    
    // Write directly using new File API
    const file = new File(fileUri);
    file.write(new Uint8Array(buffer));

    return fileUri;
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
}

/**
 * Transcribes audio from a file to text.
 * 
 * @param audioUri The local URI of the audio file (must be WAV/PCM usually 16kHz)
 * @param config Azure API configuration
 * @returns The transcribed text
 */
export async function recognizeSpeech(
  audioUri: string,
  config: AzureSpeechConfig
): Promise<SpeechRecognitionResult> {
  const { apiKey, region, language = 'en-US' } = config;
  
  if (!apiKey) throw new Error('Azure Speech API Key is required');
  if (!region) throw new Error('Azure Region is required');

  // New 2025-10-15 Transcription API endpoint
  const url = `https://${region}.api.cognitive.microsoft.com/speechtotext/transcriptions:transcribe?api-version=2025-10-15`;

  // Headers - fetch handles Content-Type for FormData automatically
  const headers: [string, string][] = [
    ['Ocp-Apim-Subscription-Key', apiKey],
    ['Accept', 'application/json']
  ];

  try {
    const formData = new FormData();
    
    // 1. Append definition JSON
    const definition = JSON.stringify({
      locales: [language],
      profanityFilterMode: 'Masked',
      channels: [0]
    });
    formData.append('definition', definition);

    // 2. Append audio file
    const audioFile = new File(audioUri);
    // Cast to Blob because TS might not fully recognize File as Blob in all environments
    formData.append('audio', audioFile as unknown as Blob);

    const response = await fetch(url, {
      method: 'POST',
      headers: headers as unknown as Record<string, string>,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Azure STT Error: ${response.status} ${errorText}`);
    }

    const result = await response.json() as SpeechRecognitionResult;
    
    // Map new API response format to expected format (DisplayText)
    // New API returns { combinedPhrases: [{ text: "..." }], ... }
    if (result.combinedPhrases && result.combinedPhrases.length > 0) {
      return {
        ...result,
        DisplayText: result.combinedPhrases[0].text,
        phrases: result.combinedPhrases
      };
    }

    return result;
  } catch (error) {
    console.error('Error recognizing speech:', error);
    throw error;
  }
}
