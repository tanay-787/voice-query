import React from "react";
import { Stack } from "expo-router";
import { OnboardingProvider, useOnboarding } from "@/context/onboarding-context";

function RootNavigation() {
  const { hasSeenOnboarding, isLoading } = useOnboarding();

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
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
    <OnboardingProvider>
      <RootNavigation />
    </OnboardingProvider>
  );
}
