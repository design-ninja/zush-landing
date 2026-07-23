import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Image as ImageIcon,
  ReceiptText,
  Sparkles,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { FEATURE_DEMO_COPY, type FeatureDemoCopy } from '@/i18n/featureDemoCopy';

interface FileEntry {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tint: string;
  oldName: string;
  aiTitle: string;
  revealAt: number;
  customValue?: string;
}

const FILES: FileEntry[] = [
  {
    icon: ReceiptText,
    tint: '#dc2626',
    oldName: 'invoice_8742.pdf',
    aiTitle: 'Northstar Services Invoice',
    customValue: '$59.99',
    revealAt: 18,
  },
  {
    icon: ImageIcon,
    tint: 'var(--success)',
    oldName: 'IMG_5831.png',
    aiTitle: 'Family Weekend in San Francisco',
    revealAt: 32,
  },
  {
    icon: FileText,
    tint: '#2563eb',
    oldName: 'document (14).docx',
    aiTitle: 'Annual Medical Fitness Certificate',
    revealAt: 46,
  },
];

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const SUCCESS = 'var(--success)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';
const PROMPT_REVEAL_AT = 62;

interface SmartBatchRenameAnimationProps {
  demoCopy?: FeatureDemoCopy;
}

export const SmartBatchRenameAnimation = ({ demoCopy = FEATURE_DEMO_COPY.en }: SmartBatchRenameAnimationProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const files = FILES.map((file, index) => ({
    ...file,
    aiTitle: demoCopy.smartBatchGeneratedNames[index] ?? file.aiTitle,
  }));

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          position: 'relative',
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 9,
          paddingTop: 66,
        }}
      >
        {files.map((file) => (
          <FileRow key={file.oldName} file={file} frame={frame} fps={fps} demoCopy={demoCopy} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface FileRowProps {
  file: FileEntry;
  frame: number;
  fps: number;
  demoCopy: FeatureDemoCopy;
}

const FileRow = ({ file, frame, fps, demoCopy }: FileRowProps) => {
  const Icon = file.icon;
  const { revealAt, oldName, aiTitle, tint, customValue } = file;
  const scanStart = revealAt - 10;
  const scanEnd = revealAt - 2;
  const scanProgress = interpolate(frame, [scanStart, scanEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scanOpacity = interpolate(
    frame,
    [scanStart, scanStart + 2, scanEnd - 2, scanEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const scanGlow = interpolate(
    frame,
    [scanStart, (scanStart + scanEnd) / 2, scanEnd],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const resultProgress = spring({
    frame: frame - revealAt,
    fps,
    config: { damping: 14, mass: 0.55 },
    durationInFrames: 14,
  });
  const checkProgress = spring({
    frame: frame - revealAt - 5,
    fps,
    config: { damping: 11, mass: 0.4 },
    durationInFrames: 10,
  });
  const promptProgress = frame >= PROMPT_REVEAL_AT
    ? spring({
        frame: frame - PROMPT_REVEAL_AT,
        fps,
        config: { damping: 14, mass: 0.55 },
        durationInFrames: 14,
      })
    : 0;
  const showCheck = frame > revealAt + 2;

  return (
    <div
      style={{
        position: 'relative',
        width: 'fit-content',
        maxWidth: '100%',
        display: 'grid',
        gridTemplateColumns: '34px max-content 18px max-content 18px',
        alignItems: 'center',
        gap: 9,
        minHeight: 55,
        padding: '8px 11px',
        background: BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 13,
        boxShadow: `0 1px 3px rgba(0,0,0,0.035), 0 0 0 ${scanGlow * 3}px color-mix(in srgb, var(--primary), transparent 82%)`,
        overflow: customValue ? 'visible' : 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          insetBlock: 0,
          left: `${scanProgress * 100}%`,
          width: 38,
          marginLeft: -19,
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${PRIMARY}, transparent 38%), transparent)`,
          opacity: scanOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: `color-mix(in srgb, ${tint}, transparent 82%)`,
          color: tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={18} strokeWidth={2.2} />
      </span>

      <span
        style={{
          minWidth: 0,
          color: MUTED,
          fontSize: 10.5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {oldName}
      </span>

      <ArrowRight size={13} color={MUTED} strokeWidth={1.8} />

      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          minWidth: 0,
          opacity: resultProgress,
          transform: `translateX(${(1 - resultProgress) * 8}px)`,
          whiteSpace: 'nowrap',
          overflow: 'visible',
        }}
      >
        <span
          style={{
            flexShrink: 0,
            padding: '4px 5px',
            borderRadius: 7,
            background: PRIMARY_SOFT,
            color: PRIMARY,
            fontSize: 10.5,
            letterSpacing: '-0.015em',
          }}
        >
          {aiTitle}
        </span>
        {customValue ? (
          <span
            style={{
              position: 'relative',
              flexShrink: 0,
              padding: '4px 5px',
              borderRadius: 7,
              background: 'color-mix(in srgb, var(--success), transparent 88%)',
              color: SUCCESS,
              fontSize: 8.25,
              fontWeight: 650,
            }}
          >
            {frame >= PROMPT_REVEAL_AT ? (
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 38,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  zIndex: 3,
                  opacity: promptProgress,
                  transform: `translate(-50%, ${(1 - promptProgress) * -8}px)`,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    color: FG,
                    fontSize: 10,
                    fontWeight: 650,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {demoCopy.smartBatchPromptLabel}
                </span>
                <span
                  style={{
                    position: 'relative',
                    padding: '6px 9px',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 8,
                    background: BG,
                    color: MUTED,
                    fontSize: 9.5,
                    fontWeight: 500,
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {demoCopy.smartBatchPromptText}
                  <span
                    aria-hidden
                    style={{
                      marginLeft: 1,
                      color: PRIMARY,
                      opacity: 1,
                    }}
                  >
                    |
                  </span>
                  <ArrowDown
                    size={12}
                    color={SUCCESS}
                    strokeWidth={2.4}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: -13,
                      transform: 'translateX(-50%)',
                    }}
                  />
                </span>
              </span>
            ) : null}
            {customValue}
          </span>
        ) : null}
      </span>

      {showCheck ? (
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: SUCCESS,
            color: 'var(--success-foreground, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${checkProgress})`,
            opacity: checkProgress,
          }}
        >
          <Check size={8} strokeWidth={2.8} />
        </span>
      ) : (
        <Sparkles size={15} color={PRIMARY} strokeWidth={2} style={{ opacity: scanGlow }} />
      )}
    </div>
  );
};

export const SMART_BATCH_RENAME_DURATION = 78;
export const SMART_BATCH_RENAME_FPS = 30;
export const SMART_BATCH_RENAME_WIDTH = 560;
export const SMART_BATCH_RENAME_HEIGHT = 270;
export const SMART_BATCH_RENAME_PREVIEW_FRAME = 60;
