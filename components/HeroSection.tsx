import Image from 'next/image';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-subtle opacity-40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Copy */}
          <div className="flex-1 max-w-2xl">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
              <span className="relative inline-block text-accent opacity-75">
                You dream it.
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-3 left-0 w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,10 Q100,2 200,10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>{' '}
              We build it. No tech headaches, no mystery buttons.
            </h1>
            <p className="text-lg sm:text-xl text-text-muted mb-10 leading-relaxed">
              We design and build modern digital products — websites, apps, dashboards, and tools — crafted to feel effortless today and stay reliable long into the future.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center bg-accent text-white rounded-full px-8 py-3 text-base font-medium opacity-75 hover:opacity-100 transition-all duration-200"
              >
                Start a project
              </a>
              <a
                href="#services"
                className="inline-flex items-center text-accent opacity-75 font-medium px-2 py-3 hover:opacity-100 transition-all duration-200"
              >
                View Services →
              </a>
            </div>

            {/* Trust badges */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Key benefits">
              {['Unbeatable quality', 'Reasonable pricing', 'Fast delivery'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                  <svg
                    className="w-4 h-4 text-accent flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="8" className="fill-accent-subtle" />
                    <path
                      d="M4.5 8l2.5 2.5 4.5-4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Image
              src="/hero-illustration.png"
              alt="Developer workspace with code editor and UI components"
              width={560}
              height={560}
              priority
              className="w-full max-w-md lg:max-w-lg rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
