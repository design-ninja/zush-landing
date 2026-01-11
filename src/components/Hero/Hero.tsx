import { motion } from 'framer-motion';
import FileShowcase from '../FileShowcase';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import AppleIcon from '../AppleIcon';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.Hero}>
      <div className={styles.Hero__Container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" className={styles.Hero__Title}>
            Stop Naming Images.{' '}
            <span className={styles.Hero__TitleAccent}>Let AI Do It.</span>
          </Heading>
          <Text size="xl" color="subtle" className={styles.Hero__Subtitle}>
            Zush watches your folders and gives every image a meaningful name — automatically. 
            Find any photo in seconds, not minutes.
          </Text>
          
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
            <Button as="a" href="#pro" variant="primary" size="lg">
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
