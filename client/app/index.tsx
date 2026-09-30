import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { Alert } from "@/components/primitives/alert";
import { Avatar } from "@/components/primitives/avatar";
import { Dialog } from "@/components/primitives/dialog";
import { IconTile } from "@/components/primitives/icon-tile";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListItemTitle,
  ListItemSubtitle,
  ListItemChevron,
  ListSection,
  ListSectionTitle,
  ListSectionContent,
  ListSeparator,
} from "@/components/primitives/list";
import { RippleButton } from "@/components/primitives/ripple-button";
import { Switch } from "@/components/primitives/switch";
import { Tabs } from "@/components/primitives/tabs";
import { Toggle } from "@/components/primitives/toggle";

export default function Index() {
  const [switchVal, setSwitchVal] = useState(true);
  const [toggleVal, setToggleVal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0D13" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Reacticx Components</Text>

        {/* 1. Ripple Button */}
        <Text style={styles.label}>1. RippleButton</Text>
        <View style={styles.row}>
          <RippleButton.Root variant="default" theme="dark" size="md">
            <RippleButton.Label>Default Button</RippleButton.Label>
          </RippleButton.Root>
          <RippleButton.Root variant="outline" theme="dark" size="md">
            <RippleButton.Label>Outline Button</RippleButton.Label>
          </RippleButton.Root>
        </View>

        {/* 2. Switch */}
        <Text style={styles.label}>2. Switch</Text>
        <Switch.Root checked={switchVal} onCheckedChange={setSwitchVal} theme="dark" size="md">
          <Switch.Track>
            <Switch.Thumb />
          </Switch.Track>
          <Switch.Content>
            <Switch.Label>Toggle Switch</Switch.Label>
            <Switch.Description>Tap to toggle state</Switch.Description>
          </Switch.Content>
        </Switch.Root>

        {/* 3. Toggle */}
        <Text style={styles.label}>3. Toggle</Text>
        <View style={styles.row}>
          <Toggle.Root pressed={toggleVal} onPressedChange={setToggleVal} theme="dark" size="md">
            <Toggle.Content>
              <Toggle.Label>{toggleVal ? "Pressed: On" : "Pressed: Off"}</Toggle.Label>
            </Toggle.Content>
          </Toggle.Root>
        </View>

        {/* 4. Alert */}
        <Text style={styles.label}>4. Alert</Text>
        <Alert.Root variant="default" theme="dark">
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>Default Alert Title</Alert.Title>
            <Alert.Description>This is a standard alert description.</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        {/* 5. Avatar */}
        <Text style={styles.label}>5. Avatar</Text>
        <View style={styles.row}>
          <Avatar.Root size={48} shape="circle">
            <Avatar.Fallback seed="user">AB</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root size={48} shape="square">
            <Avatar.Fallback seed="company">XY</Avatar.Fallback>
          </Avatar.Root>
        </View>

        {/* 6. Icon Tile */}
        <Text style={styles.label}>6. IconTile</Text>
        <View style={styles.row}>
          <IconTile.Root tone="blue" size={48}>
            <IconTile.Icon>
              <Feather name="bell" size={22} color="#FFFFFF" />
            </IconTile.Icon>
            <IconTile.Gloss />
          </IconTile.Root>
          <IconTile.Root tone="green" size={48}>
            <IconTile.Icon>
              <Feather name="check" size={22} color="#FFFFFF" />
            </IconTile.Icon>
            <IconTile.Gloss />
          </IconTile.Root>
          <IconTile.Root tone="purple" size={48}>
            <IconTile.Icon>
              <Feather name="star" size={22} color="#FFFFFF" />
            </IconTile.Icon>
            <IconTile.Gloss />
          </IconTile.Root>
        </View>

        {/* 7. Dialog */}
        <Text style={styles.label}>7. Dialog</Text>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen} theme="dark">
          <Dialog.Trigger>
            <RippleButton.Root variant="secondary" theme="dark" size="md" onPress={() => setDialogOpen(true)}>
              <RippleButton.Label>Open Dialog</RippleButton.Label>
            </RippleButton.Root>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay intensity={20} />
            <Dialog.Content from="bottom">
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.Description>This is an example dialog body text.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer style={styles.dialogFooter}>
                <RippleButton.Root size="sm" variant="outline" theme="dark" onPress={() => setDialogOpen(false)}>
                  <RippleButton.Label>Close</RippleButton.Label>
                </RippleButton.Root>
              </Dialog.Footer>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* 8. Tabs */}
        <Text style={styles.label}>8. Tabs</Text>
        <Tabs.Root defaultValue="tab1" theme="dark">
          <Tabs.List>
            <Tabs.Tab value="tab1">
              <Text style={styles.tabText}>First Tab</Text>
            </Tabs.Tab>
            <Tabs.Tab value="tab2">
              <Text style={styles.tabText}>Second Tab</Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1" style={styles.tabContent}>
            <Text style={styles.bodyText}>Content of First Tab</Text>
          </Tabs.Panel>
          <Tabs.Panel value="tab2" style={styles.tabContent}>
            <Text style={styles.bodyText}>Content of Second Tab</Text>
          </Tabs.Panel>
        </Tabs.Root>

        {/* 9. List */}
        <Text style={styles.label}>9. List</Text>
        <List theme="dark">
          <ListSection>
            <ListSectionTitle>Sample List</ListSectionTitle>
            <ListSectionContent>
              <ListItem>
                <ListItemIcon>
                  <Feather name="inbox" size={18} color="#94A3B8" />
                </ListItemIcon>
                <ListItemContent>
                  <ListItemTitle>First List Item</ListItemTitle>
                  <ListItemSubtitle>Subtitle description here</ListItemSubtitle>
                </ListItemContent>
                <ListItemChevron />
              </ListItem>
              <ListSeparator />
              <ListItem>
                <ListItemIcon>
                  <Feather name="settings" size={18} color="#94A3B8" />
                </ListItemIcon>
                <ListItemContent>
                  <ListItemTitle>Second List Item</ListItemTitle>
                  <ListItemSubtitle>Another subtitle here</ListItemSubtitle>
                </ListItemContent>
                <ListItemChevron />
              </ListItem>
            </ListSectionContent>
          </ListSection>
        </List>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D13",
  },
  scroll: {
    padding: 20,
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94A3B8",
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#CBD5E1",
  },
  tabContent: {
    paddingVertical: 12,
  },
  bodyText: {
    fontSize: 14,
    color: "#CBD5E1",
  },
  dialogFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
});
