import type { GitRepo } from '../../types/git-provider';
import { useMemo } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Alert } from './Alert';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  repos: GitRepo[];
  mode?: 'delete' | 'archive';
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal = ({
  isOpen,
  repos,
  mode = 'delete',
  loading = false,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const count = repos.length;

  const title = useMemo(
    () => (mode === 'delete' ? 'Delete Repositories?' : 'Archive Repositories?'),
    [mode]
  );

  const confirmText = useMemo(
    () => (mode === 'delete' ? 'Yes, Delete Forever' : 'Yes, Archive Now'),
    [mode]
  );

  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              You are about to permanently {mode}{' '}
              <strong className="text-slate-900 dark:text-white">
                {count} {count === 1 ? 'repository' : 'repositories'}
              </strong>
              .{mode === 'delete' && ' This action cannot be undone.'}
            </p>

            <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
              <ul className="space-y-2 text-sm">
                {repos.map((repo) => (
                  <li
                    key={repo.id}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                  >
                    <svg
                      className="w-4 h-4 text-red-500 flex-shrink-0"
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
                    <span className="font-mono truncate">{repo.fullName}</span>
                  </li>
                ))}
              </ul>
            </div>

            {mode === 'delete' && (
              <Alert variant="error" title="Warning">
                <p className="text-red-800 dark:text-red-200">
                  This will permanently delete all code, issues, pull requests, and commit
                  history.
                </p>
              </Alert>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>
          {loading ? 'Processing...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};
