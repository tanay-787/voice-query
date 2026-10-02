export const theme = {
  light: {
    // Canvas & Surfaces
    background: "#F7F7F6",
    surface: "#FFFFFF",
    surfaceMuted: "#F5F7FA",

    // Typography
    textPrimary: "#111111",
    textSecondary: "#6D7480",
    textTertiary: "#9A9A9A",

    // Interactive Actions & Buttons
    actionPrimary: "#1F1F1F",
    actionPrimaryPressed: "#0A0A0A",
    actionPrimaryLabel: "#FFFFFF",
    actionSecondary: "#F0F0F0",
    actionSecondaryPressed: "#E4E4E4",
    actionSecondaryLabel: "#111111",

    // Borders & Dividers
    border: "rgba(0, 0, 0, 0.08)",
    borderSubtle: "#E3E7EC",

    // Functional & Brand Accents
    accentLavender: "#DCD8F7",
    accentMint: "#CFE6D2",
    success: "#34C759",
    destructive: "#DC2626",
  },
  dark: {
    // Canvas & Surfaces
    background: "#171716",
    surface: "#18181B",
    surfaceMuted: "#2B2A25",

    // Typography
    textPrimary: "#F6F3EC",
    textSecondary: "#A1A1AA",
    textTertiary: "#71717A",

    // Interactive Actions & Buttons
    actionPrimary: "#F6F3EC",
    actionPrimaryPressed: "#E7E3DA",
    actionPrimaryLabel: "#111111",
    actionSecondary: "#2A2A27",
    actionSecondaryPressed: "#343430",
    actionSecondaryLabel: "#F6F3EC",

    // Borders & Dividers
    border: "rgba(255, 255, 255, 0.08)",
    borderSubtle: "#2B2A25",

    // Functional & Brand Accents
    accentLavender: "#5B5282",
    accentMint: "#3D5A42",
    success: "#4ADE80",
    destructive: "#F87171",
  },
} as const;

export type ThemeMode = "light" | "dark";
export type AppTheme = (typeof theme)[ThemeMode];
