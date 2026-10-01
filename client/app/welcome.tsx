import React from "react";
import { StatusBar } from "expo-status-bar";
import { WelcomeScreenV4 } from "@/components/blocks/welcome-v4";
import { useOnboarding } from "@/context/onboarding-context";

export default function WelcomeRoute() {
  const { completeOnboarding } = useOnboarding();

  return (
    <>
      <StatusBar style="dark" />
      <WelcomeScreenV4
        wordmark="voicequery"
        headline={[
          { kind: "word", text: "documents" },
          {
            kind: "avatar",
            background: "#dcd8f7",
            emoji: "🎙️",
          },
          { kind: "word", text: "that" },
          { kind: "word", text: "you", muted: true },
          { kind: "word", text: "can", muted: true },
          { kind: "word", text: "hear" },
          { kind: "word", text: "and" },
          { kind: "word", text: "ask" },
          {
            kind: "avatar",
            background: "#cfe6d2",
            emoji: "📄",
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
