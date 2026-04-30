import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import Text from '@/components/Text';
import {
  DEMO_VIDEOS,
  WINDOWS_DEMO_SCREENSHOTS,
  resolveDemoVideoMedia,
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
}

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
}: VideosProps) => {
  const { downloadOS: detectedOS } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const isWindowsShowcase = downloadOS === 'windows';
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState<DemoVideoTheme>(getDocumentTheme);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const windowsVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseItems = isWindowsShowcase ? WINDOWS_DEMO_SCREENSHOTS : DEMO_VIDEOS;
  const activeVideo = DEMO_VIDEOS[activeFeature] ?? DEMO_VIDEOS[0];
  const activeScreenshot =
    WINDOWS_DEMO_SCREENSHOTS[activeFeature] ?? WINDOWS_DEMO_SCREENSHOTS[0];
  const activeVideoMedia = resolveDemoVideoMedia(activeVideo, theme);
  const activeScreenshotSrc = resolveDemoScreenshotMedia(activeScreenshot, theme);
  const activeItem = showcaseItems[activeFeature];
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
    if (!autoplayOnHydration && !autoplayWhenInView) {
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
  }, [autoplayOnHydration, autoplayWhenInView]);

  useEffect(() => {
    if (!autoplayWhenInView || !canAutoplay || hasEnteredViewport) {
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
  }, [autoplayWhenInView, canAutoplay, hasEnteredViewport]);

  const shouldAutoplay =
    canAutoplay && (autoplayOnHydration || hasEnteredViewport);

  useEffect(() => {
    if (isWindowsShowcase) {
      setIsPlaying(hasActiveWindowsVideo && shouldAutoplay);
      return;
    }

    setIsPlaying(shouldAutoplay);
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
                See <span style={{ color: 'var(--secondary)' }}>Zush</span> in Action
              </>
            }
            description='See how Zush handles real file organization workflows with these core features'
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
              aria-label={`${activeItem.title}: ${activeItem.description}`}
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
          ) : !isPlaying ? (
            <button
              type='button'
              className={styles.Videos__PlayButton}
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${activeItem.title} demo video`}
            >
              <img
                src={hasActiveWindowsVideo ? activeScreenshotSrc : activeVideoMedia.poster}
                alt={`${activeItem.title} demo`}
                className={styles.Videos__Poster}
                width={1280}
                height={720}
                loading='lazy'
                decoding='async'
              />
              <span className={styles.Videos__PlayOverlay} />
              <span className={styles.Videos__PlayIcon} aria-hidden='true'>
                <Play size={28} fill='currentColor' />
              </span>
              <span className={styles.Videos__PlayLabel}>Play demo</span>
            </button>
          ) : (
            <video
              key={hasActiveWindowsVideo ? activeWindowsVideoSrc : activeVideoMedia.source}
              className={styles.Videos__Video}
              src={hasActiveWindowsVideo ? activeWindowsVideoSrc : activeVideoMedia.source}
              aria-label={`${activeItem.title}: ${activeItem.description}`}
              muted
              playsInline
              autoPlay
              controls
              preload='metadata'
              poster={hasActiveWindowsVideo ? activeScreenshotSrc : activeVideoMedia.poster}
            >
              {!hasActiveWindowsVideo && (
                <track
                  kind='captions'
                  src='/videos/captions/zush-demo.vtt'
                  srcLang='en'
                  label='English captions'
                />
              )}
            </video>
          )}
        </div>
        <Text as='p' className={styles.Videos__Description}>{activeItem.description}</Text>

        <div
          className={styles.Videos__Tabs}
        >
            {showcaseItems.map((feature, index) => (
                <button
                    key={feature.id}
                    className={`${styles.Videos__Tab} ${
                        index === activeFeature ? styles.Videos__Tab_active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`Switch to ${feature.title}`}
                >
                    <span>{feature.title}</span>
                </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
