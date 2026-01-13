# On-Device AI with React Native ExecuTorch

Research on running AI models locally on mobile devices using React Native.

## Overview

**react-native-executorch** (Software Mansion) enables on-device AI inference powered by Meta's ExecuTorch framework. This allows running AI models directly on mobile devices without cloud dependencies.

## Key Requirements

- **iOS 17.0+**, **Android 13+**, **React Native 0.81+**
- Requires **New React Native Architecture**
- **Cannot use Expo Go** - requires Development Builds
- Install: `npx expo install expo-dev-client` then build with `npx expo run:ios/android` or EAS Build

## Related Libraries

### react-native-rag (Software Mansion Labs)
- **Purpose**: Local RAG (Retrieval-Augmented Generation) for privacy-first AI
- **Features**: Modular LLM, Embeddings, VectorStore, TextSplitter components
- **Integration**: Uses `@react-native-rag/executorch` for on-device inference
- **Persistence**: `@react-native-rag/op-sqlite` for vector store persistence
- **Real-world app**: Powers [Private Mind](https://privatemind.swmansion.com/) on iOS/Android

## Smallest Available Models

### 1. WHISPER_TINY_EN (Quantized) - Speech-to-Text

**Size**: 
- **WHISPER_TINY_EN**: 151 MB (full precision)
- **WHISPER_TINY_EN_QUANTIZED**: ~75-100 MB (quantized, ~50% smaller)

**Best for**: English-only speech-to-text transcription

#### What is Quantization?

Quantization reduces model size by converting weights from 32-bit floating point (`float32`) to lower precision formats like 8-bit integers (`int8`) or 16-bit floats (`float16`). This is like compressing image files - you trade some quality for smaller file size.

**How it works**:
- Regular model: Uses `float32` (32 bits per number)
- Quantized model: Uses `int8` or `float16` (8-16 bits per number)
- Result: 2-4x smaller model size, 2-4x faster inference

#### Quality Differences: Quantized vs. Regular

**WHISPER_TINY_EN_QUANTIZED** trade-offs:

**Pros**:
- ✅ ~50% smaller file size (75-100 MB vs 151 MB)
- ✅ Faster inference speed (less computation)
- ✅ Lower memory usage during runtime
- ✅ Better battery efficiency

**Cons**:
- ❌ Slight accuracy loss (typically 1-3% Word Error Rate increase)
- ❌ May struggle more with:
  - Heavy accents or unclear speech
  - Background noise
  - Technical/uncommon words
  - Very quiet audio

**Typical accuracy difference**:
- Regular: ~95% accuracy on clear English speech
- Quantized: ~93-94% accuracy on same audio
- The difference is often imperceptible in practice for most use cases

**Performance Benchmarks** (WHISPER_TINY on iPhone 16 Pro):
- Encoding 30s audio: ~254 ms
- Decoding per token: ~25 ms
- Total for short phrase: ~1-2 seconds

**When to use each**:
- **Use QUANTIZED**: If storage/speed is critical and you can tolerate occasional transcription errors
- **Use REGULAR**: If you need maximum accuracy for critical applications (medical, legal)

**Real-world impact example**:
```
Audio: "The quick brown fox jumps over the lazy dog"

Regular model output:
"The quick brown fox jumps over the lazy dog" ✓

Quantized model output:
"The quick brown fox jumps over the lazy dog" ✓
(Most of the time identical!)

But with difficult audio (accent, noise):
Regular: "I need to schedule an appointment"
Quantized: "I need to schedule an apointment" (minor typo)
```

**Use Cases**:
- Voice notes and memos transcription
- Real-time voice commands
- Meeting/lecture transcription (English only)
- Accessibility features (voice-to-text)
- Voice search in apps
- Offline dictation
- Caption generation for videos

**Drawbacks**:
- **English only** - no multilingual support (use WHISPER_TINY for multilingual, same size)
- Lower accuracy compared to larger Whisper models (Base: 290 MB, Small: 968 MB)
- May struggle with:
  - Heavy accents or dialects
  - Poor audio quality or background noise
  - Domain-specific terminology (medical, legal, technical)
  - Multiple overlapping speakers
  - Very fast speech or mumbling
- Requires decent audio preprocessing for best results
- Context window limitations (30-second chunks typical)

**Usage**:
```typescript
import { useWhisper, WHISPER_TINY_EN, WHISPER_TINY_EN_QUANTIZED } from 'react-native-executorch';

function TranscriptionComponent() {
  const whisper = useWhisper({ 
    model: WHISPER_TINY_EN_QUANTIZED  // Even smaller quantized version
  });
  
  const transcribeAudio = async (audioFilePath: string) => {
    const result = await whisper.transcribe(audioFilePath);
    console.log('Transcription:', result.text);
  };
}
```

**Model Variants**:
- `WHISPER_TINY_EN` - 151 MB (English only, better quality)
- `WHISPER_TINY_EN_QUANTIZED` - ~75-100 MB (English only, smaller, slight quality loss)
- `WHISPER_TINY` - 151 MB (Multilingual, 99 languages)
- `WHISPER_BASE_EN` - 290.6 MB (English only, better accuracy)
- `WHISPER_SMALL_EN` - 968 MB (English only, best quality)

### 2. FSMN_VAD (Voice Activity Detection)

**Size**: 1.83 MB

**Use Cases**:
- Detecting when user starts/stops speaking
- Trigger for voice recording in voice assistants
- Speech segmentation for audio processing
- Push-to-talk alternatives (auto-detect speech)
- Audio conferencing apps (mute/unmute detection)
- Voice command wake detection preprocessing
- Battery-efficient always-listening features

**Drawbacks**:
- Only detects presence of speech, not content
- No speech recognition or transcription capabilities
- Doesn't identify speakers or language
- May have false positives with similar sounds (music, TV, etc.)
- Requires audio preprocessing for best results
- Environment noise can affect accuracy
- Not a replacement for full speech-to-text models

**Usage**:
```typescript
import { FSMN_VAD } from 'react-native-executorch';

// VAD is typically used as a preprocessing step
// before more expensive speech recognition
const vadModel = { modelSource: FSMN_VAD };
```

## Alternative Small Models

### Speech-to-Text (Whisper):
- **WHISPER_TINY_EN_QUANTIZED** (75-100 MB) - Smallest English transcription
- **WHISPER_TINY_EN** (151 MB) - English only, best quality tiny model
- **WHISPER_TINY** (151 MB) - Multilingual (99 languages)
- **WHISPER_BASE_EN** (290.6 MB) - Better accuracy, English only
- **WHISPER_BASE** (290.6 MB) - Better accuracy, multilingual
- **WHISPER_SMALL_EN** (968 MB) - High quality, English only

### LLMs (Text Generation):
- **SMOLLM2_1_135M_QUANTIZED** (70-100 MB) - Smallest LLM
- **SMOLLM2_1_360M** (360M params) - Slightly larger, better performance
- **HAMMER2_1_0_5B** (500M params) - Good balance of size/capability
- **QWEN2_5_0_5B** (500M params) - Alternative 500M model
- **QWEN3_0_6B** (600M params) - Better reasoning
- **LLAMA3_2_1B_SPINQUANT** (1.14 GB) - Popular choice, significantly better quality

### Other Lightweight Models:
- **FSMN_VAD** (1.83 MB) - Voice activity detection (not transcription!)
- **Style Transfer** (5-7 MB) - Artistic image filters
- **SSDLITE_320_MOBILENET_V3_LARGE** (13.9 MB) - Object detection
- **ALL_MINILM_L6_V2** (91 MB) - Text embeddings for semantic search

## General Advantages of On-Device AI

- **Privacy**: Data never leaves the device
- **Offline**: No internet required
- **Cost**: No cloud API fees
- **Latency**: Faster response times (no network round-trip)
- **Reliability**: Works without connectivity

## General Drawbacks

- **Storage**: Models require device storage space
- **Battery**: Inference consumes battery power
- **Performance**: Slower than cloud-based models on powerful servers
- **RAM**: Large models need significant memory (can cause crashes)
- **Updates**: Model improvements require app updates
- **Device Requirements**: Newer devices only (iOS 17+, Android 13+)

## Resources

- **Main Repo**: [software-mansion/react-native-executorch](https://github.com/software-mansion/react-native-executorch) (1,174 ⭐)
- **RAG Library**: [software-mansion-labs/react-native-rag](https://github.com/software-mansion-labs/react-native-rag) (283 ⭐)
- **Documentation**: https://docs.swmansion.com/react-native-executorch
- **Models**: https://huggingface.co/software-mansion
- **Blog**: https://expo.dev/blog/how-to-run-ai-models-with-react-native-executorch

## Installation Steps

```bash
# Install core library
yarn add react-native-executorch

# For RAG features
yarn add react-native-rag @react-native-rag/executorch

# Install dev client for development builds
npx expo install expo-dev-client

# Build for your platform
yarn expo run:ios
# or
yarn expo run:android
```

## Recommended Model Combinations

### Voice Assistant (Minimal)
- **FSMN_VAD** (1.83 MB) - Detect when user speaks
- **WHISPER_TINY_EN_QUANTIZED** (~75-100 MB) - Transcribe speech to text
- **SMOLLM2_1_135M_QUANTIZED** (~70-100 MB) - Generate responses
- **Total**: ~150-200 MB

### Voice Assistant (Better Quality)
- **FSMN_VAD** (1.83 MB) - Voice activity detection
- **WHISPER_BASE_EN** (290 MB) - Better transcription accuracy
- **LLAMA3_2_1B_SPINQUANT** (1.14 GB) - Much better language understanding
- **Total**: ~1.4 GB

## Next Steps

- Use **WHISPER_TINY_EN_QUANTIZED** for smallest speech-to-text (75-100 MB)
- Use **FSMN_VAD** (1.83 MB) to trigger transcription only when speech detected
- Experiment with SMOLLM2_1_135M for simple chat features
- Consider react-native-rag for local knowledge base / semantic search
- Test on physical devices (emulators may need more RAM allocated)
- Monitor app size and battery consumption
