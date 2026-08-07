import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Check, FileText, Image as ImageIcon, ScanLine, Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import type { ComponentType } from 'react';

// Remotion composition for /for-medical, modeled on SmartBatchRenameAnimation:
// scanner output rows get a scan sweep, then spring-reveal their proposed
// names. House rule holds here too — every generated name is identifier-based
// (MRN/ACC), never a patient name or diagnosis. All colors resolve through the
// page's CSS variables, so the demo is light-on-light and theme-aware.

interface RecordEntry {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tint: string;
  oldName: string;
  // The date is part of the filename, in its real position — not a separate
  // styled segment.
  newName: string;
  revealAt: number;
}

const RECORDS: RecordEntry[] = [
  {
    icon: FileText,
    tint: '#dc2626',
    oldName: 'Scan0001.pdf',
    newName: 'MRN-48211 – 2026-06-12 – Lab Results',
    revealAt: 18,
  },
  {
    icon: ScanLine,
    tint: '#2563eb',
    oldName: 'fax_received.pdf',
    newName: 'MRN-30177 – 2026-05-30 – Imaging – X-Ray',
    revealAt: 34,
  },
  {
    icon: ImageIcon,
    tint: 'var(--success)',
    oldName: 'Scanned Document 4.pdf',
    newName: 'MRN-51402 – 2026-06-05 – Intake Form',
    revealAt: 50,
  },
  {
    icon: FileText,
    tint: '#dc2626',
    oldName: 'Scan_0052.pdf',
    newName: 'ACC-2210 – 2026-06-04 – ERA – Aetna',
    revealAt: 66,
  },
];

const PRIMARY = 'var(--primary)';
const PRIMARY_SOFT = 'var(--primary-soft)';
const SUCCESS = 'var(--success)';
const MUTED = 'var(--muted-foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

export const MedicalRecordsAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          justifyContent: 'center',
          gap: 9,
        }}
      >
        {RECORDS.map((record) => (
          <RecordRow key={record.oldName} record={record} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface RecordRowProps {
  record: RecordEntry;
  frame: number;
  fps: number;
}

const RecordRow = ({ record, frame, fps }: RecordRowProps) => {
  const Icon = record.icon;
  const { revealAt, oldName, newName, tint } = record;
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
        // No drop shadow — only the transient scan-glow ring during analysis.
        boxShadow: `0 0 0 ${scanGlow * 3}px color-mix(in srgb, var(--primary), transparent 82%)`,
        overflow: 'hidden',
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
          gap: 5,
          minWidth: 0,
          opacity: resultProgress,
          transform: `translateX(${(1 - resultProgress) * 8}px)`,
          whiteSpace: 'nowrap',
        }}
      >
        {/* One purple chip carrying the full proposed filename — date included,
            in one style. No shadow. */}
        <span
          style={{
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: 7,
            background: PRIMARY_SOFT,
            color: PRIMARY,
            fontSize: 10.5,
            letterSpacing: '-0.015em',
          }}
        >
          {newName}
        </span>
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

export const MEDICAL_RECORDS_DURATION = 96;
export const MEDICAL_RECORDS_FPS = 30;
export const MEDICAL_RECORDS_WIDTH = 560;
export const MEDICAL_RECORDS_HEIGHT = 300;
