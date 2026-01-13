/**
 * Example: Building UI Components with Type-Safe Contracts
 * 
 * This file demonstrates how to build UI components against contracts,
 * develop in isolation with mocks, then connect to real hooks seamlessly.
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import type { DocumentContextContract, DocumentProcessorContract } from './ui-contracts';
import { createMockDocumentContext, createMockDocumentProcessor } from './mock-factory';

// ============================================================================
// STEP 1: Build UI components against contracts (not hooks)
// ============================================================================

/**
 * DocumentViewer - Pure UI component
 * Takes contract as prop, doesn't care about implementation
 */
interface DocumentViewerProps {
  context: DocumentContextContract;
}

function DocumentViewer({ context }: DocumentViewerProps) {
  // Handle all possible states from the contract
  if (context.isLoading) {
    return <Text>Loading document...</Text>;
  }
  
  if (context.error) {
    return (
      <View>
        <Text style={{ color: 'red' }}>Error: {context.error.message}</Text>
        <Button title="Retry" onPress={() => context.loadContext()} />
      </View>
    );
  }
  
  if (!context.context) {
    return (
      <View>
        <Text>No document loaded</Text>
        <Text>Upload a PDF or enter a URL to get started</Text>
      </View>
    );
  }
  
  // Success state - render the document
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{context.context.title}</Text>
      <Text style={{ color: 'gray' }}>Source: {context.context.source}</Text>
      
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Overview:</Text>
        <Text>{context.context.overview}</Text>
      </View>
      
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Key Points:</Text>
        {context.context.keyPoints.map((point, i) => (
          <Text key={i}>• {point}</Text>
        ))}
      </View>
      
      {context.context.definitions.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: 'bold' }}>Definitions:</Text>
          {context.context.definitions.map((def, i) => (
            <Text key={i}>{def}</Text>
          ))}
        </View>
      )}
      
      <Button title="Remove Document" onPress={() => context.remove()} />
    </View>
  );
}

/**
 * URLProcessor - Pure UI component
 */
interface URLProcessorProps {
  processor: DocumentProcessorContract;
  onSuccess?: () => void;
}

function URLProcessor({ processor, onSuccess }: URLProcessorProps) {
  const [url, setUrl] = React.useState('');
  
  const handleProcess = async () => {
    try {
      await processor.processURL(url);
      setUrl('');
      onSuccess?.();
    } catch (error) {
      // Error is already in processor.error
    }
  };
  
  return (
    <View>
      <Text>Enter URL:</Text>
      <input 
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/article"
      />
      
      <Button 
        title={processor.isProcessing ? "Processing..." : "Process URL"}
        onPress={handleProcess}
        disabled={processor.isProcessing || !url}
      />
      
      {processor.error && (
        <Text style={{ color: 'red' }}>{processor.error.message}</Text>
      )}
    </View>
  );
}

// ============================================================================
// STEP 2: Develop in isolation with mocks
// ============================================================================

/**
 * During UI development, use mocks to test all states
 */
export function DocumentViewerStorybook() {
  return (
    <View>
      <Text>Loading State:</Text>
      <DocumentViewer context={createMockDocumentContext('loading')} />
      
      <Text>Error State:</Text>
      <DocumentViewer context={createMockDocumentContext('error')} />
      
      <Text>Empty State:</Text>
      <DocumentViewer context={createMockDocumentContext('idle')} />
      
      <Text>Success State:</Text>
      <DocumentViewer context={createMockDocumentContext('success')} />
    </View>
  );
}

// ============================================================================
// STEP 3: Connect to real hooks in production
// ============================================================================

/**
 * Production Screen - Uses real hooks
 * 
 * import { useDatabase } from '@/lib/hooks/useDatabase';
 * import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
 * import { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';
 */
export function DocumentScreen() {
  // In production, import real hooks:
  // const { db, isReady } = useDatabase();
  // const context = useDocumentContext(db);
  // const processor = useDocumentProcessor();
  
  // For this example, using mocks (swap with real hooks above):
  const db = { db: {} as any, isReady: true, error: null };
  const context = createMockDocumentContext('success');
  const processor = createMockDocumentProcessor('idle');
  
  if (!db.isReady) {
    return <Text>Initializing database...</Text>;
  }
  
  const handleProcessSuccess = async () => {
    // Reload context after processing
    await context.loadContext();
  };
  
  return (
    <View>
      <DocumentViewer context={context} />
      <URLProcessor processor={processor} onSuccess={handleProcessSuccess} />
    </View>
  );
}

// ============================================================================
// KEY BENEFITS
// ============================================================================

/**
 * ✅ Type Safety: Components expect exact contract interface
 * ✅ Predictable States: All UI states defined in contract
 * ✅ Isolated Development: Build UI without backend/database
 * ✅ Easy Testing: Test all states with different mocks
 * ✅ Seamless Integration: Swap mocks for real hooks without UI changes
 * ✅ No Prop Drilling: Pass entire contract object
 * ✅ Consistent API: All hooks follow same pattern (state + actions)
 */

// ============================================================================
// WORKFLOW
// ============================================================================

/**
 * 1. Define contracts (already done in ui-contracts.ts)
 * 2. Create mock factory (already done in mock-factory.ts)
 * 3. Build UI components using contracts
 * 4. Develop/test with mocks
 * 5. Replace mock calls with real hook calls
 * 6. Component code doesn't change - only the source
 */
