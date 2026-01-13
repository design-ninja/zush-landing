import { motion } from 'framer-motion';
import {
  Palette,
  Camera,
  Megaphone,
  Code,
  Video,
  Briefcase,
  LucideIcon,
} from 'lucide-react';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import styles from './UseCases.module.scss';

type CardColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'cyan';

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: CardColor;
  delay?: number;
}

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}: UseCaseCardProps) => (
  <motion.div
    className={`${styles.UseCaseCard} ${styles[`UseCaseCard_${color}`]}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.UseCaseCard__IconWrapper}>
      <Icon size={24} />
    </div>
    <Heading as='h3' className={styles.UseCaseCard__Title}>
      {title}
    </Heading>
    <Text className={styles.UseCaseCard__Description}>{description}</Text>
  </motion.div>
);

const UseCases = () => {
  const useCases: Omit<UseCaseCardProps, 'delay'>[] = [
    {
      icon: Palette,
      title: 'Designers',
      description:
        'Stop digging through hundreds of screenshots for that one reference. Find any mockup, UI element, or inspiration in seconds.',
      color: 'purple',
    },
    {
      icon: Camera,
      title: 'Photographers',
      description:
        'Organize massive photo libraries effortlessly. No more IMG_XXXX chaos — every shot gets a meaningful name.',
      color: 'blue',
    },
    {
      icon: Megaphone,
      title: 'Marketers & SMM',
      description:
        'Keep social media assets organized. Quickly find the right visual for any campaign or report.',
      color: 'orange',
    },
    {
      icon: Code,
      title: 'Developers',
      description:
        'Screenshots for docs, bug reports, and PR reviews — always organized and easy to find.',
      color: 'green',
    },
    {
      icon: Video,
      title: 'Content Creators',
      description:
        'Thumbnails, b-roll references, and visual assets for your content — all neatly organized.',
      color: 'pink',
    },
    {
      icon: Briefcase,
      title: 'Product Managers',
      description:
        'Screenshots for specs, presentations, and stakeholder updates — instantly searchable.',
      color: 'cyan',
    },
  ];

  return (
    <section id='use-cases' className={styles.UseCases}>
      <div className={styles.UseCases__Container}>
        <SectionHeader
          title='Built for Professionals'
          description='From designers to developers — Zush saves hours for everyone who works with images'
        />

        <div className={styles.UseCases__Grid}>
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
