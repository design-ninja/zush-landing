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
import { motion } from 'framer-motion';

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
  const showcaseItems = isWindowsShowcase ? WINDOWS_DEMO_SCREENSHOTS : DEMO_VIDEOS;
  const activeVideo = DEMO_VIDEOS[activeFeature];
  const activeScreenshot = WINDOWS_DEMO_SCREENSHOTS[activeFeature];
  const activeVideoMedia = resolveDemoVideoMedia(activeVideo, theme);
  const activeScreenshotSrc = resolveDemoScreenshotMedia(activeScreenshot, theme);
  const activeItem = showcaseItems[activeFeature];

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
      setIsPlaying(false);
      return;
    }

    setIsPlaying(shouldAutoplay);
  }, [activeFeature, isWindowsShowcase, shouldAutoplay]);

  const handleTabClick = (index: number) => {
    setActiveFeature(index);
  };

  return (
    <section className={styles.Videos}>
      <div className={styles.Videos__Container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title={
              <>
                See <span style={{ color: 'var(--secondary)' }}>Zush</span> in Action
              </>
            }
            description='See how Zush handles real file organization workflows with these core features'
          />
        </motion.div>
        
        <motion.div
          ref={videoWrapperRef}
          className={styles.Videos__VideoWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isWindowsShowcase ? (
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
              aria-label={`Play ${activeVideo.title} demo video`}
            >
              <img
                src={activeVideoMedia.poster}
                alt={`${activeVideo.title} demo`}
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
              key={activeVideoMedia.source}
              className={styles.Videos__Video}
              src={activeVideoMedia.source}
              aria-label={`${activeVideo.title}: ${activeVideo.description}`}
              muted
              playsInline
              autoPlay
              controls
              preload='metadata'
              poster={activeVideoMedia.poster}
            >
              <track
                kind='captions'
                src='/videos/captions/zush-demo.vtt'
                srcLang='en'
                label='English captions'
              />
            </video>
          )}
        </motion.div>
        <Text as='p' className={styles.Videos__Description}>{activeItem.description}</Text>

        <motion.div
          className={styles.Videos__Tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
        </motion.div>
      </div>
    </section>
  );
};

export default Videos;
