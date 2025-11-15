import type { GitRepo } from '../../types/git-provider';
import type { ChangeEvent } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface RepoCardProps {
  repo: GitRepo;
  selected: boolean;
  onToggle: (id: number | string) => void;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  PHP: '#4F5D95',
  Ruby: '#701516',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Vue: '#41b883',
  React: '#61dafb',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Lua: '#000080',
  Perl: '#0298c3',
  Scala: '#c22d40',
  R: '#198ce7',
  'Objective-C': '#438eff',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  SQL: '#e38c00',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
};

export const RepoCard = ({ repo, selected, onToggle }: RepoCardProps) => {
  const getLanguageColor = (language: string): string => {
    return languageColors[language] || '#8b9dc3';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToggle(repo.id);
  };

  return (
    <Card hover={true} padding="sm" className="group">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={selected}
              onChange={handleCheckboxChange}
              className="mt-1 w-4 h-4 text-teal-600 bg-slate-100 border-slate-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
            />

            <div className="flex-1 min-w-0">
              <a
                href={repo.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 dark:text-white truncate block group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={repo.isPrivate ? 'private' : 'public'}
            className="ml-2 flex-shrink-0"
          >
            {repo.isPrivate ? 'Private' : 'Public'}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mb-3">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{repo.starsCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>{repo.forksCount}</span>
          </div>

          {repo.isArchived && (
            <Badge variant="warning" className="ml-auto">
              Archived
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Updated {formatDate(repo.updatedAt)}</span>
          <Badge variant="default" className="font-mono text-[10px]">
            {repo.provider}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
