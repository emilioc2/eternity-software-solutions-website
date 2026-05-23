interface Capability {
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    title: 'Web Development',
    description:
      'We build websites that are fast, clean, and easy to manage. Designed to grow with your business.',
  },
  {
    title: 'Custom Software & Tools',
    description:
      'We create custom software and tools tailored to how your business actually works.',
  },
  {
    title: 'UI/UX Design',
    description:
      'We design interfaces that feel intuitive from the first click. No learning curve required.',
  },
  {
    title: 'Technical Consulting',
    description:
      'We help you make smart technical decisions early, so you avoid costly mistakes later.',
  },
  {
    title: 'Remote Delivery',
    description:
      'We work remotely with clients worldwide, delivering reliable results without the overhead.',
  },
];

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="relative py-32 overflow-hidden">
      <div className="section-divider mb-32" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left panel — 4 columns */}
          <div className="lg:col-span-4">
            <p className="text-xs font-mono text-accent mb-4 tracking-widest uppercase">
              What we do
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              A small team with a wide range of capabilities, all focused on
              building things that last.
            </h2>
          </div>

          {/* Right panel — 8 columns */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {capabilities.map((item, index) => (
                <div
                  key={index}
                  className={`group flex items-start gap-6 py-8 hover:pl-2 transition-all duration-300${index < capabilities.length - 1 ? ' border-b border-border' : ''}`}
                >
                  <span
                    className="text-xs font-mono text-accent/40 mt-1 flex-shrink-0 w-8"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
