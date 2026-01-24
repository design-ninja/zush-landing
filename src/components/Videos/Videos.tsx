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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
        setIsLoading(true);
        // Reset and play when active feature changes
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => {
            console.log('Autoplay prevented:', e);
        });
        setProgress(0);
    }
  }, [activeFeature]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
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

  return (
    <section className={styles.Videos}>
      <div className={styles.Videos__Container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
             {isLoading && (
                <div className={styles.Videos__Skeleton} />
             )}
             <AnimatePresence mode="wait">
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
                    autoPlay
                    onLoadStart={handleLoadStart}
                    onCanPlay={handleCanPlay}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                />
             </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.Videos__Tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
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
