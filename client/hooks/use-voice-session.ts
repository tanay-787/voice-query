import { useCallback, useEffect, useRef, useState } from "react";
import {
  VoiceSessionClient,
  type VoiceSessionStatus,
  type VoiceSessionEvent,
} from "@/services/voice-session";

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

  const clientRef = useRef<VoiceSessionClient | null>(null);
  const onCitationNavigateRef = useRef(onCitationNavigate);
  onCitationNavigateRef.current = onCitationNavigate;

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      },
      onEvent: (event: VoiceSessionEvent) => {
        if (event.type === "NAVIGATE_PAGE") {
          setLastCitation({ page: event.page, quote: event.quote });
          onCitationNavigateRef.current?.(event.page);
        } else if (event.type === "TRANSCRIPTION") {
          setLastTranscript(event.text);
        }
      },
      onError: (err) => {
        console.warn("[useVoiceSession] Error:", err.message);
      },
    });

    clientRef.current = client;
    client.connect();
  }, [docId, currentPage]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
    setStatus("disconnected");
  }, []);

  const toggle = useCallback(() => {
    if (status === "connected" || status === "connecting") {
      disconnect();
    } else {
      connect();
    }
  }, [status, connect, disconnect]);

  const interrupt = useCallback(() => {
    clientRef.current?.interrupt();
  }, []);

  const sendReadingPosition = useCallback((page: number) => {
    clientRef.current?.sendReadingPosition(page);
  }, []);

  return {
    status,
    isConnected: status === "connected",
    isConnecting: status === "connecting",
    lastCitation,
    lastTranscript,
    connect,
    disconnect,
    toggle,
    interrupt,
    sendReadingPosition,
  };
}
