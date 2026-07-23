import { Player, type PlayerRef } from '@remotion/player';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FeatureDemoCopy } from '@/i18n/featureDemoCopy';
import {
  SmartBatchRenameAnimation,
  SMART_BATCH_RENAME_DURATION,
  SMART_BATCH_RENAME_FPS,
  SMART_BATCH_RENAME_HEIGHT,
  SMART_BATCH_RENAME_PREVIEW_FRAME,
  SMART_BATCH_RENAME_WIDTH,
} from './SmartBatchRenameAnimation';

const FADE_OUT_MS = 320;

interface SmartBatchRenameVisualProps {
  demoCopy?: FeatureDemoCopy;
}

const SmartBatchRenameVisual = ({ demoCopy }: SmartBatchRenameVisualProps) => {
  const playerRef = useRef<PlayerRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const [active, setActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const aspectRatio = `${SMART_BATCH_RENAME_WIDTH} / ${SMART_BATCH_RENAME_HEIGHT}`;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    const player = playerRef.current;
    if (!player || hasPlayedRef.current) return;
    clearResetTimer();
    player.seekTo(0);
    player.play();
    hasPlayedRef.current = true;
    setActive(true);
  }, [clearResetTimer]);

  const handleLeave = useCallback(() => {
    setActive(false);
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(() => {
      const player = playerRef.current;
      if (!player) return;
      player.pause();
      player.seekTo(0);
      hasPlayedRef.current = false;
      resetTimerRef.current = null;
    }, FADE_OUT_MS);
  }, [clearResetTimer]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const card = wrapper.closest<HTMLElement>('[data-bento-card]');
    if (!card) return;

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('focusin', handleEnter);
    card.addEventListener('focusout', handleLeave);
    card.addEventListener('click', handleEnter);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('focusin', handleEnter);
      card.removeEventListener('focusout', handleLeave);
      card.removeEventListener('click', handleEnter);
      clearResetTimer();
    };
  }, [handleEnter, handleLeave, clearResetTimer]);

  const wrapperStyle = { position: 'relative', width: '100%', aspectRatio } as const;

  if (!hasMounted) {
    return <div ref={wrapperRef} style={wrapperStyle} aria-hidden />;
  }

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <Player
          component={SmartBatchRenameAnimation}
          durationInFrames={SMART_BATCH_RENAME_DURATION}
          fps={SMART_BATCH_RENAME_FPS}
          compositionWidth={SMART_BATCH_RENAME_WIDTH}
          compositionHeight={SMART_BATCH_RENAME_HEIGHT}
          initialFrame={SMART_BATCH_RENAME_PREVIEW_FRAME}
          inputProps={{ demoCopy }}
          loop={false}
          controls={false}
          showVolumeControls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          style={{ width: '100%', aspectRatio }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: active ? 1 : 0,
          transition: active ? 'opacity 0ms' : `opacity ${FADE_OUT_MS}ms ease`,
          pointerEvents: 'none',
        }}
      >
        <Player
          ref={playerRef}
          component={SmartBatchRenameAnimation}
          durationInFrames={SMART_BATCH_RENAME_DURATION}
          fps={SMART_BATCH_RENAME_FPS}
          compositionWidth={SMART_BATCH_RENAME_WIDTH}
          compositionHeight={SMART_BATCH_RENAME_HEIGHT}
          loop={false}
          moveToBeginningWhenEnded={false}
          inputProps={{ demoCopy }}
          controls={false}
          showVolumeControls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          style={{ width: '100%', aspectRatio }}
        />
      </div>
    </div>
  );
};

export default SmartBatchRenameVisual;
