import React from "react";
import { Stack } from "expo-router";
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
  return (
    <ThemeProvider>
      <OnboardingProvider>
        <RootNavigation />
      </OnboardingProvider>
    </ThemeProvider>
  );
}
