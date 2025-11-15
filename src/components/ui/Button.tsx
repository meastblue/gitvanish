import type { ReactNode, MouseEvent } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  children,
  onClick,
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];

  const spinnerSize = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 focus:ring-teal-500',
    danger:
      'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 focus:ring-red-500',
    ghost:
      'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500',
    secondary:
      'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:ring-slate-500',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses} ${variantClasses} ${
        disabled || loading ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
      onClick={onClick}
    >
      {loading ? <Spinner size={spinnerSize} /> : icon}
      {children}
    </button>
  );
};
