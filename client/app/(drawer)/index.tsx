import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { RippleButton } from "@/components/primitives/ripple-button";
import { EmptyCollectionState } from "@/components/blocks/empty-collection-v1";
import { useOnboarding } from "@/context/onboarding-context";
import { useTheme } from "@/context/theme-context";

export default function DocumentCanvasScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { resetOnboarding } = useOnboarding();
  const { theme, isDark } = useTheme();

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.[0]) {
        console.log("Document selected:", result.assets[0].name, result.assets[0].uri);
      }
    } catch (error) {
      console.warn("Document picker error", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Top Header with Drawer Trigger & Debug Reset */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: theme.background,
          },
        ]}
      >
        <RippleButton
          size="sm"
          variant="default"
          accessibilityLabel="Open Sessions"
          icon={<Feather name="menu" size={13} color={theme.actionPrimaryLabel} />}
          onPress={() => navigation.openDrawer()}
        >
          Sessions
        </RippleButton>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reset Onboarding"
          style={styles.debugButton}
          onPress={resetOnboarding}
        >
          <Text style={[styles.debugButtonText, { color: theme.textTertiary }]}>
            Reset Onboarding
          </Text>
        </Pressable>
      </View>

      {/* Reacticx EmptyCollectionState Block */}
      <EmptyCollectionState
        title="Your library is clear. Import a PDF or paper to generate vocal briefings and ask questions."
        actionLabel="Pick a Document"
        onActionPress={handlePickDocument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  debugButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  debugButtonText: {
    fontSize: 12,
  },
});
