import Image from 'next/image';

export function CtaBanner() {
  return (
    <section className="py-32">
      <div className="section-divider mb-32" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-border animate-on-scroll">
          {/* Background image */}
          <Image
            src="/cta-bg.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-background/70" aria-hidden="true" />

          {/* Content */}
          <div className="relative px-8 sm:px-16 py-24 text-center">
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Ready to build something<br className="hidden sm:block" /> amazing?
            </h2>
            <p className="text-text-muted text-lg max-w-lg mx-auto mb-10">
              Let&apos;s discuss your project and turn your vision into a powerful digital solution.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-background rounded-full px-8 py-3.5 font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              Start a Project
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
