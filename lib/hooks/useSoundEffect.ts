import { useCallback } from 'react';
import { useGlobalAudioPlayers } from './useGlobalAudioPlayers';

type SoundName = 'select' | 'error' | 'open';

/**
 * Hook for playing sound effects with optimized, zero-delay playback
 * - Single instance per app (via GlobalAudioPlayersProvider)
 * - Automatically seeks to beginning for instant replay
 * - Handles errors gracefully
 * - No delays on repeated touches
 * 
 * @example
 * const { play } = useSoundEffect();
 * play('select'); // Play select sound instantly
 * play('error');  // Play error sound
 * play('open');   // Play open sound
 */
export function useSoundEffect() {
  const players = useGlobalAudioPlayers();

  const play = useCallback(
    (sound: SoundName) => {
      players[sound].safePlay();
    },
    [players]
  );

  return { play };
}
