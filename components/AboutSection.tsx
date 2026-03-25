import Image from 'next/image';

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-background py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-text-primary mb-6">
              About Us
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                We&apos;re a small, focused software team that believes great digital products don&apos;t have to be complicated. We work closely with our clients — from early ideas to finished products — keeping things clear, honest, and straightforward throughout.
              </p>
              <p>
                Our approach is simple: understand what you actually need, build it well, and make sure it lasts. No unnecessary complexity, no bloated processes — just clean, reliable work delivered on time.
              </p>
              <p>
                We&apos;re remote-first and work with clients around the world. Whether you&apos;re a startup finding your footing or an established business ready to modernise, we&apos;re here to help you build something that works — today and well into the future.
              </p>
            </div>
          </div>

          {/* About illustration */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/about_illustration.png"
              alt="Team collaborating on software projects"
              width={520}
              height={520}
              className="w-full max-w-sm lg:max-w-md rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
