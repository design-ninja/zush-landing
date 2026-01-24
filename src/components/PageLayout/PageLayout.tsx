import { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PageLayout = ({ children, maxWidth = 'md', className }: PageLayoutProps) => {
  return (
    <section className={`${styles.PageLayout} ${className || ''}`}>
      <div className={`${styles.PageLayout__Container} ${styles[`PageLayout__Container--${maxWidth}`]}`}>
        {children}
      </div>
    </section>
  );
};

export default PageLayout;
