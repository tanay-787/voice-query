import { getWebSocketBaseUrl } from "./api";

export type VoiceSessionStatus = "disconnected" | "connecting" | "connected" | "error";

export interface SessionReadyEvent {
  type: "SESSION_READY";
  doc_id: string;
  title: string;
  page_count: number;
  active_page: number;
}

export interface NavigatePageEvent {
  type: "NAVIGATE_PAGE";
  page: number;
  quote?: string;
}

export interface TranscriptionEvent {
  type: "TRANSCRIPTION";
  role: "user" | "assistant";
  text: string;
}

export interface InterruptEvent {
  type: "INTERRUPT";
}

export interface BotStartedSpeakingEvent {
  type: "BOT_STARTED_SPEAKING";
}

export interface BotStoppedSpeakingEvent {
  type: "BOT_STOPPED_SPEAKING";
}

export interface ErrorEvent {
  type: "ERROR";
  message: string;
}

export type VoiceSessionEvent =
  | SessionReadyEvent
  | NavigatePageEvent
  | TranscriptionEvent
  | InterruptEvent
  | BotStartedSpeakingEvent
  | BotStoppedSpeakingEvent
  | ErrorEvent;

export interface VoiceSessionCallbacks {
  onStatusChange?: (status: VoiceSessionStatus) => void;
  onEvent?: (event: VoiceSessionEvent) => void;
  onAudioData?: (data: ArrayBuffer) => void;
  onError?: (error: Error) => void;
}

/**
 * Low-level WebSocket client for the Pipecat real-time voice pipeline.
 * Multiplexes text/JSON control frames (reading position, citations, interruptions)
 * with raw 16kHz binary PCM audio frames.
 */
export class VoiceSessionClient {
  private ws: WebSocket | null = null;
  private docId: string;
  private initialPage: number;
  private callbacks: VoiceSessionCallbacks;
  private status: VoiceSessionStatus = "disconnected";

  constructor(docId: string, initialPage: number = 1, callbacks: VoiceSessionCallbacks = {}) {
    this.docId = docId;
    this.initialPage = initialPage;
    this.callbacks = callbacks;
  }

  public getStatus(): VoiceSessionStatus {
    return this.status;
  }

  private setStatus(status: VoiceSessionStatus) {
    if (this.status === status) return;
    this.status = status;
    this.callbacks.onStatusChange?.(status);
  }

  public connect(): void {
    if (this.ws) {
      this.disconnect();
    }

    const wsBase = getWebSocketBaseUrl();
    const url = `${wsBase}/ws/session/${encodeURIComponent(this.docId)}?page=${this.initialPage}`;
    console.log(`[VoiceSession] Connecting to WebSocket: ${url}`);
    this.setStatus("connecting");

    try {
      this.ws = new WebSocket(url);
      this.ws.binaryType = "arraybuffer";

      this.ws.onopen = () => {
        console.log(`[VoiceSession] WebSocket connected for doc ${this.docId}`);
        this.setStatus("connected");
      };

      this.ws.onmessage = (event) => {
        if (typeof event.data === "string") {
          try {
            const parsed = JSON.parse(event.data) as VoiceSessionEvent;
            console.log(`[VoiceSession] Frame received: ${parsed.type}`, parsed);
            this.callbacks.onEvent?.(parsed);
          } catch {
            console.warn(`[VoiceSession] Non-JSON text frame received:`, event.data);
          }
        } else if (event.data instanceof ArrayBuffer) {
          this.callbacks.onAudioData?.(event.data);
        }
      };

      this.ws.onerror = (err) => {
        console.warn(`[VoiceSession] WebSocket error:`, err);
        this.callbacks.onError?.(new Error("Voice session WebSocket connection error"));
        this.setStatus("error");
      };

      this.ws.onclose = (event) => {
        console.log(
          `[VoiceSession] WebSocket closed (code: ${event.code}, reason: "${event.reason || "none"}")`
        );
        this.setStatus("disconnected");
        this.ws = null;
      };
    } catch (err: any) {
      console.error(`[VoiceSession] Failed to initialize WebSocket:`, err);
      this.callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
      this.setStatus("error");
    }
  }

  /**
   * Synchronizes the user's active page with Pipecat's RAG context.
   */
  public sendReadingPosition(page: number): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    console.log(`[VoiceSession] Syncing reading position to Page ${page}`);
    this.ws.send(JSON.stringify({ type: "SET_READING_POSITION", page }));
  }

  /**
   * Interrupts the ongoing speech generation upstream.
   */
  public interrupt(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    console.log(`[VoiceSession] Sending interruption request`);
    this.ws.send(JSON.stringify({ type: "INTERRUPT" }));
  }

  /**
   * Streams raw 16kHz PCM audio chunk from microphone to server.
   */
  public sendAudioChunk(chunk: ArrayBuffer | Uint8Array): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    this.ws.send(chunk);
  }

  public disconnect(): void {
    if (this.ws) {
      console.log(`[VoiceSession] Disconnecting session for doc ${this.docId}`);
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onerror = null;
      this.ws.onclose = null;
      if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
        this.ws.close();
      }
      this.ws = null;
    }
    this.setStatus("disconnected");
  }
}
