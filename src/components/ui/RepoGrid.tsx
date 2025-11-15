import type { GitRepo } from '../../types/git-provider';
import { Card } from './Card';
import { RepoCard } from './RepoCard';

interface RepoGridProps {
  repos: GitRepo[];
  selectedRepos: Set<number | string>;
  onToggleRepo: (id: number | string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const RepoGrid = ({
  repos,
  selectedRepos,
  onToggleRepo,
  onSelectAll,
  onDeselectAll,
}: RepoGridProps) => {
  if (repos.length === 0) {
    return (
      <Card padding="lg" className="text-center py-12">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No repositories found
        </h3>
        <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or load your repositories</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          selected={selectedRepos.has(repo.id)}
          onToggle={onToggleRepo}
        />
      ))}
    </div>
  );
};
