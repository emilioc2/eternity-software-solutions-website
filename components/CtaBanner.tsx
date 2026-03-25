export function CtaBanner() {
  return (
    <section className="bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-surface-dark rounded-2xl px-8 py-16 text-center overflow-hidden animate-on-scroll">
          {/* Gradient overlay — left accent to transparent */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
          {/* Decorative blob right */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-accent opacity-20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 relative">
            Ready to build something amazing?
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-8 relative">
            Let&apos;s discuss your project and turn your vision into a powerful digital solution.
          </p>
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 bg-accent text-white rounded-full px-8 py-3 font-medium hover:bg-accent-hover transition-colors duration-200"
          >
            Start a Project
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
