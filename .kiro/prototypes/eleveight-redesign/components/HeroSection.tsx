'use client';

import Image from 'next/image';

const TECH_STACK = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Node.js',
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232, 86, 42, 0.08), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono text-text-muted">
              Now accepting projects
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-sans text-5xl sm:text-6xl lg:text-8xl font-bold text-text-primary leading-[1.05] tracking-tight mb-8">
            Building websites &amp; software for{' '}
            <span className="text-gradient">immersive digital</span>{' '}
            experiences.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed mb-12">
            We design, build &amp; ship modern digital products that shape the future of your business. No tech headaches, no mystery buttons.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-8 py-3.5 text-base font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              Start a project
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center text-text-muted hover:text-text-primary font-medium px-4 py-3.5 transition-colors duration-200 link-underline"
            >
              View Services
            </a>
          </div>

          {/* Hero image */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border">
            <Image
              src="/hero-illustration.png"
              alt="Developer workspace with code editor and UI components"
              width={960}
              height={540}
              priority
              className="w-full h-auto"
            />
            {/* Gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Tech stack marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap" aria-label="Technologies we use">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-sm font-mono text-text-muted/50 border border-border px-4 py-2 rounded-full flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
