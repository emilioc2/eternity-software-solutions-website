'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '#hero', section: 'hero' },
  { label: 'What We Do', href: '#what-we-do', section: 'what-we-do' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = navLinks
      .map(({ section }) => document.getElementById(section))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#hero" aria-label="Eternity Software Solutions home" className="flex items-center gap-3">
            <Image
              src="/new_logo.png"
              alt="Eternity Software Solutions logo"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
            <span className="font-sans font-medium text-text-primary text-sm tracking-tight">
              Eternity Software Solutions
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ label, href, section }) => (
              <li key={href}>
                <a
                  href={href}
                  data-section={section}
                  className={`text-sm transition-colors duration-200 link-underline ${
                    activeSection === section
                      ? 'nav-link-active text-accent'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-background rounded-full px-6 py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors duration-200"
            >
              Let&apos;s talk
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-text-primary hover:text-accent transition-colors duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col px-6 py-4 gap-1" role="list">
            {navLinks.map(({ label, href, section }) => (
              <li key={href}>
                <a
                  href={href}
                  data-section={section}
                  className={`block py-3 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section
                      ? 'text-accent'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block mt-3 bg-accent text-background rounded-full px-6 py-2.5 text-sm font-medium text-center hover:bg-accent-hover transition-colors duration-200"
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
