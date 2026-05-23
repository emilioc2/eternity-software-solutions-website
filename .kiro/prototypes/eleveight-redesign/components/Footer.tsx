import Image from 'next/image';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'Web Development',
  'Custom Software',
  'UI/UX Design',
  'Technical Consulting',
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo_fav.png"
                alt="Eternity Software Services logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="font-sans font-semibold text-text-primary text-sm">
                Eternity Software
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Remote-first, available globally. Building digital products that last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono text-text-muted/60 uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono text-text-muted/60 uppercase tracking-widest mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-text-muted">{service}</li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-xs font-mono text-text-muted/60 uppercase tracking-widest mb-5">Get in Touch</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-text-muted/50">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                eternitysoftwaresolutions.16@gmail.com
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-text-muted/50">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +27 82 523 5838
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-text-muted/50">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Cape Town, South Africa
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted/50">
            &copy; {year} Eternity Software Services. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-text-muted/50 hover:text-text-muted transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-xs text-text-muted/50 hover:text-text-muted transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
