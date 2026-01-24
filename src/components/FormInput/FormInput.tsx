import { InputHTMLAttributes } from 'react';
import styles from './FormInput.module.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = ({ className, ...props }: FormInputProps) => {
  return (
    <input
      className={`${styles.FormInput} ${className || ''}`}
      {...props}
    />
  );
};

export default FormInput;
