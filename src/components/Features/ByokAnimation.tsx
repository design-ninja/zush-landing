import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, Loader2 } from 'lucide-react';

const PRIMARY = 'var(--primary)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';
const SUCCESS = 'var(--success)';

const KEY_FULL = 'sk-••••••••••••••••XYZ';
const TYPING_START = 4;
const CHARS_PER_FRAME = 1.4;
const LOADING_START = 28;
const LOADING_END = 44;
const CONNECTED_AT = 44;
const PROVIDERS = ['Gemini', 'Groq', 'OpenAI', 'Claude'];
const ACTIVE_PROVIDER = 0;
const PROVIDER_START = 52;
const PROVIDER_STAGGER = 4;

export const ByokAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleChars = Math.max(0, Math.min(KEY_FULL.length, Math.floor((frame - TYPING_START) * CHARS_PER_FRAME)));
  const typedKey = KEY_FULL.slice(0, visibleChars);
  const typingDone = visibleChars >= KEY_FULL.length;

  const cursorBlink = Math.floor(frame / 5) % 2 === 0 ? 1 : 0;
  const cursorOpacity = typingDone ? 0 : cursorBlink;

  const loadingSpin = ((frame - LOADING_START) / 0.3) % 360;
  const loadingActive = frame >= LOADING_START && frame < LOADING_END;
  const loadingOpacity = interpolate(frame, [LOADING_START, LOADING_START + 4, LOADING_END - 4, LOADING_END], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkProgress = spring({
    frame: frame - CONNECTED_AT,
    fps,
    config: { damping: 10, mass: 0.45 },
    durationInFrames: 12,
  });
  const showCheck = frame >= CONNECTED_AT;

  const inputGlow = interpolate(frame, [CONNECTED_AT, CONNECTED_AT + 10], [0, 1], {
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
          gap: 12,
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '10px 12px',
            background: BG,
            border: `1px solid ${showCheck ? `color-mix(in srgb, ${SUCCESS}, transparent ${80 - inputGlow * 40}%)` : BORDER}`,
            borderRadius: 10,
            boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 0 0 ${inputGlow * 3}px color-mix(in srgb, ${SUCCESS}, transparent 86%)`,
            fontSize: 14,
            color: MUTED,
          }}
        >
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {typedKey || <span style={{ opacity: 0.5 }}>sk-...</span>}
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 1.5,
                height: 12,
                background: PRIMARY,
                marginLeft: 2,
                opacity: cursorOpacity,
              }}
            />
          </span>
          <div
            style={{
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {loadingActive ? (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: loadingOpacity,
                  transform: `rotate(${loadingSpin}deg)`,
                  color: PRIMARY,
                }}
              >
                <Loader2 size={14} strokeWidth={2.4} />
              </span>
            ) : null}
            {showCheck ? (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: SUCCESS,
                  color: 'var(--success-foreground, #ffffff)',
                  borderRadius: 999,
                  transform: `scale(${checkProgress})`,
                  opacity: checkProgress,
                }}
              >
                <Check size={11} strokeWidth={3} />
              </span>
            ) : null}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PROVIDERS.map((provider, i) => (
            <ProviderPill
              key={provider}
              label={provider}
              isActive={i === ACTIVE_PROVIDER}
              appearAt={PROVIDER_START + i * PROVIDER_STAGGER}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface ProviderPillProps {
  label: string;
  isActive: boolean;
  appearAt: number;
  frame: number;
  fps: number;
}

const ProviderPill = ({ label, isActive, appearAt, frame, fps }: ProviderPillProps) => {
  const progress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 12,
  });
  const opacity = progress;

  const activeProgress = isActive
    ? spring({
        frame: frame - (appearAt + 4),
        fps,
        config: { damping: 12, mass: 0.45 },
        durationInFrames: 10,
      })
    : 0;

  const checkSlotWidth = isActive ? activeProgress * 16 : 0;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: 999,
        background: isActive
          ? `color-mix(in srgb, ${PRIMARY}, transparent ${88 - activeProgress * 8}%)`
          : BG,
        color: isActive ? PRIMARY : FG,
        border: `1px solid ${isActive ? `color-mix(in srgb, ${PRIMARY}, transparent ${82 - activeProgress * 12}%)` : BORDER}`,
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        opacity,
        transform: `translateY(${(1 - progress) * 6}px)`,
      }}
    >
      {isActive ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: checkSlotWidth,
            overflow: 'hidden',
            opacity: activeProgress,
            transform: `scale(${0.6 + activeProgress * 0.4})`,
            transformOrigin: 'left center',
          }}
        >
          <Check size={11} strokeWidth={3} />
        </span>
      ) : null}
      {label}
    </span>
  );
};

export const BYOK_DURATION = 100;
export const BYOK_FPS = 30;
export const BYOK_WIDTH = 340;
export const BYOK_HEIGHT = 220;
