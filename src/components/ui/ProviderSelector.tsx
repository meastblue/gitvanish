import type { GitProvider } from '../../types/git-provider';
import { Button } from './Button';

interface ProviderSelectorProps {
  value: GitProvider;
  onChange: (provider: GitProvider) => void;
}

export const ProviderSelector = ({ value, onChange }: ProviderSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Button
        variant={value === 'github' ? 'primary' : 'secondary'}
        size="lg"
        className={value === 'github' ? 'scale-105' : ''}
        onClick={() => onChange('github')}
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        GitHub
        {value === 'github' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </Button>

      <Button
        variant={value === 'gitlab' ? 'primary' : 'secondary'}
        size="lg"
        className={value === 'gitlab' ? 'scale-105' : ''}
        onClick={() => onChange('gitlab')}
        icon={
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.6004 9.5927L23.5004 9.2627L20.1304 0.2427C20.0304 -0.0073 19.8504 -0.0773 19.6304 0.0427C19.4304 0.1427 19.2604 0.3427 19.2004 0.5927L17.1504 7.3627H6.8404L4.7904 0.5927C4.7404 0.3427 4.5604 0.1427 4.3604 0.0427C4.1404 -0.0773 3.9604 -0.0073 3.8604 0.2427L0.4904 9.2627L0.3904 9.5927C-0.1596 11.1227 0.2904 12.8527 1.5204 13.8527L11.9904 21.9727L22.4604 13.8527C23.6904 12.8527 24.1504 11.1227 23.6004 9.5927Z" />
          </svg>
        }
      >
        GitLab
        {value === 'gitlab' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </Button>
    </div>
  );
};
