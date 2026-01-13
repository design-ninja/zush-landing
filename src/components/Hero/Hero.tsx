import { useState } from 'react';
import { motion } from 'framer-motion';
import FileShowcase from '../FileShowcase';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import AppleIcon from '../AppleIcon';
import MobileDownloadModal from '../MobileDownloadModal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Hero.module.scss';

const Hero = () => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      window.open(DOWNLOAD_URL, '_blank');
    }
  };

  return (
    <section className={styles.Hero}>
      <div className={styles.Hero__Container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as='h1' className={styles.Hero__Title}>
            Stop Naming Images.{' '}
            <span className={styles.Hero__TitleAccent}>Let AI Do It.</span>
          </Heading>
          <Text size='xl' color='subtle' className={styles.Hero__Subtitle}>
            Zush gives your files meaningful AI-powered names — automatically.
            Find any photo in seconds, not minutes.
          </Text>

          <div className={styles.Hero__Buttons}>
            <Button variant='black' size='lg' onClick={handleDownloadClick}>
              <AppleIcon />
              Download for Free
            </Button>
            <Button as='a' href='#pro' variant='primary' size='lg'>
              Buy 🌟 PRO
            </Button>
          </div>
        </motion.div>

        <MobileDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.Hero__ShowcaseWrapper}
        >
          <FileShowcase />
          <div className={styles.Hero__GlowEffect} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
