import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, Cloud, Loader2 } from 'lucide-react';
import { FEATURE_DEMO_COPY, type FeatureDemoCopy } from '@/i18n/featureDemoCopy';

const PRIMARY = 'var(--primary)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';
const SUCCESS = 'var(--success)';

const READY_AT = 6;
const FILE_START = 20;
const LOADING_START = 32;
const LOADING_END = 54;
const RENAMED_AT = 54;
const PILL_START = 66;
const PILL_STAGGER = 5;

const OLD_NAME = 'IMG_2043.jpg';
const NEW_NAME = 'Golden_Gate_Sunset.jpg';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

interface CloudAiAnimationProps {
  demoCopy?: FeatureDemoCopy;
}

export const CloudAiAnimation = ({ demoCopy = FEATURE_DEMO_COPY.en }: CloudAiAnimationProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pills = [demoCopy.noApiKeysLabel, demoCopy.noSetupLabel, demoCopy.freeToStartLabel];

  const readyProgress = spring({
    frame: frame - READY_AT,
    fps,
    config: { damping: 12, mass: 0.5 },
    durationInFrames: 12,
  });

  const fileProgress = spring({
    frame: frame - FILE_START,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 12,
  });

  const loadingActive = frame >= LOADING_START && frame < LOADING_END;
  const loadingSpin = ((frame - LOADING_START) / 0.3) % 360;
  const loadingOpacity = interpolate(
    frame,
    [LOADING_START, LOADING_START + 4, LOADING_END - 4, LOADING_END],
    [0, 1, 1, 0],
    CLAMP,
  );

  const checkProgress = spring({
    frame: frame - RENAMED_AT,
    fps,
    config: { damping: 10, mass: 0.45 },
    durationInFrames: 12,
  });
  const showCheck = frame >= RENAMED_AT;
  const oldNameOpacity = interpolate(frame, [RENAMED_AT, RENAMED_AT + 8], [1, 0], CLAMP);
  const rowGlow = interpolate(frame, [RENAMED_AT, RENAMED_AT + 10], [0, 1], CLAMP);

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
            gap: 8,
            padding: '10px 12px',
            background: BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            fontSize: 14,
            color: FG,
            opacity: readyProgress,
            transform: `translateY(${(1 - readyProgress) * 8}px)`,
          }}
        >
          <span style={{ display: 'inline-flex', color: PRIMARY }}>
            <Cloud size={16} strokeWidth={2.2} />
          </span>
          <span style={{ fontWeight: 600 }}>Zush Cloud AI</span>
          <span
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              color: SUCCESS,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: SUCCESS,
                color: 'var(--success-foreground, #ffffff)',
                borderRadius: 999,
              }}
            >
              <Check size={9} strokeWidth={3} />
            </span>
            {demoCopy.readyLabel}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '10px 12px',
            background: BG,
            border: `1px solid ${
              showCheck
                ? `color-mix(in srgb, ${SUCCESS}, transparent ${80 - rowGlow * 40}%)`
                : BORDER
            }`,
            borderRadius: 10,
            boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 0 0 ${rowGlow * 3}px color-mix(in srgb, ${SUCCESS}, transparent 86%)`,
            fontSize: 14,
            opacity: fileProgress,
            transform: `translateY(${(1 - fileProgress) * 8}px)`,
          }}
        >
          <span
            style={{
              flex: 1,
              minWidth: 0,
              position: 'relative',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <span style={{ color: MUTED, opacity: oldNameOpacity }}>{OLD_NAME}</span>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                color: FG,
                fontWeight: 500,
                opacity: 1 - oldNameOpacity,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {NEW_NAME}
            </span>
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
          {pills.map((pill, i) => (
            <CloudPill key={pill} label={pill} appearAt={PILL_START + i * PILL_STAGGER} frame={frame} fps={fps} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface CloudPillProps {
  label: string;
  appearAt: number;
  frame: number;
  fps: number;
}

const CloudPill = ({ label, appearAt, frame, fps }: CloudPillProps) => {
  const progress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 12,
  });

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 12px',
        borderRadius: 999,
        background: `color-mix(in srgb, ${PRIMARY}, transparent 90%)`,
        color: PRIMARY,
        border: `1px solid color-mix(in srgb, ${PRIMARY}, transparent 84%)`,
        fontSize: 13,
        fontWeight: 600,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 6}px)`,
      }}
    >
      {label}
    </span>
  );
};

export const CLOUD_AI_DURATION = 100;
export const CLOUD_AI_FPS = 30;
export const CLOUD_AI_WIDTH = 340;
export const CLOUD_AI_HEIGHT = 220;
