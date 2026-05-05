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
import AppLink from '../AppLink';
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
  href?: string;
}

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  color,
  href,
}: UseCaseCardProps) => {
  const className = [
    styles.UseCaseCard,
    styles[`UseCaseCard_${color}`],
    href ? styles.UseCaseCard_linked : '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <div className={styles.UseCaseCard__IconWrapper}>
        <Icon size={24} />
      </div>
      <Heading as='h3' className={styles.UseCaseCard__Title}>
        {title}
      </Heading>
      <Text className={styles.UseCaseCard__Description}>{description}</Text>
    </>
  );

  if (href) {
    return (
      <AppLink
        href={href}
        className={className}
      >
        {content}
      </AppLink>
    );
  }

  return (
    <div
      className={className}
    >
      {content}
    </div>
  );
};

export interface UseCaseData {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  color: CardColor;
  href?: string;
}

const defaultUseCases: UseCaseData[] = [
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
    href: '/rename-screenshots-with-ai',
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
    href: '/rename-photos-with-ai',
  },
  {
    icon: Megaphone,
    title: 'Marketers & SMM',
    description: (
      <>
        Keep <strong>campaign decks, exports, screenshots, and assets</strong>{' '}
        organized. Quickly find the <strong>right file</strong> for any campaign or report.
      </>
    ),
    color: 'orange',
    href: '/',
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
    href: '/rename-screenshots-with-ai',
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
    href: '/',
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
    href: '/rename-documents-with-ai',
  },
];

interface UseCasesProps {
  title?: string;
  description?: string;
  items?: UseCaseData[];
  copy?: {
    items: Array<{ title: string; description: string }>;
  };
}

const UseCases = ({ title, description, items, copy }: UseCasesProps = {}) => {
  const useCases = items ?? defaultUseCases.map((item, index) => ({
    ...item,
    title: copy?.items[index]?.title ?? item.title,
    description: copy?.items[index]?.description ?? item.description,
  }));

  return (
    <section id='use-cases' className={styles.UseCases}>
      <div className={styles.UseCases__Container}>
        <SectionHeader
          title={title ?? 'Who Uses AI File Renaming'}
          description={description ?? 'Click the role closest to your workflow. Each card goes to the Zush page built for that type of file chaos.'}
        />

        <div className={styles.UseCases__Grid}>
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
