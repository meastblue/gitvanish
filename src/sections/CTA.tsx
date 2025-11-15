interface CTAProps {
  onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 relative overflow-hidden z-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
          Time to Marie Kondo Your Repos?
        </h2>
        <p className="text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
          Join developers who already decluttered their GitHub
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-3 px-12 py-6 bg-white text-teal-600 text-lg font-bold rounded-full shadow-2xl shadow-black/30 hover:shadow-black/50 transform hover:scale-105 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Start Now - It's Free
        </button>
      </div>
    </section>
  );
}
