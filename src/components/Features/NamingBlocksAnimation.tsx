import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Plus } from 'lucide-react';

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const MUTED = 'var(--muted-foreground)';

interface Block {
  label: string;
  value: string;
}

const BLOCKS: Block[] = [
  { label: 'Capture Date', value: '2026-05-10' },
  { label: 'Client Name', value: 'Globex' },
  { label: 'Event', value: 'Wedding' },
];

const BLOCK_STAGGER = 10;
const BLOCK_START = 4;
const FINAL_EXT = '.jpg';

const CHIPS_SETTLED = BLOCK_START + BLOCKS.length * BLOCK_STAGGER + 4;
const PLATE_FADE_IN_START = CHIPS_SETTLED + 4;
const PLATE_FADE_IN_END = PLATE_FADE_IN_START + 6;

export const NamingBlocksAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 5,
              padding: '5px 6px',
              minHeight: 36,
              borderRadius: 10,
              border: `1px solid var(--border)`,
              background: 'var(--background)',
            }}
          >
            {BLOCKS.map((block, i) => (
              <BlockChip
                key={block.label}
                block={block}
                appearAt={BLOCK_START + i * BLOCK_STAGGER}
                showSeparator={i < BLOCKS.length - 1}
                separatorAt={BLOCK_START + i * BLOCK_STAGGER + 4}
                frame={frame}
                fps={fps}
              />
            ))}
          </div>

          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: PRIMARY,
              color: 'var(--primary-foreground)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Plus size={14} strokeWidth={2.6} />
          </span>
        </div>

        <PreviewLine frame={frame} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};

interface BlockChipProps {
  block: Block;
  appearAt: number;
  showSeparator: boolean;
  separatorAt: number;
  frame: number;
  fps: number;
}

const BlockChip = ({ block, appearAt, showSeparator, separatorAt, frame, fps }: BlockChipProps) => {
  const progress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 14,
  });

  const opacity = progress;
  const scale = 0.5 + progress * 0.5;

  const sepProgress = spring({
    frame: frame - separatorAt,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 10,
  });

  return (
    <>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '5px 8px',
          borderRadius: 999,
          background: PRIMARY_SOFT,
          color: PRIMARY,
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        {block.label}
      </span>
      {showSeparator ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: 999,
            background: 'color-mix(in srgb, var(--muted-foreground), transparent 90%)',
            color: MUTED,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1,
            opacity: sepProgress,
            transform: `scale(${sepProgress})`,
          }}
        >
          _
        </span>
      ) : null}
    </>
  );
};

interface PreviewLineProps {
  frame: number;
  fps: number;
}

const FULL_NAME = (() => {
  const parts: string[] = [];
  BLOCKS.forEach((block, i) => {
    parts.push(block.value);
    if (i < BLOCKS.length - 1) parts.push('_');
  });
  parts.push(FINAL_EXT);
  return parts.join('');
})();

const TYPE_START = PLATE_FADE_IN_END;
const TYPE_END = TYPE_START + FULL_NAME.length;

const PLATE_NATURAL_HEIGHT = 34;
const PLATE_GAP = 12;
const PLATE_SLOT_TOTAL = PLATE_NATURAL_HEIGHT + PLATE_GAP;
const PLATE_REVEAL_START = CHIPS_SETTLED;
const PLATE_REVEAL_END = PLATE_FADE_IN_END;

const PreviewLine = ({ frame, fps: _fps }: PreviewLineProps) => {
  const slotProgress = interpolate(frame, [PLATE_REVEAL_START, PLATE_REVEAL_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const containerOpacity = interpolate(frame, [PLATE_FADE_IN_START, PLATE_FADE_IN_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const reveal = interpolate(frame, [TYPE_START, TYPE_END], [0, FULL_NAME.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const visibleChars = Math.max(0, Math.floor(reveal));
  const typed = FULL_NAME.slice(0, visibleChars);
  const showCaret = frame >= TYPE_START && frame <= TYPE_END + 4;
  const caretOpacity = showCaret ? (Math.floor(frame / 4) % 2 === 0 ? 1 : 0.2) : 0;

  return (
    <div style={{ height: slotProgress * PLATE_SLOT_TOTAL, overflow: 'hidden' }}>
      <div
        style={{
          marginTop: PLATE_GAP,
          height: PLATE_NATURAL_HEIGHT,
          boxSizing: 'border-box',
          maxWidth: '100%',
          padding: '7px 11px',
          borderRadius: 6,
          background: PRIMARY_SOFT,
          color: PRIMARY,
          fontSize: 14,
          lineHeight: 1.3,
          opacity: containerOpacity,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {typed}
        <span style={{ opacity: caretOpacity, marginLeft: 1 }}>|</span>
      </div>
    </div>
  );
};

export const NAMING_BLOCKS_DURATION = TYPE_END + 14;
export const NAMING_BLOCKS_FPS = 30;
export const NAMING_BLOCKS_WIDTH = 340;
export const NAMING_BLOCKS_HEIGHT = 220;
export const NAMING_BLOCKS_PREVIEW_FRAME = CHIPS_SETTLED;
