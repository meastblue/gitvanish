import { useMemo, type ReactNode } from 'react';
import type { GitProvider } from '../types/git-provider';
import { getProviderConfig } from '../services';
import { ProviderSelector } from '../components/ui/ProviderSelector';
import { TokenForm } from '../components/ui/TokenForm';

interface GetStartedProps {
  provider: GitProvider;
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
  showResults?: boolean;
  onProviderChange: (provider: GitProvider) => void;
  onSubmit: (token: string) => void;
  children?: ReactNode;
}

export function GetStarted({
  provider,
  loading,
  error,
  loadingMessage,
  showResults = false,
  onProviderChange,
  onSubmit,
  children,
}: GetStartedProps) {
  const config = useMemo(() => getProviderConfig(provider), [provider]);

  return (
    <section
      id="get-started"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden transition-all duration-700 ease-in-out"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ease-in-out ${
          showResults ? 'max-w-7xl' : 'max-w-4xl'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Choose Your Platform</h2>
          <p className="text-xl text-slate-400">Select GitHub or GitLab to get started</p>
        </div>

        <ProviderSelector value={provider} onChange={onProviderChange} />

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 lg:p-12 shadow-2xl mb-12">
          <TokenForm
            provider={provider}
            tokenUrl={config.tokenUrl}
            requiredScopes={config.scopes.join(', ')}
            loading={loading}
            error={error}
            loadingMessage={loadingMessage}
            onSubmit={onSubmit}
          />
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ${
            showResults
              ? 'opacity-100 max-h-[5000px] ease-out'
              : 'opacity-0 max-h-0 ease-in'
          }`}
        >
          {showResults && <div className="mt-12">{children}</div>}
        </div>
      </div>
    </section>
  );
}
