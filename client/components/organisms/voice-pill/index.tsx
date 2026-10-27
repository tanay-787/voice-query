import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/theme-context";
import { RippleButton } from "@/components/primitives/ripple-button";
import type { VoicePillProps } from "./types";

export type { VoicePillProps };

export const VoicePill: React.FC<VoicePillProps> = ({
  status,
  activePage = 1,
  lastCitation,
  onToggle,
  onInterrupt,
  style,
}) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.wrapper, style]} pointerEvents="box-none">
      {/* Citation Toast Pill (when AI cites a page) */}
      {lastCitation ? (
        <View
          style={[
            styles.citationBadge,
            {
              backgroundColor: isDark
                ? "rgba(24, 24, 27, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <Feather name="bookmark" size={12} color={theme.success} />
          <Text style={[styles.citationText, { color: theme.textPrimary }]}>
            AI cited Page {lastCitation.page}
          </Text>
        </View>
      ) : null}

      {/* Main Interactive Voice Pill */}
      {status === "connected" ? (
        <View
          style={[
            styles.connectedBar,
            {
              backgroundColor: isDark
                ? "rgba(24, 24, 27, 0.92)"
                : "rgba(255, 255, 255, 0.95)",
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.statusDotRow}>
            <View style={[styles.pulseDot, { backgroundColor: theme.success }]} />
            <Text style={[styles.connectedLabel, { color: theme.textPrimary }]}>
              Voice Live • P.{activePage}
            </Text>
          </View>

          {onInterrupt && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Interrupt speech"
              style={[styles.miniActionBtn, { backgroundColor: theme.surfaceMuted }]}
              onPress={onInterrupt}
            >
              <Feather name="pause" size={13} color={theme.textPrimary} />
            </Pressable>
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="End voice session"
            style={[styles.miniActionBtn, { backgroundColor: theme.surfaceMuted }]}
            onPress={onToggle}
          >
            <Feather name="x" size={14} color={theme.destructive} />
          </Pressable>
        </View>
      ) : status === "connecting" ? (
        <RippleButton
          size="md"
          variant="secondary"
          loading
          accessibilityLabel="Connecting to voice session"
          onPress={onToggle}
          style={styles.pillButton}
        >
          Connecting...
        </RippleButton>
      ) : status === "error" ? (
        <RippleButton
          size="md"
          variant="destructive"
          icon={<Feather name="alert-circle" size={15} color="#FFFFFF" />}
          accessibilityLabel="Connection failed. Tap to retry"
          onPress={onToggle}
          style={styles.pillButton}
        >
          Retry Voice
        </RippleButton>
      ) : (
        <RippleButton
          size="md"
          variant="default"
          icon={<Feather name="mic" size={15} color={theme.actionPrimaryLabel} />}
          accessibilityLabel="Start real-time voice session"
          onPress={onToggle}
          style={styles.pillButton}
        >
          Start Voice
        </RippleButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  citationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  citationText: {
    fontSize: 12,
    fontWeight: "600",
  },
  connectedBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 7,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    gap: 10,
  },
  statusDotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  connectedLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  miniActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pillButton: {
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
});

export default VoicePill;
