/**
 * useVoiceSession
 *
 * Orchestrates the full-duplex real-time conversational voice loop for VoiceQuery:
 * - Captures 16kHz Int16 Mono PCM audio via expo-audio's useAudioStream.
 * - Manages bidirectional WebSocket communication via VoiceSessionClient.
 * - Controls the half-duplex turn-taking state machine (Listening vs Speaking).
 * - Implements a 150ms CoreAudio teardown buffer when transitioning from speech
 *   playback back to mic recording to avoid AVAudioSessionErrorCodeCannotInterruptOthers.
 *
 * Invariants:
 * - Half-Duplex: Mic capture is stopped when assistant is speaking (BOT_STARTED_SPEAKING)
 *   to eliminate acoustic echo feedback.
 * - Re-Arm Cooldown: 150ms timer allows AVPlayer to detach before AVAudioEngine starts.
 *
 * See docs/architecture/voice-pipeline.md for full specification.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAudioStream,
  setAudioModeAsync,
  setIsAudioActiveAsync,
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
  const statusRef = useRef<VoiceSessionStatus>("disconnected");
  statusRef.current = status;

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

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rearmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup real-time PCM audio streaming from microphone
  const { stream: audioStream, isStreaming } = useAudioStream({
    sampleRate: 16000,
    channels: 1,
    encoding: "int16",
    onBuffer: (buffer) => {
      if (clientRef.current && statusRef.current === "connected" && !isSpeakingRef.current) {
        clientRef.current.sendAudioChunk(buffer.data);
      }
    },
  });

  const isStartingRecordingRef = useRef<boolean>(false);

  const startRecording = useCallback(async () => {
    if (isStartingRecordingRef.current) return;
    if (statusRef.current !== "connected" && statusRef.current !== "connecting") return;
    if (isSpeakingRef.current) return;
    if (audioStream.isStreaming) return;

    isStartingRecordingRef.current = true;
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
      await setIsAudioActiveAsync(true);

      if (!audioStream.isStreaming) {
        await audioStream.start();
        console.log("[useVoiceSession] Native 16kHz PCM audio stream active.");
      }
    } catch (err) {
      console.warn("[useVoiceSession] Error starting microphone stream:", err);
    } finally {
      isStartingRecordingRef.current = false;
    }
  }, [audioStream]);

  const stopRecording = useCallback(() => {
    if (rearmTimerRef.current) {
      clearTimeout(rearmTimerRef.current);
      rearmTimerRef.current = null;
    }
    try {
      if (audioStream.isStreaming) {
        audioStream.stop();
        console.log("[useVoiceSession] Native 16kHz PCM audio stream paused/stopped.");
      }
    } catch (err) {
      console.warn("[useVoiceSession] Error stopping microphone stream:", err);
    }
  }, [audioStream]);

  const startRecordingRef = useRef(startRecording);
  startRecordingRef.current = startRecording;

  const stopRecordingRef = useRef(stopRecording);
  stopRecordingRef.current = stopRecording;

  const pcmPlayerRef = useRef<PcmAudioPlayer | null>(null);
  if (!pcmPlayerRef.current) {
    pcmPlayerRef.current = new PcmAudioPlayer((playing) => {
      setIsSpeakingSync(playing);
      if (!playing && statusRef.current === "connected") {
        console.log("[useVoiceSession] Playback completed. Re-arming microphone for next turn...");
        if (rearmTimerRef.current) {
          clearTimeout(rearmTimerRef.current);
        }
        rearmTimerRef.current = setTimeout(() => {
          if (statusRef.current === "connected" && !isSpeakingRef.current) {
            startRecordingRef.current?.();
          }
        }, 150);
      }
    });
  }

  // Activate microphone hardware when WebSocket session connects
  useEffect(() => {
    if (status === "connected") {
      startRecordingRef.current?.();
    } else {
      stopRecordingRef.current?.();
      pcmPlayerRef.current?.stop();
    }
  }, [status]);

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
      if (rearmTimerRef.current) {
        clearTimeout(rearmTimerRef.current);
        rearmTimerRef.current = null;
      }
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
          stopRecording();
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
          stopRecording();
          pcmPlayerRef.current?.clearBuffer();
        } else if (event.type === "BOT_STOPPED_SPEAKING") {
          pcmPlayerRef.current
            ?.playBufferedTurn()
            .then((started) => {
              if (!started) {
                console.log("[useVoiceSession] No audio was buffered to play. Re-arming microphone.");
                setIsSpeakingSync(false);
                startRecording();
              }
            })
            .catch((err) => {
              console.error("[useVoiceSession] Error playing buffered turn:", err);
              setIsSpeakingSync(false);
              startRecording();
            });
        } else if (event.type === "INTERRUPT") {
          if (rearmTimerRef.current) {
            clearTimeout(rearmTimerRef.current);
            rearmTimerRef.current = null;
          }
          pcmPlayerRef.current?.stop();
          setIsSpeakingSync(false);
          startRecording();
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
  }, [docId, currentPage, setIsSpeakingSync, startRecording, stopRecording]);

  const disconnect = useCallback(() => {
    if (rearmTimerRef.current) {
      clearTimeout(rearmTimerRef.current);
      rearmTimerRef.current = null;
    }
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
    pcmPlayerRef.current?.destroy();
    stopRecording();
    setStatus("disconnected");
    setIsSpeakingSync(false);
  }, [setIsSpeakingSync, stopRecording]);

  const toggle = useCallback(() => {
    if (status === "connected" || status === "connecting") {
      disconnect();
    } else {
      connect();
    }
  }, [status, connect, disconnect]);

  const interrupt = useCallback(() => {
    if (rearmTimerRef.current) {
      clearTimeout(rearmTimerRef.current);
      rearmTimerRef.current = null;
    }
    clientRef.current?.interrupt();
    pcmPlayerRef.current?.stop();
    setIsSpeakingSync(false);
    startRecording();
  }, [setIsSpeakingSync, startRecording]);

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
