import { DB_NAME, migrateDatabase } from '@/database/migrations';
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import '../polyfills';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://24592148ffd4dbb88d730018bad0b8ad@o4510822254641152.ingest.de.sentry.io/4510822257590352',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
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
});