import { useEffect, useRef, useState } from 'react';
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
  title: 'Take a tour of Zush',
  titleAccent: 'Zush',
  description: 'One short demo per feature — click a tab to see it in action',
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
  autoplayOnHydration = false,
  autoplayWhenInView = false,
  forceOS,
  copy = defaultCopy,
}: VideosProps) => {
  const { downloadOS: detectedOS } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const isWindowsShowcase = downloadOS === 'windows';
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState<DemoVideoTheme>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const windowsVideoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    if (!isWindowsShowcase || (!autoplayOnHydration && !autoplayWhenInView)) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setCanAutoplay(!motionQuery.matches);
    };

    syncMotionPreference();

    motionQuery.addEventListener('change', syncMotionPreference);
    return () =>
      motionQuery.removeEventListener('change', syncMotionPreference);
  }, [autoplayOnHydration, autoplayWhenInView, isWindowsShowcase]);

  useEffect(() => {
    if (!isWindowsShowcase || !autoplayWhenInView || !canAutoplay || hasEnteredViewport) {
      return;
    }

    const videoWrapper = videoWrapperRef.current;
    if (!videoWrapper) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(videoWrapper);

    return () => observer.disconnect();
  }, [autoplayWhenInView, canAutoplay, hasEnteredViewport, isWindowsShowcase]);

  const shouldAutoplay =
    isWindowsShowcase && canAutoplay && (autoplayOnHydration || hasEnteredViewport);

  useEffect(() => {
    if (!isWindowsShowcase) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(hasActiveWindowsVideo && shouldAutoplay);
  }, [activeFeature, hasActiveWindowsVideo, isWindowsShowcase, shouldAutoplay]);

  useEffect(() => {
    if (!hasActiveWindowsVideo) {
      return;
    }

    const video = windowsVideoRef.current;
    if (!video) {
      return;
    }

    if (isPlaying) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [hasActiveWindowsVideo, isPlaying, activeWindowsVideoSrc]);

  const handleTabClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <section className={styles.Videos}>
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
        
        <div
          ref={videoWrapperRef}
          className={styles.Videos__VideoWrapper}
        >
          {hasActiveWindowsVideo ? (
            <video
              ref={windowsVideoRef}
              key={activeWindowsVideoSrc}
              className={styles.Videos__Video}
              src={activeWindowsVideoSrc}
              aria-label={`${localizedActiveItem.title}: ${localizedActiveItem.description}`}
              muted
              playsInline
              controls
              preload='auto'
            />
          ) : isWindowsShowcase ? (
            <img
              src={activeScreenshotSrc}
              alt={activeScreenshot.alt}
              className={styles.Videos__Poster}
              width={1280}
              height={720}
              loading='lazy'
              decoding='async'
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
