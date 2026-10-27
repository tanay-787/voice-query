import React, { useRef } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { RippleButton } from "@/components/primitives/ripple-button";
import { EmptyCollectionState } from "@/components/blocks/empty-collection-v1";
import { PdfCanvas, type PdfCanvasRef } from "@/components/organisms/pdf-canvas";
import { VoicePill } from "@/components/organisms/voice-pill";
import { useVoiceSession } from "@/hooks/use-voice-session";
import { useOnboarding } from "@/context/onboarding-context";
import { useTheme } from "@/context/theme-context";
import { useDocumentStore } from "@/store/document-store";

export default function DocumentCanvasScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { resetOnboarding } = useOnboarding();
  const { theme, isDark } = useTheme();

  const pdfCanvasRef = useRef<PdfCanvasRef>(null);

  const documents = useDocumentStore((state) => state.documents);
  const activeDocId = useDocumentStore((state) => state.activeDocId);
  const initialize = useDocumentStore((state) => state.initialize);
  const importDocument = useDocumentStore((state) => state.importDocument);
  const syncDocument = useDocumentStore((state) => state.syncDocument);
  const updatePageProgress = useDocumentStore((state) => state.updatePageProgress);
  const deleteDocument = useDocumentStore((state) => state.deleteDocument);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // Active doc is either matched by activeDocId or fallback to first document if available
  const activeDoc =
    documents.find((doc) => doc.id === activeDocId) ??
    (documents.length > 0 ? documents[0] : null);

  const targetDocId = activeDoc?.serverDocId || activeDoc?.id || null;
  const voiceSession = useVoiceSession({
    docId: targetDocId,
    currentPage: activeDoc?.currentPage ?? 1,
    onCitationNavigate: (citedPage) => {
      console.log(`[DocumentCanvasScreen] Auto-navigating to cited Page ${citedPage}`);
      pdfCanvasRef.current?.setPage(citedPage);
    },
  });

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        await importDocument({
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
        });
      }
    } catch (error) {
      console.warn("[DocumentCanvasScreen] Picker error:", error);
    }
  };

  const handleDeleteActiveDocument = () => {
    if (!activeDoc) return;
    Alert.alert(
      "Delete Document",
      `Are you sure you want to delete "${activeDoc.name}"? This will delete the session and its saved file.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteDocument(activeDoc.id);
          },
        },
      ]
    );
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
            <View style={styles.titleRow}>
              <Text
                numberOfLines={1}
                ellipsizeMode="middle"
                style={[styles.docTitleText, { color: theme.textPrimary }]}
              >
                {activeDoc.name}
              </Text>
              {activeDoc.syncStatus === "syncing" ? (
                <ActivityIndicator
                  size="small"
                  color={theme.actionPrimary}
                  style={styles.syncIndicator}
                />
              ) : activeDoc.syncStatus === "error" ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry syncing document to server"
                  onPress={() => syncDocument(activeDoc.id)}
                  style={styles.syncIndicator}
                >
                  <Feather name="cloud-off" size={13} color={theme.destructive} />
                </Pressable>
              ) : (
                <Feather
                  name="check-circle"
                  size={12}
                  color={theme.success}
                  style={styles.syncIndicator}
                />
              )}
            </View>
          </View>
        ) : null}

        {activeDoc ? (
          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Import new document"
              style={[styles.headerActionButton, { backgroundColor: theme.surfaceMuted }]}
              onPress={handlePickDocument}
            >
              <Feather name="plus" size={16} color={theme.textPrimary} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Delete document"
              style={[styles.headerActionButton, { backgroundColor: theme.surfaceMuted }]}
              onPress={handleDeleteActiveDocument}
            >
              <Feather name="trash-2" size={15} color={theme.destructive} />
            </Pressable>
          </View>
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
          <PdfCanvas
            ref={pdfCanvasRef}
            key={activeDoc.id}
            sourceUri={activeDoc.uri}
            initialPage={activeDoc.currentPage}
            onLoadComplete={(total) => {
              updatePageProgress(activeDoc.id, activeDoc.currentPage, total);
            }}
            onPageChange={(page, total) => {
              updatePageProgress(activeDoc.id, page, total);
              voiceSession.sendReadingPosition(page);
            }}
          />

          {/* Top-Right Floating Page Pill */}
          {activeDoc.pageCount > 0 && (
            <View
              pointerEvents="none"
              style={[
                styles.pagePill,
                {
                  backgroundColor: isDark
                    ? "rgba(24, 24, 27, 0.88)"
                    : "rgba(255, 255, 255, 0.90)",
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <Text style={[styles.pagePillText, { color: theme.textPrimary }]}>
                {activeDoc.currentPage}
                <Text style={{ color: theme.textTertiary }}>
                  {" "}
                  / {activeDoc.pageCount}
                </Text>
              </Text>
            </View>
          )}

          {/* Bottom Floating Voice Pill */}
          <VoicePill
            status={voiceSession.status}
            activePage={activeDoc.currentPage}
            lastCitation={voiceSession.lastCitation}
            onToggle={voiceSession.toggle}
            onInterrupt={voiceSession.interrupt}
            style={[styles.floatingVoicePill, { bottom: insets.bottom + 16 }]}
          />
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  syncIndicator: {
    padding: 2,
  },
  docTitleText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerActionButton: {
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
    position: "relative",
  },
  pagePill: {
    position: "absolute",
    top: 12,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  pagePillText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  floatingVoicePill: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
});
