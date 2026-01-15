/**
 * ThemedIcon Component
 * Reusable wrapper for Ionicons that automatically applies theme colors
 * Simplifies icon usage by handling useThemeColor internally
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from 'heroui-native';
import type { ComponentProps } from 'react';
import React from 'react';

type IoniconsProps = ComponentProps<typeof Ionicons>;
type ThemeColor = Parameters<typeof useThemeColor>[0];

export interface ThemedIconProps extends Omit<IoniconsProps, 'color'> {
  /**
   * Ionicons name (e.g., 'send', 'document-outline')
   */
  name: IoniconsProps['name'];
  
  /**
   * Icon size in pixels
   * @default 20
   */
  size?: number;
  
  /**
   * Theme color token to use for the icon color
   * @default 'foreground'
   * @example 'accent-foreground' | 'muted' | 'accent-soft-foreground'
   */
  themeColor?: ThemeColor extends Array<infer U> ? U : ThemeColor;
  
  /**
   * Optional override color (bypasses theme)
   * Use sparingly - prefer themeColor for theme consistency
   */
  color?: string;
}

/**
 * ThemedIcon - Ionicons with automatic theme color application
 * 
 * @example
 * // Basic usage with default foreground color
 * <ThemedIcon name="send" size={20} />
 * 
 * @example
 * // With specific theme color
 * <ThemedIcon name="document-outline" size={20} themeColor="accent-foreground" />
 * 
 * @example
 * // For primary button icons
 * <ThemedIcon name="add" size={20} themeColor="accent-foreground" />
 * 
 * @example
 * // For secondary button icons
 * <ThemedIcon name="bookmark" size={20} themeColor="accent-soft-foreground" />
 * 
 * @example
 * // For muted/ghost button icons
 * <ThemedIcon name="close" size={20} themeColor="muted" />
 */
export function ThemedIcon({ 
  name, 
  size = 20, 
  themeColor = 'foreground',
  color,
  ...restProps 
}: ThemedIconProps) {
  const [themeColorValue] = useThemeColor([themeColor as any]);
  
  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={color ?? themeColorValue}
      {...restProps}
    />
  );
}

/**
 * Pre-configured icon variants for common use cases
 */
export const ThemedIconVariants = {
  /** For primary buttons (accent-foreground) */
  Primary: (props: Omit<ThemedIconProps, 'themeColor'>) => (
    <ThemedIcon {...props} themeColor="accent-foreground" />
  ),
  
  /** For secondary buttons (accent-soft-foreground) */
  Secondary: (props: Omit<ThemedIconProps, 'themeColor'>) => (
    <ThemedIcon {...props} themeColor="accent-soft-foreground" />
  ),
  
  /** For ghost/muted buttons (muted) */
  Muted: (props: Omit<ThemedIconProps, 'themeColor'>) => (
    <ThemedIcon {...props} themeColor="muted" />
  ),
  
  /** For danger/destructive actions (danger-foreground) */
  Danger: (props: Omit<ThemedIconProps, 'themeColor'>) => (
    <ThemedIcon {...props} themeColor="danger-foreground" />
  ),
};
