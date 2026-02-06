import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader';
import styles from './Videos.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    video: '/videos/zush-batch-rename.mp4',
    poster: '/images/features/car_thumb.webp',
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    video: '/videos/zush-monitor.mp4',
    poster: '/images/features/sunset_thumb.webp',
  },
  {
    id: 'tags',
    title: 'Smart Tags',
    video: '/videos/zush-tags.mp4',
    poster: '/images/features/glitch_thumb.webp',
  },
  {
    id: 'naming',
    title: 'Naming Patterns',
    video: '/videos/zush-naming-pattern.mp4',
    poster: '/images/features/sunset_thumb.webp',
  },
  {
    id: 'multilanguage',
    title: 'Multilanguage',
    video: '/videos/zush-multilanguage.mp4',
    poster: '/images/features/car_thumb.webp',
  },
];

const Videos = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [allowAutoplay, setAllowAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const tryAutoplay = useCallback(() => {
    if (!videoRef.current || !allowAutoplay || !isInViewport) {
      return;
    }

    videoRef.current.play().catch(() => {
      setAllowAutoplay(false);
    });
  }, [allowAutoplay, isInViewport]);

  useEffect(() => {
    if (!videoWrapperRef.current) {
      setShouldLoad(true);
      setIsInViewport(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(videoWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && shouldLoad) {
      setIsLoading(true);
      videoRef.current.currentTime = 0;
      setProgress(0);
      progressRef.current = 0;
      tryAutoplay();
    }
  }, [activeFeature, shouldLoad, isInViewport, tryAutoplay]);

  useEffect(() => {
    if (!videoRef.current || !shouldLoad) {
      return;
    }

    if (isInViewport) {
      tryAutoplay();
    } else {
      videoRef.current.pause();
    }
  }, [isInViewport, shouldLoad, tryAutoplay]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleLoadedMetadata = () => {
    setIsLoading(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      if (duration > 0) {
        progressRef.current = currentTime / duration;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            setProgress(progressRef.current);
            rafRef.current = null;
          });
        }
      }
    }
  };

  const handleEnded = () => {
    setProgress(0);
    setActiveFeature((prev) => (prev + 1) % FEATURES.length);
  };

  const handleTabClick = (index: number) => {
    setProgress(0);
    progressRef.current = 0;
    setActiveFeature(index);
  };

  const showSkeleton = shouldLoad && isLoading;

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
            description="Watch how Zush transforms your file organization workflow with these powerful features"
          />
        </motion.div>
        
        <motion.div
          className={styles.Videos__VideoWrapper}
          ref={videoWrapperRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {!shouldLoad && (
            <img
              src={FEATURES[activeFeature].poster}
              alt='Video preview'
              className={styles.Videos__Poster}
              loading='lazy'
              decoding='async'
            />
          )}
          {showSkeleton && <div className={styles.Videos__Skeleton} />}
          <AnimatePresence mode="wait">
            {shouldLoad && (
              <motion.video
                key={FEATURES[activeFeature].video}
                ref={videoRef}
                className={styles.Videos__Video}
                src={FEATURES[activeFeature].video}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                muted
                playsInline
                autoPlay={allowAutoplay}
                controls={!allowAutoplay}
                preload='metadata'
                poster={FEATURES[activeFeature].poster}
                onLoadStart={handleLoadStart}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={handleCanPlay}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.Videos__Tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            {FEATURES.map((feature, index) => (
                <button
                    key={feature.id}
                    className={`${styles.Videos__Tab} ${
                        index === activeFeature ? styles.Videos__Tab_active : ''
                    }`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`Switch to ${feature.title}`}
                >
                    <span>{feature.title}</span>
                    {index === activeFeature && (
                        <div 
                            className={styles.Videos__Progress} 
                            style={{ transform: `scaleX(${progress})` }}
                        />
                    )}
                </button>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Videos;
