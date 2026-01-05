import { ReactNode, HTMLAttributes } from 'react';
import styles from './Text.module.scss';

type TextTag = 'span' | 'div' | 'label' | 'p';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextColor = 'base' | 'subtle';
type TextAlign = 'left' | 'center' | 'right';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextTag;
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
  children: ReactNode;
  className?: string;
}

const Text = ({ 
  as: Tag = 'p',
  size = 'md',
  color = 'base',
  align,
  children, 
  className = '',
  ...props 
}: TextProps) => {
  const classNames = [
    styles.Text,
    styles[`Text_${size}`],
    styles[`Text_${color}`],
    align && styles[`Text_${align}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
