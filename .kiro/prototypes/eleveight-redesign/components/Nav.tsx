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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#hero" aria-label="Eternity Software Solutions home" className="flex items-center gap-3">
            <Image
              src="/logo_fav.png"
              alt="Eternity Software Solutions logo"
              width={32}
              height={32}
              priority
            />
            <span className="font-sans font-semibold text-text-primary text-sm tracking-tight">
              Eternity Software
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-text-muted hover:text-text-primary transition-colors duration-200 text-sm link-underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              Let&apos;s talk
            </a>
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 8h18M3 16h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <ul className="flex flex-col px-6 py-6 gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block py-3 text-text-muted hover:text-text-primary transition-colors duration-200 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-accent-hover transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
