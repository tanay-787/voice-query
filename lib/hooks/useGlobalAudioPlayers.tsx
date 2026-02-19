import { useAudioPlayer, type AudioPlayer } from 'expo-audio';
import React, { createContext, useContext } from 'react';

const selectSound = require('../../assets/sfx/mixkit-modern-technology-select.wav');
const errorSound = require('../../assets/sfx/mixkit-click-error.wav');
const openSound = require('../../assets/sfx/mixkit-opening-software-interface.wav');

interface SafeAudioPlayer {
  player: AudioPlayer;
  safePlay: () => void;
}

interface GlobalAudioPlayers {
  select: SafeAudioPlayer;
  error: SafeAudioPlayer;
  open: SafeAudioPlayer;
}

export const GlobalAudioPlayersContext = createContext<GlobalAudioPlayers | null>(null);

/**
 * Creates a wrapper that safely plays audio
 * Handles seeking to 0 and error catching
 */
function createSafeAudioPlayer(player: AudioPlayer): SafeAudioPlayer {
  return {
    player,
    safePlay: () => {
      try {
        player.seekTo(0);
        player.play()
      } catch (err) {
        // Ignore sync errors
      }
    },
  };
}

export function GlobalAudioPlayersProvider({ children }: { children: React.ReactNode }) {
  const select = createSafeAudioPlayer(useAudioPlayer(selectSound));
  const error = createSafeAudioPlayer(useAudioPlayer(errorSound));
  const open = createSafeAudioPlayer(useAudioPlayer(openSound));
  const players = { select, error, open };

  return (
    <GlobalAudioPlayersContext.Provider value={players}>
      {children}
    </GlobalAudioPlayersContext.Provider>
  );
}

export function useGlobalAudioPlayers() {
  const ctx = useContext(GlobalAudioPlayersContext);
  if (!ctx) throw new Error('useGlobalAudioPlayers must be used within a GlobalAudioPlayersProvider');
  return ctx;
}
