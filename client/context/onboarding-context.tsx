import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash screen might already be hidden or unconfigured in dev
});

const ONBOARDING_STORAGE_KEY = "voicequery_has_seen_onboarding";

interface OnboardingContextValue {
  hasSeenOnboarding: boolean;
  isLoading: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStatus() {
      try {
        const stored = await SecureStore.getItemAsync(ONBOARDING_STORAGE_KEY);
        setHasSeenOnboarding(stored === "true");
      } catch (error) {
        console.warn("Failed to load onboarding status from storage", error);
        setHasSeenOnboarding(false);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync().catch(() => {});
      }
    }

    loadStatus();
  }, []);

  const completeOnboarding = async () => {
    try {
      await SecureStore.setItemAsync(ONBOARDING_STORAGE_KEY, "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.warn("Failed to save onboarding status", error);
      setHasSeenOnboarding(true);
    }
  };

  const resetOnboarding = async () => {
    try {
      await SecureStore.deleteItemAsync(ONBOARDING_STORAGE_KEY);
      setHasSeenOnboarding(false);
    } catch (error) {
      console.warn("Failed to reset onboarding status", error);
      setHasSeenOnboarding(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasSeenOnboarding,
        isLoading,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
