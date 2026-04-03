import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import Text from '@/components/Text';
import { DEMO_VIDEOS } from '@/data/demoVideos';
import styles from './Videos.module.scss';
import { motion } from 'framer-motion';

interface VideosProps {
  autoplayOnHydration?: boolean;
}

const Videos = ({ autoplayOnHydration = false }: VideosProps) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeVideo = DEMO_VIDEOS[activeFeature];

  useEffect(() => {
    if (autoplayOnHydration) {
      setIsPlaying(true);
    }
  }, [autoplayOnHydration]);

  useEffect(() => {
    setIsPlaying(autoplayOnHydration);
  }, [activeFeature, autoplayOnHydration]);

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
            description="Watch how Zush transforms your file organization workflow with these powerful features"
          />
        </motion.div>
        
        <motion.div
          className={styles.Videos__VideoWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {!isPlaying ? (
            <button
              type='button'
              className={styles.Videos__PlayButton}
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${activeVideo.title} demo video`}
            >
              <img
                src={activeVideo.poster}
                alt={`${activeVideo.title} demo`}
                className={styles.Videos__Poster}
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
              key={activeVideo.video}
              className={styles.Videos__Video}
              src={activeVideo.video}
              aria-label={`${activeVideo.title}: ${activeVideo.description}`}
              muted
              playsInline
              autoPlay
              controls
              preload='metadata'
              poster={activeVideo.poster}
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
        <Text as='p' className={styles.Videos__Description}>{activeVideo.description}</Text>

        <motion.div
          className={styles.Videos__Tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            {DEMO_VIDEOS.map((feature, index) => (
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
