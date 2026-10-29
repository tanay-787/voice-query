import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAudioStream,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
} from "expo-audio";
import {
  VoiceSessionClient,
  type VoiceSessionStatus,
  type VoiceSessionEvent,
} from "@/services/voice-session";
import { PcmAudioPlayer } from "@/services/pcm-player";

interface UseVoiceSessionProps {
  docId: string | null;
  currentPage: number;
  onCitationNavigate?: (page: number) => void;
}

export function useVoiceSession({
  docId,
  currentPage,
  onCitationNavigate,
}: UseVoiceSessionProps) {
  const [status, setStatus] = useState<VoiceSessionStatus>("disconnected");
  const [lastCitation, setLastCitation] = useState<{ page: number; quote?: string } | null>(null);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);

  const setIsSpeakingSync = useCallback((speaking: boolean) => {
    isSpeakingRef.current = speaking;
    setIsSpeaking(speaking);
  }, []);

  const clientRef = useRef<VoiceSessionClient | null>(null);
  const onCitationNavigateRef = useRef(onCitationNavigate);
  onCitationNavigateRef.current = onCitationNavigate;

  const pcmPlayerRef = useRef<PcmAudioPlayer | null>(null);
  if (!pcmPlayerRef.current) {
    pcmPlayerRef.current = new PcmAudioPlayer((playing) => {
      setIsSpeakingSync(playing);
    });
  }

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup real-time PCM audio streaming from microphone
  const { stream: audioStream, isStreaming } = useAudioStream({
    sampleRate: 16000,
    channels: 1,
    encoding: "int16",
    onBuffer: (buffer) => {
      if (clientRef.current && status === "connected") {
        if (isSpeakingRef.current) {
          // Feed digital silence while assistant is speaking to prevent acoustic feedback loop
          const silence = new Uint8Array(buffer.data.byteLength);
          clientRef.current.sendAudioChunk(silence.buffer);
        } else {
          clientRef.current.sendAudioChunk(buffer.data);
        }
      }
    },
  });

  // Activate microphone hardware when WebSocket session connects
  useEffect(() => {
    let isCancelled = false;

    async function manageAudioCapture() {
      if (status === "connected") {
        try {
          const perm = await requestRecordingPermissionsAsync();
          if (!perm.granted) {
            console.warn("[useVoiceSession] Microphone permission was not granted.");
            return;
          }

          await setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
            interruptionMode: "duckOthers",
            shouldRouteThroughEarpiece: false,
          });

          if (!isCancelled && !audioStream.isStreaming) {
            await audioStream.start();
            console.log("[useVoiceSession] Native 16kHz PCM audio stream active.");
          }
        } catch (err) {
          console.error("[useVoiceSession] Error initiating microphone capture:", err);
        }
      } else {
        if (audioStream.isStreaming) {
          audioStream.stop();
          console.log("[useVoiceSession] Native audio stream stopped.");
        }
        pcmPlayerRef.current?.stop();
      }
    }

    manageAudioCapture();

    return () => {
      isCancelled = true;
    };
  }, [status, audioStream]);

  // Sync reading position whenever currentPage changes and session is connected
  useEffect(() => {
    if (status === "connected" && clientRef.current) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        clientRef.current?.sendReadingPosition(currentPage);
      }, 250);
    }
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentPage, status]);

  // Teardown when docId changes or component unmounts
  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
      pcmPlayerRef.current?.destroy();
    };
  }, [docId]);

  const connect = useCallback(() => {
    if (!docId) return;

    if (clientRef.current) {
      clientRef.current.disconnect();
    }

    const client = new VoiceSessionClient(docId, currentPage, {
      onStatusChange: (newStatus) => {
        setStatus(newStatus);
        if (newStatus !== "connected") {
          setIsSpeakingSync(false);
          pcmPlayerRef.current?.stop();
        }
      },
      onEvent: (event: VoiceSessionEvent) => {
        if (event.type === "NAVIGATE_PAGE") {
          setLastCitation({ page: event.page, quote: event.quote });
          onCitationNavigateRef.current?.(event.page);
        } else if (event.type === "TRANSCRIPTION") {
          setLastTranscript(event.text);
        } else if (event.type === "BOT_STARTED_SPEAKING") {
          setIsSpeakingSync(true);
          pcmPlayerRef.current?.clearBuffer();
        } else if (event.type === "BOT_STOPPED_SPEAKING") {
          pcmPlayerRef.current?.playBufferedTurn();
        } else if (event.type === "INTERRUPT") {
          pcmPlayerRef.current?.stop();
          setIsSpeakingSync(false);
        }
      },
      onAudioData: (data: ArrayBuffer) => {
        pcmPlayerRef.current?.appendChunk(data);
      },
      onError: (err) => {
        console.warn("[useVoiceSession] Error:", err.message);
      },
    });

    clientRef.current = client;
    client.connect();
  }, [docId, currentPage, setIsSpeakingSync]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
    pcmPlayerRef.current?.destroy();
    setStatus("disconnected");
    setIsSpeakingSync(false);
  }, [setIsSpeakingSync]);

  const toggle = useCallback(() => {
    if (status === "connected" || status === "connecting") {
      disconnect();
    } else {
      connect();
    }
  }, [status, connect, disconnect]);

  const interrupt = useCallback(() => {
    clientRef.current?.interrupt();
    pcmPlayerRef.current?.stop();
    setIsSpeakingSync(false);
  }, [setIsSpeakingSync]);

  const sendReadingPosition = useCallback((page: number) => {
    clientRef.current?.sendReadingPosition(page);
  }, []);

  return {
    status,
    isConnected: status === "connected",
    isConnecting: status === "connecting",
    isListening: isStreaming,
    isSpeaking,
    lastCitation,
    lastTranscript,
    connect,
    disconnect,
    toggle,
    interrupt,
    sendReadingPosition,
  };
}
