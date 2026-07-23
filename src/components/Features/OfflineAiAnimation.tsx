import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, ShieldCheck } from 'lucide-react';
import { FEATURE_DEMO_COPY, type FeatureDemoCopy } from '@/i18n/featureDemoCopy';

const PRIMARY = 'var(--primary)';
const SUCCESS = 'var(--success)';

const COMMAND = 'ollama run qwen2.5vl:3b';
const TYPING_START = 4;
const CHARS_PER_FRAME = 1.5;
const DOWNLOAD_START = 26;
const DOWNLOAD_END = 60;
const READY_AT = 62;

interface OfflineAiAnimationProps {
  demoCopy?: FeatureDemoCopy;
}

export const OfflineAiAnimation = ({ demoCopy = FEATURE_DEMO_COPY.en }: OfflineAiAnimationProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleChars = Math.max(0, Math.min(COMMAND.length, Math.floor((frame - TYPING_START) * CHARS_PER_FRAME)));
  const typedCommand = COMMAND.slice(0, visibleChars);
  const typingDone = visibleChars >= COMMAND.length;

  const cursorBlink = Math.floor(frame / 5) % 2 === 0 ? 1 : 0;
  const cursorOpacity = typingDone && frame < DOWNLOAD_START ? 0 : cursorBlink;

  const downloadProgress = interpolate(frame, [DOWNLOAD_START, DOWNLOAD_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const downloadOpacity = interpolate(frame, [DOWNLOAD_START, DOWNLOAD_START + 4, DOWNLOAD_END + 6, DOWNLOAD_END + 14], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const readyProgress = spring({
    frame: frame - READY_AT,
    fps,
    config: { damping: 11, mass: 0.45 },
    durationInFrames: 14,
  });
  const showReady = frame >= READY_AT;

  const privacyProgress = spring({
    frame: frame - (READY_AT + 8),
    fps,
    config: { damping: 13, mass: 0.5 },
    durationInFrames: 14,
  });

  const downloadedMb = Math.round(downloadProgress * 1.9 * 10) / 10;

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
            background: '#101011',
            border: '1px solid #2a2a2d',
            borderRadius: 12,
            overflow: 'hidden',
            color: '#f4f4f5',
            fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, monospace)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              background: '#1b1b1d',
              fontSize: 11,
              color: '#a1a1aa',
              fontWeight: 400,
              letterSpacing: '0.02em',
              borderBottom: '1px solid #2a2a2d',
            }}
          >
            <span style={{ display: 'flex', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ef4444' }} />
              <span style={{ width: 8, height: 8, borderRadius: 999, background: '#f59e0b' }} />
              <span style={{ width: 8, height: 8, borderRadius: 999, background: SUCCESS }} />
            </span>
            <span style={{ marginLeft: 6 }}>zsh — ollama</span>
          </div>

          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, height: 96 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <span style={{ color: '#a1a1aa' }}>$</span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {typedCommand}
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 12,
                    background: '#f4f4f5',
                    marginLeft: 2,
                    opacity: cursorOpacity,
                  }}
                />
              </span>
            </div>

            <div style={{ position: 'relative', flex: 1 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  fontSize: 11,
                  color: '#a1a1aa',
                  opacity: downloadOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 5,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>pulling qwen2.5vl:3b…</span>
                  <span style={{ color: '#f4f4f5' }}>{downloadedMb.toFixed(1)} / 1.9 GB</span>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: '#27272a',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${downloadProgress * 100}%`,
                      background: `linear-gradient(90deg, ${PRIMARY}, color-mix(in srgb, ${PRIMARY}, white 30%))`,
                      borderRadius: 999,
                      boxShadow: `0 0 12px color-mix(in srgb, ${PRIMARY}, transparent 50%)`,
                    }}
                  />
                </div>
              </div>

              {showReady ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    color: SUCCESS,
                    opacity: readyProgress,
                    transform: `translateY(${(1 - readyProgress) * 4}px)`,
                  }}
                >
                  <Check size={13} strokeWidth={3} />
                  {demoCopy.localModelReadyLabel}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '7px 12px',
            borderRadius: 10,
            background: 'var(--primary-soft)',
            color: PRIMARY,
            fontSize: 14,
            fontWeight: 400,
            opacity: privacyProgress,
            transform: `translateY(${(1 - privacyProgress) * 6}px)`,
          }}
        >
          <ShieldCheck size={14} strokeWidth={2.4} />
          {demoCopy.offlinePrivacyLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const OFFLINE_AI_DURATION = 110;
export const OFFLINE_AI_FPS = 30;
export const OFFLINE_AI_WIDTH = 340;
export const OFFLINE_AI_HEIGHT = 220;
