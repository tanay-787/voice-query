import { DB_NAME, migrateDatabase } from '@/database/migrations';
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import '../polyfills';

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
