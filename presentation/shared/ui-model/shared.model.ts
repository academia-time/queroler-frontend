import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  dataTestId?: string;
  registerWithMaskConfig?: Partial<UseFormRegisterReturn>;
  showPasswordToggle?: boolean;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  dataTestId?: string;
};

export interface FieldErrorProps {
  message?: string;
  className?: string;
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  id: string;
  error?: boolean;
  className?: string;
}
