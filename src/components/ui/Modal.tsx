import type { ReactNode } from 'react';
import { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  children?: ReactNode;
}

export const Modal = ({
  open,
  onClose,
  size = 'md',
  closeOnBackdrop = true,
  children,
}: ModalProps) => {
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: 'sm:max-w-sm sm:w-full',
      md: 'sm:max-w-lg sm:w-full',
      lg: 'sm:max-w-2xl sm:w-full',
      xl: 'sm:max-w-4xl sm:w-full',
    };
    return sizes[size];
  }, [size]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
        onClick={handleBackdropClick}
      />

      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 relative z-[10000]">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white dark:bg-slate-900 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle border border-slate-200 dark:border-slate-800 relative ${sizeClasses}`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
