import type { ICardLayout } from "./types";

export const DEFAULT_TITLE =
  "We operate at the intersection of technology, finance, and wellness.";

export const DEFAULT_ACTION_LABEL = "Find your perfect choice";
export const DEFAULT_PHOTOS = [
  "https://i.pinimg.com/736x/3c/bc/25/3cbc25ddad166dafa64667e570236bc9.jpg",
  "https://i.pinimg.com/736x/c1/2a/02/c12a02e6e7b5f4c719412afc8fa6793d.jpg",
  "https://i.pinimg.com/736x/c0/ef/6b/c0ef6b961889fb9f19c36f8c5a021cb6.jpg",
] as const;

export const CONTENT_HORIZONTAL_PADDING = 24;
export const STACK_WIDTH = 320;
export const STACK_HEIGHT = 236;
export const CARD_WIDTH = 124;
export const CARD_HEIGHT = 124;
export const CARD_RADIUS = 22;
export const CARD_BORDER_WIDTH = 5.5;

export const CARD_LAYOUTS: ICardLayout[] = [
  { rotate: -2, translateX: -2, translateY: -20 },
  { rotate: -13, translateX: -78, translateY: 12 },
  { rotate: 9, translateX: 76, translateY: 6 },
];

export const ENTRANCE_START_SCALE = 0.88;

export const ENTRANCE_STAGGER = 90;

export const ENTRANCE_SPRING = {
  damping: 14,
  stiffness: 120,
  mass: 0.9,
} as const;

export const FLOAT_DISTANCE = 6;

export const FLOAT_DURATION = 2600;

export const FLOAT_STAGGER = 320;

export const ACTION_HEIGHT = 40;

export const ACTION_HORIZONTAL_PADDING = 18;

import { theme } from "@/theme";

export const EMPTY_COLLECTION_THEME = {
  light: {
    screen: theme.light.background,
    card: theme.light.surface,
    placeholder: theme.light.surfaceMuted,
    title: theme.light.textPrimary,
    action: theme.light.actionPrimary,
    actionPressed: theme.light.actionPrimaryPressed,
    actionBorder: theme.light.borderSubtle,
    actionLabel: theme.light.actionPrimaryLabel,
  },
  dark: {
    screen: theme.dark.background,
    card: theme.light.surface,
    placeholder: theme.dark.surfaceMuted,
    title: theme.dark.textPrimary,
    action: theme.dark.actionPrimary,
    actionPressed: theme.dark.actionPrimaryPressed,
    actionBorder: theme.dark.borderSubtle,
    actionLabel: theme.dark.actionPrimaryLabel,
  },
} as const;

export const COLORS = EMPTY_COLLECTION_THEME.light;
