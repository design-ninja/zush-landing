import { Player, type PlayerRef } from '@remotion/player';
import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';

const FADE_OUT_MS = 320;

interface HoverPlayerProps {
  component: ComponentType<Record<string, never>>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  loop?: boolean;
  previewFrame?: number;
}

const HoverPlayer = ({
  component,
  durationInFrames,
  fps,
  width,
  height,
  loop = false,
  previewFrame,
}: HoverPlayerProps) => {
  const restingFrame = previewFrame ?? Math.max(0, durationInFrames - 1);
  const playerRef = useRef<PlayerRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  const aspectRatio = `${width} / ${height}`;

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    clearResetTimer();
    player.seekTo(0);
    player.play();
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

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', aspectRatio }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: active ? 0 : 1,
          transition: active ? 'opacity 0ms' : `opacity ${FADE_OUT_MS}ms ease`,
        }}
        aria-hidden
      >
        <Player
          component={component}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={width}
          compositionHeight={height}
          initialFrame={restingFrame}
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
          component={component}
          durationInFrames={durationInFrames}
          fps={fps}
          compositionWidth={width}
          compositionHeight={height}
          loop={loop}
          moveToBeginningWhenEnded={!loop ? false : undefined}
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

export default HoverPlayer;
