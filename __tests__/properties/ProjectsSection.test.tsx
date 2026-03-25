// Feature: eternity-software-website, Property 3: Project cards match data length
// Feature: eternity-software-website, Property 4: Project content is rendered verbatim

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

describe('Property 3: Project cards match data length', () => {
  it('renders exactly as many cards as projects passed in', () => {
    fc.assert(
      fc.property(fc.array(projectArb, { minLength: 0, maxLength: 20 }), (projects) => {
        const { container } = render(<ProjectsSection projects={projects} />);
        const cards = container.querySelectorAll('[data-testid="project-card"]');
        cleanup();
        return cards.length === projects.length;
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 4: Project content is rendered verbatim', () => {
  it('renders each project title and description unchanged', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container } = render(<ProjectsSection projects={[project]} />);
        const titleEl = container.querySelector('h3');
        const descEl = container.querySelector('p');
        const titleMatch = titleEl?.textContent === project.title;
        const descMatch = descEl?.textContent === project.description;
        cleanup();
        return titleMatch && descMatch;
      }),
      { numRuns: 100 }
    );
  });
});
