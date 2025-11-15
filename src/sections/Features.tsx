export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-slate-800 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-teal-400">Why Choose GitVanish?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Made for Developers Who Value Their Time</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Stop manually deleting repos one by one. Let GitVanish handle the cleanup in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Insanely Fast</h3>
            <p className="text-slate-400 leading-relaxed">
              Select multiple repos, hit delete, and watch them vanish. What used to take hours now takes seconds.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Privacy First</h3>
            <p className="text-slate-400 leading-relaxed">
              Your token stays in your browser. Everything happens client-side. We can't see your repos even if we
              wanted to.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Filters</h3>
            <p className="text-slate-400 leading-relaxed">
              Filter by language, visibility, stars, and more. Find the repos you want to keep, delete the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
