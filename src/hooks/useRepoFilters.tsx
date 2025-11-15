import { useState, useCallback } from 'react';
import type {
  GitRepo,
  RepoFilters,
  RepoSortBy,
  RepoVisibility,
} from '../types/git-provider';

export const useRepoFilters = () => {
  const [filters, setFilters] = useState<RepoFilters>({
    search: '',
    visibility: 'all',
    language: null,
    sortBy: 'updated',
    sortOrder: 'desc',
    archived: null,
    fork: null,
  });

  const getLanguages = useCallback((repos: GitRepo[]): string[] => {
    const languages = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });
    return Array.from(languages).sort();
  }, []);

  const filterRepos = useCallback((repos: GitRepo[]): GitRepo[] => {
    let filtered = [...repos];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(search) ||
          repo.description?.toLowerCase().includes(search) ||
          repo.fullName.toLowerCase().includes(search)
      );
    }

    if (filters.visibility !== 'all') {
      filtered = filtered.filter((repo) =>
        filters.visibility === 'public' ? !repo.isPrivate : repo.isPrivate
      );
    }

    if (filters.language) {
      filtered = filtered.filter((repo) => repo.language === filters.language);
    }

    if (filters.archived !== null) {
      filtered = filtered.filter((repo) => repo.isArchived === filters.archived);
    }

    if (filters.fork !== null) {
      filtered = filtered.filter((repo) => repo.isFork === filters.fork);
    }

    return filtered;
  }, [filters]);

  const sortRepos = useCallback((repos: GitRepo[]): GitRepo[] => {
    const sorted = [...repos];
    const { sortBy, sortOrder } = filters;

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'stars':
          comparison = a.starsCount - b.starsCount;
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'activity':
          comparison =
            new Date(a.lastActivityAt).getTime() - new Date(b.lastActivityAt).getTime();
          break;
        case 'updated':
        default:
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [filters]);

  const applyFilters = useCallback((repos: GitRepo[]): GitRepo[] => {
    const filtered = filterRepos(repos);
    return sortRepos(filtered);
  }, [filterRepos, sortRepos]);

  const setSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const setVisibility = useCallback((visibility: RepoVisibility) => {
    setFilters((prev) => ({ ...prev, visibility }));
  }, []);

  const setLanguage = useCallback((language: string | null) => {
    setFilters((prev) => ({ ...prev, language }));
  }, []);

  const setSort = useCallback((sortBy: RepoSortBy, sortOrder: 'asc' | 'desc' = 'desc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  }, []);

  const setArchived = useCallback((archived: boolean | null) => {
    setFilters((prev) => ({ ...prev, archived }));
  }, []);

  const setFork = useCallback((fork: boolean | null) => {
    setFilters((prev) => ({ ...prev, fork }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      visibility: 'all',
      language: null,
      sortBy: 'updated',
      sortOrder: 'desc',
      archived: null,
      fork: null,
    });
  }, []);

  return {
    filters,
    getLanguages,
    filterRepos,
    sortRepos,
    applyFilters,
    setSearch,
    setVisibility,
    setLanguage,
    setSort,
    setArchived,
    setFork,
    resetFilters,
  };
};
