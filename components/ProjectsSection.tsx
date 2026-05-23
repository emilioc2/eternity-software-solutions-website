'use client';

import Image from 'next/image';
import { useStagger } from '@/lib/useStagger';
import type { Project } from '@/lib/sanity/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const gridRef = useStagger();
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="section-divider mb-32" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 animate-on-scroll">
        <div className="mb-16">
          <div>
            <p className="text-xs font-mono text-accent mb-4 tracking-widest uppercase">Our work</p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Selected projects
            </h2>
            <p className="text-text-muted max-w-sm">
              A showcase of recent work we&apos;re proud of. Each project built with care and precision.
            </p>
          </div>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {projects.map((project) => {
            const CardWrapper = project.url ? 'a' : 'div';
            const linkProps = project.url
              ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Visit ${project.title}` }
              : {};

            return (
              <CardWrapper
                key={project._id}
                data-testid="project-card"
                className="group bg-surface rounded-2xl border border-border overflow-hidden card-hover hover:border-border-hover flex flex-col cursor-pointer"
                {...linkProps}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.previewImage?.asset?.url ?? '/default_project.png'}
                    alt={project.previewImage?.alt ?? project.title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-accent text-sm font-medium border border-accent/30 rounded-full px-4 py-2 bg-accent/10">
                      View project →
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {project.tag && (
                    <span className="inline-block text-accent text-xs font-mono mb-3">
                      {project.tag}
                    </span>
                  )}
                  <h3 className="font-sans text-lg font-semibold text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{project.description}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
