# Type-Safe UI Contracts System

A type-driven approach to building UI components in isolation from the business layer, ensuring predictable state and seamless integration.

## 📁 Files Created

```
lib/types/
├── ui-contracts.ts           # Contract interfaces for all hooks
├── mock-factory.ts           # Type-safe mock implementations
└── ui-contracts.example.tsx  # Usage examples
```

## 🎯 Core Concept

Instead of building UI directly against hooks, build against **contracts** (interfaces). This allows:

1. **UI development in isolation** - No database, no API calls needed
2. **Predictable state** - All possible states defined in types
3. **Easy testing** - Mock any state combination
4. **Seamless integration** - Swap mocks for real hooks without changing UI

## 📋 Available Contracts

### `DatabaseContract`
```typescript
interface DatabaseContract {
  db: SQLiteDatabase | null;
  isReady: boolean;
  error: Error | null;
}
```

### `DocumentContextContract`
```typescript
interface DocumentContextContract {
  context: FormattedContext | null;
  isLoading: boolean;
  error: Error | null;
  loadContext: () => Promise<FormattedContext | null>;
  save: (input: DocumentContextInput) => Promise<FormattedContext>;
  remove: () => Promise<void>;
  checkExists: () => Promise<boolean>;
  getPromptContext: () => string | null;
}
```

### `DocumentProcessorContract`
```typescript
interface DocumentProcessorContract {
  isProcessing: boolean;
  error: Error | null;
  processPDF: (pickerResult: DocumentPickerResult) => Promise<ProcessingResult>;
  processURL: (url: string) => Promise<ProcessingResult>;
  askQuestion: (question: string, contextString: string) => Promise<string>;
}
```

### `VoiceInteractionContract`
```typescript
interface VoiceInteractionContract {
  isRecording: boolean;
  isTranscribing: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  duration: number;
  transcription: string;
  answer: string;
  error: Error | null;
  getVoices: () => Promise<string[]>;
  startVoiceQuestion: () => Promise<void>;
  stopAndProcess: () => Promise<void>;
  cancel: () => Promise<void>;
  stopSpeaking: () => Promise<void>;
}
```

Plus: `TextToSpeechContract`, `SpeechToTextContract`, `AppBusinessLayerContract`

## 🚀 Quick Start

### Step 1: Import Contracts

```typescript
import type { DocumentContextContract } from '@/lib/types/ui-contracts';
import { createMockDocumentContext } from '@/lib/types/mock-factory';
```

### Step 2: Build Component Against Contract

```typescript
interface MyComponentProps {
  context: DocumentContextContract;  // Use contract, not hook
}

function MyComponent({ context }: MyComponentProps) {
  // Handle all states
  if (context.isLoading) return <Spinner />;
  if (context.error) return <ErrorView error={context.error} />;
  if (!context.context) return <EmptyState />;
  
  return <View>{/* Render data */}</View>;
}
```

### Step 3: Develop with Mocks

```typescript
// Test all states during development
<MyComponent context={createMockDocumentContext('loading')} />
<MyComponent context={createMockDocumentContext('error')} />
<MyComponent context={createMockDocumentContext('success')} />
```

### Step 4: Connect Real Hooks

```typescript
// In production, swap mock for real hook
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';

function Screen() {
  const context = useDocumentContext(db);  // Real hook
  return <MyComponent context={context} />;  // Same component!
}
```

## 🎨 UI State Coverage

Every contract supports 4 core states:

| State | Description | Example |
|-------|-------------|---------|
| `idle` | Initial state, no data | Empty screen, no document loaded |
| `loading` | Operation in progress | Spinner, "Processing..." |
| `success` | Operation completed | Display data |
| `error` | Operation failed | Error message, retry button |

Use the factory to create any state:

```typescript
createMockDocumentContext('idle')
createMockDocumentContext('loading')
createMockDocumentContext('success')
createMockDocumentContext('error')
```

## 📦 Pre-configured Mocks

For convenience, common states are exported:

```typescript
import {
  MOCK_CONTEXT_EMPTY,      // idle state
  MOCK_CONTEXT_LOADING,    // loading state
  MOCK_CONTEXT_LOADED,     // success state
  MOCK_CONTEXT_ERROR,      // error state
  MOCK_PROCESSOR_PROCESSING,
  MOCK_VOICE_RECORDING,
  // ... etc
} from '@/lib/types/mock-factory';
```

## 🔄 Complete Workflow

```
1. Define Contract (ui-contracts.ts)
   ↓
2. Create Mock Factory (mock-factory.ts)
   ↓
3. Build UI Component (uses contract)
   ↓
4. Develop with Mocks (all states)
   ↓
5. Test Edge Cases (different mock states)
   ↓
6. Connect Real Hook (one line change)
   ↓
7. UI works identically (type-safe!)
```

## ✅ Benefits

### For UI Development
- ✅ No backend setup needed
- ✅ Fast iteration (no API calls)
- ✅ Test all states easily
- ✅ Preview in Storybook/dev tools

### For Type Safety
- ✅ Compiler enforces contract
- ✅ Autocomplete for all fields
- ✅ Refactor with confidence
- ✅ Catch errors at build time

### For Maintenance
- ✅ UI and business layer decoupled
- ✅ Change hooks without breaking UI
- ✅ Easy to add new states
- ✅ Clear interface boundaries

## 🎯 Best Practices

### 1. Always Accept Contracts, Not Hooks
```typescript
// ❌ Bad - couples to implementation
function MyComponent() {
  const context = useDocumentContext(db);
  // ...
}

// ✅ Good - depends on contract
function MyComponent({ context }: { context: DocumentContextContract }) {
  // ...
}
```

### 2. Handle All States
```typescript
// ✅ Cover all contract states
if (context.isLoading) return <Loading />;
if (context.error) return <Error />;
if (!context.context) return <Empty />;
return <Success />;
```

### 3. Use Type Guards for Refinement
```typescript
// TypeScript knows context.context is not null here
if (!context.context) return <Empty />;

const { title, overview } = context.context;  // Safe!
```

### 4. Test with Different Mock States
```typescript
// Test component handles all scenarios
describe('MyComponent', () => {
  it('shows loading', () => {
    render(<MyComponent context={createMockDocumentContext('loading')} />);
  });
  
  it('shows error', () => {
    render(<MyComponent context={createMockDocumentContext('error')} />);
  });
  
  it('shows data', () => {
    render(<MyComponent context={createMockDocumentContext('success')} />);
  });
});
```

## 🔌 Integration Example

```typescript
// app/screens/DocumentScreen.tsx
import { useDatabase } from '@/lib/hooks/useDatabase';
import { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';
import { DocumentViewer } from '@/components/DocumentViewer';
import { URLInput } from '@/components/URLInput';

export function DocumentScreen() {
  // Real hooks provide contract-compliant data
  const database = useDatabase();
  const context = useDocumentContext(database.db);
  const processor = useDocumentProcessor();
  
  if (!database.isReady) {
    return <DatabaseInitializing />;
  }
  
  return (
    <View>
      <DocumentViewer context={context} />
      <URLInput processor={processor} />
    </View>
  );
}
```

## 🧪 Testing Strategy

1. **Unit Tests**: Test components with different mock states
2. **Integration Tests**: Test with real hooks in test environment
3. **Visual Tests**: Use mocks in Storybook/preview tools
4. **E2E Tests**: Test complete flows with real backend

## 📚 Further Reading

- See `ui-contracts.example.tsx` for complete examples
- Check existing hooks in `lib/hooks/` for contract compliance
- Review `lib/types/context.ts` for data type definitions

## 🤝 Contributing

When adding new hooks:

1. Define contract in `ui-contracts.ts`
2. Add mock factory in `mock-factory.ts`
3. Ensure hook implements contract exactly
4. Add usage example

---

**Built for predictable, type-safe UI development** 🎨
