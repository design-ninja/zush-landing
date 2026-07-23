import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
  Blocks,
  FolderSync,
  History,
  LayoutTemplate,
  MessageSquareText,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import headingStyles from '@/components/Heading/Heading.module.scss';
import { FEATURE_ANIMATION_CONFIG, type FeatureAnimationKind } from './FeatureAnimation';
import featureStyles from './Features.module.scss';
import styles from './FeatureSwitcher.module.scss';

export interface FeatureSwitcherItem {
  kind: FeatureAnimationKind;
  title: string;
  description: string;
}

interface FeatureSwitcherProps {
  items: FeatureSwitcherItem[];
}

const ICONS: Partial<Record<FeatureAnimationKind, LucideIcon>> = {
  folders: FolderSync,
  templates: LayoutTemplate,
  'naming-blocks': Blocks,
  prompts: MessageSquareText,
  metadata: Tag,
  history: History,
};

const TONES: Partial<Record<FeatureAnimationKind, string>> = {
  folders: 'blue',
  templates: 'orange',
  'naming-blocks': 'purple',
  prompts: 'pink',
  metadata: 'green',
  history: 'cyan',
};

const FeatureSwitcher = ({ items }: FeatureSwitcherProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const activeItem = items[activeIndex];
  const config = FEATURE_ANIMATION_CONFIG[activeItem.kind];
  const aspectRatio = `${config.width} / ${config.height}`;

  return (
    <div
      className={styles.Switcher}
      style={{ gridTemplateRows: `repeat(${items.length - 1}, auto) minmax(0, 1fr)` }}
    >
      {items.map((item, index) => {
        const Icon = ICONS[item.kind];
        const isActive = index === activeIndex;
        return (
          <button
            key={item.kind}
            type='button'
            className={`${styles.Switcher__Item} ${isActive ? styles.Switcher__Item_active : ''}`}
            style={{ order: index * 2 }}
            aria-expanded={isActive}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <span
              className={`${styles.Switcher__ItemIcon} ${
                styles[`Switcher__ItemIcon_${TONES[item.kind]}`] ?? ''
              }`}
              aria-hidden
            >
              {Icon ? <Icon size={20} /> : null}
            </span>
            <span className={styles.Switcher__ItemText}>
              <span
                className={`${headingStyles.Heading} ${headingStyles.Heading_h4} ${featureStyles.BentoCard__Title}`}
              >
                {item.title}
              </span>
            </span>
          </button>
        );
      })}

      <div
        className={styles.Switcher__Stage}
        style={{ order: activeIndex * 2 + 1, gridRow: `1 / span ${items.length}` }}
      >
        <div className={styles.Switcher__Canvas} style={{ aspectRatio }}>
          {hasMounted ? (
            <Player
              key={activeItem.kind}
              ref={playerRef}
              component={config.component as ComponentType<Record<string, never>>}
              durationInFrames={config.duration}
              fps={config.fps}
              compositionWidth={config.width}
              compositionHeight={config.height}
              autoPlay
              loop={false}
              moveToBeginningWhenEnded={false}
              controls={false}
              showVolumeControls={false}
              clickToPlay={false}
              doubleClickToFullscreen={false}
              style={{ width: '100%', aspectRatio }}
            />
          ) : (
            <div style={{ width: '100%', aspectRatio }} aria-hidden />
          )}
        </div>
        {items.map((item, index) => (
          <p
            key={item.kind}
            className={styles.Switcher__Description}
            hidden={index !== activeIndex}
          >
            {item.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeatureSwitcher;
