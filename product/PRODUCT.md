# VoiceQuery

## Product hypothesis

VoiceQuery explores whether people who regularly consume dense documents can understand and act on them more efficiently through a voice-first document companion.

The core hypothesis is:

> *"When someone adds a dense document, giving them a short, spoken explanation of the most important information — followed by the ability to ask spoken follow-up questions — may reduce the effort required to understand the document."*

This is a hypothesis, not yet a validated product-market conclusion.

---

## Problem

Dense documents such as research papers, reports, contracts, proposals, and long PDFs can require substantial effort to understand.

On mobile devices, difficult content can also take longer to process. Nielsen Norman Group's research found that while simple content can be understood similarly on mobile and desktop, users took longer to achieve the same comprehension with more difficult content.

Existing AI document tools address part of this problem by allowing users to:

- summarize documents
- ask questions
- retrieve cited information
- generate audio overviews

However, these workflows generally begin with the user deciding what to ask or which output to generate.

VoiceQuery explores a different interaction:

**Upload → immediately understand the important points → continue by voice.**

---

## Target users

Initial target users:

### 1. Researchers / knowledge workers

People who regularly consume:

- research papers
- technical reports
- industry reports
- documentation
- long-form articles

### 2. Professionals

People who need to quickly understand:

- proposals
- business reports
- market research
- presentations
- internal documents

### 3. Mobile-first information consumers

People who consume information while:

- commuting
- walking
- exercising
- doing routine work

These are hypotheses about potential users. Interviews and usage data are required before treating any persona as validated.

---

## Core experience

### 1. Add a document

The user uploads a PDF or provides a supported web source.

### 2. Generate an initial briefing

VoiceQuery produces a short spoken briefing containing:

1. What this document is about
2. The most important takeaway
3. Important supporting facts, tensions, or findings
4. What the user may want to investigate next

The initial target is approximately **30–45 seconds**.

The duration is a product constraint to test, not a proven optimal length.

### 3. Continue by voice

After the briefing, the user can ask follow-up questions naturally.

Examples:

- *"What evidence supports that?"*
- *"Explain the second point."*
- *"What are the risks?"*
- *"Where does it say that?"*

### 4. Ground answers in the document

Important answers should provide a clear reference to the source.

For example:

> **Referenced: Page 12**

The user can open the relevant section to verify the answer.

---

## Key product hypotheses

### H1 — Problem
People who regularly consume dense documents experience enough friction that they actively seek faster ways to understand them.

### H2 — Initial experience
After uploading a document, users prefer receiving useful information immediately rather than being presented with an empty chat interface.

### H3 — Briefing length
A short briefing can provide enough value to orient the user without becoming another long-form audio experience.

### H4 — Voice interaction
For at least some document-reading situations, users prefer speaking follow-up questions over typing them.

### H5 — Trust
Users are more comfortable acting on AI-generated document information when they can easily verify the source.

### H6 — Repeat value
The experience provides enough recurring utility that users return for another document rather than treating it as a one-time novelty.

These hypotheses must be tested independently.

---

## MVP

The MVP should test the core interaction rather than build a complete document platform.

### Required

- PDF ingestion
- Document extraction
- Short generated briefing
- Text-to-speech
- Voice question
- Document-grounded answer
- Source/page reference
- Basic conversation state

### Not required initially

- Team workspaces
- Enterprise administration
- Complex knowledge graphs
- Audio sharing
- Subscriptions
- Extensive document libraries
- Advanced integrations

The goal of the MVP is to determine whether the core workflow is useful.

---

## Success signals

The initial product should be evaluated using observable behavior rather than feature completion.

### Activation

- User successfully uploads a document
- User listens to the generated briefing
- User asks at least one follow-up question

### Value

- User reports that the briefing helped them understand the document
- User can answer basic comprehension questions after the briefing
- User chooses VoiceQuery instead of manually reading the document for at least some tasks

### Trust

- Users open citations when answers contain important claims
- Users report confidence in the ability to verify answers

### Retention

- Users return with another document
- Users use VoiceQuery across multiple document types or sessions

---

## Current product decision

The current implementation focuses on:

**Proactive briefing → voice conversation → verifiable source references.**

This should remain provisional until user testing demonstrates that this workflow provides meaningful value.
