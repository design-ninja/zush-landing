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
  /** Content sections read left-aligned; statement sections stay centred. */
  align?: 'center' | 'left';
}

const SectionHeader = ({
  title,
  titleHtml,
  description,
  level = 'h2',
  size,
  className = '',
  id,
  align = 'center',
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.SectionHeader} ${align === 'left' ? styles.SectionHeader_left : ''} ${className}`}>
      <Heading as={level} id={id} size={size} align={align} className={styles.SectionHeader__Title}>
        {titleHtml ? <span dangerouslySetInnerHTML={{ __html: titleHtml }} /> : title}
      </Heading>
      {description && (
        <Text as="p" size="lg" color="subtle" align={align} className={styles.SectionHeader__Description}>
          {description}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
