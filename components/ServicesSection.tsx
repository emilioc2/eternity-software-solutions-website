'use client';

import { useStagger } from '@/lib/useStagger';
import type { Service } from '@/lib/sanity/types';

interface ServicesSectionProps {
  services: Service[];
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'Web Development': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" />
    </svg>
  ),
  'Custom Software': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  'UI/UX Design': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  'Technical Consulting': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-6 h-6">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export function ServicesSection({ services }: ServicesSectionProps) {
  const gridRef = useStagger();
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Section divider */}
      <div className="section-divider mb-32" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 animate-on-scroll">
        <div className="text-center mb-20">
          <p className="text-xs font-mono text-accent mb-4 tracking-widest uppercase">Services</p>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Everything you need to bring your idea to life.
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Built to last. Designed to scale.
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {services.map((service) => (
            <div
              key={service._id}
              data-testid="service-card"
              className="group relative bg-surface rounded-2xl border border-border p-8 card-hover hover:border-border-hover overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-background transition-all duration-200">
                  {SERVICE_ICONS[service.title] ?? DEFAULT_ICON}
                </div>
                <h3 className="font-sans text-xl font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
