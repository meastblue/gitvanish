import { useMemo } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

export interface Progress {
  completed: number;
  total: number;
  current?: string;
  failed?: number;
}

interface ProgressToastProps {
  progress: Progress | null;
  onClose: () => void;
}

export const ProgressToast = ({ progress, onClose }: ProgressToastProps) => {
  const isComplete = useMemo(() => {
    if (!progress) return false;
    return progress.completed >= progress.total && !progress.current;
  }, [progress]);

  if (!progress) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 transition-all duration-300 transform translate-x-0 opacity-100">
      <Card
        padding
        className={`w-80 shadow-2xl border-2 transition-all duration-300 ${
          isComplete
            ? 'border-green-400 dark:border-green-600 scale-105'
            : 'border-teal-200 dark:border-teal-800'
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 dark:text-white">
                {isComplete ? 'Completed!' : 'Processing...'}
              </span>
              {isComplete && (
                <svg
                  className="w-5 h-5 text-green-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isComplete ? 'success' : 'default'}>
                {progress.completed}/{progress.total}
              </Badge>
              {isComplete && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-4 h-4 text-slate-600 dark:text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isComplete
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500'
              }`}
              style={{
                width: `${(progress.completed / progress.total) * 100}%`,
              }}
            ></div>
          </div>
          {progress.current && (
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              Current: {progress.current}
            </p>
          )}
          {isComplete && progress.failed && progress.failed > 0 ? (
            <p className="text-xs text-red-600 dark:text-red-400">
              {progress.failed} failed
            </p>
          ) : (
            isComplete && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                All repositories processed successfully!
              </p>
            )
          )}
        </div>
      </Card>
    </div>
  );
};
