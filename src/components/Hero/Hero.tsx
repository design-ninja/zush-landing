import { motion } from 'framer-motion';
import FileShowcase from '../FileShowcase';
import Button from '../Button';
import styles from './Hero.module.scss';

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
  </svg>
);

const Hero = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.Hero__Container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.Hero__Title}>
            Stop Naming Images.{' '}
            <span className={styles.Hero__TitleAccent}>Let AI Do It.</span>
          </h1>
          <p className={styles.Hero__Subtitle}>
            Zush watches your folders and gives every image a meaningful name — automatically. 
            Find any photo in seconds, not minutes.
          </p>
          
          <div className={styles.Hero__Buttons}>
            <Button 
              as="a" 
              href="https://zushapp.com/releases/Zush.dmg" 
              variant="black"
              size="lg"
            >
              <AppleIcon />
              Download for Free
            </Button>
            <Button as="a" href="#pricing" variant="primary" size="lg">
              Buy 🌟 PRO
            </Button>
          </div>
        </motion.div>

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
