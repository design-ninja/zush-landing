import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react';
import { Link, LinkProps } from 'react-router-dom';
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
    to?: never;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
    to?: never;
  };

type ButtonAsRouterLink = BaseProps &
  LinkProps & {
    as: typeof Link;
    to: string;
    href?: never;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRouterLink;

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

  if (props.as === 'a') {
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
      <a
        className={classNames}
        aria-disabled={isLoading || undefined}
        tabIndex={isLoading ? -1 : tabIndex}
        onClick={handleClick}
        {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  if (props.as === Link) {
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
      <Link
        className={classNames}
        aria-disabled={isLoading || undefined}
        tabIndex={isLoading ? -1 : tabIndex}
        onClick={handleClick}
        {...linkProps as LinkProps}
      >
        {children}
      </Link>
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
