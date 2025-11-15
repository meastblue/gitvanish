import type { ReactNode, ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const Input = ({
  value,
  onChange,
  type = 'text',
  label,
  placeholder,
  hint,
  error,
  disabled = false,
  required = false,
  className = '',
  icon,
  action,
}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          className={`w-full py-3 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 transition-all ${
            icon ? 'pl-12' : 'pl-4'
          } ${action ? 'pr-12' : 'pr-4'} ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          } ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        />

        {action && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {action}
          </div>
        )}
      </div>

      {hint && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
