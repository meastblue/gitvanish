import { Button } from '../components/ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-sm font-medium text-teal-400">Free & Open Source</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
              Git<span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">Vanish</span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed">
              <span className="font-bold text-teal-400">Bulk delete</span> your old repos in{' '}
              <span className="font-bold text-cyan-400">one click</span>. Clean workspace, clear mind.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transform hover:scale-105 transition-all border-0"
                onClick={onGetStarted}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                View on GitHub
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300">No Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-slate-300">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-slate-300">Lightning Fast</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>

              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                >
                  <defs>
                    <linearGradient id="trashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#6b7aa1', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#8b9dc3', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect
                    x="60"
                    y="80"
                    width="80"
                    height="100"
                    rx="8"
                    fill="url(#trashGradient)"
                    stroke="#2D3748"
                    strokeWidth="3"
                  />
                  <ellipse cx="100" cy="75" rx="50" ry="12" fill="#A0AEC0" stroke="#2D3748" strokeWidth="3" />
                  <path d="M 80 75 Q 80 60 100 60 Q 120 60 120 75" fill="none" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                  <line x1="75" y1="90" x2="75" y2="170" stroke="#4A5A7F" strokeWidth="3" strokeLinecap="round" />
                  <line x1="100" y1="90" x2="100" y2="170" stroke="#4A5A7F" strokeWidth="3" strokeLinecap="round" />
                  <line x1="125" y1="90" x2="125" y2="170" stroke="#4A5A7F" strokeWidth="3" strokeLinecap="round" />
                  <ellipse
                    cx="50"
                    cy="140"
                    rx="20"
                    ry="15"
                    fill="#ffffff"
                    opacity="0.1"
                    className="animate-bounce"
                    style={{ animationDuration: '3s' }}
                  />
                  <ellipse
                    cx="150"
                    cy="140"
                    rx="20"
                    ry="15"
                    fill="#ffffff"
                    opacity="0.1"
                    className="animate-bounce"
                    style={{ animationDuration: '3s', animationDelay: '1s' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
