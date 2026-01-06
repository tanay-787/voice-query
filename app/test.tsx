import { useDatabase } from '@/lib/hooks/useDatabase';
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Test screen for Phase 1 & 2
 * Tests database, document processing, and AI integration
 */
export default function TestScreen() {
  const { db, isReady, error: dbError } = useDatabase();
  const documentContext = useDocumentContext(db);
  const processor = useDocumentProcessor();
  
  const [testUrl, setTestUrl] = useState('https://tanaycodes.vercel.app');
  const [testQuestion, setTestQuestion] = useState('Who is Tanay?');
  const [testResults, setTestResults] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (isReady) {
      addResult('✅ Database initialized successfully');
      documentContext.loadContext();
    }
  }, [isReady]);

  useEffect(() => {
    if (dbError) {
      addResult(`❌ Database error: ${dbError.message}`);
    }
  }, [dbError]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const testURLProcessing = async () => {
    addResult('🔄 Testing URL processing...');
    try {
      const result = await processor.processURL(testUrl);
      addResult(`✅ URL processed successfully`);
      addResult(`   Title: ${result.summary.title}`);
      addResult(`   Key points: ${result.summary.key_points.length}`);
      
      // Save to database
      const saved = await documentContext.save(result.contextInput);
      addResult(`✅ Context saved to database`);
      addResult(`   ID: 1 (enforced single-context)`);
    } catch (error) {
      addResult(`❌ URL processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testContextRetrieval = async () => {
    addResult('🔄 Testing context retrieval...');
    try {
      const context = await documentContext.loadContext();
      if (context) {
        addResult(`✅ Context loaded from database`);
        addResult(`   Title: ${context.title}`);
        addResult(`   Source: ${context.source}`);
        addResult(`   Key Points: ${context.keyPoints.length}`);
        addResult(`   Definitions: ${context.definitions.length}`);
      } else {
        addResult(`ℹ️ No context found in database`);
      }
    } catch (error) {
      addResult(`❌ Context retrieval failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testQuestion_A = async () => {
    addResult('🔄 Testing Q&A...');
    try {
      const promptContext = documentContext.getPromptContext();
      if (!promptContext) {
        addResult(`❌ No context available for Q&A`);
        return;
      }

      const result = await processor.askQuestion(testQuestion, promptContext);
      setAnswer(result);
      addResult(`✅ Question answered successfully`);
      addResult(`   Answer: ${result.substring(0, 100)}...`);
    } catch (error) {
      addResult(`❌ Q&A failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testValidation = () => {
    addResult('🔄 Testing validation...');
    
    // Test URL validation
    try {
      const { validateURL } = require('@/lib/services/validation');
      validateURL('https://example.com');
      addResult('✅ Valid URL passed');
    } catch (error) {
      addResult(`❌ URL validation failed: ${error instanceof Error ? error.message : 'Unknown'}`);
    }

    // Test invalid URL
    try {
      const { validateURL } = require('@/lib/services/validation');
      validateURL('not-a-url');
      addResult('❌ Invalid URL should have failed');
    } catch (error) {
      addResult(`✅ Invalid URL correctly rejected`);
    }

    // Test PDF validation
    try {
      const { validatePDF } = require('@/lib/services/validation');
      validatePDF({
        uri: 'file:///test.pdf',
        size: 1024 * 1024, // 1MB - should pass
        mimeType: 'application/pdf',
      });
      addResult('✅ Valid PDF (1MB) passed');
    } catch (error) {
      addResult(`❌ PDF validation failed: ${error instanceof Error ? error.message : 'Unknown'}`);
    }

    // Test oversized PDF
    try {
      const { validatePDF } = require('@/lib/services/validation');
      validatePDF({
        uri: 'file:///test.pdf',
        size: 3 * 1024 * 1024, // 3MB - should fail
        mimeType: 'application/pdf',
      });
      addResult('❌ Oversized PDF should have failed');
    } catch (error) {
      addResult(`✅ Oversized PDF (3MB) correctly rejected`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    setAnswer('');
  };

  const deleteContext = async () => {
    addResult('🔄 Deleting context...');
    try {
      await documentContext.remove();
      addResult('✅ Context deleted successfully');
    } catch (error) {
      addResult(`❌ Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Phase 1 & 2 Test Suite</Text>
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          Database: {isReady ? '✅ Ready' : '⏳ Initializing...'}
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* URL Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Test URL</Text>
          <TextInput
            value={testUrl}
            onChangeText={setTestUrl}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
            }}
            placeholder="Enter URL to test"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Question Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Test Question</Text>
          <TextInput
            value={testQuestion}
            onChangeText={setTestQuestion}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
            }}
            placeholder="Enter question to test Q&A"
          />
        </View>

        {/* Test Buttons */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          <TestButton
            title="1. Test Validation Logic"
            onPress={testValidation}
            disabled={!isReady}
          />
          <TestButton
            title="2. Process URL & Save Context"
            onPress={testURLProcessing}
            disabled={!isReady || processor.isProcessing}
            loading={processor.isProcessing}
          />
          <TestButton
            title="3. Load Context from DB"
            onPress={testContextRetrieval}
            disabled={!isReady || documentContext.isLoading}
            loading={documentContext.isLoading}
          />
          <TestButton
            title="4. Ask Question (Q&A)"
            onPress={testQuestion_A}
            disabled={!isReady || processor.isProcessing || !documentContext.context}
            loading={processor.isProcessing}
          />
          <TestButton
            title="🗑️ Delete Context"
            onPress={deleteContext}
            disabled={!isReady || documentContext.isLoading}
            color="#dc2626"
          />
          <TestButton
            title="Clear Results"
            onPress={clearResults}
            color="#6b7280"
          />
        </View>

        {/* Current Context Display */}
        {documentContext.context && (
          <View style={{ 
            backgroundColor: '#f3f4f6', 
            padding: 16, 
            borderRadius: 8,
            marginBottom: 16,
          }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Current Context</Text>
            <Text style={{ fontSize: 12, color: '#374151' }}>
              Title: {documentContext.context.title}
            </Text>
            <Text style={{ fontSize: 12, color: '#374151' }}>
              Source: {documentContext.context.source}
            </Text>
            <Text style={{ fontSize: 12, color: '#374151' }}>
              Key Points: {documentContext.context.keyPoints.length}
            </Text>
          </View>
        )}

        {/* Answer Display */}
        {answer && (
          <View style={{ 
            backgroundColor: '#ecfdf5', 
            padding: 16, 
            borderRadius: 8,
            marginBottom: 16,
            borderLeftWidth: 4,
            borderLeftColor: '#10b981',
          }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8, color: '#065f46' }}>
              Answer
            </Text>
            <Text style={{ fontSize: 14, color: '#065f46' }}>{answer}</Text>
          </View>
        )}

        {/* Test Results Log */}
        <View style={{ 
          backgroundColor: '#1f2937', 
          padding: 16, 
          borderRadius: 8,
          marginBottom: 32,
        }}>
          <Text style={{ fontWeight: 'bold', color: '#fff', marginBottom: 12 }}>
            Test Results Log
          </Text>
          {testResults.length === 0 ? (
            <Text style={{ color: '#9ca3af', fontSize: 12 }}>
              No tests run yet. Click a button above to start testing.
            </Text>
          ) : (
            testResults.map((result, index) => (
              <Text
                key={index}
                style={{
                  color: result.includes('❌') ? '#fca5a5' :
                         result.includes('✅') ? '#86efac' :
                         result.includes('ℹ️') ? '#93c5fd' :
                         '#d1d5db',
                  fontSize: 12,
                  marginBottom: 4,
                  fontFamily: 'monospace',
                }}
              >
                {result}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TestButton({
  title,
  onPress,
  disabled,
  loading,
  color = '#3b82f6',
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        backgroundColor: disabled ? '#d1d5db' : pressed ? color + 'dd' : color,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: pressed ? 0.9 : 1,
      })}
    >
      {loading && (
        <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
      )}
      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{title}</Text>
    </Pressable>
  );
}
