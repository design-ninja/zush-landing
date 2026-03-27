import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './AppLink.module.scss';

type AppLinkVariant = 'inherit' | 'legal';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: AppLinkVariant;
}

const isExternalHref = (href: string) => /^(https?:\/\/|mailto:|tel:)/i.test(href);

const AppLink = ({ children, className = '', href, rel, target, variant = 'inherit', ...props }: AppLinkProps) => {
  const classes = [styles.AppLink, styles[`AppLink_${variant}`], className].filter(Boolean).join(' ');
  const isExternal = isExternalHref(href);
  const safeRel = target === '_blank'
    ? rel ?? (isExternal ? 'noopener noreferrer' : undefined)
    : rel;

  return (
    <a
      {...props}
      className={classes}
      href={href}
      rel={safeRel}
      target={target}
    >
      {children}
    </a>
  );
};

export default AppLink;
