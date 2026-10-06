import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { RippleButton } from "@/components/primitives/ripple-button";
import { EmptyCollectionState } from "@/components/blocks/empty-collection-v1";
import { PdfCanvas } from "@/components/organisms/pdf-canvas";
import { useOnboarding } from "@/context/onboarding-context";
import { useTheme } from "@/context/theme-context";

interface SelectedDocument {
  uri: string;
  name: string;
}

export default function DocumentCanvasScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { resetOnboarding } = useOnboarding();
  const { theme, isDark } = useTheme();

  const [activeDoc, setActiveDoc] = useState<SelectedDocument | null>(null);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setActiveDoc({
          uri: asset.uri,
          name: asset.name,
        });
      }
    } catch (error) {
      console.warn("Document picker error", error);
    }
  };

  const handleCloseDocument = () => {
    setActiveDoc(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Top Header */}
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

        {activeDoc ? (
          <View style={styles.titleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              style={[styles.docTitleText, { color: theme.textPrimary }]}
            >
              {activeDoc.name}
            </Text>
          </View>
        ) : null}

        {activeDoc ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close document"
            style={[styles.closeButton, { backgroundColor: theme.surfaceMuted }]}
            onPress={handleCloseDocument}
          >
            <Feather name="x" size={16} color={theme.textPrimary} />
          </Pressable>
        ) : (
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
        )}
      </View>

      {/* Main Content: Native Canvas vs Empty State */}
      {activeDoc ? (
        <View style={styles.canvasContainer}>
          <PdfCanvas sourceUri={activeDoc.uri} />
        </View>
      ) : (
        <EmptyCollectionState
          title="Your library is clear. Import a PDF or paper to generate vocal briefings and ask questions."
          actionLabel="Pick a Document"
          onActionPress={handlePickDocument}
        />
      )}
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
    gap: 12,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  docTitleText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  debugButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  debugButtonText: {
    fontSize: 12,
  },
  canvasContainer: {
    flex: 1,
  },
});
