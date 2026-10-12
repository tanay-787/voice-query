import React from "react";
import {
  Alert,
  AppState,
  type AppStateStatus,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Drawer,
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/theme-context";
import SegmentedControl from "@/components/organisms/segmented-control";
import { useDocumentStore } from "@/store/document-store";

function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDays = Math.floor(diffHour / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const appState = React.useRef<AppStateStatus>(AppState.currentState);

  const documents = useDocumentStore((state) => state.documents);
  const activeDocId = useDocumentStore((state) => state.activeDocId);
  const initialize = useDocumentStore((state) => state.initialize);
  const selectDocument = useDocumentStore((state) => state.selectDocument);
  const importDocument = useDocumentStore((state) => state.importDocument);
  const deleteDocument = useDocumentStore((state) => state.deleteDocument);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  const activeIndex = Math.max(
    0,
    documents.findIndex((doc) => doc.id === activeDocId)
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // Dismiss the drawer when the app resumes from the background
          props.navigation.closeDrawer();
        }
        appState.current = nextAppState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [props.navigation]);

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
        props.navigation.closeDrawer();
      }
    } catch (err) {
      console.warn("[CustomDrawerContent] Picker error:", err);
    }
  };

  const closeDrawerTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (closeDrawerTimeoutRef.current) {
        clearTimeout(closeDrawerTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectSession = (index: number) => {
    const doc = documents[index];
    if (doc) {
      selectDocument(doc.id);
      if (closeDrawerTimeoutRef.current) {
        clearTimeout(closeDrawerTimeoutRef.current);
      }
      // Allow segmented control spring slide & scale animation to finish before closing drawer
      closeDrawerTimeoutRef.current = setTimeout(() => {
        props.navigation.closeDrawer();
      }, 280);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContentContainer,
        {
          paddingTop: insets.top + 16,
          backgroundColor: theme.background,
        },
      ]}
      style={{ backgroundColor: theme.background }}
    >
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerWordmark, { color: theme.textPrimary }]}>
          voicequery
        </Text>
      </View>

      <View style={styles.sessionsContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
            Recents
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Import Document"
            style={[styles.importIconButton, { backgroundColor: theme.surfaceMuted }]}
            onPress={handlePickDocument}
          >
            <Feather name="plus" size={14} color={theme.textPrimary} />
          </Pressable>
        </View>

        {documents.length > 0 ? (
          <SegmentedControl
            orientation="vertical"
            width="100%"
            itemHeight={62}
            borderRadius={14}
            hideDividers
            currentIndex={activeIndex}
            onChange={handleSelectSession}
          >
            {documents.map((doc, index) => {
              const isSelected = activeIndex === index;
              return (
                <View key={doc.id} style={styles.sessionItem}>
                  <View style={styles.sessionTextContainer}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.sessionTitle,
                        {
                          color: isSelected
                            ? theme.textPrimary
                            : theme.textSecondary,
                          fontWeight: isSelected ? "600" : "500",
                        },
                      ]}
                    >
                      {doc.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.sessionPreview,
                        {
                          color: isSelected
                            ? theme.textSecondary
                            : theme.textTertiary,
                        },
                      ]}
                    >
                      {`Page ${doc.currentPage} of ${doc.pageCount} • ${formatTimeAgo(
                        doc.lastOpenedAt
                      )}`}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${doc.name}`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={styles.deleteIconButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      Alert.alert(
                        "Delete Document",
                        `Remove "${doc.name}" and delete its local copy?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => deleteDocument(doc.id),
                          },
                        ]
                      );
                    }}
                  >
                    <Feather
                      name="trash-2"
                      size={13}
                      color={isSelected ? theme.textSecondary : theme.textTertiary}
                    />
                  </Pressable>
                </View>
              );
            })}
          </SegmentedControl>
        ) : (
          <View
            style={[
              styles.emptyContainer,
              { backgroundColor: theme.surfaceMuted },
            ]}
          >
            <Feather name="folder" size={24} color={theme.textTertiary} />
            <Text style={[styles.emptyTitle, { color: theme.textSecondary }]}>
              No documents yet
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Pick a document"
              style={[
                styles.emptyActionButton,
                { backgroundColor: theme.actionPrimary },
              ]}
              onPress={handlePickDocument}
            >
              <Text
                style={[
                  styles.emptyActionText,
                  { color: theme.actionPrimaryLabel },
                ]}
              >
                Import PDF
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: theme.background,
          width: 290,
          borderRightColor: theme.borderSubtle,
          borderRightWidth: StyleSheet.hairlineWidth,
        },
        sceneStyle: {
          backgroundColor: theme.background,
        },
        overlayColor: isDark ? "rgba(0, 0, 0, 0.72)" : "rgba(0, 0, 0, 0.35)",
        drawerActiveTintColor: theme.textPrimary,
        drawerInactiveTintColor: theme.textSecondary,
        drawerActiveBackgroundColor: theme.surfaceMuted,
        drawerItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 6,
          marginHorizontal: 12,
          marginVertical: 4,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          letterSpacing: -0.2,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Canvas",
          title: "Canvas",
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size - 2} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 4,
  },
  drawerHeader: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    marginBottom: 8,
  },
  drawerWordmark: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -1,
  },
  sessionsContainer: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  sectionHeader: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  importIconButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    width: "100%",
  },
  sessionTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  sessionTitle: {
    fontSize: 14,
    letterSpacing: -0.2,
  },
  sessionPreview: {
    fontSize: 12,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  deleteIconButton: {
    padding: 6,
    borderRadius: 6,
  },
  emptyContainer: {
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: "500",
  },
  emptyActionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  emptyActionText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
