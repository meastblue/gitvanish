import { Button } from './Button';

interface FloatingActionBarProps {
  selectedCount: number;
  onArchive: () => void;
  onDelete: () => void;
}

export const FloatingActionBar = ({
  selectedCount,
  onArchive,
  onDelete,
}: FloatingActionBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 shadow-2xl z-40 transition-all duration-300 transform translate-y-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
              <span className="font-bold text-teal-600 dark:text-teal-400">
                {selectedCount}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {selectedCount} {selectedCount === 1 ? 'repository' : 'repositories'} selected
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ready for bulk action
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onArchive}
              className="shadow-lg hover:shadow-xl"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              }
            >
              <span className="hidden sm:inline">Archive Selected</span>
              <span className="sm:hidden">Archive</span>
            </Button>
            <Button
              variant="danger"
              onClick={onDelete}
              className="shadow-lg hover:shadow-xl shadow-red-500/20"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              }
            >
              <span className="hidden sm:inline">Delete Selected</span>
              <span className="sm:hidden">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
