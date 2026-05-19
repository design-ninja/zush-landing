import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FileText, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';

const PdfIcon = ({ size = 20, strokeWidth = 2.2 }: { size?: number; strokeWidth?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
    <polyline points='14 2 14 8 20 8' />
    <text
      x='12'
      y='18'
      fontSize='6'
      fontWeight='700'
      fill='currentColor'
      stroke='none'
      textAnchor='middle'
      fontFamily='Inter, sans-serif'
    >
      PDF
    </text>
  </svg>
);

interface FileEntry {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tint: string;
  oldName: string;
  newName: string;
  swapAt: number;
}

const FILES: FileEntry[] = [
  {
    icon: FileText,
    tint: '#2563eb',
    oldName: 'Document1 (3).docx',
    newName: 'Q1_Strategy_Notes.docx',
    swapAt: 28,
  },
  {
    icon: ImageIcon,
    tint: 'var(--success)',
    oldName: 'Screenshot 19.45.png',
    newName: 'Bali_Sunset_Beach.png',
    swapAt: 40,
  },
  {
    icon: PdfIcon,
    tint: '#dc2626',
    oldName: 'doc_FINAL_v3.pdf',
    newName: 'Investor_Update_Deck.pdf',
    swapAt: 52,
  },
];

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const SUCCESS = 'var(--success)';
const MUTED = 'var(--muted-foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

export const SmartBatchRenameAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: 'transparent',
        padding: 8,
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {FILES.map((file, i) => (
          <FileRow key={i} file={file} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface FileRowProps {
  file: FileEntry;
  frame: number;
  fps: number;
}

const FileRow = ({ file, frame, fps }: FileRowProps) => {
  const Icon = file.icon;
  const { swapAt, oldName, newName, tint } = file;

  const scanStart = swapAt - 14;
  const scanEnd = swapAt - 2;
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

  const strike = interpolate(frame, [swapAt - 4, swapAt + 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const oldOpacity = interpolate(frame, [swapAt + 1, swapAt + 8], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const newProgress = spring({
    frame: frame - swapAt - 2,
    fps,
    config: { damping: 14, mass: 0.6 },
    durationInFrames: 16,
  });

  const newTranslateY = (1 - newProgress) * 10;
  const newOpacity = newProgress;

  const checkProgress = spring({
    frame: frame - swapAt - 6,
    fps,
    config: { damping: 10, mass: 0.4 },
    durationInFrames: 10,
  });

  const showCheck = frame > swapAt + 2;
  const rowGlow = scanGlow * 0.5;

  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    boxShadow: `0 1px 3px rgba(0,0,0,0.05), 0 0 0 ${rowGlow * 3}px color-mix(in srgb, var(--primary), transparent 78%)`,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${scanProgress * 100}%`,
          width: 36,
          marginLeft: -18,
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${PRIMARY}, transparent 35%), transparent)`,
          opacity: scanOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `color-mix(in srgb, ${tint}, transparent 80%)`,
          color: tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} strokeWidth={2.2} />
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          height: 24,
        }}
      >
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
          {oldName}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              height: 1.5,
              width: `${strike * 100}%`,
              background: MUTED,
              transform: 'translateY(-50%)',
            }}
          />
        </span>

        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            color: PRIMARY,
            opacity: newOpacity,
            transform: `translateY(${newTranslateY}px)`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span
            style={{
              background: PRIMARY_SOFT,
              padding: '3px 9px',
              borderRadius: 7,
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {newName}
          </span>
        </span>
      </div>

      {showCheck ? (
        <div
          style={{
            width: 20,
            height: 20,
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
      ) : (
        <Sparkles
          size={18}
          color={PRIMARY}
          strokeWidth={2}
          style={{
            opacity: scanGlow,
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
};

export const SMART_BATCH_RENAME_DURATION = 76;
export const SMART_BATCH_RENAME_FPS = 30;
export const SMART_BATCH_RENAME_WIDTH = 340;
export const SMART_BATCH_RENAME_HEIGHT = 220;
