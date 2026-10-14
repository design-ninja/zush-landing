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
  /** Forwarded to the heading, for anchors and aria-labelledby. */
  id?: string;
}

const SectionHeader = ({
  title,
  titleHtml,
  description,
  level = 'h2',
  size,
  className = '',
  id,
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.SectionHeader} ${className}`}>
      <Heading as={level} id={id} size={size} align="center" className={styles.SectionHeader__Title}>
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
