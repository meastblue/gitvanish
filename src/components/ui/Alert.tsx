import type { ReactNode } from 'react';
import { useMemo } from 'react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
  children?: ReactNode;
}

export const Alert = ({
  variant = 'info',
  title,
  className = '',
  children,
}: AlertProps) => {
  const variantClasses = useMemo(() => {
    const variants = {
      success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-500',
      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-500',
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-500',
    };
    return variants[variant];
  }, [variant]);

  const titleClasses = useMemo(() => {
    const base = 'font-semibold mb-1';
    const variants = {
      success: `${base} text-green-900 dark:text-green-100`,
      warning: `${base} text-amber-900 dark:text-amber-100`,
      error: `${base} text-red-900 dark:text-red-100`,
      info: `${base} text-blue-900 dark:text-blue-100`,
    };
    return variants[variant];
  }, [variant]);

  const getIcon = () => {
    if (variant === 'success') {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    }
    if (variant === 'warning') {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      );
    }
    if (variant === 'error') {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    }
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    );
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border-2 rounded-xl ${variantClasses} ${className}`}
    >
      <svg
        className="w-6 h-6 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {getIcon()}
      </svg>

      <div className="flex-1 text-sm">
        {title && <p className={titleClasses}>{title}</p>}
        {children}
      </div>
    </div>
  );
};
