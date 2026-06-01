import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import SectionHeader from '../SectionHeader';
import Text from '@/components/Text';
import {
  MACOS_SHOWCASE_SCREENSHOTS,
  WINDOWS_SHOWCASE_SCREENSHOTS,
  resolveShowcaseScreenshotMedia,
  type ShowcaseTheme,
} from '@/data/showcaseMedia';
import { useOS } from '@/hooks/useOS';
import type { DownloadOS } from '@/utils/download';
import styles from './Tour.module.scss';

interface TourProps {
  forceOS?: DownloadOS;
  copy?: TourCopy;
}

interface TourCopy {
  title: string;
  titleAccent: string;
  description: string;
  switchTo: string;
  items: Record<string, { title: string; description: string; alt?: string }>;
}

const defaultCopy: TourCopy = {
  title: 'Take a tour of Zush',
  titleAccent: 'Zush',
  description: 'One quick showcase per feature. Click a tab to see it in action.',
  switchTo: 'Switch to',
  items: {},
};

const SLIDE_DURATION_MS = 6500;
const RESPONSIVE_IMAGE_WIDTHS = [640, 960, 1280, 1600, 1920, 2560] as const;

const getDocumentTheme = (): ShowcaseTheme => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
};

const getResponsiveImagePath = (src: string, width: number) =>
  src.replace(/\.webp$/i, `-${width}.webp`);

const getResponsiveSrcSet = (src: string) =>
  RESPONSIVE_IMAGE_WIDTHS
    .map((width) => `${getResponsiveImagePath(src, width)} ${width}w`)
    .join(', ');

const Tour = ({ forceOS, copy = defaultCopy }: TourProps) => {
  const { downloadOS: detectedOS } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const isWindowsShowcase = downloadOS === 'windows';
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState<ShowcaseTheme>('light');
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);
  const slideStartedAtRef = useRef<number>(0);
  const slideRemainingRef = useRef<number>(SLIDE_DURATION_MS);
  const showcaseItems = isWindowsShowcase
    ? WINDOWS_SHOWCASE_SCREENSHOTS
    : MACOS_SHOWCASE_SCREENSHOTS;
  const activeScreenshot = showcaseItems[activeFeature] ?? showcaseItems[0];
  const activeItem = activeScreenshot;
  const activeSrc = resolveShowcaseScreenshotMedia(activeScreenshot, theme);
  const localizedActiveItem = {
    ...activeItem,
    ...copy.items[activeItem.id],
  };

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
    if (typeof window === 'undefined') {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPrefersReducedMotion(motionQuery.matches);
    sync();
    motionQuery.addEventListener('change', sync);
    return () => motionQuery.removeEventListener('change', sync);
  }, []);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current != null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const scheduleAdvance = useCallback(
    (ms: number) => {
      clearAdvanceTimer();
      slideStartedAtRef.current = performance.now();
      slideRemainingRef.current = ms;
      advanceTimerRef.current = window.setTimeout(() => {
        setActiveFeature((prev) => (prev + 1) % showcaseItems.length);
      }, ms);
    },
    [clearAdvanceTimer, showcaseItems.length],
  );

  useEffect(() => {
    slideRemainingRef.current = SLIDE_DURATION_MS;
  }, [activeFeature]);

  useEffect(() => {
    if (prefersReducedMotion || showcaseItems.length <= 1 || isCarouselPaused) {
      return clearAdvanceTimer;
    }

    if (slideRemainingRef.current <= 0) {
      slideRemainingRef.current = SLIDE_DURATION_MS;
    }

    scheduleAdvance(slideRemainingRef.current);
    return clearAdvanceTimer;
  }, [activeFeature, isCarouselPaused, prefersReducedMotion, showcaseItems.length, scheduleAdvance, clearAdvanceTimer]);

  const captureElapsed = () => {
    if (advanceTimerRef.current != null) {
      const elapsed = performance.now() - slideStartedAtRef.current;
      slideRemainingRef.current = Math.max(0, slideRemainingRef.current - elapsed);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveFeature(index);
  };

  const handleTabsMouseEnter = () => {
    captureElapsed();
    setIsCarouselPaused(true);
  };
  const handleTabsMouseLeave = () => setIsCarouselPaused(false);

  const progressStyle = {
    '--slide-duration': `${SLIDE_DURATION_MS}ms`,
  } as CSSProperties;

  return (
    <section className={styles.Tour}>
      <div className={styles.Tour__Container}>
        <div>
          <SectionHeader
            title={
              <>
                {copy.title.split(copy.titleAccent)[0]}<span className='brand-accent-text'>{copy.titleAccent}</span>{copy.title.split(copy.titleAccent).slice(1).join(copy.titleAccent)}
              </>
            }
            description={copy.description}
          />
        </div>

        <div className={styles.Tour__ScreenshotWrapper}>
          <img
            key={`${activeScreenshot.id}-${theme}`}
            src={getResponsiveImagePath(activeSrc, 1280)}
            srcSet={getResponsiveSrcSet(activeSrc)}
            sizes='(max-width: 768px) calc(100vw - 40px), min(1024px, calc(100vw - 64px))'
            alt={copy.items[activeScreenshot.id]?.alt ?? activeScreenshot.alt}
            className={`${styles.Tour__Poster} ${styles.Tour__Poster_active}`}
            width={1280}
            height={720}
            loading='lazy'
            decoding='async'
          />
        </div>
        <Text
          as='p'
          key={activeItem.id}
          className={styles.Tour__Description}
        >
          {localizedActiveItem.description}
        </Text>

        <div
          className={styles.Tour__Tabs}
          onMouseEnter={handleTabsMouseEnter}
          onMouseLeave={handleTabsMouseLeave}
          onFocus={handleTabsMouseEnter}
          onBlur={handleTabsMouseLeave}
        >
            {showcaseItems.map((feature, index) => {
              const localizedFeature = {
                ...feature,
                ...copy.items[feature.id],
              };
              const isActive = index === activeFeature;
              return (
                <button
                    key={feature.id}
                    className={`${styles.Tour__Tab} ${
                        isActive ? styles.Tour__Tab_active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`${copy.switchTo} ${localizedFeature.title}`}
                    aria-current={isActive ? 'true' : undefined}
                >
                    {isActive && !prefersReducedMotion && showcaseItems.length > 1 && (
                      <span
                        key={`progress-${activeFeature}`}
                        className={styles.Tour__TabProgress}
                        style={{
                          ...progressStyle,
                          animationPlayState: isCarouselPaused ? 'paused' : 'running',
                        }}
                        aria-hidden='true'
                      />
                    )}
                    <span className={styles.Tour__TabLabel}>{localizedFeature.title}</span>
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Tour;
