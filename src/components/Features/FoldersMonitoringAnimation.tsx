import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Folder, Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import sunsetThumb from '@/assets/features/sunset_thumb.png';

const PRIMARY = 'var(--primary)';
const SUCCESS = 'var(--success)';
const SUCCESS_SOFT = 'color-mix(in srgb, var(--success), transparent 86%)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

const DROP_START = 6;
const DROP_END = 26;
const SCAN_START = 28;
const SCAN_END = 60;
const RENAME_AT = 56;
const SETTLE_AT = 92;

export const FoldersMonitoringAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropProgress = spring({
    frame: frame - DROP_START,
    fps,
    config: { damping: 16, mass: 0.7 },
    durationInFrames: DROP_END - DROP_START,
  });

  const dropY = interpolate(dropProgress, [0, 1], [-44, 0]);
  const dropOpacity = interpolate(frame, [DROP_START, DROP_START + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flyAwayProgress = spring({
    frame: frame - SETTLE_AT,
    fps,
    config: { damping: 14, mass: 0.5 },
    durationInFrames: 14,
  });
  const flyAwayY = flyAwayProgress * 30;
  const flyAwayOpacity = interpolate(frame, [SETTLE_AT, SETTLE_AT + 12], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scanProgress = interpolate(frame, [SCAN_START, SCAN_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkProgress = spring({
    frame: frame - (SETTLE_AT + 2),
    fps,
    config: { damping: 9, mass: 0.4 },
    durationInFrames: 10,
  });
  const showCheck = frame > SETTLE_AT;

  const oldNameOpacity = interpolate(frame, [RENAME_AT, RENAME_AT + 6], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const newNameOpacity = interpolate(frame, [RENAME_AT + 4, RENAME_AT + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            position: 'relative',
          }}
        >
          <FloatingFile
            opacity={dropOpacity * (1 - flyAwayOpacity > 0 ? 1 : 1) * (frame > SETTLE_AT ? flyAwayOpacity : 1)}
            translateY={dropY + flyAwayY}
            oldOpacity={oldNameOpacity}
            newOpacity={newNameOpacity}
          />

          <FolderRow
            label='~/Desktop'
            watching
            scanProgress={scanProgress}
            frame={frame}
            showCheck={showCheck}
            checkProgress={checkProgress}
          />
          <FolderRow label='~/Projects/Design/Assets' watching={false} scanProgress={0} frame={frame} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface FolderRowProps {
  label: string;
  watching: boolean;
  scanProgress: number;
  frame: number;
  showCheck?: boolean;
  checkProgress?: number;
}

const FolderRow = ({ label, watching, scanProgress, frame, showCheck, checkProgress }: FolderRowProps) => {
  const pulse = watching ? 0.4 + 0.6 * Math.abs(Math.sin(scanProgress * Math.PI * 2)) : 0;
  const ringScale = watching ? 1 + scanProgress * 0.4 : 1;
  const ringOpacity = watching ? (1 - scanProgress) * 0.45 : 0;

  const rowStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 0 0 ${watching ? pulse * 2 : 0}px color-mix(in srgb, ${PRIMARY}, transparent 78%)`,
    fontSize: 14,
    color: FG,
  };

  return (
    <div style={rowStyle}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: 999,
            border: `2px solid ${PRIMARY}`,
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
            pointerEvents: 'none',
          }}
        />
        <Folder size={18} strokeWidth={2.1} color={PRIMARY} />
      </div>
      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>

      {watching && !showCheck ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 8px',
            borderRadius: 999,
            background: SUCCESS_SOFT,
            color: SUCCESS,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: SUCCESS,
              opacity: 0.35 + 0.65 * Math.abs(Math.sin((frame / 14) * Math.PI)),
              boxShadow: `0 0 8px ${SUCCESS}`,
            }}
          />
          WATCHING
        </div>
      ) : null}

      {showCheck && checkProgress ? (
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: SUCCESS,
            color: 'var(--success-foreground, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transform: `scale(${checkProgress})`,
            opacity: checkProgress,
          }}
        >
          <Check size={13} strokeWidth={3} />
        </div>
      ) : null}
    </div>
  );
};

interface FloatingFileProps {
  opacity: number;
  translateY: number;
  oldOpacity: number;
  newOpacity: number;
}

const FloatingFile = ({ opacity, translateY, oldOpacity, newOpacity }: FloatingFileProps) => {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 8px)',
        left: 14,
        right: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 10px',
        background: BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        boxShadow: '0 12px 28px -10px rgba(15,23,42,0.18), 0 2px 6px -2px rgba(15,23,42,0.05)',
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: 'inset 0 0 0 1px rgba(15,23,42,0.06)',
        }}
      >
        <img
          src={sunsetThumb.src}
          alt=''
          loading='lazy'
          decoding='async'
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0, position: 'relative', height: 20 }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            color: MUTED,
            opacity: oldOpacity,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          IMG_4231.jpg
        </span>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 600,
            color: PRIMARY,
            opacity: newOpacity,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Sunset_Golden_Hour.jpg
        </span>
      </div>
    </div>
  );
};

export const FOLDERS_MONITORING_DURATION = 124;
export const FOLDERS_MONITORING_FPS = 30;
export const FOLDERS_MONITORING_WIDTH = 340;
export const FOLDERS_MONITORING_HEIGHT = 220;
