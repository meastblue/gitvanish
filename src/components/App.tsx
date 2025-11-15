import { useState, useMemo } from 'react';
import { Hero } from '../sections/Hero';
import { Testimonial } from '../sections/Testimonial';
import { DemoSection } from '../sections/DemoSection';
import { Features } from '../sections/Features';
import { CTA } from '../sections/CTA';
import { GetStarted } from '../sections/GetStarted';
import { Footer } from '../sections/Footer';
import { ProviderSelector } from './ui/ProviderSelector';
import { StatsBar } from './ui/StatsBar';
import { FilterBar } from './ui/FilterBar';
import { RepoGrid } from './ui/RepoGrid';
import { FloatingActionBar } from './ui/FloatingActionBar';
import { DeleteConfirmModal } from './ui/DeleteConfirmModal';
import { ProgressToast } from './ui/ProgressToast';
import { useGit } from '../hooks/useGit';
import { useRepoFilters } from '../hooks/useRepoFilters';
import type { GitProvider } from '../types/git-provider';

export const App = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState<'delete' | 'archive'>('delete');
  const [showResults, setShowResults] = useState(false);

  const git = useGit();

  const repoFilters = useRepoFilters();

  const filteredRepos = useMemo(() => {
    return repoFilters.applyFilters(git.repos);
  }, [git.repos, repoFilters.filters]);

  const availableLanguages = useMemo(() => {
    return repoFilters.getLanguages(git.repos);
  }, [git.repos]);

  const totalRepos = git.repos.length;
  const publicRepos = git.repos.filter((r) => !r.isPrivate).length;
  const privateRepos = git.repos.filter((r) => r.isPrivate).length;
  const selectedCount = git.selectedRepos.size;

  const handleProviderChange = (provider: GitProvider) => {
    git.setProvider(provider);
  };

  const handleTokenSubmit = async (token: string) => {
    git.initWithToken(token);
    const isValid = await git.validateToken();

    if (isValid) {
      await git.fetchRepos();
      setShowResults(true);
    }
  };

  const handleGetStarted = () => {
    const section = document.getElementById('get-started');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleArchive = () => {
    setDeleteMode('archive');
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setDeleteMode('delete');
    setShowDeleteModal(true);
  };

  const handleConfirm = async () => {
    const selectedIds = Array.from(git.selectedRepos);

    if (deleteMode === 'delete') {
      await git.deleteRepos(selectedIds);
    } else {
      await git.archiveRepos(selectedIds);
    }

    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />

      <Testimonial />

      <DemoSection />

      <Features />

      <CTA onGetStarted={handleGetStarted} />

      <GetStarted
        provider={git.currentProvider}
        onProviderChange={handleProviderChange}
        onSubmit={handleTokenSubmit}
        loading={git.loading}
        error={git.error}
      >
        {showResults && git.user && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <StatsBar
              total={totalRepos}
              publicCount={publicRepos}
              privateCount={privateRepos}
              selectedCount={selectedCount}
            />

            <FilterBar
              search={repoFilters.filters.search}
              onSearchChange={repoFilters.setSearch}
              visibility={repoFilters.filters.visibility}
              onVisibilityChange={repoFilters.setVisibility}
              language={repoFilters.filters.language}
              onLanguageChange={repoFilters.setLanguage}
              availableLanguages={availableLanguages}
              sortBy={repoFilters.filters.sortBy}
              onSortChange={repoFilters.setSort}
            />

            <RepoGrid
              repos={filteredRepos}
              selectedRepos={git.selectedRepos}
              onToggleRepo={git.toggleRepo}
              onSelectAll={() => git.selectAll(filteredRepos.map((r) => r.id))}
              onDeselectAll={git.deselectAll}
            />
          </div>
        )}
      </GetStarted>

      <Footer />

      {selectedCount > 0 && (
        <FloatingActionBar
          selectedCount={selectedCount}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirm}
        repos={git.repos.filter((r) => git.selectedRepos.has(r.id))}
        mode={deleteMode}
        loading={false}
      />

      {git.deleteProgress && (
        <ProgressToast
          progress={git.deleteProgress}
          onClose={() => git.logout()}
        />
      )}
    </div>
  );
};
