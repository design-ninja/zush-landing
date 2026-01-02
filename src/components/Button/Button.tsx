import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'black' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fluid?: boolean;
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
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  const classNames = [
    styles.Button,
    styles[`Button_${variant}`],
    styles[`Button_${size}`],
    fluid && styles.Button_fluid,
    className
  ].filter(Boolean).join(' ');

  if (props.as === 'a') {
    const { as, ...linkProps } = props;
    return (
      <a className={classNames} {...linkProps as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  if (props.as === Link) {
    const { as, ...linkProps } = props;
    return (
      <Link className={classNames} {...linkProps as LinkProps}>
        {children}
      </Link>
    );
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classNames} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
