import type { ReactNode, MouseEvent } from 'react';
import { useMemo } from 'react';

interface CardProps {
  hover?: boolean;
  padding?: boolean | 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Card = ({
  hover = false,
  padding = true,
  className = '',
  children,
  onClick,
}: CardProps) => {
  const paddingClasses = useMemo(() => {
    if (!padding) return '';
    if (padding === 'sm') return 'p-4';
    if (padding === 'lg') return 'p-8';
    return 'p-6';
  }, [padding]);

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 ${
        hover
          ? 'hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer'
          : ''
      } ${paddingClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
