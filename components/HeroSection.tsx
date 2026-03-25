'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const TECH_STACK = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Node.js',
];

const TRUST_BADGES = [
  'Unbeatable quality',
  'Reasonable pricing',
  'Fast delivery',
];

const HEADLINE = 'We build it. No tech headaches, no mystery buttons.';

export function HeroSection() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(HEADLINE.slice(0, i));
      if (i >= HEADLINE.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Parallax blobs on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${y * 0.15}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${y * -0.1}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-surface-dark overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(192,82,42,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Parallax blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Copy */}
          <div className="flex-1 max-w-2xl">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-mono px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              // now_accepting_projects_2026
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              <span className="relative inline-block text-accent">
                You dream it.
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-3 left-0 w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,10 Q100,2 200,10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>{' '}
              <span className={done ? '' : 'typing-cursor'}>{displayed}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-10 leading-relaxed">
              We design and build modern digital products: websites, apps, dashboards, and tools. Crafted to feel effortless today and stay reliable long into the future.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center bg-accent text-white rounded-full px-8 py-3 text-base font-medium opacity-90 hover:opacity-100 transition-all duration-200"
              >
                Start a project
              </a>
              <a
                href="#services"
                className="inline-flex items-center text-white/70 font-medium px-2 py-3 hover:text-white transition-all duration-200"
              >
                View Services →
              </a>
            </div>

            {/* Trust badges */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Key benefits">
              {TRUST_BADGES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/50 font-mono">
                  <svg
                    className="w-4 h-4 text-accent flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="8" fill="rgba(192,82,42,0.15)" />
                    <path
                      d="M4.5 8l2.5 2.5 4.5-4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: illustration + terminal */}
          <div className="flex-1 flex flex-col gap-4 justify-center lg:justify-end">
            <Image
              src="/hero-illustration.png"
              alt="Developer workspace with code editor and UI components"
              width={560}
              height={560}
              priority
              className="w-full max-w-md lg:max-w-lg rounded-2xl"
            />

            {/* Fake terminal block */}
            <div className="w-full max-w-md lg:max-w-lg bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs backdrop-blur-sm">
              <div className="flex gap-1.5 mb-3" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <p className="text-white/40">$ npx create-next-app@latest my-project</p>
              <p className="text-green-400/80 mt-1">✔ TypeScript? <span className="text-white/60">Yes</span></p>
              <p className="text-green-400/80">✔ Tailwind CSS? <span className="text-white/60">Yes</span></p>
              <p className="text-green-400/80">✔ App Router? <span className="text-white/60">Yes</span></p>
              <p className="text-accent mt-2">▶ Ready. Let&apos;s build something great.</p>
            </div>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs font-mono text-white/30 mb-4 text-center">// built_with</p>
          <ul className="flex flex-wrap justify-center gap-3" aria-label="Technologies we use">
            {TECH_STACK.map((tech) => (
              <li
                key={tech}
                className="text-xs font-mono text-white/50 border border-white/10 px-3 py-1.5 rounded-md hover:border-accent/40 hover:text-white/80 transition-all duration-200"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
