# Business Logic Analysis - Phase 1 & 2

> **Date:** 2026-01-05  
> **Components:** Database, Validation, Document Processing, AI Integration  
> **Status:** Ready for Testing

---

## Overview

This document analyzes the business logic implemented in Phase 1 & 2, identifying key flows, decision points, edge cases, and potential issues.

---

## 1. Database Layer Business Logic

### 1.1 Single-Context Enforcement

**Implementation:**
```typescript
// schema.ts - Enforces only ONE row
CREATE TABLE document_context (
  id INTEGER PRIMARY KEY CHECK (id = 1),  // <-- Always 1
  ...
);

// context-store.ts - Always uses id = 1
INSERT OR REPLACE INTO document_context (id, ...) VALUES (1, ...)
```

**Business Rules:**
- ✅ Only one document context can exist at a time
- ✅ New ingestion OVERWRITES previous context (no confirmation - as per v1 spec)
- ✅ No history or multi-document support

**Potential Issues:**
- ⚠️ **User Experience:** No warning before overwriting existing context
  - **Impact:** User might accidentally lose their current document
  - **Mitigation:** Add confirmation dialog in UI layer (Phase 5)
  
- ✅ **Database Integrity:** CHECK constraint ensures id = 1
  - Cannot accidentally insert multiple rows

**Edge Cases:**
1. ✅ User tries to save while another save is in progress
   - Handled by SQLite transaction locks
   
2. ✅ Database file corrupted/deleted
   - Migration system will recreate schema on next init

---

## 2. Validation Logic

### 2.1 PDF Validation

**Flow:**
```
User selects PDF
  ↓
Get file info (expo-file-system)
  ↓
Validate:
  - File exists? ✓
  - Size ≤ 2MB? ✓
  - MIME type = application/pdf? ✓
  ↓
Pass to processor OR reject with clear message
```

**Business Rules:**
- ✅ Max file size: 2MB (proxy for ~20 pages)
- ✅ Must be PDF MIME type
- ✅ Reject BEFORE any processing (fail fast)

**Validation Code:**
```typescript
export const pdfFileSchema = z.object({
  uri: z.string(),
  size: z.number().max(2 * 1024 * 1024, "PDF must be under 2MB"),
  mimeType: z.string().refine(
    (type) => type === 'application/pdf',
    'File must be a PDF'
  ),
});
```

**Potential Issues:**
- ⚠️ **MIME Type Trust:** Relies on file system's MIME detection
  - **Risk:** Malformed files might have incorrect MIME type
  - **Mitigation:** Gemini API will validate actual PDF format
  
- ⚠️ **File Size Accuracy:** 2MB might not always = 20 pages
  - **Risk:** Image-heavy PDFs could be smaller but complex
  - **Mitigation:** Acceptable for v1; Gemini will handle or timeout

**Edge Cases:**
1. ✅ File deleted after selection but before validation
   - `fileInfo.exists` check catches this
   
2. ⚠️ File modified between validation and processing
   - **Risk:** Size could change
   - **Mitigation:** Low probability; acceptable for v1

---

### 2.2 URL Validation

**Flow:**
```
User enters URL
  ↓
Validate:
  - Valid URL format? ✓
  - Starts with http:// or https://? ✓
  ↓
Fetch & convert to Markdown
  ↓
Validate:
  - Markdown length ≤ 15,000 chars? ✓
  ↓
Pass to summarization OR reject
```

**Business Rules:**
- ✅ Must be valid HTTP(S) URL
- ✅ Max markdown length: 15,000 characters
- ✅ No pagination or link following

**Validation Code:**
```typescript
export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .refine(
    (url) => url.startsWith('http://') || url.startsWith('https://'),
    'URL must start with http:// or https://'
  );

export const markdownContentSchema = z
  .string()
  .max(15_000, 'Webpage content is too large for v1');
```

**Potential Issues:**
- ⚠️ **Network Dependency:** urltoany.com API must be available
  - **Risk:** Third-party service downtime
  - **Mitigation:** Clear error message, retry option in UI
  
- ⚠️ **Content Size:** Markdown conversion might expand/compress differently
  - **Risk:** Original page might be larger than 15K chars
  - **Mitigation:** Post-conversion validation catches this

**Edge Cases:**
1. ✅ URL is valid but page doesn't exist (404)
   - Caught by fetch error, returns NETWORK_ERROR message
   
2. ✅ URL is paywalled or requires auth
   - urltoany.com returns partial content, might be too short
   - Gemini summarization will handle or fail gracefully
   
3. ⚠️ URL redirects to different domain
   - **Risk:** User might get unexpected content
   - **Mitigation:** Acceptable for v1; summary will reflect actual content

---

## 3. Document Processing Logic

### 3.1 PDF Processing (Current Implementation)

**Flow:**
```
validatePDF(file)
  ↓
extractPDFText(fileUri)  // <-- Placeholder for MVP
  ↓
gemini.summarize(text)
  ↓
Save to database
```

**Current Status:**
- ⚠️ **MVP Implementation:** Using placeholder text extraction
- ✅ **Validation:** File size check works
- 🔄 **TODO:** Implement Gemini File API for native PDF processing

**Placeholder Code:**
```typescript
async function extractPDFText(fileUri: string): Promise<string> {
  const content = await FileSystem.readAsStringAsync(fileUri, {
    encoding: 'base64',
  });
  
  return `[PDF Content - File API integration pending]...`;
}
```

**Business Impact:**
- ⚠️ **Testing Limitation:** Can't fully test PDF processing yet
- ✅ **Architecture:** Ready for File API integration
- ✅ **Validation:** All checks in place

**Next Steps:**
1. Implement Gemini File API upload
2. Handle multipart form data with expo-file-system
3. Pass file URI to Gemini for native processing

---

### 3.2 URL Processing

**Flow:**
```
validateURL(url)
  ↓
convertURLToMarkdown(url)
  ↓
validateMarkdownContent(markdown)
  ↓
gemini.summarize(markdown)
  ↓
Parse JSON response
  ↓
validateDocumentSummary(parsed)
  ↓
Save to database
```

**Business Rules:**
- ✅ Each step validates before proceeding (fail fast)
- ✅ Network errors are caught and re-thrown with user-friendly messages
- ✅ Title fallback: AI title > URL title > "Web Page"

**Error Handling Chain:**
```typescript
try {
  validateURL(url);
  const { markdown, title } = await convertURLToMarkdown(url);
  validateMarkdownContent(markdown);
  const summary = await gemini.summarize(markdown);
  return { contextInput, summary };
} catch (error) {
  // ValidationError, NetworkError, or SummarizationError
  throw error; // Propagated to UI with clear message
}
```

**Potential Issues:**
- ✅ **Error Messages:** All errors have user-friendly messages
- ✅ **Validation Order:** Optimal (cheap checks first)
- ⚠️ **Timeout Handling:** No explicit timeout on fetch
  - **Risk:** Slow pages might hang
  - **Mitigation:** Add timeout in next iteration

**Edge Cases:**
1. ✅ Empty markdown after conversion
   - Caught by validation (min length checks in summarization)
   
2. ✅ Markdown is valid but Gemini can't summarize
   - Error propagated with SUMMARY_FAILED message
   
3. ⚠️ Markdown contains only images/media descriptions
   - **Risk:** Summary might be thin or useless
   - **Mitigation:** Gemini will work with what it has; acceptable for v1

---

## 4. AI Integration (Gemini)

### 4.1 Summarization Logic

**API Call:**
```typescript
const prompt = `${text}\n\n${SUMMARIZATION_PROMPT}`;
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`,
  {
    method: 'POST',
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);
```

**Business Rules:**
- ✅ Must return valid JSON with specific structure
- ✅ Requires: title, overview, key_points array, definitions array
- ✅ Response is validated with Zod schema

**Prompt Design:**
```typescript
export const SUMMARIZATION_PROMPT = `
Produce a JSON object with this exact structure:
{
  "title": "A short title for the document",
  "overview": "A brief 2-3 sentence overview",
  "key_points": ["Point 1", "Point 2", ...],
  "definitions": ["Term: Definition", ...]
}

Rules:
- Include 5-10 key points
- Use only the provided content
- Do not add external knowledge
- Keep the output concise and factual
- Respond ONLY with valid JSON
`;
```

**Validation:**
```typescript
export const documentSummarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  overview: z.string().min(1, 'Overview is required'),
  key_points: z.array(z.string()).min(1, 'At least one key point required'),
  definitions: z.array(z.string()),
});
```

**Potential Issues:**
- ⚠️ **JSON Parsing:** Gemini might return markdown-wrapped JSON
  - **Example:** "```json\n{...}\n```"
  - **Risk:** JSON.parse() will fail
  - **Mitigation:** Add JSON extraction logic before parsing
  
- ⚠️ **Empty Arrays:** Definitions might be empty for some documents
  - **Status:** ✅ Handled (definitions is optional in schema)
  
- ⚠️ **API Errors:** Rate limits, auth failures, network issues
  - **Status:** ✅ All caught and re-thrown with user messages

**Edge Cases:**
1. ⚠️ Gemini returns malformed JSON
   - Currently: Throws error
   - **Fix Needed:** Add JSON extraction/cleanup logic
   
2. ✅ Content is too short to summarize
   - Gemini will do its best; might have fewer key points
   
3. ⚠️ Content is in non-English language
   - **Risk:** Prompt is in English
   - **Mitigation:** Acceptable for v1; Gemini handles multilingual

---

### 4.2 Q&A Logic

**Flow:**
```
User asks question
  ↓
Get context from database
  ↓
Format context as string
  ↓
Build prompt: SYSTEM + USER + CONTEXT + QUESTION
  ↓
Call Gemini API
  ↓
Return answer (text)
```

**Prompt Design:**
```typescript
export const QA_SYSTEM_PROMPT = `
You are an assistant that answers questions strictly based on a provided document summary.

STRICT RULES:
- Answer ONLY using the provided summary
- Do not infer or guess beyond the summary
- If answer not present, say: "I don't see that in this document."
- Keep responses short (1-3 sentences)
- Use conversational tone for audio playback
`;

export const QA_USER_PROMPT = (question: string, context: string) => `
Here is the document summary:

${context}

Question: ${question}

Answer based ONLY on the summary above.
`;
```

**Business Rules:**
- ✅ Must have context loaded (checked before calling)
- ✅ Answer must be grounded in context only
- ✅ If no answer found: return specific phrase
- ✅ Optimized for spoken output

**Context Formatting:**
```typescript
export function formatContextForPrompt(context: FormattedContext): string {
  const parts = [
    `Title: ${context.title}`,
    `\nOverview: ${context.overview}`,
    `\nKey Points:`,
    ...context.keyPoints.map((point, i) => `${i + 1}. ${point}`),
  ];

  if (context.definitions.length > 0) {
    parts.push('\nDefinitions:');
    parts.push(...context.definitions.map((def) => `- ${def}`));
  }

  return parts.join('\n');
}
```

**Potential Issues:**
- ⚠️ **Hallucination Risk:** LLMs can still hallucinate despite instructions
  - **Mitigation:** Strong system prompt, but not 100% guaranteed
  - **Acceptable for v1:** User feedback can identify issues
  
- ✅ **No Context Check:** Validated before calling
  ```typescript
  if (!contextString) {
    throw new Error(ERROR_MESSAGES.NO_CONTEXT);
  }
  ```
  
- ⚠️ **Answer Length:** No max length enforced
  - **Risk:** Very long answers might not be suitable for TTS
  - **Mitigation:** Prompt asks for 1-3 sentences

**Edge Cases:**
1. ✅ Question is unrelated to document
   - Should return: "I don't see that in this document."
   - **Needs Testing:** Verify Gemini follows instruction
   
2. ⚠️ Question is ambiguous
   - Gemini will do its best with available context
   - **Acceptable for v1**
   
3. ⚠️ Context is very long
   - **Risk:** Token limit exceeded
   - **Mitigation:** Summary is limited by source constraints (2MB PDF, 15K URL)

---

## 5. Error Handling Strategy

### 5.1 Error Types

**1. ValidationError**
```typescript
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```
- Thrown for: Invalid inputs, size limits, format issues
- User sees: Specific error message (e.g., "PDF must be under 2MB")

**2. Network Errors**
- Source: fetch() failures, API timeouts
- Mapped to: ERROR_MESSAGES.NETWORK_ERROR

**3. AI Errors**
- Source: Gemini API failures, parsing errors
- Mapped to: ERROR_MESSAGES.SUMMARY_FAILED or specific message

**4. Database Errors**
- Source: SQLite operations
- Logged to console, re-thrown

### 5.2 Error Propagation

**Pattern:**
```typescript
try {
  // Operation
} catch (error) {
  console.error('[Service] Operation failed:', error);
  
  // Re-throw with user-friendly message
  if (error instanceof ValidationError) {
    throw error; // Already has good message
  }
  
  throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
}
```

**Potential Issues:**
- ✅ **Consistent Error Format:** All services follow same pattern
- ⚠️ **Error Details Lost:** User doesn't see technical details
  - **Mitigation:** Logged to console for debugging
  
---

## 6. Data Flow Analysis

### 6.1 URL Processing End-to-End

```
┌─────────────────────────────────────────────┐
│ User Input: https://example.com/article     │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Validation: URL format, HTTP(S) scheme      │
│ Status: ✅ Pass                             │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Network Call: urltoany.com API              │
│ Returns: { markdown, title, url }           │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Validation: Markdown length ≤ 15K chars     │
│ Status: ✅ Pass                             │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ AI Call: Gemini summarization                │
│ Input: Markdown + SUMMARIZATION_PROMPT      │
│ Returns: JSON string                         │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Parse: JSON.parse(response)                  │
│ Validation: Zod schema                       │
│ Status: ✅ DocumentSummary                  │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Create: DocumentContextInput                 │
│ - title (fallback chain)                     │
│ - source: 'url'                              │
│ - source_uri: original URL                   │
│ - overview, key_points, definitions          │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Database: INSERT OR REPLACE (id=1)           │
│ - Overwrites existing context                │
│ - Timestamps: created_at, updated_at         │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Return: FormattedContext                     │
│ - Used by UI to display                      │
│ - Used by Q&A for prompt context             │
└─────────────────────────────────────────────┘
```

**Key Observations:**
- ✅ Each step validates before proceeding
- ✅ Clear error handling at each stage
- ✅ Data transformations are explicit
- ⚠️ No rollback mechanism (acceptable for v1 - single context)

---

## 7. Critical Business Logic Issues

### 🔴 HIGH PRIORITY

1. **JSON Parsing from Gemini**
   - **Issue:** Gemini might wrap JSON in markdown code blocks
   - **Fix:** Add pre-processing to extract JSON
   ```typescript
   function extractJSON(text: string): string {
     const jsonMatch = text.match(/```json\s*(\{[\s\S]*\})\s*```/);
     return jsonMatch ? jsonMatch[1] : text;
   }
   ```

2. **PDF File API Integration**
   - **Issue:** Currently using placeholder
   - **Fix:** Implement Gemini File API in next iteration

### 🟡 MEDIUM PRIORITY

3. **Timeout Handling**
   - **Issue:** No timeout on network requests
   - **Fix:** Add AbortController with timeout
   ```typescript
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 30000);
   const response = await fetch(url, { signal: controller.signal });
   clearTimeout(timeout);
   ```

4. **Context Overwrite Warning**
   - **Issue:** No confirmation before replacing context
   - **Fix:** Add dialog in UI (Phase 5)

### 🟢 LOW PRIORITY

5. **Rate Limit Handling**
   - **Issue:** No exponential backoff for API failures
   - **Fix:** Add retry logic with backoff

6. **Offline Mode**
   - **Issue:** No offline detection
   - **Fix:** Check network state before API calls

---

## 8. Testing Checklist

### Unit Tests (Can be manual for v1)

- [ ] **Validation:**
  - [ ] Valid URL passes
  - [ ] Invalid URL rejected
  - [ ] Valid PDF (1MB) passes
  - [ ] Oversized PDF (3MB) rejected
  - [ ] Content length validation

- [ ] **Database:**
  - [ ] Single context enforcement
  - [ ] Insert OR REPLACE works
  - [ ] Context retrieval
  - [ ] Context deletion
  - [ ] Migration runs successfully

- [ ] **AI Integration:**
  - [ ] Summarization returns valid JSON
  - [ ] Q&A with valid context
  - [ ] Q&A with no context (error)
  - [ ] Out-of-context question handling

### Integration Tests

- [ ] **End-to-End URL Processing:**
  - [ ] Small webpage (< 15K chars)
  - [ ] Large webpage (> 15K chars) - should reject
  - [ ] 404 page - should error gracefully
  - [ ] Paywalled content - should handle

- [ ] **End-to-End PDF Processing:**
  - [ ] Small PDF (< 2MB)
  - [ ] Large PDF (> 2MB) - should reject

- [ ] **Q&A Flow:**
  - [ ] Question in context
  - [ ] Question out of context
  - [ ] Empty question
  - [ ] Very long question

---

## 9. Performance Considerations

### Expected Latencies

- **Database Operations:** < 100ms (local SQLite)
- **URL Conversion:** 2-5s (network + API)
- **Gemini Summarization:** 3-8s (depends on content size)
- **Gemini Q&A:** 1-3s (shorter responses)

### Resource Usage

- **Database Size:** ~1-10KB per context (negligible)
- **Memory:** Mostly transient (text processing)
- **Network:** Only during ingestion and Q&A

### Bottlenecks

1. **Network Latency:** urltoany.com and Gemini API
   - **Mitigation:** Show loading states
   
2. **Large Content Processing:** 15K chars to Gemini
   - **Acceptable:** Within Gemini's limits

---

## 10. Recommendations for Next Iteration

### Before Phase 3 (Audio)

1. ✅ **Test Current Implementation:**
   - Run test screen with real URLs
   - Verify database operations
   - Test error scenarios

2. 🔧 **Fix Critical Issues:**
   - Add JSON extraction for Gemini responses
   - Implement Gemini File API for PDFs
   - Add timeout handling

3. 📝 **Update Documentation:**
   - Document any workarounds
   - Note known limitations

### Architecture Improvements

1. **Retry Logic:** Add exponential backoff for API failures
2. **Caching:** Consider caching URL conversions (future)
3. **Logging:** Add structured logging for debugging

---

## Conclusion

**Overall Status: 🟢 Ready for Testing**

✅ **Strengths:**
- Solid validation layer
- Clear error handling
- Type-safe implementation
- Single-responsibility services

⚠️ **Known Limitations:**
- PDF processing is placeholder (MVP)
- No timeout handling
- No context overwrite confirmation
- JSON parsing could be more robust

🎯 **Next Steps:**
1. Run test screen
2. Test with real URLs
3. Fix JSON extraction
4. Implement File API for PDFs
5. Proceed to Phase 3 (Audio)
