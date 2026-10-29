# AGENTS.md

Operating guidelines and repository conventions for AI coding agents working on VoiceQuery.

---

## 1. Monorepo Architecture

* **Workspace Structure**:
  * `client/`: Mobile frontend built on Expo SDK 57 (`expo@~57.0.26`, `react@19.2.3`, `react-native@0.86.3`).
  * `server/`: Python / Flask backend (`@voice-query/server`).
* **Package Manager**: Use `pnpm` exclusively (orchestrated via `pnpm-workspace.yaml` and root `package.json`). Never run `npm` or `yarn`.
* **Workspace Commands**:
  * Run commands in subpackages using filters: `pnpm --filter @voice-query/client <command>` or `pnpm --filter @voice-query/server <command>`.
  * Alternatively, execute commands from within the respective package directory (`client/` or `server/`).

---

## 2. Client & Component Rules

* **Component Location**: All UI components must be placed strictly inside `client/components/`.
  * **Rule**: There is no `src/` directory in `client/`. Do not create or move files into `src/`.
  * Path aliases in `client/tsconfig.json` resolve `@/*` to `./*` (`@/components/*`).
* **UI Component Library**: **Reacticx** (`rit3zh/reacticx`).
  * Configured via `client/component.config.json`.
  * Add components using: `pnpm dlx reacticx add <component>` inside `client/`.
* **Runtime Target**: Operating in **Expo Dev Client SDK 57** mode (`expo-dev-client`).
  * Install native modules using: `pnpm exec expo install <package-name>` inside `client/`.
  * Verify official documentation before adding dependencies.

---

## 3. Environment & Git Workflow (Termux)

* **Termux Shebang Persistence**:
  * In Termux, binaries reside at `/data/data/com.termux/files/usr/bin/`.
  * When `pnpm install` or native module installations refresh `.husky/_/`, run:
    ```bash
    pnpm prepare:termux
    ```
    This patches the shebangs so Husky pre-commit hooks execute cleanly.
* **Git Commits**:
  * Follow Conventional Commits format (e.g. `feat(client): ...`, `fix(client): ...`, `chore(root): ...`).
  * Single-line commit messages preferred.
  * Author requirement: `--author="tanay-787 <tanayyyyy7@gmail.com>"`.

---

## 4. Verification & Quality Gate

Before completing any task or committing changes:
1. **TypeScript Typecheck**:
   ```bash
   pnpm --filter @voice-query/client exec tsc --noEmit
   ```
   Must pass with **0 errors**.
2. **Expo Configuration Validation** (if modifying `client/app.json`):
   ```bash
   pnpm exec expo config --type public
   ```
   Must resolve cleanly against the official schema.

---

## 5. Real-Time Voice Pipeline & Audio Invariants

* **Full Architecture Spec**: Read [`docs/architecture/voice-pipeline.md`](docs/architecture/voice-pipeline.md) before modifying voice streaming or audio playback.
* **WebSocket Multiplexing**:
  * Binary frames: 16kHz Int16 Mono PCM audio streams (Client Mic $\to$ Server, Server TTS $\to$ Client).
  * JSON frames: Out-of-band events (`SESSION_READY`, `NAVIGATE_PAGE`, `TRANSCRIPTION`, `BOT_STARTED_SPEAKING`, `BOT_STOPPED_SPEAKING`, `INTERRUPT`, `SET_READING_POSITION`).
* **iOS Audio Session Invariants (`expo-audio`)**:
  * **Input silences Output**: `AudioStream` uses `AVAudioSessionCategoryRecord`, which silences all audio playback. Before playing speech via `AVPlayer`, you **must** call `setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false })` and `setIsAudioActiveAsync(true)`.
  * **Suppress Delayed Deactivation**: Always pass `{ keepAudioSessionActive: true }` to `createAudioPlayer`. Otherwise `expo-audio` deactivates the session 100ms later in a background task, breaking mic re-arming.
  * **Hardware Teardown Cooldown**: After playback finishes (`status.didJustFinish`), wait **150ms** before calling `audioStream.start()`. Starting `AVAudioEngine` while `AVPlayer` is releasing causes `AVAudioSessionErrorCodeCannotInterruptOthers` (error `560227702`).
  * **Half-Duplex Turn Taking**: Mic capture is paused on `BOT_STARTED_SPEAKING` to prevent acoustic echo loops. Users interrupt via the `VoicePill` interrupt button.
