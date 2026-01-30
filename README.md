# VoiceQuery

**Intelligent voice-powered document interaction platform** that enables users to ask natural language questions about documents through conversational AI.

## Overview

VoiceQuery is a cross-platform mobile application engineered to provide seamless voice-based document analysis and retrieval. Users upload documents, then interact with them using voice commands and natural language queries. The system transcribes speech, processes queries against document context, and delivers synthesized responses—all within a single integrated workflow.

## Technical Architecture

### Frontend & UI
- **Framework**: React Native via Expo
- **Styling**: Uniwind + HeroUI Native (Tailwind CSS for React Native with HeroUI component library)
- **Routing**: Expo Router (file-based routing)
- **State Management**: React Hooks with custom context providers
- **Language**: TypeScript

### Core Components
- `VoiceInterface` - Central voice interaction UI with real-time state feedback (listening, processing, answering)
- `ChatMessageList` - Message history display with role-based rendering
- `DocumentUploadBottomSheet` - Document ingestion modal interface
- `DocumentDetailsPopover` - Metadata and document management controls

### AI & Language Processing
- **LLM Engine**: Ministral-3B (via Azure-Inference-SDK and GitHub Models API)
- **Document Summarization**: Google Gemini API for PDF content analysis and structured extraction
- **URL Processing**: URL-to-Markdown converter for web page content ingestion
- **Speech Recognition**: Native Expo Speech API
- **Text-to-Speech**: Expo Speech with on-device voice synthesis

### Data Management
- **Document Context Provider**: Manages uploaded document state, metadata, and retrieval
- **Message Persistence**: SQLite (expo-sqlite) for conversation history and document metadata
- **Document Processor**: Orchestrates PDF upload, URL ingestion, and context extraction

## Platform Support

- **iOS** - Native deployment via Expo
- **Android** - Native deployment via Expo

## Deployment Strategy

VoiceQuery utilizes Expo's managed workflow for efficient cross-platform distribution:

1. **iOS**: Native compilation to .ipa via Expo Cloud Build or local `eas build`
2. **Android**: Native compilation to .apk/.aab via Expo Cloud Build or local `eas build`
3. **Distribution**: App Store (iOS) and Play Store (Android) via standard app store submission processes

### Build & Configuration
- `app.config.js` - Centralized app configuration and metadata
- `metro.config.js` - Metro bundler configuration for React Native optimization
- Environment variables managed via `.env.local` for service credentials (Azure Speech API keys)

## Dependencies

### Key Libraries
- `expo` - Managed React Native framework
- `react-native` - Core cross-platform mobile framework
- `expo-router` - File-based navigation
- `expo-sqlite` - Local database access
- `uniwind` - React Native Tailwind CSS integration
- `@expo/vector-icons` - Icon library (Ionicons)
- Azure SDKs - Speech recognition and synthesis

### Development
- TypeScript for type safety
- ESLint for code quality
- PostCSS for styling compilation

## Feature Set

- **Voice-Powered Q&A**: Ask questions about documents using natural speech
- **Real-time Transcription**: Live speech-to-text feedback
- **Intelligent Responses**: LLM-driven document analysis with synthesized audio output
- **Chat History**: Persistent conversation tracking with document association
- **Multi-Document Support**: Upload and switch between different documents
- **Document Metadata**: View and manage document information
- **Error Handling**: Graceful error states with user notifications

## Delivery & Support

VoiceQuery is delivered as a compiled native application through platform-specific app stores. Ongoing updates are distributed through standard app store update mechanisms. Technical support and feature requests are handled through designated support channels.
