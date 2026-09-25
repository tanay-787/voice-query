# Problem Validation

## Validation status

**Status**: Problem partially supported by secondary research; primary validation pending.

There is credible evidence that people experience friction when consuming complex information on small screens and that AI document tools have demand.

However, this evidence does not yet prove that users want VoiceQuery's specific workflow of:

> *"Short proactive briefing → voice conversation → page-level verification."*

That requires direct user research and behavioral testing.

---

## 1. What we know

### Complex information can be harder to consume on mobile

Nielsen Norman Group's research found that simple content can achieve similar comprehension on mobile and desktop, but users took longer to achieve the same comprehension when content was more difficult.

Earlier NN/g research found substantially lower comprehension for complex web content on small mobile screens, although NN/g later updated this finding with newer research. Therefore, the older "48% comprehension" statistic should not be presented as a current universal claim.

**Implication**:
There is evidence for a mobile information-consumption problem, but we should not claim that mobile users universally have poor comprehension.

---

## 2. Existing products demonstrate demand

AI document products already support several parts of this workflow.

- **Adobe Acrobat AI Assistant** supports document questions, summaries, citations, suggested questions, and multi-document workflows.
- **ChatPDF** provides document conversations with cited sources and multi-file conversations.
- **NotebookLM** supports source-grounded Audio Overviews and allows users to consume them on mobile. Google introduced Audio Overviews as a way to understand documents through generated conversations and subsequently expanded the feature and its mobile availability.

**Implication**:
There is demonstrated market demand for AI-assisted document understanding and audio-based document consumption.

However:
> *"Existing product adoption does not prove that VoiceQuery's specific interaction is preferable."*

---

## 3. What we do NOT know

We currently do not have sufficient evidence for the following:

- Whether users actually want a briefing immediately after upload
- Whether 30–45 seconds is the right briefing length
- Whether users prefer voice over text for follow-up questions
- Whether users want a "vocal-first" document experience
- Whether page citations materially increase trust
- Whether users return to the product repeatedly
- Which user segment experiences the strongest problem
- Whether users would pay for the workflow

These are product hypotheses.

---

## 4. Primary research plan

### Research question

> *"How do people currently understand dense documents, where does the process break down, and would a proactive spoken briefing meaningfully improve it?"*

---

### User interviews

Interview approximately **8–12 people** who regularly consume long or complex documents.

Recruit from multiple relevant groups:

- Students / researchers
- Software / technical professionals
- Business professionals
- Analysts / investors
- Other knowledge workers

*Avoid recruiting only friends who already like AI products.*

---

### Interview questions

Ask about actual past behavior rather than hypothetical preferences.

#### Current behavior

- Tell me about the last long document you had to understand.
- Why did you need to understand it?
- How long was it?
- Where did you read it?
- What did you do first?
- What did you do when you got stuck?
- Did you use AI?
- What tools did you use?

#### Pain

- Which part took the most effort?
- What information were you actually trying to find?
- Did you abandon or postpone reading anything?
- Did you need to explain the document to someone else?

#### Voice

- Have you ever listened to a document summary?
- When would listening be more convenient than reading?
- What would make you distrust an audio explanation?

*Do not ask:*
> *"Would you use an app that summarizes PDFs by voice?"*

That encourages hypothetical positive responses.

---

## 5. Prototype experiment

Create a lightweight prototype that supports:

**Upload → 30–45 second briefing → follow-up question → citation**

Do not build the complete product first.

Test with **5–8 participants**.

Give each participant real documents relevant to their work.

**Measure**:

- Time to first useful understanding
- Whether they listen to the full briefing
- Whether they ask a follow-up question
- Whether they inspect a citation
- Whether they can explain the document afterward
- What they would normally have done without VoiceQuery

---

## 6. Decision criteria

The experiment should produce decisions, not just opinions.

### Continue the briefing concept if:
A meaningful majority of participants:
- Understand the purpose immediately
- Listen voluntarily
- Describe the briefing as useful
- Use follow-up questions naturally
- Return to the document/citation when verification matters

### Modify the concept if:
Users like the information but:
- Find the briefing too long
- Want control over the topics
- Prefer text in some situations
- Cannot understand the relationship between audio and source pages

### Stop or pivot if:
Users consistently:
- Skip the briefing
- Prefer existing document workflows
- Cannot identify a recurring use case
- Find voice interaction slower than typing
- Do not return to the product

*The exact thresholds should be decided before running the experiment rather than changed afterward to fit the results.*

---

## 7. Validation log

Future validation should be recorded here.

| Date | Hypothesis | Experiment | Participants | Observation | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TBD | Users want proactive briefing | Prototype test | TBD | TBD | TBD |
| TBD | Voice follow-up is useful | Voice usability test | TBD | TBD | TBD |
| TBD | Citations increase trust | Citation test | TBD | TBD | TBD |

---

## Current conclusion

Secondary research supports the broader problem:

> *"Complex information can require significant effort to consume, particularly on mobile, and there is established demand for AI-assisted document understanding and audio consumption."*

It does not yet validate VoiceQuery.

The next step is primary research and prototype testing.
