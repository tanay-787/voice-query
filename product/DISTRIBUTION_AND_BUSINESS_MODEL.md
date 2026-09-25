# Distribution & Business Model

## Status

**Status**: Business model hypothesis.

No pricing, willingness-to-pay, retention, or acquisition assumptions have been validated with users yet.

The purpose of this document is to define assumptions and experiments rather than present forecasts as facts.

---

## 1. Initial distribution hypothesis

VoiceQuery is primarily a utility product.

The most likely acquisition moments occur when someone already has a document they need to understand.

### Potential entry points:

#### Share sheet
A user encounters a PDF or article and sends it directly to VoiceQuery.

#### Direct upload
A user opens VoiceQuery when they already know they need help understanding a document.

#### Search / discovery
Users searching for:
- PDF summarizer
- AI PDF reader
- Talk to PDF
- Voice PDF assistant
- Document AI
- Research assistant

may discover the product.

#### Product sharing
Users could potentially share:
- Generated briefings
- Document insights
- Citations

*However, this should be treated as an experiment rather than assumed to be viral.*

---

## 2. Activation hypothesis

A useful activation event could be:

> *"User uploads a document and completes the first briefing."*

A stronger activation event may be:

> *"User uploads a document, listens to the briefing, and asks at least one follow-up question."*

This should be measured experimentally.

---

## 3. Retention hypothesis

Potential recurring use cases include:

- Reviewing research papers
- Evaluating reports
- Understanding proposals
- Preparing for meetings
- Consuming industry research
- Reviewing documentation

*However, "commuting" or "exercise" should not automatically be treated as retention loops. The product needs evidence that users actually return for these situations.*

---

## 4. Pricing hypothesis

An initial pricing hypothesis could be:

### Free
- Limited documents
- Basic briefing
- Standard voice
- Limited questions

### Pro
*Potentially: $14.99 / month*

Possible benefits:
- Higher document limits
- Longer conversations
- Premium voices
- Saved document history
- Advanced citations
- Exports

### Teams
*Potentially: $35 / seat / month*

Possible benefits:
- Shared document libraries
- Team workspaces
- Administration
- Enterprise integrations
- Security / compliance features

*These prices are hypotheses, not market-validated prices.*

---

## 5. Willingness-to-pay experiment

Before implementing subscriptions, test whether users value the workflow enough to pay.

**Possible experiment**:
After users complete several successful document sessions, ask:
> *"Would you pay for continued access to this?"*

Then test multiple price points with different cohorts.

**Better evidence comes from behavior**:
- Clicking a pricing option
- Starting checkout
- Entering payment details
- Purchasing

rather than simply asking: *"Would you pay $15?"*

---

## 6. Cost model

The previous cost estimate should be treated as a scenario rather than a guaranteed unit cost.

For each document, calculate:

$$\text{Document processing cost} + \text{LLM generation cost} + \text{Speech generation cost} + \text{Storage} + \text{Bandwidth} + \text{Other infrastructure}$$

The actual cost depends on:
- Document size
- Number of pages
- Number of generated tokens
- Number of questions
- Audio duration
- Model used
- Caching
- Storage duration

Therefore:
> *"Gross margin should be calculated from observed production usage rather than assumed average usage."*

---

## 7. Example unit-economics model

*For planning only:*

| Variable | Example |
| :--- | :--- |
| **Monthly price** | $14.99 |
| **Documents / user / month** | 10 |
| **Questions / document** | 5 |
| **Average audio generation** | TBD |
| **LLM cost** | TBD |
| **Speech cost** | TBD |
| **Storage / bandwidth** | TBD |
| **Total variable cost** | TBD |
| **Gross margin** | TBD |

*These values should be populated from actual infrastructure measurements.*

---

## 8. Distribution experiments

### Experiment 1 — Share sheet
**Measure**:
- Installs from shared documents
- First-document completion
- Activation rate
- Repeat usage

### Experiment 2 — Search acquisition
Create landing pages targeting specific document workflows.

**Measure**:
- Impressions
- Clicks
- Uploads
- Activation
- Repeat usage

### Experiment 3 — Referral
Allow users to share a generated briefing or result.

**Measure**:
- Shares / user
- Recipient visits
- Recipient uploads
- Activation

*Do not call this viral growth until the data demonstrates it.*

---

## 9. Business-model decision framework

### Continue monetization experiments if:
Users demonstrate recurring usage and some users show willingness to pay.

### Change pricing if:
Users value the product but reject the proposed price.

### Change the target segment if:
Usage is concentrated strongly in a different user group than initially expected.

### Reconsider the product if:
Users do not return after the initial novelty of the experience.

---

## 10. Current business conclusion

At the current stage:

- **Problem**: Partially supported by external evidence.
- **Solution**: Unvalidated hypothesis.
- **Distribution**: Hypothesis.
- **Retention**: Hypothesis.
- **Pricing**: Hypothesis.
- **Unit economics**: Scenario model.

The next objective is therefore not maximizing revenue.

It is establishing:
> *"Who repeatedly needs this, what part of the workflow they value, and whether that value is strong enough to support recurring usage and payment."*
