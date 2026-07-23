import { Player, type PlayerRef } from '@remotion/player';
import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import type { FeatureDemoCopy } from '@/i18n/featureDemoCopy';

const FADE_OUT_MS = 320;

interface HoverPlayerProps {
  component: ComponentType<FeatureAnimationInputProps>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  loop?: boolean;
  previewFrame?: number;
  inputProps?: FeatureAnimationInputProps;
}

export interface FeatureAnimationInputProps {
  demoCopy?: FeatureDemoCopy;
}

const HoverPlayer = ({
  component,
  durationInFrames,
  fps,
  width,
  height,
  loop = false,
  previewFrame,
  inputProps,
}: HoverPlayerProps) => {
  const restingFrame = previewFrame ?? Math.max(0, durationInFrames - 1);
  const playerRef = useRef<PlayerRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const [active, setActive] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const aspectRatio = `${width} / ${height}`;

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
          inputProps={inputProps}
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
          inputProps={inputProps}
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
