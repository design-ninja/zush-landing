import type { ReactNode } from 'react';
import styles from './EdgeLabel.module.scss';

interface EdgeLabelProps {
  children: ReactNode;
  className?: string;
}

const EdgeLabel = ({ children, className }: EdgeLabelProps) => (
  <span className={[styles.EdgeLabel, className].filter(Boolean).join(' ')}>
    {children}
  </span>
);

export default EdgeLabel;
