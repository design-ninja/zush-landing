import { useState, useRef, useEffect } from 'react';
import SectionHeader from '../SectionHeader';
import styles from './Videos.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
  {
    id: 'batch-rename',
    title: 'Batch Rename',
    video: '/videos/zush-batch-rename.mp4',
  },
  {
    id: 'monitor',
    title: 'Folder Monitoring',
    video: '/videos/zush-monitor.mp4',
  },
  {
    id: 'tags',
    title: 'Smart Tags',
    video: '/videos/zush-tags.mp4',
  },
  {
    id: 'naming',
    title: 'Naming Patterns',
    video: '/videos/zush-naming-pattern.mp4',
  },
  {
    id: 'multilanguage',
    title: 'Multilanguage',
    video: '/videos/zush-multilanguage.mp4',
  },
];

const Videos = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allowAutoplay, setAllowAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const saveData = connection?.saveData;
    const effectiveType = connection?.effectiveType;
    const slowNetwork = effectiveType === 'slow-2g' || effectiveType === '2g';

    setAllowAutoplay(!prefersReducedMotion && !saveData && !slowNetwork);
  }, []);

  useEffect(() => {
    if (!videoWrapperRef.current) {
      setShouldLoad(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(videoWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && shouldLoad) {
      setIsLoading(true);
      // Reset and play when active feature changes
      videoRef.current.currentTime = 0;
      if (allowAutoplay) {
        videoRef.current.play().catch((e) => {
          console.log('Autoplay prevented:', e);
        });
      }
      setProgress(0);
    }
  }, [activeFeature, allowAutoplay, shouldLoad]);

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
        progressRef.current = (currentTime / duration) * 100;
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
    setActiveFeature(index);
  };

  const showSkeleton = !shouldLoad || isLoading;

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
                preload={allowAutoplay ? 'auto' : 'metadata'}
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
                            style={{ width: `${progress}%` }}
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
