import type { ChangeEvent } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  visibility: string;
  onVisibilityChange: (value: string) => void;
  language: string | null;
  onLanguageChange: (value: string | null) => void;
  availableLanguages: string[];
  sortBy: string;
  onSortChange: (value: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const FilterBar = ({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
  language,
  onLanguageChange,
  availableLanguages,
  sortBy,
  onSortChange,
  onSelectAll,
  onDeselectAll,
}: FilterBarProps) => {
  const handleVisibilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onVisibilityChange(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value || null);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <Card>
      <div className="space-y-4">
        <Input
          value={search}
          onChange={onSearchChange}
          placeholder="Search repositories..."
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={visibility}
            onChange={handleVisibilityChange}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public Only</option>
            <option value="private">Private Only</option>
          </select>

          <select
            value={language || ''}
            onChange={handleLanguageChange}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Languages</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="activity">Recently Active</option>
            <option value="name">Name (A-Z)</option>
            <option value="stars">Most Stars</option>
          </select>

          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" size="sm" onClick={onSelectAll}>
              Select All
            </Button>
            <Button variant="ghost" size="sm" onClick={onDeselectAll}>
              Deselect All
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
