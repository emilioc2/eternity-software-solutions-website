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
  return (
    <section id="services" className="relative bg-background py-20 overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-accent opacity-[0.07] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="text-center mb-14">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
            Our Services
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Everything you need to bring your idea to life — built to last.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              data-testid="service-card"
              className="relative bg-surface rounded-2xl border border-border p-7 hover:shadow-lg hover:border-accent/30 transition-all duration-200 group overflow-hidden"
            >
              {/* Subtle top-left accent line on hover */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[3px] bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-hidden="true"
              />
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-subtle text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-200">
                {SERVICE_ICONS[service.title] ?? DEFAULT_ICON}
              </div>
              <h3 className="font-sans text-xl font-bold text-text-primary mt-4 mb-2">
                {service.title}
              </h3>
              <p className="text-text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
