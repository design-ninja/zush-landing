import { ReactNode } from 'react';
import Heading from '../Heading';
import Text from '../Text';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  /** Short label above the title. */
  eyebrow?: string;
  title?: ReactNode;
  titleHtml?: string;
  /** Lead paragraph(s) under the title. */
  description?: string | string[];
  level?: 'h1' | 'h2' | 'h3';
  size?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  /** Forwarded to the heading, for anchors and aria-labelledby. */
  id?: string;
  /** Content sections read left-aligned; statement sections stay centred. */
  align?: 'center' | 'left';
}

const SectionHeader = ({
  eyebrow,
  title,
  titleHtml,
  description,
  level = 'h2',
  size,
  className = '',
  id,
  align = 'left',
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.SectionHeader} ${align === 'center' ? styles.SectionHeader_center : ''} ${className}`}>
      {eyebrow && <p className={styles.SectionHeader__Eyebrow}>{eyebrow}</p>}
      <Heading as={level} id={id} size={size} align={align} className={styles.SectionHeader__Title}>
        {titleHtml ? <span dangerouslySetInnerHTML={{ __html: titleHtml }} /> : title}
      </Heading>
      {[description ?? []].flat().filter(Boolean).map((paragraph) => (
        <Text key={paragraph} as="p" size="lg" color="subtle" align={align} className={styles.SectionHeader__Description}>
          {paragraph}
        </Text>
      ))}
    </div>
  );
};

export default SectionHeader;
