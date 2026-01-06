import { ReactNode } from 'react';
import Heading from '../Heading';
import Text from '../Text';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: ReactNode;
  description?: string;
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
}

const SectionHeader = ({ 
  title, 
  description, 
  level = 'h2',
  className = '' 
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.SectionHeader} ${className}`}>
      <Heading as={level} align="center" className={styles.SectionHeader__Title}>
        {title}
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
