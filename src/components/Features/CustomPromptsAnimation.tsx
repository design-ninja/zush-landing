import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArrowRight } from 'lucide-react';

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

const PROMPT_TEXT = 'Keep names short, put the subject first.';
const TYPING_START = 6;
const CHARS_PER_FRAME = 1.1;
const RESULT_START = 70;

export const CustomPromptsAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleChars = Math.max(0, Math.min(PROMPT_TEXT.length, Math.floor((frame - TYPING_START) * CHARS_PER_FRAME)));
  const typedText = PROMPT_TEXT.slice(0, visibleChars);
  const typingDone = visibleChars >= PROMPT_TEXT.length;

  const cursorBlink = Math.floor(frame / 6) % 2 === 0 ? 1 : 0;
  const cursorOpacity = typingDone ? 0 : cursorBlink;

  const resultProgress = spring({
    frame: frame - RESULT_START,
    fps,
    config: { damping: 14, mass: 0.55 },
    durationInFrames: 14,
  });

  const resultNewOpacity = interpolate(frame, [RESULT_START + 8, RESULT_START + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const resultNewShift = (1 - resultNewOpacity) * 6;

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '12px 14px',
            background: BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: FG }}>Prompt rules</span>
            <span
              style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 999,
                background: PRIMARY_SOFT,
                color: PRIMARY,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Custom
            </span>
          </div>
          <div
            style={{
              minHeight: 50,
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: 14,
              color: FG,
              lineHeight: 1.55,
            }}
          >
            <span>
              {typedText}
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 1.5,
                  height: 12,
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
            gap: 8,
            padding: '8px 12px',
            background: BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            opacity: resultProgress,
            transform: `translateY(${(1 - resultProgress) * 6}px)`,
            minHeight: 36,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: MUTED,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            IMG_4823 (2).heic
          </span>
          <ArrowRight
            size={14}
            color={MUTED}
            strokeWidth={2.2}
            style={{ flexShrink: 0, opacity: resultNewOpacity * 0.7 }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: PRIMARY,
              background: PRIMARY_SOFT,
              padding: '2px 7px',
              borderRadius: 5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: resultNewOpacity,
              transform: `translateY(${resultNewShift}px)`,
              flexShrink: 0,
            }}
          >
            Beach_Sunset.heic
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CUSTOM_PROMPTS_DURATION = 100;
export const CUSTOM_PROMPTS_FPS = 30;
export const CUSTOM_PROMPTS_WIDTH = 340;
export const CUSTOM_PROMPTS_HEIGHT = 220;
