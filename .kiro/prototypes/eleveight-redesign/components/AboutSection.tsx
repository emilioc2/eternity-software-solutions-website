import Image from 'next/image';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden"
    >
      <div className="section-divider mb-32" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 animate-on-scroll">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Image column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <Image
                src="/about_illustration.png"
                alt="Team collaborating on software projects"
                width={520}
                height={520}
                className="w-full h-auto"
              />
              {/* Subtle overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-xs font-mono text-accent mb-4 tracking-widest uppercase">
              About us
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-text-primary mb-8 leading-tight">
              A dedicated team born from a passion for clean, reliable software.
            </h2>
            <div className="space-y-5 text-text-muted leading-relaxed text-lg">
              <p>
                We&apos;re a small, focused software team that believes great digital products don&apos;t have to be complicated. We work closely with our clients, from early ideas to finished products, keeping things clear, honest, and straightforward throughout.
              </p>
              <p>
                Our approach is simple: understand what you actually need, build it well, and make sure it lasts. No unnecessary complexity, no bloated processes. Just clean, reliable work delivered on time.
              </p>
              <p>
                We&apos;re remote-first and work with clients around the world. Whether you&apos;re a startup finding your footing or an established business ready to modernise, we&apos;re here to help you build something that works today and well into the future.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-text-primary">14+</p>
                <p className="text-sm text-text-muted mt-1">Projects delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-text-primary">100%</p>
                <p className="text-sm text-text-muted mt-1">Client satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-text-primary">5+</p>
                <p className="text-sm text-text-muted mt-1">Years experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
