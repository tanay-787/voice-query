# Market Research

## Objective

Understand how existing products help users consume complex documents and identify an opportunity worth testing for VoiceQuery.

This research describes observable product capabilities. It does not assume that VoiceQuery is superior to existing products.

---

## 1. Market categories

The current market broadly contains several overlapping approaches.

### A. Document question-answering

**Examples**:
- ChatPDF
- Adobe Acrobat AI Assistant
- Similar AI PDF tools

**Typical workflow**:
Upload → ask a question → receive an answer → inspect sources

- **ChatPDF** provides cited sources and multi-file conversations.
- **Adobe Acrobat AI Assistant** provides document questions, summaries, suggested questions, and source citations.

#### Strength
Users can directly retrieve information from a document.

#### Potential limitation
The user generally has to know what they want to ask or explicitly request a summary.

---

## 2. Audio document understanding

### NotebookLM

NotebookLM can generate Audio Overviews from user-provided sources and supports listening on mobile.

Google describes Audio Overviews as a way to summarize sources and connect concepts through an audio conversation.

#### Strength
Audio provides an alternative to reading and can support on-the-go consumption.

#### Potential opportunity
VoiceQuery can investigate whether users want a different interaction:

> *"Short orientation → conversational follow-up"*

rather than treating the audio overview itself as the final product.

This is an assumption to test, not an established market gap.

---

## 3. General-purpose AI assistants

Examples include general AI assistants with:
- Voice interaction
- Document uploads
- Contextual conversations
- Multimodal capabilities

#### Strength
Broad capability and familiar conversational interfaces.

#### Potential opportunity
VoiceQuery can focus specifically on the document-understanding workflow rather than general-purpose assistance.

Again, this must be validated through user behavior.

---

## 4. Competitive capability matrix

| Capability | ChatPDF | Acrobat AI | NotebookLM | VoiceQuery hypothesis |
| :--- | :--- | :--- | :--- | :--- |
| **Document Q&A** | Yes | Yes | Yes | Yes |
| **Source citations** | Yes | Yes | Yes | Yes |
| **Summaries** | Yes | Yes | Yes | Yes |
| **Audio generation** | No / limited | Yes | Yes | Yes |
| **Mobile usage** | Yes | Yes | Yes | Yes |
| **Voice interaction** | Limited | Varies | Yes | Core interaction |
| **Proactive briefing** | Summary-oriented | Summary-oriented | Audio Overview | Core hypothesis |
| **Short briefing constraint** | Not core | Not core | Not core | 30–45 sec hypothesis |
| **Page-level verification** | Yes | Yes | Source-grounded | Core interaction |

*Capabilities change over time, so this table should be periodically rechecked against current product documentation. Adobe, for example, now explicitly supports audio overviews alongside summaries and cited answers.*

---

## 5. Potential differentiation

VoiceQuery should not claim:
> *"Nobody does this."*

Instead, the product hypothesis is:
> *"Existing products validate multiple parts of the workflow, while VoiceQuery is testing whether combining proactive short-form orientation with voice-first follow-up creates a meaningfully better experience for a specific group of document consumers."*

### Potential differentiators to test:

1. **Proactive orientation**: The user receives an initial explanation without having to formulate a question.
2. **Voice-first continuation**: The user can continue the investigation naturally through speech.
3. **Verification**: Important claims can be traced back to the document.
4. **Mobile-first workflow**: The interaction is designed around situations where reading a long document is inconvenient.

*None of these should be considered defensible differentiators until users demonstrate that they matter.*

---

## 6. Competitive research questions

The next research cycle should answer:

1. Which existing product do target users currently use?
2. What do they like about it?
3. What causes them to switch between reading, searching, summarizing, and asking AI?
4. Do they already use audio summaries?
5. When do they prefer audio vs text?
6. Do citations change their trust in AI-generated answers?
7. Is proactive information useful or annoying?
8. What document types create the strongest recurring need?

---

## 7. Strategic conclusion

The market is not empty.

Users can already:
- Chat with documents
- Generate summaries
- Receive citations
- Generate audio overviews
- Use document AI on mobile

Therefore, VoiceQuery should not be positioned simply as:
> *"AI that lets you talk to PDFs."*

That category already exists.

The stronger product question is:
> *"Can a proactive, short, voice-first document orientation followed by conversational investigation create enough additional value that users prefer it for specific document-consumption situations?"*

That is the hypothesis VoiceQuery should validate.
