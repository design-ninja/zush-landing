import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { WandSparkles } from 'lucide-react';

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

const FIELD_NAME = 'Brand';
const INSTRUCTION_TEXT = 'Extract the brand shown in the photo';
const TYPING_START = 6;
const CHARS_PER_FRAME = 1.15;
const TYPING_END = TYPING_START + Math.ceil(INSTRUCTION_TEXT.length / CHARS_PER_FRAME);

const CHIP_ROW_START = TYPING_END + 8;
const CUSTOM_CHIP_START = CHIP_ROW_START + 8;
const PREVIEW_NAME = '2026-07-11_Nike.jpg';
const PREVIEW_START = CUSTOM_CHIP_START + 12;
const PREVIEW_END = PREVIEW_START + PREVIEW_NAME.length;
const RESULT_HOLD_FRAMES = 75;

export const CustomAiBlocksAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleChars = Math.max(
    0,
    Math.min(INSTRUCTION_TEXT.length, Math.floor((frame - TYPING_START) * CHARS_PER_FRAME)),
  );
  const typedText = INSTRUCTION_TEXT.slice(0, visibleChars);
  const typingDone = visibleChars >= INSTRUCTION_TEXT.length;
  const cursorOpacity = typingDone ? 0 : Math.floor(frame / 6) % 2 === 0 ? 1 : 0;

  const rowProgress = spring({
    frame: frame - CHIP_ROW_START,
    fps,
    config: { damping: 14, mass: 0.55 },
    durationInFrames: 14,
  });

  const dateChipProgress = spring({
    frame: frame - CHIP_ROW_START - 3,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 12,
  });

  const customChipProgress = spring({
    frame: frame - CUSTOM_CHIP_START,
    fps,
    config: { damping: 11, mass: 0.5 },
    durationInFrames: 14,
  });

  const previewReveal = interpolate(frame, [PREVIEW_START, PREVIEW_END], [0, PREVIEW_NAME.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const previewTyped = PREVIEW_NAME.slice(0, Math.max(0, Math.floor(previewReveal)));
  const previewVisible = interpolate(frame, [PREVIEW_START - 4, PREVIEW_START + 4], [0, 1], {
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
          gap: 8,
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            padding: '10px 12px',
            background: BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: FG }}>
              <WandSparkles size={13} color={PRIMARY} strokeWidth={2.4} />
              Custom AI Block
            </span>
            <span
              style={{
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 999,
                background: PRIMARY_SOFT,
                color: PRIMARY,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {FIELD_NAME}
            </span>
          </div>
          <div
            style={{
              minHeight: 38,
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: 13,
              color: FG,
              lineHeight: 1.5,
            }}
          >
            <span>
              {typedText}
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 1.5,
                  height: 11,
                  background: PRIMARY,
                  marginLeft: 2,
                  verticalAlign: '-2px',
                  opacity: cursorOpacity,
                }}
              />
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 8px',
            minHeight: 34,
            borderRadius: 10,
            border: `1px solid ${BORDER}`,
            background: BG,
            opacity: rowProgress,
            transform: `translateY(${(1 - rowProgress) * 6}px)`,
          }}
        >
          <Chip label='Rename Date' progress={dateChipProgress} accent={false} />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--muted-foreground), transparent 90%)',
              color: MUTED,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1,
              opacity: dateChipProgress,
            }}
          >
            _
          </span>
          <Chip label={`✨ ${FIELD_NAME}`} progress={customChipProgress} accent />
        </div>

        <div
          style={{
            boxSizing: 'border-box',
            maxWidth: '100%',
            padding: '6px 10px',
            borderRadius: 6,
            background: PRIMARY_SOFT,
            color: PRIMARY,
            fontSize: 13,
            lineHeight: 1.3,
            minHeight: 30,
            opacity: previewVisible,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {previewTyped}
          <span
            style={{
              opacity: frame >= PREVIEW_START && frame <= PREVIEW_END + 4 ? (Math.floor(frame / 4) % 2 === 0 ? 1 : 0.2) : 0,
              marginLeft: 1,
            }}
          >
            |
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface ChipProps {
  label: string;
  progress: number;
  accent: boolean;
}

const Chip = ({ label, progress, accent }: ChipProps) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '5px 8px',
      borderRadius: 999,
      background: accent ? PRIMARY : PRIMARY_SOFT,
      color: accent ? 'var(--primary-foreground)' : PRIMARY,
      fontSize: 11,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      opacity: progress,
      transform: `scale(${0.5 + progress * 0.5})`,
      transformOrigin: 'center',
    }}
  >
    {label}
  </span>
);

export const CUSTOM_AI_BLOCKS_DURATION = PREVIEW_END + RESULT_HOLD_FRAMES;
export const CUSTOM_AI_BLOCKS_FPS = 30;
export const CUSTOM_AI_BLOCKS_WIDTH = 340;
export const CUSTOM_AI_BLOCKS_HEIGHT = 220;
export const CUSTOM_AI_BLOCKS_PREVIEW_FRAME = PREVIEW_END;
