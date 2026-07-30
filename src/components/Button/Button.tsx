import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react';
import AppLink from '@/components/AppLink';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'black' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fluid?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type ButtonAsAppLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsAppLink;

const Button = ({ 
  variant = 'primary', 
  size = 'md',
  fluid = false,
  isLoading = false,
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  const classNames = [
    styles.Button,
    styles[`Button_${variant}`],
    styles[`Button_${size}`],
    fluid && styles.Button_fluid,
    isLoading && styles.Button_loading,
    className
  ].filter(Boolean).join(' ');

  if (props.as === 'a' || props.as === 'link') {
    const { as, onClick, tabIndex, ...linkProps } = props;
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (isLoading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };
    return (
      <AppLink
        className={classNames}
        aria-disabled={isLoading || undefined}
        tabIndex={isLoading ? -1 : tabIndex}
        onClick={handleClick}
        {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }}
      >
        {children}
      </AppLink>
    );
  }

  const { as, disabled, ...buttonProps } = props as ButtonAsButton;
  const isDisabled = isLoading || disabled;
  return (
    <button
      className={classNames}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
