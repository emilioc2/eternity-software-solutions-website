// Feature: eternity-software-website, Property 10: Sanity fetch failure renders fallback content

import { describe, it, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';

vi.mock('../../lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

import { client } from '../../lib/sanity/client';
import { fetchServices, fetchProjects, fetchContactSettings } from '../../lib/sanity/fetchWithFallback';
import {
  FALLBACK_SERVICES,
  FALLBACK_PROJECTS,
  FALLBACK_CONTACT_SETTINGS,
} from '../../lib/sanity/fallbackData';

const mockFetch = client.fetch as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
});

// Arbitrary that produces a failure condition: throw, null, or empty array
const failureArb = fc.oneof(
  fc.constant({ type: 'throw' as const }),
  fc.constant({ type: 'null' as const }),
  fc.constant({ type: 'empty' as const }),
);

describe('Property 10: Sanity fetch failure renders fallback content', () => {
  it('fetchServices returns FALLBACK_SERVICES on any failure condition', async () => {
    await fc.assert(
      fc.asyncProperty(failureArb, async (failure) => {
        if (failure.type === 'throw') {
          mockFetch.mockRejectedValueOnce(new Error('network error'));
        } else if (failure.type === 'null') {
          mockFetch.mockResolvedValueOnce(null);
        } else {
          mockFetch.mockResolvedValueOnce([]);
        }
        const result = await fetchServices();
        return JSON.stringify(result) === JSON.stringify(FALLBACK_SERVICES);
      }),
      { numRuns: 100 }
    );
  });

  it('fetchProjects returns FALLBACK_PROJECTS on any failure condition', async () => {
    await fc.assert(
      fc.asyncProperty(failureArb, async (failure) => {
        if (failure.type === 'throw') {
          mockFetch.mockRejectedValueOnce(new Error('network error'));
        } else if (failure.type === 'null') {
          mockFetch.mockResolvedValueOnce(null);
        } else {
          mockFetch.mockResolvedValueOnce([]);
        }
        const result = await fetchProjects();
        return JSON.stringify(result) === JSON.stringify(FALLBACK_PROJECTS);
      }),
      { numRuns: 100 }
    );
  });

  it('fetchContactSettings returns FALLBACK_CONTACT_SETTINGS on any failure condition', async () => {
    // contactSettings only has throw and null failure modes (no empty-array check)
    const contactFailureArb = fc.oneof(
      fc.constant({ type: 'throw' as const }),
      fc.constant({ type: 'null' as const }),
    );
    await fc.assert(
      fc.asyncProperty(contactFailureArb, async (failure) => {
        if (failure.type === 'throw') {
          mockFetch.mockRejectedValueOnce(new Error('network error'));
        } else {
          mockFetch.mockResolvedValueOnce(null);
        }
        const result = await fetchContactSettings();
        return JSON.stringify(result) === JSON.stringify(FALLBACK_CONTACT_SETTINGS);
      }),
      { numRuns: 100 }
    );
  });

  it('fetchServices returns live data when Sanity succeeds with non-empty array', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            _id: fc.uuid(),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        async (liveServices) => {
          mockFetch.mockResolvedValueOnce(liveServices);
          const result = await fetchServices();
          return JSON.stringify(result) === JSON.stringify(liveServices);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('fetchProjects returns live data when Sanity succeeds with non-empty array', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            _id: fc.uuid(),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            tag: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        async (liveProjects) => {
          mockFetch.mockResolvedValueOnce(liveProjects);
          const result = await fetchProjects();
          return JSON.stringify(result) === JSON.stringify(liveProjects);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('fetchContactSettings returns live data when Sanity succeeds', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({ whatsappNumber: fc.string({ minLength: 1 }) }),
        async (liveSettings) => {
          mockFetch.mockResolvedValueOnce(liveSettings);
          const result = await fetchContactSettings();
          return JSON.stringify(result) === JSON.stringify(liveSettings);
        }
      ),
      { numRuns: 100 }
    );
  });
});
