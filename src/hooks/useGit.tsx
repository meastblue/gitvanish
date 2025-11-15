import { useState, useCallback } from 'react';
import type {
  GitProvider,
  GitRepo,
  GitUser,
  RateLimit,
  DeleteProgress,
} from '../types/git-provider';
import { getProvider, getProviderConfig } from '../services';

export const useGit = () => {
  const [currentProvider, setCurrentProvider] = useState<GitProvider>('github');
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<GitUser | null>(null);
  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Set<number | string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [deleteProgress, setDeleteProgress] = useState<DeleteProgress | null>(null);

  const setProvider = useCallback((provider: GitProvider) => {
    setCurrentProvider(provider);
    setRepos([]);
    setSelectedRepos(new Set());
    setError(null);
  }, []);

  const getConfig = useCallback(() => {
    return getProviderConfig(currentProvider);
  }, [currentProvider]);

  const initWithToken = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const validateToken = useCallback(async (): Promise<boolean> => {
    if (!token) {
      setError('Please provide a valid token');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = getProvider(currentProvider);
      const userData = await provider.validateToken(token);
      setUser(userData);

      const limitData = await provider.getRateLimit(token);
      if (limitData) {
        setRateLimit(limitData);
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Invalid token or insufficient permissions');
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, currentProvider]);

  const fetchRepos = useCallback(async () => {
    if (!token) {
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);
    setRepos([]);

    try {
      const provider = getProvider(currentProvider);
      const fetchedRepos = await provider.fetchAllRepos(token);
      setRepos(fetchedRepos);

      const limitData = await provider.getRateLimit(token);
      if (limitData) {
        setRateLimit(limitData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  }, [token, currentProvider]);

  const deleteRepos = useCallback(async (repoIds: (number | string)[]): Promise<void> => {
    if (!token) {
      setError('Not authenticated');
      return;
    }

    const provider = getProvider(currentProvider);
    const reposToDelete = repos.filter((r) => repoIds.includes(r.id));

    setDeleteProgress({
      total: reposToDelete.length,
      completed: 0,
      failed: 0,
      current: undefined,
      errors: [],
    });

    for (const repo of reposToDelete) {
      setDeleteProgress((prev) => prev ? { ...prev, current: repo.fullName } : null);

      try {
        await provider.deleteRepo(token, repo);
        setDeleteProgress((prev) => prev ? { ...prev, completed: prev.completed + 1 } : null);

        setRepos((prevRepos) => prevRepos.filter((r) => r.id !== repo.id));
        setSelectedRepos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(repo.id);
          return newSet;
        });
      } catch (err: any) {
        setDeleteProgress((prev) =>
          prev
            ? {
                ...prev,
                failed: prev.failed + 1,
                errors: [
                  ...prev.errors,
                  {
                    repo: repo.fullName,
                    error: err.message || 'Unknown error',
                  },
                ],
              }
            : null
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    setDeleteProgress((prev) => prev ? { ...prev, current: undefined } : null);

    const limitData = await provider.getRateLimit(token);
    if (limitData) {
      setRateLimit(limitData);
    }
  }, [token, currentProvider, repos]);

  const archiveRepos = useCallback(async (repoIds: (number | string)[]): Promise<void> => {
    if (!token) {
      setError('Not authenticated');
      return;
    }

    const provider = getProvider(currentProvider);
    const reposToArchive = repos.filter((r) => repoIds.includes(r.id));

    setDeleteProgress({
      total: reposToArchive.length,
      completed: 0,
      failed: 0,
      current: undefined,
      errors: [],
    });

    for (const repo of reposToArchive) {
      setDeleteProgress((prev) => prev ? { ...prev, current: repo.fullName } : null);

      try {
        await provider.archiveRepo(token, repo);
        setDeleteProgress((prev) => prev ? { ...prev, completed: prev.completed + 1 } : null);

        setRepos((prevRepos) =>
          prevRepos.map((r) => (r.id === repo.id ? { ...r, isArchived: true } : r))
        );
      } catch (err: any) {
        setDeleteProgress((prev) =>
          prev
            ? {
                ...prev,
                failed: prev.failed + 1,
                errors: [
                  ...prev.errors,
                  {
                    repo: repo.fullName,
                    error: err.message || 'Unknown error',
                  },
                ],
              }
            : null
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    setDeleteProgress((prev) => prev ? { ...prev, current: undefined } : null);

    const limitData = await provider.getRateLimit(token);
    if (limitData) {
      setRateLimit(limitData);
    }
  }, [token, currentProvider, repos]);

  const toggleRepo = useCallback((id: number | string) => {
    setSelectedRepos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((repoIds: (number | string)[]) => {
    setSelectedRepos(new Set(repoIds));
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedRepos(new Set());
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
    setRepos([]);
    setSelectedRepos(new Set());
    setError(null);
    setRateLimit(null);
    setDeleteProgress(null);
  }, []);

  return {
    currentProvider,
    token,
    user,
    repos,
    selectedRepos,
    loading,
    error,
    rateLimit,
    deleteProgress,
    setProvider,
    getConfig,
    initWithToken,
    validateToken,
    fetchRepos,
    deleteRepos,
    archiveRepos,
    toggleRepo,
    selectAll,
    deselectAll,
    logout,
  };
};
