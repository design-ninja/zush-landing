import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Image as ImageIcon, Camera, ReceiptText, Check } from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';

const PRIMARY = 'var(--primary)';
const MUTED = 'var(--muted-foreground)';
const FG = 'var(--foreground)';
const BG = 'var(--background)';
const BORDER = 'var(--border)';

interface TemplateDef {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  iconColor: string;
  iconBg: string;
}

const TEMPLATES: TemplateDef[] = [
  {
    title: 'Screenshots',
    description: 'Names by app, screen, and visible content',
    icon: ImageIcon,
    iconColor: 'var(--tone-pink-fg)',
    iconBg: 'var(--tone-pink-bg)',
  },
  {
    title: 'Photographer Shoots',
    description: 'Shoots named by date, client, event, and place',
    icon: Camera,
    iconColor: 'var(--tone-orange-fg)',
    iconBg: 'var(--tone-orange-bg)',
  },
  {
    title: 'Bookkeeper Expenses',
    description: 'Date, vendor, total, and invoice number',
    icon: ReceiptText,
    iconColor: 'var(--tone-green-fg)',
    iconBg: 'var(--tone-green-bg)',
  },
];

const SELECTED_INDEX = 1;
const ROW_APPEAR_AT = [0, 3, 6];
const HIGHLIGHT_START = 22;
const HIGHLIGHT_HOLD = 70;

export const TemplatesAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkProgress = spring({
    frame: frame - (HIGHLIGHT_START + 4),
    fps,
    config: { damping: 10, mass: 0.4 },
    durationInFrames: 12,
  });

  const highlightActive = frame >= HIGHLIGHT_START && frame <= HIGHLIGHT_HOLD;
  const highlightPulse = highlightActive
    ? interpolate(frame, [HIGHLIGHT_START, HIGHLIGHT_START + 8], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ background: 'transparent', padding: 8, fontFamily: 'inherit' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          justifyContent: 'flex-end',
        }}
      >
        {TEMPLATES.map((template, i) => (
          <TemplateRow
            key={template.title}
            template={template}
            appearAt={ROW_APPEAR_AT[i]}
            frame={frame}
            fps={fps}
            isSelected={i === SELECTED_INDEX}
            highlightPulse={i === SELECTED_INDEX ? highlightPulse : 0}
            checkProgress={i === SELECTED_INDEX ? checkProgress : 0}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

interface TemplateRowProps {
  template: TemplateDef;
  appearAt: number;
  frame: number;
  fps: number;
  isSelected: boolean;
  highlightPulse: number;
  checkProgress: number;
}

const TemplateRow = ({
  template,
  appearAt,
  frame,
  fps,
  isSelected,
  highlightPulse,
  checkProgress,
}: TemplateRowProps) => {
  const Icon = template.icon;

  const appearProgress = spring({
    frame: frame - appearAt,
    fps,
    config: { damping: 14, mass: 0.55 },
    durationInFrames: 14,
  });

  const opacity = appearProgress;
  const translateY = (1 - appearProgress) * 10;

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 11px',
    background: BG,
    border: `1px solid ${isSelected ? `color-mix(in srgb, ${PRIMARY}, transparent ${85 - highlightPulse * 50}%)` : BORDER}`,
    borderRadius: 10,
    boxShadow: isSelected
      ? `0 1px 3px rgba(0,0,0,0.05), 0 0 0 ${highlightPulse * 3}px color-mix(in srgb, ${PRIMARY}, transparent 82%)`
      : '0 1px 3px rgba(0,0,0,0.05)',
    opacity,
    transform: `translateY(${translateY}px)`,
  };

  return (
    <div style={rowStyle}>
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: template.iconBg,
          color: template.iconColor,
          flexShrink: 0,
        }}
      >
        <Icon size={16} strokeWidth={2.35} />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1, gap: 2 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: FG,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {template.title}
        </span>
        <span
          style={{
            fontSize: 11,
            color: MUTED,
            lineHeight: 1.3,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {template.description}
        </span>
      </span>
      {isSelected && checkProgress > 0 ? (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: PRIMARY,
            color: 'var(--primary-foreground, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transform: `scale(${checkProgress})`,
            opacity: checkProgress,
            boxShadow: `0 0 10px color-mix(in srgb, ${PRIMARY}, transparent 60%)`,
          }}
        >
          <Check size={13} strokeWidth={3} />
        </span>
      ) : null}
    </div>
  );
};

export const TEMPLATES_DURATION = 90;
export const TEMPLATES_FPS = 30;
export const TEMPLATES_WIDTH = 340;
export const TEMPLATES_HEIGHT = 220;
