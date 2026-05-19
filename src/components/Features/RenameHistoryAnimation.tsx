import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Undo2, RotateCcw } from 'lucide-react';
import type { CSSProperties } from 'react';

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const SUCCESS = 'var(--success)';
const SUCCESS_SOFT = 'color-mix(in srgb, var(--success), transparent 86%)';
const MUTED = 'var(--muted-foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

const CURSOR_ARRIVE = 22;
const UNDO_PRESS = 32;
const REVERT_START = 36;
const REVERT_END = 56;
const REVERTED_BADGE = 58;

export const RenameHistoryAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursorX = interpolate(frame, [4, CURSOR_ARRIVE], [70, 287], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [4, CURSOR_ARRIVE], [40, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorOpacity = interpolate(frame, [2, 8, UNDO_PRESS + 4, UNDO_PRESS + 10], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const undoHover = interpolate(frame, [CURSOR_ARRIVE - 4, CURSOR_ARRIVE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const undoPress = interpolate(frame, [UNDO_PRESS, UNDO_PRESS + 3, UNDO_PRESS + 6], [1, 0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const revertProgress = interpolate(frame, [REVERT_START, REVERT_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const newNameOpacity = 1 - revertProgress;
  const oldNameRevealed = revertProgress;

  const revertedBadgeProgress = spring({
    frame: frame - REVERTED_BADGE,
    fps,
    config: { damping: 10, mass: 0.45 },
    durationInFrames: 12,
  });

  const showReverted = frame > REVERTED_BADGE;

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          justifyContent: 'flex-end',
          position: 'relative',
        }}
      >
        <HistoryRow
          oldName='notes_FINAL_copy.docx'
          newName='Dashboard Review Notes.docx'
          time='Today, 09:51'
          newNameOpacity={newNameOpacity}
          oldNameProgress={oldNameRevealed}
          undoHover={undoHover}
          undoPress={undoPress}
          showReverted={showReverted}
          revertedBadgeProgress={revertedBadgeProgress}
        />
        <HistoryRow
          oldName='q1_report_export.xlsx'
          newName='Q1 Revenue Report.xlsx'
          time='Today, 08:30'
          faded
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <CursorIcon />
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface HistoryRowProps {
  oldName: string;
  newName: string;
  time: string;
  faded?: boolean;
  newNameOpacity?: number;
  oldNameProgress?: number;
  undoHover?: number;
  undoPress?: number;
  showReverted?: boolean;
  revertedBadgeProgress?: number;
}

const HistoryRow = ({
  oldName,
  newName,
  time,
  faded = false,
  newNameOpacity = 1,
  oldNameProgress = 0,
  undoHover = 0,
  undoPress = 1,
  showReverted = false,
  revertedBadgeProgress = 0,
}: HistoryRowProps) => {
  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    padding: '10px 12px',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    opacity: faded ? 0.5 : 1,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={rowStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'relative', minHeight: 32 }}>
        <span
          style={{
            fontSize: 11,
            color: MUTED,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            opacity: 1 - oldNameProgress * 0.3,
          }}
        >
          {oldName}
        </span>
        <div style={{ position: 'relative', minHeight: 16 }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              fontSize: 14,
              fontWeight: 600,
              color: PRIMARY,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: newNameOpacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            → {newName}
          </span>
          {!faded ? (
            <span
              style={{
                position: 'absolute',
                inset: 0,
                fontSize: 14,
                fontWeight: 600,
                color: SUCCESS,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                opacity: oldNameProgress,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              ↩ {oldName}
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: MUTED }}>{time}</span>

        {faded ? null : showReverted ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: SUCCESS,
              background: SUCCESS_SOFT,
              padding: '4px 8px',
              borderRadius: 4,
              transform: `scale(${revertedBadgeProgress})`,
              opacity: revertedBadgeProgress,
            }}
          >
            <RotateCcw size={11} strokeWidth={2.6} />
            REVERTED
          </span>
        ) : (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
              color: PRIMARY,
              background: PRIMARY_SOFT,
              padding: '4px 8px',
              borderRadius: 4,
              transform: `scale(${undoPress})`,
              boxShadow: `0 0 0 ${undoHover * 3}px color-mix(in srgb, ${PRIMARY}, transparent 80%)`,
            }}
          >
            <Undo2 size={11} strokeWidth={2.6} />
            Undo
          </span>
        )}
      </div>
    </div>
  );
};

const CursorIcon = () => (
  <svg width='20' height='20' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M2 1.5L13 7L8 9L6 14L2 1.5Z'
      fill='black'
      stroke='white'
      strokeWidth='1'
      strokeLinejoin='round'
    />
  </svg>
);

export const RENAME_HISTORY_DURATION = 90;
export const RENAME_HISTORY_FPS = 30;
export const RENAME_HISTORY_WIDTH = 340;
export const RENAME_HISTORY_HEIGHT = 220;
