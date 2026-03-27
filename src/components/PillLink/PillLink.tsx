import type { AnchorHTMLAttributes, ReactNode } from 'react';
import AppLink from '@/components/AppLink';
import styles from './PillLink.module.scss';

type PillLinkSize = 'sm' | 'md';

interface PillLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  href: string;
  children: ReactNode;
  className?: string;
  size?: PillLinkSize;
  withArrow?: boolean;
}

const PillLink = ({
  href,
  children,
  className = '',
  size = 'md',
  withArrow = false,
  ...props
}: PillLinkProps) => {
  const classes = [
    styles.PillLink,
    styles[`PillLink_${size}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <AppLink href={href} className={classes} {...props}>
      <span>{children}</span>
      {withArrow && <span aria-hidden='true' className={styles.PillLink__Arrow}>→</span>}
    </AppLink>
  );
};

export default PillLink;
