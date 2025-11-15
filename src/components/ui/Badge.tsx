import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'public' | 'private' | 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const Badge = ({ variant = 'default', className = '', icon, children }: BadgeProps) => {
  const variantClasses = {
    public: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    private: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${variantClasses} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
};
