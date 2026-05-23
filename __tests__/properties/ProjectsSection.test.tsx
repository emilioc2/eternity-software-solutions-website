// Feature: eternity-software-website, Property 6: Data Integrity — projects output remains data-driven

import { describe, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProjectsSection } from '../../components/ProjectsSection';
import type { Project } from '../../lib/sanity/types';

const projectArb = fc.record<Project>({
  _id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  tag: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
});

describe('Property 6: Data Integrity — projects output remains data-driven', () => {
  it('renders exactly as many cards as projects passed in', () => {
    fc.assert(
      fc.property(fc.array(projectArb, { minLength: 0, maxLength: 10 }), (projects) => {
        const { container } = render(<ProjectsSection projects={projects} />);
        const cards = container.querySelectorAll('[data-testid="project-card"]');
        cleanup();
        return cards.length === projects.length;
      }),
      { numRuns: 50 }
    );
  });

  it('renders each project title and description unchanged', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container } = render(<ProjectsSection projects={[project]} />);
        const card = container.querySelector('[data-testid="project-card"]');
        const titleEl = card?.querySelector('h3');
        const descEl = card?.querySelector('p');
        const titleMatch = titleEl?.textContent === project.title;
        const descMatch = descEl?.textContent === project.description;
        cleanup();
        return titleMatch && descMatch;
      }),
      { numRuns: 50 }
    );
  });

  it('each card has card-hover class and hover overlay with "View project →"', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container } = render(<ProjectsSection projects={[project]} />);
        const card = container.querySelector('[data-testid="project-card"]');
        const hasCardHover = card?.className.includes('card-hover') ?? false;
        const hasOverlayText = card?.textContent?.includes('View project →') ?? false;
        cleanup();
        return hasCardHover && hasOverlayText;
      }),
      { numRuns: 50 }
    );
  });

  it('renders images with aspect-[4/3] class', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container } = render(<ProjectsSection projects={[project]} />);
        const card = container.querySelector('[data-testid="project-card"]');
        const imageContainer = card?.querySelector('.aspect-\\[4\\/3\\]');
        cleanup();
        return imageContainer !== null;
      }),
      { numRuns: 50 }
    );
  });
});
