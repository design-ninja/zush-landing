import { ReactNode } from 'react';
import Heading from '../Heading';
import Text from '../Text';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title?: ReactNode;
  titleHtml?: string;
  description?: string;
  level?: 'h1' | 'h2' | 'h3';
  size?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

const SectionHeader = ({
  title,
  titleHtml,
  description,
  level = 'h2',
  size,
  className = ''
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.SectionHeader} ${className}`}>
      <Heading as={level} size={size} align="center" className={styles.SectionHeader__Title}>
        {titleHtml ? <span dangerouslySetInnerHTML={{ __html: titleHtml }} /> : title}
      </Heading>
      {description && (
        <Text as="p" size="lg" color="subtle" align="center" className={styles.SectionHeader__Description}>
          {description}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
