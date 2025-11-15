export function DemoSection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-teal-400">See It In Action</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Watch How Simple It Is</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            No complicated setup. Just three simple steps to clean up your repositories.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 bg-slate-950">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30 cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">Demo video coming soon</p>
                <p className="text-slate-500 text-sm mt-2">Watch a 60-second walkthrough</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-black text-white">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Get a Personal Access Token</h3>
                  <p className="text-slate-400 text-sm mb-4">From GitHub or GitLab</p>
                </div>
              </div>
              <ol className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold flex-shrink-0">1.</span>
                  <span className="text-sm">Click the button to visit GitHub/GitLab in a new window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold flex-shrink-0">2.</span>
                  <span className="text-sm">
                    Scroll to the bottom and click <strong className="text-white">Generate token</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold flex-shrink-0">3.</span>
                  <span className="text-sm">Copy the generated token and paste it below.</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-black text-white">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Select repositories to modify</h3>
                  <p className="text-slate-400 text-sm mb-4">Filter and choose what to delete</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Enter your token to load all repositories</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Use smart filters to find specific repos</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Click delete or archive. Done in seconds!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
