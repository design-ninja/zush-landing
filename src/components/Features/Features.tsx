import { motion } from 'framer-motion';
import { Zap, Tag, FolderSync, LucideIcon } from 'lucide-react';
import styles from './Features.module.scss';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={styles.FeatureCard}
  >
    <div className={styles.FeatureCard__Icon}>
      <Icon size={28} />
    </div>
    <h3 className={styles.FeatureCard__Title}>{title}</h3>
    <p className={styles.FeatureCard__Description}>{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Meaningful File Names",
      description: "No more IMG_8374.jpg. Zush looks at your image and creates a clear, descriptive name. See what's in the photo without opening it.",
      delay: 0.1
    },
    {
      icon: Tag,
      title: "Find Photos with Spotlight",
      description: "Zush adds tags and descriptions to every file. Just type \"cat on the couch\" in Spotlight — and find your photo in seconds.",
      delay: 0.2
    },
    {
      icon: FolderSync,
      title: "Works in the Background",
      description: "Point Zush to a folder — that's it. It watches for new images and processes them automatically. No manual work needed.",
      delay: 0.3
    }
  ];

  return (
    <section id="features" className={styles.Features}>
      <div className={styles.Features__Container}>
        <h2 className={styles.Features__Title}>
          Organize your images{' '}
          <span className={styles.Features__TitleAccent}>effortlessly</span>
        </h2>
        <p className={styles.Features__Subtitle}>
          Zush automatically renames your screenshots and photos so you can find what you need, fast
        </p>
        
        <div className={styles.Features__Grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
