import { ReactNode, HTMLAttributes } from 'react';
import styles from './Heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingAlign = 'left' | 'center' | 'right';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  align?: HeadingAlign;
  children: ReactNode;
  className?: string;
}

const Heading = ({ 
  as: Tag = 'h2',
  align,
  children, 
  className = '',
  ...props 
}: HeadingProps) => {
  const classNames = [
    styles.Heading,
    styles[`Heading_${Tag}`],
    align && styles[`Heading_${align}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
