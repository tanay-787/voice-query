import '@/polyfills';
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDatabase, DB_NAME } from '@/lib/database/migrations';
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <SQLiteProvider 
          databaseName={DB_NAME} 
          onInit={migrateDatabase}
        >
          <Stack />
        </SQLiteProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
