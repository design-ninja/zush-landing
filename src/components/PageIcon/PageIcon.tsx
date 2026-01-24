import { ReactNode } from 'react';
import styles from './PageIcon.module.scss';

interface PageIconProps {
  children: ReactNode;
  variant?: 'primary' | 'error';
  animated?: boolean;
  className?: string;
}

const PageIcon = ({ children, variant = 'primary', animated = false, className }: PageIconProps) => {
  const classNames = [
    styles.PageIcon,
    styles[`PageIcon--${variant}`],
    animated ? styles['PageIcon--animated'] : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
};

export default PageIcon;
