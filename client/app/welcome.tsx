import React from "react";
import { StatusBar } from "expo-status-bar";
import { WelcomeScreenV4 } from "@/components/blocks/welcome-v4";
import { useOnboarding } from "@/context/onboarding-context";
import { useTheme } from "@/context/theme-context";

export default function WelcomeRoute() {
  const { completeOnboarding } = useOnboarding();
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <WelcomeScreenV4
        wordmark="voicequery"
        headline={[
          { kind: "word", text: "Your", muted: true },
          {
            kind: "avatar",
            background: theme.accentLavender,
            source: "https://api.dicebear.com/9.x/lorelei/png?seed=Milo",
          },
          { kind: "word", text: "documents" },
          { kind: "word", text: "can", muted: true },
          { kind: "word", text: "talk" },
          { kind: "word", text: "back." },
          {
            kind: "avatar",
            background: theme.accentMint,
            source: "https://api.dicebear.com/9.x/bottts/png?seed=Coco",
          },
        ]}
        actions={[
          {
            key: "get_started",
            label: "Get Started",
            variant: "primary",
          },
        ]}
        legalPrefix="By continuing, you agree to our"
        legalLinks={[
          { key: "privacy", label: "Privacy Policy" },
          { key: "terms", label: "Terms of Use" },
        ]}
        legalSuffix="All document processing is private and on-device first."
        onActionPress={() => {
          completeOnboarding();
        }}
      />
    </>
  );
}
