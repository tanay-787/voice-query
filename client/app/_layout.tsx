import React from "react";
import { Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { OnboardingProvider, useOnboarding } from "@/context/onboarding-context";
import { ThemeProvider, useTheme } from "@/context/theme-context";

function RootNavigation() {
  const { hasSeenOnboarding, isLoading } = useOnboarding();
  const { theme } = useTheme();

  if (isLoading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Protected guard={!hasSeenOnboarding}>
        <Stack.Screen name="welcome" />
      </Stack.Protected>

      <Stack.Protected guard={hasSeenOnboarding}>
        <Stack.Screen name="(drawer)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <OnboardingProvider>
        <RootNavigation />
      </OnboardingProvider>
    </ThemeProvider>
  );
}
