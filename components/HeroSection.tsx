'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ParticleCanvas } from './ParticleCanvas';

const TRUST_BADGES = [
  'Unbeatable quality',
  'Reasonable pricing',
  'Fast delivery',
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay — if it works, show the video; otherwise keep the static image
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false));
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-[10%] w-64 h-64 bg-accent/[0.04] rounded-full blur-3xl orb-1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-[15%] w-80 h-80 bg-accent/[0.03] rounded-full blur-3xl orb-2 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-[60%] left-[50%] w-48 h-48 bg-accent/[0.05] rounded-full blur-3xl orb-3 pointer-events-none"
        aria-hidden="true"
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Background video/image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Static fallback image — always present */}
        <Image
          src="/hero-illustration.jpg"
          alt=""
          fill
          className={`object-cover opacity-40 transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-40'}`}
          priority
        />
        {/* Video — hidden until autoplay succeeds */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-40' : 'opacity-0'}`}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays to blend into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-text-primary leading-[1.05] tracking-tight mb-8">
            <span className="text-shimmer">You dream it.</span>{' '}
            We build it. No tech headaches, no mystery buttons.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed mb-12">
            We design and build modern digital products: websites, apps, dashboards, and tools.
            Crafted to feel effortless today and stay reliable long into the future.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="btn-pulse inline-flex items-center gap-2 bg-accent text-background rounded-full px-8 py-3.5 text-base font-medium hover:bg-accent-hover transition-colors duration-200 shadow-lg shadow-accent/20"
            >
              Start a project
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center text-text-muted hover:text-text-primary font-medium px-4 py-3.5 transition-colors duration-200 link-underline"
            >
              View Services
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
            aria-label="Key benefits"
          >
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="text-xs text-text-muted/60 border border-border rounded-full px-4 py-1.5 pill-glow"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <a
          href="#what-we-do"
          className="flex flex-col items-center gap-2 text-text-muted/40 hover:text-accent/60 transition-colors duration-200"
          aria-label="Scroll to next section"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
