import { createClient, type SanityClient } from '@sanity/client';
import { sanityConfig } from './config';

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!sanityConfig.projectId) return null;
  if (!_client) _client = createClient(sanityConfig);
  return _client;
}

// Keep named export for backwards-compat with tests that import `client` directly
export const client = {
  fetch: <T>(query: string) => {
    const c = getClient();
    if (!c) return Promise.reject(new Error('Sanity projectId not configured'));
    return c.fetch<T>(query);
  },
};
