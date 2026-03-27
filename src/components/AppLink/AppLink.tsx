import { isValidElement, type AnchorHTMLAttributes, type ReactNode } from 'react';
import styles from './AppLink.module.scss';

type AppLinkVariant = 'inherit' | 'legal';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  children?: ReactNode;
  className?: string;
  href: string;
  variant?: AppLinkVariant;
}

const isExternalHref = (href: string) => /^(https?:\/\/|mailto:|tel:)/i.test(href);

const extractTextFromChildren = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextFromChildren).join(' ');
  if (isValidElement(node)) {
    if (node.type === 'img') {
      const alt = (node.props as { alt?: string }).alt;
      return alt ? String(alt) : '';
    }
    const children = (node.props as { children?: ReactNode }).children;
    return extractTextFromChildren(children);
  }
  return '';
};

const AppLink = ({ children, className = '', href, rel, target, variant = 'inherit', ...props }: AppLinkProps) => {
  const classes = [styles.AppLink, styles[`AppLink_${variant}`], className].filter(Boolean).join(' ');
  const isExternal = isExternalHref(href);
  const safeRel = target === '_blank'
    ? rel ?? (isExternal ? 'noopener noreferrer' : undefined)
    : rel;
  const providedAriaLabel = props['aria-label'];
  const providedTitle = props.title;
  const linkText = extractTextFromChildren(children).replace(/\s+/g, ' ').trim();
  const fallbackLabel = linkText || (isExternal ? `Open ${href}` : `Open ${href || 'link'}`);
  const safeAriaLabel = providedAriaLabel ?? (providedTitle ? undefined : fallbackLabel);

  return (
    <a
      {...props}
      className={classes}
      href={href}
      aria-label={safeAriaLabel}
      rel={safeRel}
      target={target}
    >
      {children}
    </a>
  );
};

export default AppLink;
