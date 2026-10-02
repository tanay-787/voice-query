import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";
import { theme, type AppTheme, type ThemeMode } from "@/theme";

export type ThemePreference = "system" | "light" | "dark";

export interface IThemeContext {
  theme: AppTheme;
  mode: ThemeMode;
  isDark: boolean;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const getInitialMode = (): ThemeMode => {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
};

const initialMode = getInitialMode();
const defaultThemeContext: IThemeContext = {
  theme: theme[initialMode],
  mode: initialMode,
  isDark: initialMode === "dark",
  themePreference: "system",
  setThemePreference: () => {},
};

const ThemeContext = createContext<IThemeContext>(defaultThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");
  const [activeColorScheme, setActiveColorScheme] = useState<ThemeMode>(() =>
    Appearance.getColorScheme() === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setActiveColorScheme(colorScheme === "dark" ? "dark" : "light");
    });
    return () => listener.remove();
  }, []);

  const mode: ThemeMode = useMemo(() => {
    if (themePreference === "system") {
      const resolved = systemColorScheme ?? activeColorScheme;
      return resolved === "dark" ? "dark" : "light";
    }
    return themePreference;
  }, [themePreference, systemColorScheme, activeColorScheme]);

  const activeTheme = useMemo(() => theme[mode], [mode]);
  const isDark = mode === "dark";

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(activeTheme.background).catch(() => {});
  }, [activeTheme.background]);

  const value = useMemo(
    () => ({
      theme: activeTheme,
      mode,
      isDark,
      themePreference,
      setThemePreference,
    }),
    [activeTheme, mode, isDark, themePreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  return context ?? defaultThemeContext;
};

export const useThemeMode = (override?: ThemeMode): ThemeMode => {
  const context = useContext(ThemeContext);
  if (override) return override;
  return (
    context?.mode ??
    (Appearance.getColorScheme() === "dark" ? "dark" : "light")
  );
};

