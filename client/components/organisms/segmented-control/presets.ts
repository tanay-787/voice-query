import type { ViewStyle } from "react-native";
import { theme } from "@/theme";

const SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
} as const;
const SegmentedControlPresets = {
  light: {
    segmentedControlBackgroundColor: theme.light.surfaceMuted,
    activeSegmentBackgroundColor: theme.light.surface,
    dividerColor: theme.light.borderSubtle,
  },
  dark: {
    segmentedControlBackgroundColor: theme.dark.background,
    activeSegmentBackgroundColor: theme.dark.surfaceMuted,
    dividerColor: theme.dark.borderSubtle,
  },
  ios: {
    segmentedControlBackgroundColor: "#E5E5EA",
    activeSegmentBackgroundColor: "#FFFFFF",
    dividerColor: "#00000020",
  },
  ocean: {
    segmentedControlBackgroundColor: "#0C4A6E",
    activeSegmentBackgroundColor: "#0369A1",
    dividerColor: "#0284C7",
  },
  sunset: {
    segmentedControlBackgroundColor: "#7C2D12",
    activeSegmentBackgroundColor: "#9A3412",
    dividerColor: "#C2410C",
  },
  forest: {
    segmentedControlBackgroundColor: "#14532D",
    activeSegmentBackgroundColor: "#166534",
    dividerColor: "#15803D",
  },
  purple: {
    segmentedControlBackgroundColor: "#581C87",
    activeSegmentBackgroundColor: "#6B21A8",
    dividerColor: "#7E22CE",
  },
  rose: {
    segmentedControlBackgroundColor: "#881337",
    activeSegmentBackgroundColor: "#9F1239",
    dividerColor: "#BE123C",
  },
} as const;

export { SegmentedControlPresets, SHADOW };
