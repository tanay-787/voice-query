import type { DimensionValue, StyleProp, ViewStyle } from "react-native";
import { SegmentedControlPresets } from "./presets";

type SegmentedControlPreset = keyof typeof SegmentedControlPresets;

interface ISegmentedControl {
  children: React.ReactNode;
  onChange: (index: number) => void;
  currentIndex: number;
  readonly theme?: "light" | "dark";
  readonly preset?: SegmentedControlPreset;
  readonly segmentedControlBackgroundColor?: string;
  readonly activeSegmentBackgroundColor?: string;
  readonly paddingVertical?: number;
  readonly dividerColor?: string;
  readonly borderRadius?: number;
  readonly disableScaleEffect?: boolean;
  readonly hideDividers?: boolean;
  /** Total width of the control. Defaults to the screen width minus 32. */
  readonly width?: DimensionValue;
  /** Orientation of the segmented control. Defaults to "horizontal". */
  readonly orientation?: "horizontal" | "vertical";
  /** Height per segment item when in vertical mode. Defaults to 56. */
  readonly itemHeight?: number;
  /** Optional container style override. */
  readonly style?: StyleProp<ViewStyle>;
}

export { ISegmentedControl, SegmentedControlPreset };
