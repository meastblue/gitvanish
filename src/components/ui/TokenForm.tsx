import type { GitProvider } from '../../types/git-provider';
import { useState, useMemo } from 'react';
import { Input } from './Input';
import { Alert } from './Alert';
import { Button } from './Button';
import { Spinner } from './Spinner';

interface TokenFormProps {
  provider: GitProvider;
  tokenUrl: string;
  requiredScopes: string;
  loading?: boolean;
  error?: string | null;
  loadingMessage?: string;
  onSubmit: (token: string) => void;
}

export const TokenForm = ({
  provider,
  tokenUrl,
  requiredScopes,
  loading = false,
  error = null,
  loadingMessage = '',
  onSubmit,
}: TokenFormProps) => {
  const [tokenInput, setTokenInput] = useState('');
  const [showToken, setShowToken] = useState(false);

  const providerName = useMemo(
    () => (provider === 'github' ? 'GitHub' : 'GitLab'),
    [provider]
  );

  const placeholder = useMemo(
    () =>
      provider === 'github'
        ? 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        : 'glpat-xxxxxxxxxxxxxxxxxxxx',
    [provider]
  );

  const handleSubmit = () => {
    if (tokenInput.trim()) {
      onSubmit(tokenInput.trim());
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-black text-white">1</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get a Personal Access Token from {providerName}
            </h3>
            <ol className="space-y-2 text-slate-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <span>Click the button below to visit {providerName}.com in a new window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <span>
                  The token name "<strong className="text-white">gitvanish</strong>" and required
                  scopes are pre-configured.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <span>
                  Click{' '}
                  <strong className="text-white">
                    {provider === 'github' ? 'Generate token' : 'Create personal access token'}
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">4.</span>
                <span>Copy the generated token and paste it below.</span>
              </li>
            </ol>
            <a
              href={tokenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Get my token
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-black text-white">2</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Select repositories to modify
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Please enter your Personal Access Token
                </label>
                <Input
                  value={tokenInput}
                  onChange={setTokenInput}
                  type={showToken ? 'text' : 'password'}
                  placeholder={placeholder}
                  disabled={loading}
                  required
                  className="bg-slate-800/50 border-slate-700"
                  action={
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="text-slate-400 hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {!showToken ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  }
                />
              </div>

              {error ? (
                <Alert variant="error">
                  <p className="text-sm text-red-200">
                    <strong>Error:</strong> {error}
                  </p>
                </Alert>
              ) : (
                <Alert variant="info">
                  {loading && loadingMessage ? (
                    <div className="flex items-center gap-3">
                      <Spinner size="sm" />
                      <p className="text-sm text-blue-200">
                        <strong>{loadingMessage}</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-blue-200">
                      <strong>Note:</strong> Tokens are not saved. For security, you should delete
                      the token after use.
                    </p>
                  )}
                </Alert>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!tokenInput.trim() || loading}
                loading={loading}
                size="lg"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500"
              >
                {loadingMessage || (loading ? 'Loading...' : 'Continue')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
