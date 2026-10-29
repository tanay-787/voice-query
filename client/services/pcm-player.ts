import {
  createAudioPlayer,
  setAudioModeAsync,
  setIsAudioActiveAsync,
  type AudioPlayer,
} from "expo-audio";
import { Paths, File } from "expo-file-system";

export function buildWavHeader(
  dataLength: number,
  sampleRate: number = 16000,
  numChannels: number = 1,
  bitsPerSample: number = 16
): Uint8Array {
  const header = new Uint8Array(44);
  const view = new DataView(header.buffer);

  // RIFF Chunk Descriptor
  header[0] = 0x52; // 'R'
  header[1] = 0x49; // 'I'
  header[2] = 0x46; // 'F'
  header[3] = 0x46; // 'F'
  view.setUint32(4, 36 + dataLength, true); // ChunkSize
  header[8] = 0x57; // 'W'
  header[9] = 0x41; // 'A'
  header[10] = 0x56; // 'V'
  header[11] = 0x45; // 'E'

  // "fmt " Subchunk
  header[12] = 0x66; // 'f'
  header[13] = 0x6d; // 'm'
  header[14] = 0x74; // 't'
  header[15] = 0x20; // ' '
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
  view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // "data" Subchunk
  header[36] = 0x64; // 'd'
  header[37] = 0x61; // 'a'
  header[38] = 0x74; // 't'
  header[39] = 0x61; // 'a'
  view.setUint32(40, dataLength, true); // Subchunk2Size

  return header;
}

export class PcmAudioPlayer {
  private chunks: Uint8Array[] = [];
  private activePlayer: AudioPlayer | null = null;
  private activeStatusSub: { remove: () => void } | null = null;
  private activeTempFile: File | null = null;
  private onPlaybackStateChange?: (isPlaying: boolean) => void;
  private safetyTimer: ReturnType<typeof setTimeout> | null = null;
  private isPlaying: boolean = false;

  constructor(onPlaybackStateChange?: (isPlaying: boolean) => void) {
    this.onPlaybackStateChange = onPlaybackStateChange;
  }

  public appendChunk(chunk: ArrayBuffer): void {
    const uint8 = new Uint8Array(chunk);
    this.chunks.push(uint8);

    // Safety net: in the unlikely event BOT_STOPPED_SPEAKING is delayed,
    // trigger playback after 3 seconds of stream inactivity so audio isn't lost.
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
    }
    this.safetyTimer = setTimeout(async () => {
      console.log(
        `[PcmAudioPlayer] Safety net triggered after 3000ms idle (${this.chunks.length} chunks queued).`
      );
      await this.playBufferedTurn();
    }, 3000);
  }

  public clearBuffer(): void {
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    this.chunks = [];
  }

  public hasBufferedAudio(): boolean {
    return this.chunks.length > 0;
  }

  public async playBufferedTurn(): Promise<boolean> {
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }

    if (this.chunks.length === 0) {
      return false;
    }

    let totalPcmBytes = 0;
    for (const c of this.chunks) {
      totalPcmBytes += c.byteLength;
    }

    if (totalPcmBytes === 0) {
      this.chunks = [];
      return false;
    }

    console.log(
      `[PcmAudioPlayer] Packaging ${totalPcmBytes} bytes (${this.chunks.length} chunks) of PCM into WAV...`
    );

    const wavHeader = buildWavHeader(totalPcmBytes, 16000, 1, 16);
    const wavBytes = new Uint8Array(wavHeader.byteLength + totalPcmBytes);
    wavBytes.set(wavHeader, 0);

    let offset = wavHeader.byteLength;
    for (const c of this.chunks) {
      wavBytes.set(c, offset);
      offset += c.byteLength;
    }

    this.chunks = [];

    try {
      this.stopActivePlayer();

      // Explicitly configure audio session for speaker playback
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: false,
          interruptionMode: "duckOthers",
          shouldRouteThroughEarpiece: false,
        });
        await setIsAudioActiveAsync(true);
      } catch (modeErr) {
        console.warn("[PcmAudioPlayer] Warning activating audio playback session:", modeErr);
      }

      const filename = `vq_speech_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.wav`;
      const tempFile = new File(Paths.cache, filename);
      tempFile.write(wavBytes);
      this.activeTempFile = tempFile;

      console.log(
        `[PcmAudioPlayer] Written WAV file to ${tempFile.uri} (size: ${wavBytes.byteLength} bytes)`
      );

      // keepAudioSessionActive prevents expo-audio from scheduling delayed session deactivation
      const player = createAudioPlayer(tempFile.uri, {
        keepAudioSessionActive: true,
      });
      player.volume = 1.0;
      this.activePlayer = player;

      this.activeStatusSub = player.addListener("playbackStatusUpdate", (status) => {
        if (status.didJustFinish) {
          console.log("[PcmAudioPlayer] Playback completed.");
          this.stop();
        }
      });

      player.play();
      this.isPlaying = true;
      this.onPlaybackStateChange?.(true);
      console.log(`[PcmAudioPlayer] Started playing assistant speech from ${tempFile.uri}`);
      return true;
    } catch (err) {
      console.error("[PcmAudioPlayer] Failed to play synthesized speech:", err);
      this.stop();
      return false;
    }
  }

  private stopActivePlayer(): void {
    if (this.activeStatusSub) {
      try {
        this.activeStatusSub.remove();
      } catch (err) {
        console.warn("[PcmAudioPlayer] Error removing status sub:", err);
      }
      this.activeStatusSub = null;
    }
    if (this.activePlayer) {
      try {
        this.activePlayer.pause();
        this.activePlayer.remove();
      } catch (err) {
        console.warn("[PcmAudioPlayer] Error pausing/removing active player:", err);
      }
      this.activePlayer = null;
    }
    this.cleanup();
  }

  public stop(): void {
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    this.stopActivePlayer();
    if (this.isPlaying) {
      this.isPlaying = false;
      this.onPlaybackStateChange?.(false);
    }
  }

  private cleanup(): void {
    if (this.activeTempFile && this.activeTempFile.exists) {
      try {
        this.activeTempFile.delete();
      } catch (err) {
        console.warn("[PcmAudioPlayer] Failed to delete temp audio file:", err);
      }
      this.activeTempFile = null;
    }
  }

  public destroy(): void {
    this.clearBuffer();
    this.stop();
  }
}
