import type { StyleProp, ViewStyle } from "react-native";
import type { VoiceSessionStatus } from "@/services/voice-session";

export interface VoicePillProps {
  status: VoiceSessionStatus;
  activePage?: number;
  lastCitation?: { page: number; quote?: string } | null;
  onToggle: () => void;
  onInterrupt?: () => void;
  style?: StyleProp<ViewStyle>;
}
