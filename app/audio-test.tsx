import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDatabase } from '@/lib/hooks/useDatabase';
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { useVoiceInteraction } from '@/lib/hooks/useAudio';
import { VoiceButton } from '@/components/conversation/VoiceButton';
import { TranscriptView } from '@/components/conversation/TranscriptView';
import { AudioWaveform } from '@/components/conversation/AudioWaveform';

/**
 * Test screen for Phase 3: Audio Pipeline
 * Tests recording, STT, Q&A, and TTS
 */
export default function AudioTestScreen() {
  const router = useRouter();
  const { db, isReady } = useDatabase();
  const documentContext = useDocumentContext(db);
  const [error, setError] = useState<string>('');

  // Load context on mount
  React.useEffect(() => {
    if (isReady) {
      documentContext.loadContext();
    }
  }, [isReady]);

  const voiceInteraction = useVoiceInteraction(
    documentContext.context ? documentContext.getPromptContext() : null
  );

  const handleStartRecording = async () => {
    setError('');
    try {
      await voiceInteraction.startVoiceQuestion();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  const handleStopRecording = async () => {
    setError('');
    try {
      await voiceInteraction.stopAndProcess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process question');
    }
  };

  const hasContext = !!documentContext.context;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Audio Pipeline Test</Text>
          <Text style={styles.headerSubtitle}>
            {hasContext ? `📄 ${documentContext.context?.title}` : '⚠️ No document loaded'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>System Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Database:</Text>
            <Text style={[styles.statusValue, { color: isReady ? '#10b981' : '#ef4444' }]}>
              {isReady ? '✅ Ready' : '⏳ Initializing'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Context:</Text>
            <Text style={[styles.statusValue, { color: hasContext ? '#10b981' : '#f59e0b' }]}>
              {hasContext ? '✅ Loaded' : '⚠️ Not loaded'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Recording:</Text>
            <Text style={[styles.statusValue, { color: voiceInteraction.isRecording ? '#ef4444' : '#6b7280' }]}>
              {voiceInteraction.isRecording ? '🔴 Recording' : '⚫ Idle'}
            </Text>
          </View>
        </View>

        {/* Instructions */}
        {!hasContext && (
          <View style={styles.warningCard}>
            <Ionicons name="warning" size={24} color="#f59e0b" />
            <Text style={styles.warningText}>
              Please load a document first using the test screen. Go back and process a URL.
            </Text>
          </View>
        )}

        {/* Transcript View */}
        <TranscriptView
          transcription={voiceInteraction.transcription}
          answer={voiceInteraction.answer}
          isTranscribing={voiceInteraction.isTranscribing}
          isGenerating={voiceInteraction.isProcessing && !voiceInteraction.isTranscribing}
        />

        {/* Speaking Indicator */}
        {voiceInteraction.isSpeaking && (
          <View style={styles.speakingCard}>
            <Text style={styles.speakingTitle}>🔊 Speaking...</Text>
            <AudioWaveform isActive={voiceInteraction.isSpeaking} />
            <Pressable
              onPress={voiceInteraction.stopSpeaking}
              style={styles.stopSpeakingButton}
            >
              <Text style={styles.stopSpeakingText}>Stop Speaking</Text>
            </Pressable>
          </View>
        )}

        {/* Error Display */}
        {error && (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle" size={24} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>

      {/* Voice Button */}
      <View style={styles.voiceButtonContainer}>
        <VoiceButton
          isRecording={voiceInteraction.isRecording}
          isProcessing={voiceInteraction.isProcessing && !voiceInteraction.isRecording}
          disabled={!hasContext}
          onPressIn={handleStartRecording}
          onPressOut={handleStopRecording}
          duration={voiceInteraction.duration}
        />

        {hasContext && (
          <Text style={styles.instructionText}>
            {voiceInteraction.isRecording
              ? 'Release to process your question'
              : 'Press and hold to ask a question'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  statusCard: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  speakingCard: {
    backgroundColor: '#ecfdf5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
  },
  speakingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
  },
  stopSpeakingButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  stopSpeakingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorCard: {
    flexDirection: 'row',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#991b1b',
    lineHeight: 20,
  },
  voiceButtonContainer: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  instructionText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
