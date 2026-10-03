import React, { memo, useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedProps,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { SegmentedControlPresets, SHADOW } from "./presets";
import type { ISegmentedControl } from "./types";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { BlurView, type BlurViewProps } from "expo-blur";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { scheduleOnRN } from "react-native-worklets";
import { useThemeMode } from "@/context/theme-context";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const DEFAULT_WIDTH = Dimensions.get("screen").width - 32;

const SegmentedControl: React.FC<ISegmentedControl> &
  React.FunctionComponent<ISegmentedControl> = ({
  children,
  onChange,
  currentIndex,
  theme: themeProp,
  preset,
  segmentedControlBackgroundColor,
  activeSegmentBackgroundColor,
  paddingVertical = 12,
  dividerColor,
  borderRadius = 8,
  disableScaleEffect = false,
  hideDividers = false,
  width = DEFAULT_WIDTH,
  orientation = "horizontal",
  itemHeight = 56,
  style,
}: ISegmentedControl):
  | (React.ReactNode & React.JSX.Element & React.ReactElement)
  | null => {
  const isVertical = orientation === "vertical";
  const activeMode = useThemeMode(themeProp);
  const resolvedPreset = preset ?? activeMode;
  const theme =
    SegmentedControlPresets[resolvedPreset] ??
    SegmentedControlPresets[activeMode];
  const finalSegmentedControlBackgroundColor =
    segmentedControlBackgroundColor ?? theme.segmentedControlBackgroundColor;
  const finalActiveSegmentBackgroundColor =
    activeSegmentBackgroundColor ?? theme.activeSegmentBackgroundColor;
  const finalDividerColor = dividerColor ?? theme.dividerColor;

  const childrenArray = React.Children.toArray(children);
  const tabsCount = childrenArray.length;

  const numericWidth = typeof width === "number" ? width : DEFAULT_WIDTH;
  const translateValue = isVertical
    ? itemHeight
    : (numericWidth - 4) / tabsCount;

  const tabTranslate = useSharedValue<number>(currentIndex * translateValue);
  const blurAmount = useSharedValue<number>(0);
  const isDragging = useSharedValue<boolean>(false);
  const dragStartIndex = useRef<number>(currentIndex);

  const activeScale = useSharedValue(1);

  const triggerBlur = useCallback(() => {
    blurAmount.value = withSequence<number>(
      withTiming<number>(10, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming<number>(0, {
        duration: 400,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, []);

  const triggerTapScale = useCallback(() => {
    if (disableScaleEffect) return;
    const targetScale = isVertical ? 1.015 : 1.25;
    activeScale.value = withSequence<number>(
      withTiming<number>(targetScale, { duration: 350 }),
      withSpring<number>(1, { stiffness: 10, damping: 5, mass: 0.8 }),
    );
  }, [disableScaleEffect, isVertical]);

  const memoizedTabPressCallback = useCallback(
    (index: number) => {
      onChange(index);
      if (!isDragging.value) {
        triggerBlur();
        triggerTapScale();
        impactAsync(ImpactFeedbackStyle.Medium);
      }
    },
    [onChange, triggerBlur, triggerTapScale],
  );

  useEffect(() => {
    tabTranslate.value = withSpring<number>(currentIndex * translateValue, {
      stiffness: 80,
      damping: 90,
      mass: 1,
    });
  }, [currentIndex, translateValue]);

  const animatedTabStyle = useAnimatedStyle<
    Partial<Pick<ViewStyle, "transform">>
  >(() => {
    return {
      transform: isVertical
        ? [
            { translateY: tabTranslate.value },
            { scale: activeScale.value },
          ]
        : [
            { translateX: tabTranslate.value },
            { scale: activeScale.value },
          ],
    };
  });

  const animatedBlurViewProps = useAnimatedProps<
    Required<Pick<BlurViewProps, "intensity">>
  >(() => {
    return {
      intensity: blurAmount.value,
    };
  });

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .onStart(() => {
      isDragging.value = true;
      dragStartIndex.current = currentIndex;
      if (disableScaleEffect) return;
      const dragScale = isVertical ? 1.02 : 1.2;
      activeScale.value = withSpring<number>(dragScale, {
        stiffness: 300,
        damping: 15,
      });
      scheduleOnRN(impactAsync, ImpactFeedbackStyle.Medium);
    })
    .onUpdate((event) => {
      const step = isVertical ? itemHeight : (numericWidth - 4) / tabsCount;
      const pos = isVertical ? event.y : event.x;
      const rawIndex = Math.floor(pos / step);
      const newIndex = Math.max(0, Math.min(tabsCount - 1, rawIndex));

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < tabsCount) {
        scheduleOnRN(onChange, newIndex);
        scheduleOnRN(impactAsync, ImpactFeedbackStyle.Rigid);
      }
    })
    .onEnd(() => {
      isDragging.value = false;
      activeScale.value = withSpring<number>(1, {
        stiffness: 200,
        damping: 20,
      });
      if (currentIndex !== dragStartIndex.current) {
        scheduleOnRN(triggerBlur);
        scheduleOnRN(impactAsync, ImpactFeedbackStyle.Medium);
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      activeScale.value = withSpring(1, { stiffness: 200, damping: 20 });
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          isVertical
            ? styles.verticalControlWrapper
            : styles.segmentedControlWrapper,
          {
            width,
            backgroundColor: finalSegmentedControlBackgroundColor,
            paddingVertical: isVertical ? 0 : paddingVertical,
            borderRadius,
          },
          style,
        ]}
      >
        <Animated.View
          style={[
            isVertical
              ? {
                  position: "absolute",
                  top: 2,
                  left: 2,
                  right: 2,
                  height: itemHeight - 4,
                  backgroundColor: finalActiveSegmentBackgroundColor,
                  borderRadius: Math.max(4, borderRadius - 2),
                  ...SHADOW,
                }
              : {
                  position: "absolute",
                  width: (numericWidth - 4) / tabsCount,
                  top: 0,
                  bottom: 0,
                  marginVertical: 2,
                  marginHorizontal: 2,
                  backgroundColor: finalActiveSegmentBackgroundColor,
                  borderRadius,
                  ...SHADOW,
                },
            animatedTabStyle,
          ]}
          pointerEvents="none"
        />

        {childrenArray.map<React.ReactNode>((child, index) => {
          const showDivider = index < tabsCount - 1;

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  isVertical
                    ? [styles.verticalItemWrapper, { height: itemHeight }]
                    : styles.textWrapper,
                ]}
                onPress={() => memoizedTabPressCallback(index)}
                activeOpacity={0.7}
              >
                {child}
              </TouchableOpacity>

              {showDivider && !hideDividers && (
                <AnimatedDivider
                  currentIndex={currentIndex}
                  dividerIndex={index}
                  color={finalDividerColor}
                  orientation={orientation}
                  itemHeight={itemHeight}
                />
              )}
            </React.Fragment>
          );
        })}

        <AnimatedBlurView
          style={[
            {
              overflow: "hidden",
              borderRadius,
              ...StyleSheet.absoluteFill,
            },
          ]}
          animatedProps={animatedBlurViewProps}
          tint={activeMode === "dark" ? "dark" : "default"}
          pointerEvents="none"
        />
      </Animated.View>
    </GestureDetector>
  );
};

const AnimatedDivider: React.FC<{
  currentIndex: number;
  dividerIndex: number;
  color: string;
  orientation?: "horizontal" | "vertical";
  itemHeight?: number;
}> = ({
  currentIndex,
  dividerIndex,
  color,
  orientation = "horizontal",
  itemHeight = 56,
}) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    const shouldFadeOut =
      dividerIndex === currentIndex || dividerIndex === currentIndex - 1;

    opacity.value = withTiming(shouldFadeOut ? 0 : 1, {
      duration: 200,
    });
  }, [currentIndex, dividerIndex]);

  const animatedDividerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (orientation === "vertical") {
    return (
      <Animated.View
        style={[
          styles.dividerHorizontal,
          {
            top: (dividerIndex + 1) * itemHeight,
            backgroundColor: color,
          },
          animatedDividerStyle,
        ]}
        pointerEvents="none"
      />
    );
  }

  return (
    <Animated.View
      style={[styles.divider, { backgroundColor: color }, animatedDividerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  verticalControlWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    position: "relative",
  },
  textWrapper: {
    flex: 1,
    elevation: 9,
    paddingHorizontal: 5,
  },
  verticalItemWrapper: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 12,
    zIndex: 2,
  },
  divider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
  },
  dividerHorizontal: {
    position: "absolute",
    left: 14,
    right: 14,
    height: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    zIndex: 1,
  },
});

export default memo(SegmentedControl);
