import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import glitchThumb from '@/assets/features/glitch_thumb.png';

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';

const TAGS = ['glitch art', 'vaporwave', 'statue', 'cyberpunk'];
const DESCRIPTION = 'Synthwave bust with neon palm trees and a retro grid horizon';

const SCAN_START = 4;
const SCAN_END = 24;
const TAG_START = 26;
const TAG_STAGGER = 6;
const TAGS_SETTLED = TAG_START + TAGS.length * TAG_STAGGER + 14;
const DESC_AT = TAGS_SETTLED - 8;
const META_FADE_OUT_START = DESC_AT + 32;
const META_FADE_OUT_END = META_FADE_OUT_START + 14;

export const SmartMetadataAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scanProgress = interpolate(frame, [SCAN_START, SCAN_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scanOpacity = interpolate(
    frame,
    [SCAN_START, SCAN_START + 2, SCAN_END - 2, SCAN_END],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const ringPulse = interpolate(frame, [SCAN_START, SCAN_END, SCAN_END + 10], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const metaFadeOut = interpolate(frame, [META_FADE_OUT_START, META_FADE_OUT_END], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const descProgress = spring({
    frame: frame - DESC_AT,
    fps,
    config: { damping: 14, mass: 0.6 },
    durationInFrames: 16,
  });
  const descOpacity = descProgress * metaFadeOut;
  const descTranslateY = (1 - descProgress) * 6;

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
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.4,
            color: MUTED,
            opacity: descOpacity,
            transform: `translateY(${descTranslateY}px)`,
          }}
        >
          {DESCRIPTION}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 6,
            opacity: metaFadeOut,
            overflow: 'hidden',
          }}
        >
          {TAGS.map((tag, i) => (
            <TagChip key={tag} label={tag} appearAt={TAG_START + i * TAG_STAGGER} frame={frame} fps={fps} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: FG,
          }}
        >
          <div
            style={{
              position: 'relative',
              flexShrink: 0,
              width: 64,
              height: 64,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 16,
                border: `2px solid ${PRIMARY}`,
                opacity: ringPulse * 0.6,
                transform: `scale(${1 + ringPulse * 0.08})`,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 6px rgba(15,23,42,0.08)',
              }}
            >
              <img
                src={glitchThumb.src}
                alt=''
                loading='lazy'
                decoding='async'
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${scanProgress * 100}%`,
                  width: 18,
                  marginLeft: -9,
                  background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${PRIMARY}, transparent 30%), transparent)`,
                  opacity: scanOpacity,
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Cyberpunk_Art.png</span>
            <span style={{ fontSize: 11, color: MUTED }}>4.2 MB</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

interface TagChipProps {
  label: string;
  appearAt: number;
  frame: number;
  fps: number;
}

const TagChip = ({ label, appearAt, frame, fps }: TagChipProps) => {
  const progress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 12, mass: 0.5 },
    durationInFrames: 14,
  });

  const opacity = progress;
  const translateY = (1 - progress) * 14;
  const scale = 0.7 + progress * 0.3;

  return (
    <span
      style={{
        fontSize: 11,
        padding: '4px 10px',
        borderRadius: 999,
        background: PRIMARY_SOFT,
        color: PRIMARY,
        fontWeight: 600,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

export const SMART_METADATA_DURATION = META_FADE_OUT_END + 14;
export const SMART_METADATA_FPS = 30;
export const SMART_METADATA_WIDTH = 340;
export const SMART_METADATA_HEIGHT = 220;
