/**
 * Voice Input Components
 * Production-grade voice-first input system
 * 
 * Components:
 * - VoiceInputArea: Main orchestrator
 * - VoiceButton: Tap-to-toggle recording button
 * - TranscriptCard: Sliding card with transcript/status (legacy)
 * - AgentStatusCard: Status-only card (no content duplication)
 * - AudioWaveform: Minimal Siri-like waveform animation
 */

export { VoiceInputArea } from './VoiceInputArea';
export { VoiceButton, type VoiceButtonState } from './VoiceButton';
export { TranscriptCard } from './TranscriptCard';
export { AgentStatusCard } from './AgentStatusCard';
export { AudioWaveform } from './AudioWaveform';
