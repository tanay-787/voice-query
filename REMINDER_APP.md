# Voice-First Reminder App Architecture

> **Status**: Design Document  
> **Target Platform**: React Native + Expo (Expo Go Compatible)  
> **Core Technology**: Voice Input → Phi4 NLP → Scheduled Notifications

---

## Overview

A voice-first mobile reminder app that uses natural language processing to create and manage reminders. Users speak naturally ("Remind me to call Aniket at 9pm today") and the app translates this into scheduled notifications.

### Key Features
- 🎤 Voice-first input (with text fallback)
- 🧠 Natural language parsing via Phi4 (offline, private)
- 📅 Scheduled local notifications (works in Expo Go)
- 🔔 Smart relative time handling ("in 30 minutes", "1 hour before my 5pm meeting")
- ♻️ Snooze and dismiss functionality
- 📱 Works even when app is closed

---

## Expo Go Compatibility

### ✅ Fully Compatible Packages

| Package | Version | Purpose | Expo Go Support |
|---------|---------|---------|-----------------|
| `expo-notifications` | ~0.32.16 | Local + scheduled notifications | ✅ YES |
| `expo-device` | Latest | Device detection | ✅ YES |
| `@react-native-community/datetimepicker` | Latest | Manual time picker (optional) | ✅ YES |

### 🚫 What Doesn't Work in Expo Go
- **Push notifications (remote)** - Requires dev build (Android SDK 53+)
- **Background fetch** - Limited in Expo Go
- **Custom native modules** - Not needed for this app

### ✅ What Works Perfectly
- **Scheduled local notifications** - Full support for date/time triggers
- **Repeating notifications** - Daily, weekly, custom intervals
- **Notification sounds** - Custom sounds via config plugin
- **Notification channels** - Android 8+ channel management
- **Permission requests** - Runtime permission prompts

---

## Technical Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                     Voice Input Layer                    │
│  (Reuse existing: VoiceInputArea, VoiceButton, etc.)    │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│              Natural Language Parser (Phi4)              │
│   "Remind me to call Aniket at 9pm" → Structured Data   │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│                  Reminder Manager Hook                   │
│         • Create reminder in SQLite                      │
│         • Schedule expo-notification                     │
│         • Track notification_id mapping                  │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│              expo-notifications Service                  │
│  • Schedule at specific datetime                         │
│  • Trigger even when app closed                          │
│  • Handle notification taps                              │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema

### SQLite Tables

```sql
-- Reminders table
CREATE TABLE reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  original_input TEXT NOT NULL,        -- User's original voice/text input
  scheduled_time INTEGER NOT NULL,     -- Unix timestamp (milliseconds)
  notification_id TEXT UNIQUE,         -- expo-notifications identifier
  status TEXT NOT NULL CHECK (status IN ('pending', 'triggered', 'dismissed', 'snoozed')),
  created_at INTEGER NOT NULL,
  triggered_at INTEGER,                -- When notification was triggered
  snoozed_until INTEGER,               -- If snoozed, reschedule time
  metadata TEXT                        -- JSON: { relativeAnchor, voiceId, duration }
);

-- Index for querying upcoming reminders
CREATE INDEX idx_scheduled_time ON reminders(scheduled_time);
CREATE INDEX idx_status ON reminders(status);

-- Optional: Recurring reminders table (Phase 2)
CREATE TABLE recurring_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('daily', 'weekly', 'monthly', 'custom')),
  schedule_config TEXT NOT NULL,      -- JSON: { hour, minute, daysOfWeek, etc. }
  last_triggered INTEGER,
  next_trigger INTEGER,
  is_active INTEGER NOT NULL DEFAULT 1
);
```

---

## Phi4 Natural Language Parser

### Service: `lib/services/reminder-parser.ts`

#### Input Examples
```typescript
"Remind me to call Aniket at 9pm today"
"I have an interview at 5pm, remind me to practice DSA an hour before"
"Remind me to take medicine in 30 minutes"
"Remind me to call mom tomorrow morning at 10"
"Daily reminder to drink water at 9am"
```

#### Structured Output Format
```typescript
interface ParsedReminder {
  task: string;              // "Call Aniket"
  datetime: string;          // ISO 8601: "2026-01-23T21:00:00+05:30"
  isRelative: boolean;       // true for "in 30 min", false for "at 9pm"
  isRecurring: boolean;      // true for "daily", "every Monday"
  recurringPattern?: {       // Optional: for recurring reminders
    type: 'daily' | 'weekly' | 'monthly';
    time: { hour: number; minute: number };
    daysOfWeek?: number[];   // [1, 3, 5] for Mon, Wed, Fri
  };
  confidence: number;        // 0-1, parser confidence score
  originalInput: string;     // Store for reference
}
```

#### Phi4 Prompt Template

```typescript
const REMINDER_PARSER_PROMPT = `You are a reminder parsing assistant. Convert natural language reminder requests into structured JSON.

Current datetime: ${new Date().toISOString()}
User timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}

Rules:
1. Extract the TASK (what to remind)
2. Calculate exact datetime in ISO 8601 format
3. Handle relative times: "in X minutes/hours", "X minutes/hours from now"
4. Handle absolute times: "at 9pm", "tomorrow at 10am", "next Monday at 2pm"
5. Handle time anchors: "1 hour before X", "30 minutes after Y"
6. Detect recurring patterns: "daily", "every Monday", "weekly"
7. Default to today if no date mentioned
8. Default to next occurrence if time has passed today
9. If unclear, set confidence < 0.7

Examples:

Input: "Remind me to call Aniket at 9pm today"
Output: {
  "task": "Call Aniket",
  "datetime": "2026-01-23T21:00:00+05:30",
  "isRelative": false,
  "isRecurring": false,
  "confidence": 0.95,
  "originalInput": "Remind me to call Aniket at 9pm today"
}

Input: "Remind me to practice DSA 1 hour before my 5pm interview"
Output: {
  "task": "Practice DSA",
  "datetime": "2026-01-23T16:00:00+05:30",
  "isRelative": true,
  "isRecurring": false,
  "confidence": 0.9,
  "originalInput": "Remind me to practice DSA 1 hour before my 5pm interview"
}

Input: "Remind me to take medicine in 30 minutes"
Output: {
  "task": "Take medicine",
  "datetime": "2026-01-23T09:19:59+05:30",
  "isRelative": true,
  "isRecurring": false,
  "confidence": 1.0,
  "originalInput": "Remind me to take medicine in 30 minutes"
}

Input: "Daily reminder to drink water at 9am"
Output: {
  "task": "Drink water",
  "datetime": "2026-01-24T09:00:00+05:30",
  "isRelative": false,
  "isRecurring": true,
  "recurringPattern": {
    "type": "daily",
    "time": { "hour": 9, "minute": 0 }
  },
  "confidence": 0.95,
  "originalInput": "Daily reminder to drink water at 9am"
}

Now parse this reminder request:
User input: "{USER_INPUT}"

Respond with ONLY valid JSON, no markdown or explanation.`;
```

#### Implementation

```typescript
import { generateText } from '@/lib/services/phi4';

export async function parseReminderFromNaturalLanguage(
  userInput: string
): Promise<ParsedReminder> {
  try {
    const currentTime = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const prompt = REMINDER_PARSER_PROMPT
      .replace('{CURRENT_DATETIME}', currentTime.toISOString())
      .replace('{TIMEZONE}', timezone)
      .replace('{USER_INPUT}', userInput);

    const response = await generateText(prompt, {
      temperature: 0.3,  // Low temperature for consistent parsing
      maxTokens: 300,
    });

    // Parse JSON response
    const parsed: ParsedReminder = JSON.parse(response);

    // Validate confidence threshold
    if (parsed.confidence < 0.7) {
      throw new Error('Low confidence parse - ambiguous input');
    }

    // Validate datetime is in future
    const scheduledTime = new Date(parsed.datetime);
    if (scheduledTime <= currentTime) {
      throw new Error('Scheduled time is in the past');
    }

    return parsed;
  } catch (error) {
    throw new Error(`Failed to parse reminder: ${error.message}`);
  }
}
```

---

## expo-notifications Service

### Service: `lib/services/notification-service.ts`

```typescript
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure how notifications are handled when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  
  /**
   * Request notification permissions (required for Android 13+)
   */
  static async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
      console.warn('Notifications only work on physical devices');
      return false;
    }

    // Android: Create notification channel first (required for Android 13+)
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('reminders', {
        name: 'Reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'default',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  }

  /**
   * Schedule a reminder notification
   */
  static async scheduleReminder(
    task: string,
    scheduledTime: Date,
    reminderId: number
  ): Promise<string> {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Reminder',
        body: task,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { 
          reminderId,
          type: 'reminder',
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: scheduledTime,
        channelId: 'reminders', // Android only
      },
    });

    return notificationId;
  }

  /**
   * Schedule a repeating reminder (daily, weekly)
   */
  static async scheduleRecurringReminder(
    task: string,
    hour: number,
    minute: number,
    reminderId: number,
    daysOfWeek?: number[] // Optional: [1, 3, 5] for Mon, Wed, Fri
  ): Promise<string> {
    const trigger: Notifications.NotificationTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
      channelId: 'reminders',
    };

    // iOS supports weekday filtering
    if (Platform.OS === 'ios' && daysOfWeek) {
      (trigger as any).weekday = daysOfWeek;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Recurring Reminder',
        body: task,
        sound: true,
        data: { reminderId, type: 'recurring_reminder' },
      },
      trigger,
    });

    return notificationId;
  }

  /**
   * Cancel a scheduled notification
   */
  static async cancelReminder(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  /**
   * Get all scheduled notifications (for debugging)
   */
  static async getAllScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  /**
   * Listen for notification taps (when user opens app from notification)
   */
  static addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  /**
   * Listen for notifications received while app is foregrounded
   */
  static addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
  ) {
    return Notifications.addNotificationReceivedListener(callback);
  }
}
```

---

## useReminders Hook

### Hook: `lib/hooks/useReminders.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import type { SQLiteDatabase } from 'expo-sqlite';
import { parseReminderFromNaturalLanguage } from '@/lib/services/reminder-parser';
import { NotificationService } from '@/lib/services/notification-service';

export interface Reminder {
  id: number;
  task: string;
  originalInput: string;
  scheduledTime: number; // Unix timestamp
  notificationId: string | null;
  status: 'pending' | 'triggered' | 'dismissed' | 'snoozed';
  createdAt: number;
  triggeredAt: number | null;
  snoozedUntil: number | null;
}

export function useReminders(db: SQLiteDatabase | null) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Load all reminders from SQLite
   */
  const loadReminders = useCallback(async () => {
    if (!db) return;

    try {
      const result = await db.getAllAsync<Reminder>(
        'SELECT * FROM reminders ORDER BY scheduled_time ASC'
      );
      setReminders(result);
    } catch (error) {
      console.error('[useReminders] Failed to load:', error);
    }
  }, [db]);

  /**
   * Create reminder from voice/text input
   */
  const createReminder = useCallback(async (userInput: string) => {
    if (!db) throw new Error('Database not ready');

    setIsLoading(true);
    try {
      // Step 1: Parse natural language with Phi4
      const parsed = await parseReminderFromNaturalLanguage(userInput);
      const scheduledTime = new Date(parsed.datetime);

      // Step 2: Request notification permissions if needed
      const hasPermission = await NotificationService.requestPermissions();
      if (!hasPermission) {
        throw new Error('Notification permissions denied');
      }

      // Step 3: Insert into SQLite
      const result = await db.runAsync(
        `INSERT INTO reminders (task, original_input, scheduled_time, status, created_at)
         VALUES (?, ?, ?, 'pending', ?)`,
        [parsed.task, userInput, scheduledTime.getTime(), Date.now()]
      );

      const reminderId = result.lastInsertRowId;

      // Step 4: Schedule expo-notification
      const notificationId = await NotificationService.scheduleReminder(
        parsed.task,
        scheduledTime,
        reminderId
      );

      // Step 5: Update with notification_id
      await db.runAsync(
        'UPDATE reminders SET notification_id = ? WHERE id = ?',
        [notificationId, reminderId]
      );

      // Reload reminders
      await loadReminders();

      return reminderId;
    } catch (error) {
      console.error('[useReminders] Create failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [db, loadReminders]);

  /**
   * Dismiss reminder (mark as completed)
   */
  const dismissReminder = useCallback(async (id: number) => {
    if (!db) return;

    try {
      // Get reminder
      const reminder = await db.getFirstAsync<Reminder>(
        'SELECT * FROM reminders WHERE id = ?',
        [id]
      );

      if (!reminder) return;

      // Cancel scheduled notification
      if (reminder.notificationId) {
        await NotificationService.cancelReminder(reminder.notificationId);
      }

      // Mark as dismissed
      await db.runAsync(
        'UPDATE reminders SET status = "dismissed", triggered_at = ? WHERE id = ?',
        [Date.now(), id]
      );

      await loadReminders();
    } catch (error) {
      console.error('[useReminders] Dismiss failed:', error);
    }
  }, [db, loadReminders]);

  /**
   * Snooze reminder (reschedule +10 minutes)
   */
  const snoozeReminder = useCallback(async (id: number, snoozeMinutes = 10) => {
    if (!db) return;

    try {
      const reminder = await db.getFirstAsync<Reminder>(
        'SELECT * FROM reminders WHERE id = ?',
        [id]
      );

      if (!reminder) return;

      // Cancel existing notification
      if (reminder.notificationId) {
        await NotificationService.cancelReminder(reminder.notificationId);
      }

      // Calculate new time
      const newTime = new Date(Date.now() + snoozeMinutes * 60 * 1000);

      // Schedule new notification
      const notificationId = await NotificationService.scheduleReminder(
        reminder.task,
        newTime,
        id
      );

      // Update database
      await db.runAsync(
        `UPDATE reminders 
         SET status = 'snoozed', 
             snoozed_until = ?, 
             notification_id = ?
         WHERE id = ?`,
        [newTime.getTime(), notificationId, id]
      );

      await loadReminders();
    } catch (error) {
      console.error('[useReminders] Snooze failed:', error);
    }
  }, [db, loadReminders]);

  /**
   * Delete reminder permanently
   */
  const deleteReminder = useCallback(async (id: number) => {
    if (!db) return;

    try {
      const reminder = await db.getFirstAsync<Reminder>(
        'SELECT * FROM reminders WHERE id = ?',
        [id]
      );

      if (!reminder) return;

      // Cancel notification
      if (reminder.notificationId) {
        await NotificationService.cancelReminder(reminder.notificationId);
      }

      // Delete from database
      await db.runAsync('DELETE FROM reminders WHERE id = ?', [id]);

      await loadReminders();
    } catch (error) {
      console.error('[useReminders] Delete failed:', error);
    }
  }, [db, loadReminders]);

  // Load reminders on mount
  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  return {
    reminders,
    isLoading,
    createReminder,
    dismissReminder,
    snoozeReminder,
    deleteReminder,
    refreshReminders: loadReminders,
  };
}
```

---

## UI Components

### Main Screen Layout

```typescript
// app/main.tsx

export default function MainScreen() {
  const database = useDatabase();
  const reminders = useReminders(database.db);
  const voiceInteraction = useVoiceInteraction(/* ... */);

  const handleVoiceReminder = async (transcription: string) => {
    try {
      await reminders.createReminder(transcription);
      // Show success feedback
    } catch (error) {
      // Show error feedback
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <CustomHeader title="Reminders" />

      {/* Reminders List */}
      <RemindersList
        reminders={reminders.reminders}
        onDismiss={reminders.dismissReminder}
        onSnooze={reminders.snoozeReminder}
        onDelete={reminders.deleteReminder}
      />

      {/* Voice Input */}
      <VoiceInputArea
        voiceInteraction={voiceInteraction}
        onTranscriptionComplete={handleVoiceReminder}
        placeholder="Say 'Remind me to...'"
      />
    </View>
  );
}
```

### Reminder List Component

```typescript
// components/RemindersList.tsx

interface RemindersListProps {
  reminders: Reminder[];
  onDismiss: (id: number) => void;
  onSnooze: (id: number) => void;
  onDelete: (id: number) => void;
}

export function RemindersList({ reminders, onDismiss, onSnooze, onDelete }: RemindersListProps) {
  const upcoming = reminders.filter(r => r.status === 'pending' || r.status === 'snoozed');
  const past = reminders.filter(r => r.status === 'dismissed' || r.status === 'triggered');

  return (
    <ScrollView className="flex-1 px-4">
      {/* Upcoming Section */}
      <View className="mb-6">
        <AppText className="text-lg font-semibold mb-3">Upcoming</AppText>
        {upcoming.map(reminder => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onDismiss={onDismiss}
            onSnooze={onSnooze}
            onDelete={onDelete}
          />
        ))}
      </View>

      {/* Past Section */}
      <View>
        <AppText className="text-lg font-semibold mb-3">Past</AppText>
        {past.map(reminder => (
          <ReminderCard key={reminder.id} reminder={reminder} isPast />
        ))}
      </View>
    </ScrollView>
  );
}
```

### Reminder Card Component

```typescript
// components/ReminderCard.tsx

interface ReminderCardProps {
  reminder: Reminder;
  isPast?: boolean;
  onDismiss?: (id: number) => void;
  onSnooze?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function ReminderCard({ reminder, isPast, onDismiss, onSnooze, onDelete }: ReminderCardProps) {
  const scheduledDate = new Date(reminder.scheduledTime);
  const timeUntil = formatTimeUntil(scheduledDate);

  return (
    <Card className="mb-3">
      <Card.Header>
        <View className="flex-row items-center justify-between">
          <AppText className="text-base font-semibold">{reminder.task}</AppText>
          {!isPast && (
            <Chip size="sm" variant="secondary">
              {timeUntil}
            </Chip>
          )}
        </View>
        <AppText className="text-sm text-muted mt-1">
          {formatDateTime(scheduledDate)}
        </AppText>
      </Card.Header>

      {!isPast && (
        <Card.Footer className="flex-row gap-2">
          <Button size="sm" variant="success" onPress={() => onDismiss?.(reminder.id)}>
            Done
          </Button>
          <Button size="sm" variant="secondary" onPress={() => onSnooze?.(reminder.id)}>
            Snooze 10m
          </Button>
          <Button size="sm" variant="danger" onPress={() => onDelete?.(reminder.id)}>
            Delete
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}

// Helper: "in 2 hours" or "in 30 minutes"
function formatTimeUntil(date: Date): string {
  const now = Date.now();
  const diff = date.getTime() - now;
  
  if (diff < 0) return 'Overdue';
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `in ${days}d`;
  if (hours > 0) return `in ${hours}h`;
  return `in ${minutes}m`;
}
```

---

## Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Install `expo-notifications` and `expo-device`
- [ ] Create `notification-service.ts`
- [ ] Add `reminders` table to SQLite schema
- [ ] Run migration to add table
- [ ] Test basic scheduled notification (hardcoded)
- [ ] Request permissions on app launch

### Phase 2: Phi4 Parser (Day 2)
- [ ] Create `reminder-parser.ts` with prompt template
- [ ] Test parsing with various inputs:
  - "Remind me to call X at 9pm"
  - "Remind me to X in 30 minutes"
  - "Remind me to X tomorrow at 10am"
- [ ] Handle edge cases (past times, ambiguous input)
- [ ] Add confidence validation

### Phase 3: Reminder Management (Day 3)
- [ ] Create `useReminders` hook
- [ ] Implement `createReminder` (parse → SQLite → schedule)
- [ ] Implement `dismissReminder`
- [ ] Implement `snoozeReminder`
- [ ] Implement `deleteReminder`
- [ ] Test notification triggering when app is closed

### Phase 4: Voice Integration (Day 4)
- [ ] Connect voice input to `createReminder`
- [ ] Add success/error feedback (Toast or voice TTS)
- [ ] Test end-to-end: voice → parse → schedule → trigger

### Phase 5: UI Components (Day 5)
- [ ] Create `RemindersList` component
- [ ] Create `ReminderCard` component
- [ ] Add upcoming/past sections
- [ ] Add swipe actions (dismiss, snooze, delete)
- [ ] Add empty state when no reminders

### Phase 6: Polish (Day 6)
- [ ] Handle notification taps (open app to specific reminder)
- [ ] Add recurring reminders support
- [ ] Add manual time picker (fallback for parsing failures)
- [ ] Add custom notification sounds
- [ ] Add settings (snooze duration, default reminder time)

---

## Testing Checklist

### Scheduled Notifications
- [ ] Notification triggers at exact scheduled time
- [ ] Notification appears even when app is closed
- [ ] Notification appears even when app is force-killed (iOS/Android behavior differs)
- [ ] Notification sound plays
- [ ] Notification tap opens app

### Natural Language Parsing
- [ ] "Remind me to X at 9pm today" → correct datetime
- [ ] "Remind me to X in 30 minutes" → correct relative time
- [ ] "Remind me to X tomorrow at 10am" → correct next-day time
- [ ] "Remind me to X 1 hour before Y" → correct relative anchor
- [ ] Ambiguous input → fallback to manual picker or error

### CRUD Operations
- [ ] Create reminder → appears in list
- [ ] Dismiss reminder → moves to past section
- [ ] Snooze reminder → reschedules notification
- [ ] Delete reminder → cancels notification + removes from DB
- [ ] Reload app → reminders persist

### Edge Cases
- [ ] User denies notification permissions → show error
- [ ] Scheduled time is in past → error or auto-adjust to next occurrence
- [ ] App crashes → scheduled notifications still trigger
- [ ] User changes timezone → notifications adjust (or don't - define behavior)

---

## Configuration

### app.json / app.config.js

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "sounds": ["./assets/sounds/reminder.wav"],
          "color": "#4F46E5",
          "enableBackgroundRemoteNotifications": false
        }
      ]
    ],
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#4F46E5"
    }
  }
}
```

### Android Permissions (Auto-added)

```xml
<!-- Auto-added by expo-notifications -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

<!-- Required for Android 12+ exact alarms (add manually if needed) -->
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

---

## Migration from Document AI App

### Files to Keep
- `lib/hooks/useDatabase.ts` - Database management
- `lib/hooks/useAudio.ts` - Voice recording/TTS (partial)
- `lib/services/phi4.ts` - AI model (for parsing)
- `components/voice/*` - All voice input components
- `components/ThemedIcon.tsx` - Reusable icon component

### Files to Remove/Replace
- `lib/hooks/useDocumentContext.ts` - Not needed
- `lib/hooks/useDocumentProcessor.ts` - Not needed
- `lib/services/document-processor.ts` - Not needed
- `lib/services/azure-speech.ts` - Keep for TTS feedback
- `components/DocumentUpload*.tsx` - Not needed
- `components/CustomHeader.tsx` - Simplify (no document context)

### New Files to Create
- `lib/services/reminder-parser.ts` - NLP parsing
- `lib/services/notification-service.ts` - expo-notifications wrapper
- `lib/hooks/useReminders.ts` - Reminder CRUD
- `components/RemindersList.tsx` - List view
- `components/ReminderCard.tsx` - Individual reminder
- `lib/database/schema.ts` - Add reminders table (or create new schema)

---

## Key Differences from Document AI App

| Aspect | Document AI App | Reminder App |
|--------|----------------|--------------|
| **Primary Input** | Voice Q&A about documents | Voice reminder creation |
| **Data Model** | Document context (single) | Reminders list (many) |
| **AI Usage** | Q&A with document context | NLP parsing to structured data |
| **Persistence** | SQLite (document context) | SQLite (reminders) + expo-notifications |
| **Background** | No background tasks | Scheduled notifications (OS-level) |
| **UI Focus** | Chat history | Upcoming/past reminders list |
| **External Deps** | Azure Speech, Gemini/Phi4 | Phi4 only (offline) |

---

## Future Enhancements

### Phase 2 Features
- **Smart snooze suggestions**: "Remind me when I leave home" (geofencing)
- **Calendar integration**: Sync with device calendar
- **Voice confirmation**: TTS reads back parsed reminder before saving
- **Batch operations**: "Show me all reminders for today"
- **Priority levels**: Urgent vs normal reminders

### Phase 3 Features
- **Recurring reminders**: Daily, weekly, monthly patterns
- **Smart notifications**: Adaptive timing based on user behavior
- **Voice responses**: User can dismiss/snooze via voice when notification triggers
- **Contextual reminders**: Location-based triggers (requires dev build)

---

## Known Limitations

### Expo Go Constraints
- ❌ Cannot use geofencing (location-based reminders)
- ❌ Cannot use custom native alarm managers
- ❌ Push notifications require dev build (not needed for this app)
- ✅ Local scheduled notifications work perfectly

### Notification Behavior
- **Android**: Notifications persist even after force-kill (reliable)
- **iOS**: Notifications may not trigger if app is force-killed (OS limitation)
- **Solution**: Educate users not to force-kill app, or switch to dev build with custom alarm manager

### Parsing Accuracy
- Phi4 may struggle with very complex or ambiguous requests
- Fallback: Show manual time picker if confidence < 0.7
- Improvement: Fine-tune prompt with more examples

---

## Resources

### Documentation
- [expo-notifications API](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Scheduled Notifications Guide](https://docs.expo.dev/push-notifications/scheduling-notifications/)
- [Android Exact Alarms](https://developer.android.com/about/versions/12/behavior-changes-12#exact-alarm-permission)

### Example Apps
- [Expo Notifications Example](https://github.com/expo/expo/tree/main/apps/native-component-list/src/screens/NotificationsScreen)
- [React Native Reminder App (reference)](https://github.com/search?q=react+native+reminder+app)

---

## Quick Start Commands

```bash
# Install dependencies
npx expo install expo-notifications expo-device

# Test notification immediately
# Add to app/main.tsx for testing:
import * as Notifications from 'expo-notifications';

await Notifications.scheduleNotificationAsync({
  content: {
    title: "Test Reminder",
    body: "This is a test notification",
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 5, // Trigger in 5 seconds
  },
});

# Run app
npx expo start
```

---

**Status**: Ready for implementation in new environment  
**Estimated Timeline**: 6 days for MVP  
**Confidence**: High (all dependencies are Expo Go compatible)
