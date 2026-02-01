# Decision: TTS Strategy — Azure Speech API vs Native Expo-Speech

## Problem
Application needs text-to-speech functionality for reading content aloud, but Azure Speech API incurs per-character costs (~$1/1M chars), creating unnecessary expense when free alternatives exist.

## Scenario
React Native app with:
- Limited budget (Azure Student Plan: $100/12 months)
- Frequent TTS interactions
- Both Azure Speech and Expo native TTS libraries available
- No strict requirement for premium neural voices

## Constraints
- **Cost**: $100 Azure credit limits API usage (~100M characters max)
- **Platform**: Requires cross-platform (iOS/Android) compatibility
- **Existing code**: Both `synthesizeSpeech()` and `expo-speech` already implemented
- **Audio quality**: Tradeoff between premium voices vs. platform natives

## Decision
**Use `expo-speech` (native TTS) as default; reserve Azure API for premium scenarios only**

### Comparison

| Factor | Native (`expo-speech`) | Azure (`synthesizeSpeech`) |
|--------|------------------------|---------------------------|
| Cost | Free | ~$1/1M chars |
| Latency | Instant (device) | Network-dependent |
| Voice Quality | Good | Premium (neural) |
| API Quota | None | Limited ($100 budget) |

### Allocation Strategy
- **Default**: `getTTSService().speak()` for all routine audio (saves ~$100-500/year)
- **Premium**: `synthesizeSpeech()` reserved for high-fidelity outputs when budget allows

## Outcome
Estimated cost reduction: **100% for routine TTS**, preserving Azure credits for genuinely premium scenarios.
