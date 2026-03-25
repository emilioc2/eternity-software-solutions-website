// Feature: eternity-software-website, Property 1: Service cards match data length
// Feature: eternity-software-website, Property 2: Service content is rendered verbatim

import { describe, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { ServicesSection } from '../../components/ServicesSection';
import type { Service } from '../../lib/sanity/types';

const serviceArb = fc.record<Service>({
  _id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
});

describe('Property 1: Service cards match data length', () => {
  it('renders exactly as many cards as services passed in', () => {
    fc.assert(
      fc.property(fc.array(serviceArb, { minLength: 0, maxLength: 20 }), (services) => {
        const { container } = render(<ServicesSection services={services} />);
        const cards = container.querySelectorAll('[data-testid="service-card"]');
        cleanup();
        return cards.length === services.length;
      }),
      { numRuns: 100 }
    );
  });
});

describe('Property 2: Service content is rendered verbatim', () => {
  it('renders each service title and description unchanged', () => {
    fc.assert(
      fc.property(serviceArb, (service) => {
        const { container } = render(<ServicesSection services={[service]} />);
        const card = container.querySelector('[data-testid="service-card"]');
        const titleEl = card?.querySelector('h3');
        const descEl = card?.querySelector('p');
        const titleMatch = titleEl?.textContent === service.title;
        const descMatch = descEl?.textContent === service.description;
        cleanup();
        return titleMatch && descMatch;
      }),
      { numRuns: 100 }
    );
  });
});
