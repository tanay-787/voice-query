import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import * as DocumentPicker from "expo-document-picker";
import { EmptyCollectionState } from "@/components/blocks/empty-collection-v1";
import { useOnboarding } from "@/context/onboarding-context";

export default function DocumentCanvasScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { resetOnboarding } = useOnboarding();

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
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Header with Drawer Trigger & Debug Reset */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open Sessions"
          style={({ pressed }) => [
            styles.drawerButton,
            pressed && styles.drawerButtonPressed,
          ]}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={styles.drawerButtonText}>☰ Sessions</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reset Onboarding"
          style={styles.debugButton}
          onPress={resetOnboarding}
        >
          <Text style={styles.debugButtonText}>Reset Onboarding</Text>
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
    backgroundColor: "#f7f7f6",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f6",
    zIndex: 10,
  },
  drawerButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#1f1f1f",
  },
  drawerButtonPressed: {
    backgroundColor: "#0a0a0a",
  },
  drawerButtonText: {
    color: "#f3f1f1",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  debugButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  debugButtonText: {
    color: "#999999",
    fontSize: 12,
  },
});
