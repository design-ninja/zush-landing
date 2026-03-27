import type { ReactNode } from 'react';
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
  description: ReactNode;
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
  <div
    className={`${styles.UseCaseCard} ${styles[`UseCaseCard_${color}`]}`}
    style={{ transitionDelay: `${delay}s` }}
  >
    <div className={styles.UseCaseCard__IconWrapper}>
      <Icon size={24} />
    </div>
    <Heading as='h3' className={styles.UseCaseCard__Title}>
      {title}
    </Heading>
    <Text className={styles.UseCaseCard__Description}>{description}</Text>
  </div>
);

const UseCases = () => {
  const useCases: Omit<UseCaseCardProps, 'delay'>[] = [
    {
      icon: Palette,
      title: 'Designers',
      description: (
        <>
          Stop digging through <strong>hundreds of screenshots</strong> for that
          one reference. Find any mockup, UI element, or inspiration in{' '}
          <strong>seconds</strong>.
        </>
      ),
      color: 'purple',
    },
    {
      icon: Camera,
      title: 'Photographers',
      description: (
        <>
          Organize <strong>massive photo libraries</strong> effortlessly.
          Supports <strong>pro RAW formats</strong> like CR2, NEF, ARW, DNG, RAF,
          RW2, and more.
        </>
      ),
      color: 'blue',
    },
    {
      icon: Megaphone,
      title: 'Marketers & SMM',
      description: (
        <>
          Keep <strong>campaign decks, content calendars, and assets</strong>{' '}
          organized. Quickly find the <strong>right file</strong> for any campaign or report.
        </>
      ),
      color: 'orange',
    },
    {
      icon: Code,
      title: 'Developers',
      description: (
        <>
          Screenshots for docs, bug reports, and PR reviews —{' '}
          <strong>always organized</strong> and easy to find.
        </>
      ),
      color: 'green',
    },
    {
      icon: Video,
      title: 'Content Creators',
      description: (
        <>
          Thumbnails, b-roll references, and visual assets for your content —{' '}
          <strong>all neatly organized</strong>.
        </>
      ),
      color: 'pink',
    },
    {
      icon: Briefcase,
      title: 'Product Managers',
      description: (
        <>
          PRDs, meeting notes, spreadsheets, and stakeholder decks —{' '}
          <strong>instantly searchable</strong>.
        </>
      ),
      color: 'cyan',
    },
  ];

  return (
    <section id='use-cases' className={styles.UseCases}>
      <div className={styles.UseCases__Container}>
        <SectionHeader
          title='Who Uses AI File Renaming'
          description='From designers to developers — Zush saves hours for everyone who works with files'
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
