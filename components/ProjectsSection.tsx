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
    <section id="projects" className="relative bg-background py-20 overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-accent/70 mb-2">// 02</p>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-text-primary">
            Our Work
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {projects.map((project) => {
            const CardWrapper = project.url ? 'a' : 'div';
            const linkProps = project.url
              ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Visit ${project.title}` }
              : {};

            return (
              <CardWrapper
                key={project._id}
                data-testid="project-card"
                className={`group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col${project.url ? ' cursor-pointer hover:border-accent' : ''}`}
                {...linkProps}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={project.previewImage?.asset?.url ?? '/default_project.png'}
                    alt={project.previewImage?.alt ?? project.title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {project.tag && (
                    <span className="inline-block bg-accent-subtle text-accent text-xs font-mono px-3 py-1 rounded-full mb-4 self-start">
                      {project.tag}
                    </span>
                  )}
                  <h3 className="font-sans text-xl font-bold text-text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{project.description}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
