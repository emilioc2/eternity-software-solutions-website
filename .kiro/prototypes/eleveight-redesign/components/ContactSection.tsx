import type { ContactSettings } from '../lib/sanity/types';
import { ContactForm } from './ContactForm';
import { WhatsAppButton } from './WhatsAppButton';

interface ContactSectionProps {
  settings: ContactSettings;
}

const INFO_ROWS = [
  {
    label: 'EMAIL',
    value: 'eternitysoftwaresolutions.16@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: 'LOCATION',
    value: 'Cape Town, South Africa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'RESPONSE TIME',
    value: 'Within 24 hours',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export function ContactSection({ settings }: ContactSectionProps) {
  const phoneIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );

  const dynamicRows = [
    ...INFO_ROWS,
    {
      label: 'PHONE / WHATSAPP',
      value: settings.whatsappNumber,
      icon: phoneIcon,
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="section-divider mb-32" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 animate-on-scroll">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column — info + WhatsApp */}
          <div>
            <p className="text-xs font-mono text-accent mb-4 tracking-widest uppercase">
              Contact
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Let&apos;s work together.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-12">
              Prefer a direct conversation? Reach out through any of the channels below. We&apos;re always happy to chat about your ideas.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {dynamicRows.map((row) => (
                <div key={row.label} className="flex items-center gap-4 group">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-200">
                    {row.icon}
                  </span>
                  <div>
                    <p className="text-xs font-mono text-text-muted/60 tracking-widest uppercase">{row.label}</p>
                    <p className="text-text-primary font-medium">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <WhatsAppButton phoneNumber={settings.whatsappNumber} />
          </div>

          {/* Right column — form */}
          <div className="bg-surface rounded-2xl border border-border p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
