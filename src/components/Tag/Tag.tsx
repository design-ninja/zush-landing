import type { ReactNode } from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  children: ReactNode;
  /** Monospace token style, for field names and filename parts. */
  mono?: boolean;
  className?: string;
}

/**
 * A pill-shaped tag — the design system's canonical chip. Neutral by default;
 * pass `mono` for code-like tokens (field names, filename parts).
 */
const Tag = ({ children, mono = false, className = '' }: TagProps) => {
  const classes = [styles.Tag, mono ? styles.Tag_mono : '', className]
    .filter(Boolean)
    .join(' ');
  return <span className={classes}>{children}</span>;
};

export default Tag;
