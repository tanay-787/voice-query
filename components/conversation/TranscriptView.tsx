import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Component to display transcription and answer
 */

interface TranscriptViewProps {
  transcription?: string;
  answer?: string;
  isTranscribing?: boolean;
  isGenerating?: boolean;
}

export function TranscriptView({
  transcription,
  answer,
  isTranscribing,
  isGenerating,
}: TranscriptViewProps) {
  if (!transcription && !answer && !isTranscribing && !isGenerating) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Question Section */}
      {(transcription || isTranscribing) && (
        <View style={styles.section}>
          <Text style={styles.label}>Your Question</Text>
          {isTranscribing ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Transcribing...</Text>
            </View>
          ) : (
            <View style={styles.questionBubble}>
              <Text style={styles.questionText}>{transcription}</Text>
            </View>
          )}
        </View>
      )}

      {/* Answer Section */}
      {(answer || isGenerating) && (
        <View style={styles.section}>
          <Text style={styles.label}>Answer</Text>
          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Generating answer...</Text>
            </View>
          ) : (
            <View style={styles.answerBubble}>
              <Text style={styles.answerText}>{answer}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionBubble: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 16,
    borderTopRightRadius: 4,
  },
  questionText: {
    fontSize: 16,
    color: '#1e40af',
    lineHeight: 24,
  },
  answerBubble: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  answerText: {
    fontSize: 16,
    color: '#065f46',
    lineHeight: 24,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});
