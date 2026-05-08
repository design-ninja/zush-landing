import { useEffect, useState } from 'react';
import SectionHeader from '../SectionHeader';
import Text from '@/components/Text';
import {
  MACOS_DEMO_SCREENSHOTS,
  WINDOWS_DEMO_SCREENSHOTS,
  resolveDemoScreenshotMedia,
  type DemoVideoTheme,
} from '@/data/demoVideos';
import { useOS } from '@/hooks/useOS';
import type { DownloadOS } from '@/utils/download';
import styles from './Videos.module.scss';

interface VideosProps {
  autoplayOnHydration?: boolean;
  autoplayWhenInView?: boolean;
  forceOS?: DownloadOS;
  copy?: VideosCopy;
}

interface VideosCopy {
  title: string;
  titleAccent: string;
  description: string;
  playDemo: string;
  switchTo: string;
  items: Record<string, { title: string; description: string; alt?: string }>;
}

const defaultCopy: VideosCopy = {
  title: 'See Zush in Action',
  titleAccent: 'Zush',
  description: 'See how Zush handles real file organization workflows with these core features',
  playDemo: 'Play demo',
  switchTo: 'Switch to',
  items: {},
};

const getDocumentTheme = (): DemoVideoTheme => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
};

const Videos = ({
  forceOS,
  copy = defaultCopy,
}: VideosProps) => {
  const { downloadOS: detectedOS } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const isWindowsShowcase = downloadOS === 'windows';
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState<DemoVideoTheme>('light');
  const showcaseItems = isWindowsShowcase
    ? WINDOWS_DEMO_SCREENSHOTS
    : MACOS_DEMO_SCREENSHOTS;
  const activeScreenshot = showcaseItems[activeFeature] ?? showcaseItems[0];
  const activeScreenshotSrc = resolveDemoScreenshotMedia(activeScreenshot, theme);
  const activeItem = activeScreenshot;
  const localizedActiveItem = {
    ...activeItem,
    ...copy.items[activeItem.id],
  };
  const activeWindowsVideoSrc = activeScreenshot.video?.[theme] ?? '';
  const hasActiveWindowsVideo = isWindowsShowcase && activeWindowsVideoSrc.length > 0;

  useEffect(() => {
    if (activeFeature >= showcaseItems.length) {
      setActiveFeature(0);
    }
  }, [activeFeature, showcaseItems.length]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const syncTheme = () => setTheme(getDocumentTheme());

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'data-theme')) {
        syncTheme();
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <section className={styles.Videos} data-scroll-reveal-skip=''>
      <div className={styles.Videos__Container}>
        <div>
          <SectionHeader
            title={
              <>
                {copy.title.split(copy.titleAccent)[0]}<span style={{ color: 'var(--secondary)' }}>{copy.titleAccent}</span>{copy.title.split(copy.titleAccent).slice(1).join(copy.titleAccent)}
              </>
            }
            description={copy.description}
          />
        </div>
        
        <div className={styles.Videos__VideoWrapper}>
          {hasActiveWindowsVideo ? (
            <video
              key={activeWindowsVideoSrc}
              className={styles.Videos__Video}
              src={activeWindowsVideoSrc}
              aria-label={`${localizedActiveItem.title}: ${localizedActiveItem.description}`}
              muted
              playsInline
              controls
              preload='metadata'
              poster={activeScreenshotSrc}
            />
          ) : (
            <img
              src={activeScreenshotSrc}
              alt={copy.items[activeItem.id]?.alt ?? activeScreenshot.alt}
              className={styles.Videos__Poster}
              width={1280}
              height={720}
              loading='lazy'
              decoding='async'
            />
          )}
        </div>
        <Text as='p' className={styles.Videos__Description}>{localizedActiveItem.description}</Text>

        <div
          className={styles.Videos__Tabs}
        >
            {showcaseItems.map((feature, index) => {
              const localizedFeature = {
                ...feature,
                ...copy.items[feature.id],
              };
              return (
                <button
                    key={feature.id}
                    className={`${styles.Videos__Tab} ${
                        index === activeFeature ? styles.Videos__Tab_active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`${copy.switchTo} ${localizedFeature.title}`}
                >
                    <span>{localizedFeature.title}</span>
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Videos;
