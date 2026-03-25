'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-surface-dark/40 border-white/5'
          : 'bg-surface-dark border-white/10 shadow-lg shadow-black/20'
      }`}
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-100 ease-out" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#hero" aria-label="Eternity Software Solutions home" className="flex items-center gap-3">
            <Image
              src="/logo_fav.png"
              alt="Eternity Software Solutions logo"
              width={36}
              height={36}
              priority
            />
            <span className="font-sans font-bold text-white text-sm sm:text-base leading-tight">
              Eternity Software Solutions
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium group"
                >
                  {label}
                  <svg
                    viewBox="0 0 60 8"
                    className="absolute -bottom-2 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,6 Q30,1 60,6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex bg-accent text-white rounded-full px-5 py-2 text-sm font-medium opacity-75 hover:opacity-100 transition-all duration-200"
            >
              Start a project
            </a>
            <button
              className="md:hidden p-2 rounded-lg bg-accent text-white hover:opacity-90 transition-all duration-200 shadow-sm"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-surface-dark">          <ul className="flex flex-col px-4 py-3 gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block py-2 text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block mt-2 bg-accent text-white rounded-full px-5 py-2 text-sm font-medium text-center opacity-75 hover:opacity-100 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Start a project
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
