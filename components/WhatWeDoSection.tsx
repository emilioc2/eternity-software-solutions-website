const capabilities = [
  'We build websites that are fast, clean, and easy to manage. Designed to grow with your business.',
  'We create custom software and tools tailored to how your business actually works.',
  'We design interfaces that feel intuitive from the first click. No learning curve required.',
  'We help you make smart technical decisions early, so you avoid costly mistakes later.',
  'We work remotely with clients worldwide, delivering reliable results without the overhead.',
];

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative bg-background py-20 overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="absolute -top-16 -right-16 w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="mb-12">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
            What We Do
          </h2>
          <p className="text-text-muted text-lg max-w-xl">
            A small team with a wide range of capabilities, all focused on building things that last.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {capabilities.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 hover:shadow-md hover:border-accent/30 transition-all duration-200${capabilities.length === 5 && index === 4 ? ' lg:col-start-2' : ''}`}
            >
              <span
                className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                aria-hidden="true"
              >
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-text-muted leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
