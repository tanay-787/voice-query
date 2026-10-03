import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Drawer,
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/theme-context";
import SegmentedControl from "@/components/organisms/segmented-control";

const SESSIONS = [
  {
    id: "canvas-active",
    title: "Canvas Workspace",
    preview: "Active session • Just now",
  },
  {
    id: "briefing-1",
    title: "Voice Query Overview",
    preview: "14 audio notes • 12m ago",
  },
  {
    id: "briefing-2",
    title: "Monorepo Migration",
    preview: "Expo SDK 57 • 2h ago",
  },
  {
    id: "briefing-3",
    title: "Design System Specs",
    preview: "3 documents • Yesterday",
  },
];

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedSession, setSelectedSession] = React.useState<number>(0);

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
        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
          Recents
        </Text>
        <SegmentedControl
          orientation="vertical"
          width="100%"
          itemHeight={62}
          borderRadius={14}
          hideDividers
          currentIndex={selectedSession}
          onChange={setSelectedSession}
        >
          {SESSIONS.map((session, index) => {
            const isSelected = selectedSession === index;
            return (
              <View key={session.id} style={styles.sessionItem}>
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
                    {session.title}
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
                    {session.preview}
                  </Text>
                </View>
              </View>
            );
          })}
        </SegmentedControl>
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
  sectionHeader: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  sessionItem: {
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  sessionTextContainer: {
    justifyContent: "center",
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
});
