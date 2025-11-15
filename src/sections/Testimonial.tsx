export function Testimonial() {
  const scrollToGetStarted = () => {
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-32 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Delete{' '}
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                100+ repos
              </span>{' '}
              in under 60 seconds
            </h2>
            <p className="text-2xl text-slate-400 mb-4">No setup, no registration, no credit card.</p>
            <p className="text-3xl font-bold text-white mb-10">Just paste your token and go!</p>
            <button
              onClick={scrollToGetStarted}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-lg font-bold rounded-full shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get started. It's free!
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1630514969818-94aefc42ec47?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="Developer celebrating success"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent"></div>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center lg:text-left">
              Image by{' '}
              <a
                href="https://unsplash.com/@startupstockphotos"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-teal-400 transition-colors"
              >
                StartupStockPhotos
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
