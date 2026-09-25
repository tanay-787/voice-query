# VoiceQuery — Product Specification

## 1. Product Vision & Philosophy

**VoiceQuery** is a vocal-first, intelligent document companion designed to turn dense, complex documents into **proactive, natural spoken conversations**.

Today, documents—such as quarterly earnings reports, legal contracts, research whitepapers, and technical dossiers—remain static text artifacts. When users attempt to read or analyze them on mobile devices, they face significant friction: squinting at multi-column PDFs, pinching and zooming, or relying on passive chatbots that sit idle waiting for text prompts and return unreadable walls of markdown text.

**VoiceQuery redefines this experience:**
- **Proactive, not passive**: It doesn't wait for the user to formulate questions. Upon receiving a document, it immediately reads, synthesizes, and **speaks an executive audio briefing (30–45 seconds)** aloud.
- **Crafted for the ear, not just the screen**: Conversational responses are delivered in natural spoken cadence—optimized for listening rhythm rather than raw bullet points, markdown symbols, or tabular data.
- **Grounded and verifiable**: Every spoken insight is accompanied by **real-time visual page citations (`[Referenced: Page X]`)**, giving users immediate confidence and one-tap access to the exact source excerpt.

---

## 2. The Core Problem

| Dimension | Conventional Reading & "Chat with PDF" Apps | VoiceQuery Experience |
| :--- | :--- | :--- |
| **Cognitive Burden** | High. Reading dense multi-page documents on mobile requires uninterrupted visual focus and active scanning. | Zero initial effort. An executive audio debrief tells you the core takeaways immediately. |
| **Mobility & Multitasking** | Impossible. You cannot read a 20-page PDF while driving, commuting, walking, or cooking. | Complete freedom. Listen to audio briefings and converse entirely hands-free. |
| **Response Format** | Raw markdown tables, asterisks, and code snippets that sound disjointed when read aloud. | Natural spoken dialogue shaped specifically for voice delivery and conversational rhythm. |
| **Verification & Trust** | Vague claims requiring tedious manual keyword searches across pages to verify. | Interactive, real-time page citations showing the exact quoted passage and page location. |

---

## 3. User Personas & Scenarios

### 3.1. The Busy Executive & Investor
* **Context**: Constantly on the move between meetings, transit, and airports.
* **Need**: Needs to quickly absorb 30-page quarterly financial releases, 10-K filings, or market intelligence reports.
* **Experience**: Uploads an earnings PDF $\rightarrow$ Listens to a 35-second executive debrief summarizing revenue growth and margin contraction $\rightarrow$ Asks aloud: *"What drove the margin compression?"* $\rightarrow$ Listens to the answer while seeing a clear citation badge: `Page 7`.

### 3.2. The Researcher & Knowledge Worker
* **Context**: Reviewing academic whitepapers, clinical trials, or deep technical architecture dossiers.
* **Need**: Needs to extract key methodologies, breakthroughs, and benchmarks without reading through preliminary filler.
* **Experience**: Loads a 15-page research paper $\rightarrow$ VoiceQuery outlines the central breakthrough in 30 seconds $\rightarrow$ User taps a suggested query chip: *"Explain the consensus protocol"* $\rightarrow$ VoiceQuery explains the mechanism and highlights the mathematical proof on `Page 4`.

### 3.3. The Mobile Professional on the Go
* **Context**: Reviewing contracts, rental leases, employment agreements, or compliance policies without a desktop screen.
* **Need**: Quick, targeted answers to high-stakes questions without scanning pages of dense legalese.
* **Experience**: Ingests agreement $\rightarrow$ Listens to high-level scope $\rightarrow$ Speaks: *"What are my termination liabilities if canceled early?"* $\rightarrow$ Receives a clear verbal summary with a direct link to `Page 12, Clause 4.2`.

---

## 4. Core Product Features

### 4.1. Proactive Spoken Audio Briefing (The Signature Feature)
* **Immediate Audio Synthesis**: The moment a document is ingested, VoiceQuery generates a concise, high-impact 30–45 second spoken executive summary (approx. 75–110 words).
* **Narrative Structure**:
  1. *Headline Takeaway*: The fundamental conclusion or theme of the document.
  2. *Key Tensions & Data*: The most critical figures, trade-offs, or milestones.
  3. *Proactive Guidance*: 2–3 suggested angles for the user to explore next.
* **Audio Briefing Player**: A sleek, persistent media card featuring a dynamic waveform, play/pause controls, and an expandable live transcript.

### 4.2. Conversational Spoken Dialogue
* **Voice-First Input**: Users tap to speak or use suggested prompts to converse naturally.
* **Listening-First Cadence**: Responses avoid robotic artifacts (no unformatted markdown, no raw URLs, no nested bullet points). They are phrased naturally for human ears with pacing, rhythm, and clarity.
* **Context Memory**: Remembers past questions within the conversation session, allowing follow-ups (e.g., *"How does that compare to the previous year?"*).

### 4.3. Real-Time Visual Page Citations
* **Interactive Citation Badges**: When the spoken answer references a specific part of the document, a high-contrast badge (`Referenced: Page X`) surfaces.
* **Excerpt Preview**: Tapping the citation reveals the exact quoted passage and page location, eliminating hallucinations and ensuring complete transparency.

### 4.4. Suggested Exploration Queries
* **Dynamic Contextual Chips**: Based on the active document, VoiceQuery presents 3–4 high-impact question pills (e.g., *"What caused the revenue spike?"*, *"Summarize key risks on Page 14"*).
* **One-Tap Inquiry**: Allows instant exploration with a single tap—ideal for quiet environments or quick discovery.

### 4.5. Versatile Document Ingestion
* **PDF Ingestion**: Fast processing of reports, papers, manuals, and dossiers.
* **Web Link Ingestion**: Ingests articles, blog posts, and online whitepapers cleanly.
* **Curated Sample Library**: Instant access to pre-loaded high-value documents (Financial Reports, AI Papers, Engineering Specs) for immediate demonstration and exploration.

---

## 5. Product UI & UX Experience

```
+-----------------------------------------------------------+
|  VoiceQuery                 [⚡ Demo Mode]     ( 💬 History ) |
+-----------------------------------------------------------+
|                                                           |
|    +-------------------------------------------------+    |
|    | 📄 Q3 2026 Earnings Report        18 Pages • PDF |    |
|    | ▶ 0:12 / 0:35   [||||||||||········]   Briefing |    |
|    +-------------------------------------------------+    |
|                                                           |
|                       (((   )))                           |
|                    ((           ))                        |
|                   (   VOCAL ORB   )                       |
|                    ((           ))                        |
|                       (((   )))                           |
|                      "Tap to speak"                       |
|                                                           |
|   [ 🏷️ Margin Compression? ]  [ 🏷️ Cloud Capex? ]         |
|   [ 🏷️ Q4 Forward Guidance? ]                             |
|                                                           |
|   +---------------------------------------------------+   |
|   | 📖 Referenced: Page 7                             |   |
|   | "Operating margin contracted 180 bps to 29.2%..." |   |
|   +---------------------------------------------------+   |
|                                                           |
+-----------------------------------------------------------+
```

### 5.1. The Vocal Orb (Visual Anchor)
* The centerpiece of the interface is the **Vocal Orb**—an organic, responsive visual element that communicates system state through fluid motion and color:
  * **Idle**: Gentle breathing glow, signaling readiness.
  * **Listening**: Expanding responsive ripples reflecting voice capture.
  * **Thinking**: Smooth orbital shimmer, indicating synthesis.
  * **Speaking**: Rhythmic pulsing synchronized with speech audio output.

### 5.2. Spoken Briefing Bar
* Positioned prominently near the top of the interface whenever a document is active.
* Displays document metadata (title, page count, category) and playback controls for the executive audio briefing.

### 5.3. Suggested Prompt Chips
* Arranged beneath the Vocal Orb to guide the user toward the most interesting, controversial, or critical insights in the document.

### 5.4. Active Citation Card
* Appears dynamically during or after an answer to anchor spoken insights in verifiable source text.

---

## 6. Product Success & Experience Criteria

1. **Instant Gratification**: The user hears the spoken executive briefing within seconds of opening or uploading a document—no prompting required.
2. **Audio Elegance**: 100% of spoken answers sound natural, fluid, and conversational when read aloud.
3. **Zero Friction Hands-Free Interaction**: Users can conduct an entire inquiry session purely through voice or one-tap query chips.
4. **Verifiable Trust**: Every significant fact stated in conversation links directly to a verifiable page number.
