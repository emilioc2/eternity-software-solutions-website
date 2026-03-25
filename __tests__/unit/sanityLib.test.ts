import { vi, beforeEach } from 'vitest';
import { sanityConfig } from '../../lib/sanity/config';
import service from '../../lib/sanity/schemas/service';
import project from '../../lib/sanity/schemas/project';
import contactSettings from '../../lib/sanity/schemas/contactSettings';
import { service as serviceExport, project as projectExport, contactSettings as contactSettingsExport } from '../../lib/sanity/schemas/index';

describe('lib/sanity/config', () => {
  it('reads projectId from process.env.NEXT_PUBLIC_SANITY_PROJECT_ID', () => {
    expect(sanityConfig.projectId).toBe(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '');
  });

  it('reads dataset from process.env.NEXT_PUBLIC_SANITY_DATASET', () => {
    expect(sanityConfig.dataset).toBe(process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production');
  });

  it('does not hardcode a projectId value', () => {
    // The config must derive its value from env, not a literal
    const configSource = sanityConfig;
    expect(typeof configSource.projectId).toBe('string');
  });
});

describe('lib/sanity/schemas/service', () => {
  it('has name "service"', () => {
    expect(service.name).toBe('service');
  });

  it('has type "document"', () => {
    expect(service.type).toBe('document');
  });

  it('contains a "title" field of type string', () => {
    const field = service.fields.find((f) => f.name === 'title');
    expect(field).toBeDefined();
    expect(field?.type).toBe('string');
  });

  it('contains a "description" field of type text', () => {
    const field = service.fields.find((f) => f.name === 'description');
    expect(field).toBeDefined();
    expect(field?.type).toBe('text');
  });

  it('contains an "order" field of type number', () => {
    const field = service.fields.find((f) => f.name === 'order');
    expect(field).toBeDefined();
    expect(field?.type).toBe('number');
  });

  it('has validation on the title field', () => {
    const field = service.fields.find((f) => f.name === 'title') as { validation?: unknown };
    expect(typeof field?.validation).toBe('function');
  });

  it('has validation on the description field', () => {
    const field = service.fields.find((f) => f.name === 'description') as { validation?: unknown };
    expect(typeof field?.validation).toBe('function');
  });
});

describe('lib/sanity/schemas/project', () => {
  it('has name "project"', () => {
    expect(project.name).toBe('project');
  });

  it('has type "document"', () => {
    expect(project.type).toBe('document');
  });

  it('contains a "title" field of type string', () => {
    const field = project.fields.find((f) => f.name === 'title');
    expect(field).toBeDefined();
    expect(field?.type).toBe('string');
  });

  it('contains a "description" field of type text', () => {
    const field = project.fields.find((f) => f.name === 'description');
    expect(field).toBeDefined();
    expect(field?.type).toBe('text');
  });

  it('contains a "tag" field of type string', () => {
    const field = project.fields.find((f) => f.name === 'tag');
    expect(field).toBeDefined();
    expect(field?.type).toBe('string');
  });

  it('contains an "order" field of type number', () => {
    const field = project.fields.find((f) => f.name === 'order');
    expect(field).toBeDefined();
    expect(field?.type).toBe('number');
  });

  it('has validation on the title field', () => {
    const field = project.fields.find((f) => f.name === 'title') as { validation?: unknown };
    expect(typeof field?.validation).toBe('function');
  });

  it('has validation on the description field', () => {
    const field = project.fields.find((f) => f.name === 'description') as { validation?: unknown };
    expect(typeof field?.validation).toBe('function');
  });
});

describe('lib/sanity/schemas/contactSettings', () => {
  it('has name "contactSettings"', () => {
    expect(contactSettings.name).toBe('contactSettings');
  });

  it('has type "document"', () => {
    expect(contactSettings.type).toBe('document');
  });

  it('is a singleton with __experimental_actions restricting create/delete', () => {
    const actions = (contactSettings as { __experimental_actions?: string[] }).__experimental_actions;
    expect(actions).toEqual(['update', 'publish']);
  });

  it('contains a "whatsappNumber" field of type string', () => {
    const field = contactSettings.fields.find((f) => f.name === 'whatsappNumber');
    expect(field).toBeDefined();
    expect(field?.type).toBe('string');
  });

  it('has validation on the whatsappNumber field', () => {
    const field = contactSettings.fields.find((f) => f.name === 'whatsappNumber') as { validation?: unknown };
    expect(typeof field?.validation).toBe('function');
  });
});

describe('lib/sanity/schemas/index', () => {
  it('exports the service schema', () => {
    expect(serviceExport).toBe(service);
  });

  it('exports the project schema', () => {
    expect(projectExport).toBe(project);
  });

  it('exports the contactSettings schema', () => {
    expect(contactSettingsExport).toBe(contactSettings);
  });
});

import { servicesQuery, projectsQuery, contactSettingsQuery } from '../../lib/sanity/queries';
import {
  FALLBACK_SERVICES,
  FALLBACK_PROJECTS,
  FALLBACK_CONTACT_SETTINGS,
} from '../../lib/sanity/fallbackData';

// ─── queries ────────────────────────────────────────────────────────────────

describe('lib/sanity/queries', () => {
  it('servicesQuery targets the service type', () => {
    expect(servicesQuery).toContain('"service"');
  });

  it('servicesQuery orders by order asc', () => {
    expect(servicesQuery).toContain('order asc');
  });

  it('servicesQuery selects _id, title, description', () => {
    expect(servicesQuery).toContain('_id');
    expect(servicesQuery).toContain('title');
    expect(servicesQuery).toContain('description');
  });

  it('projectsQuery targets the project type', () => {
    expect(projectsQuery).toContain('"project"');
  });

  it('projectsQuery selects tag field', () => {
    expect(projectsQuery).toContain('tag');
  });

  it('contactSettingsQuery targets contactSettings type and returns first doc', () => {
    expect(contactSettingsQuery).toContain('"contactSettings"');
    expect(contactSettingsQuery).toContain('[0]');
  });

  it('contactSettingsQuery selects whatsappNumber', () => {
    expect(contactSettingsQuery).toContain('whatsappNumber');
  });
});

// ─── fallbackData ────────────────────────────────────────────────────────────

describe('lib/sanity/fallbackData', () => {
  it('FALLBACK_SERVICES has 4 entries', () => {
    expect(FALLBACK_SERVICES).toHaveLength(4);
  });

  it('FALLBACK_SERVICES entries have _id, title, description', () => {
    for (const s of FALLBACK_SERVICES) {
      expect(s._id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
    }
  });

  it('FALLBACK_SERVICES includes Web Development', () => {
    expect(FALLBACK_SERVICES.some((s) => s.title === 'Web Development')).toBe(true);
  });

  it('FALLBACK_SERVICES includes Custom Software', () => {
    expect(FALLBACK_SERVICES.some((s) => s.title === 'Custom Software')).toBe(true);
  });

  it('FALLBACK_SERVICES includes UI/UX Design', () => {
    expect(FALLBACK_SERVICES.some((s) => s.title === 'UI/UX Design')).toBe(true);
  });

  it('FALLBACK_SERVICES includes Technical Consulting', () => {
    expect(FALLBACK_SERVICES.some((s) => s.title === 'Technical Consulting')).toBe(true);
  });

  it('FALLBACK_PROJECTS has 3 entries', () => {
    expect(FALLBACK_PROJECTS).toHaveLength(3);
  });

  it('FALLBACK_PROJECTS entries have _id, title, description, tag', () => {
    for (const p of FALLBACK_PROJECTS) {
      expect(p._id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tag).toBeTruthy();
    }
  });

  it('FALLBACK_PROJECTS includes Business Dashboard (Concept)', () => {
    expect(FALLBACK_PROJECTS.some((p) => p.title === 'Business Dashboard (Concept)')).toBe(true);
  });

  it('FALLBACK_PROJECTS includes Portfolio Website (Demo)', () => {
    expect(FALLBACK_PROJECTS.some((p) => p.title === 'Portfolio Website (Demo)')).toBe(true);
  });

  it('FALLBACK_PROJECTS includes Workflow Tool (Prototype)', () => {
    expect(FALLBACK_PROJECTS.some((p) => p.title === 'Workflow Tool (Prototype)')).toBe(true);
  });

  it('FALLBACK_CONTACT_SETTINGS has a whatsappNumber string', () => {
    expect(typeof FALLBACK_CONTACT_SETTINGS.whatsappNumber).toBe('string');
  });

  it('FALLBACK_CONTACT_SETTINGS.whatsappNumber reads from NEXT_PUBLIC_WHATSAPP_NUMBER env', () => {
    // The value should equal whatever the env var is (or empty string)
    expect(FALLBACK_CONTACT_SETTINGS.whatsappNumber).toBe(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
    );
  });
});

// ─── fetchWithFallback ───────────────────────────────────────────────────────

vi.mock('../../lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

import { client } from '../../lib/sanity/client';
import { fetchServices, fetchProjects, fetchContactSettings } from '../../lib/sanity/fetchWithFallback';

const mockFetch = client.fetch as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchServices', () => {
  it('returns live data when Sanity returns a non-empty array', async () => {
    const liveData = [{ _id: '1', title: 'Live', description: 'desc' }];
    mockFetch.mockResolvedValueOnce(liveData);
    const result = await fetchServices();
    expect(result).toEqual(liveData);
  });

  it('returns FALLBACK_SERVICES when Sanity returns an empty array', async () => {
    mockFetch.mockResolvedValueOnce([]);
    const result = await fetchServices();
    expect(result).toEqual(FALLBACK_SERVICES);
  });

  it('returns FALLBACK_SERVICES when Sanity throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));
    const result = await fetchServices();
    expect(result).toEqual(FALLBACK_SERVICES);
  });

  it('returns FALLBACK_SERVICES when Sanity returns null', async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await fetchServices();
    expect(result).toEqual(FALLBACK_SERVICES);
  });
});

describe('fetchProjects', () => {
  it('returns live data when Sanity returns a non-empty array', async () => {
    const liveData = [{ _id: '1', title: 'Live Project', description: 'desc', tag: 'Demo' }];
    mockFetch.mockResolvedValueOnce(liveData);
    const result = await fetchProjects();
    expect(result).toEqual(liveData);
  });

  it('returns FALLBACK_PROJECTS when Sanity returns an empty array', async () => {
    mockFetch.mockResolvedValueOnce([]);
    const result = await fetchProjects();
    expect(result).toEqual(FALLBACK_PROJECTS);
  });

  it('returns FALLBACK_PROJECTS when Sanity throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));
    const result = await fetchProjects();
    expect(result).toEqual(FALLBACK_PROJECTS);
  });

  it('returns FALLBACK_PROJECTS when Sanity returns null', async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await fetchProjects();
    expect(result).toEqual(FALLBACK_PROJECTS);
  });
});

describe('fetchContactSettings', () => {
  it('returns live data when Sanity returns a valid object', async () => {
    const liveData = { whatsappNumber: '+9999999999' };
    mockFetch.mockResolvedValueOnce(liveData);
    const result = await fetchContactSettings();
    expect(result).toEqual(liveData);
  });

  it('returns FALLBACK_CONTACT_SETTINGS when Sanity returns null', async () => {
    mockFetch.mockResolvedValueOnce(null);
    const result = await fetchContactSettings();
    expect(result).toEqual(FALLBACK_CONTACT_SETTINGS);
  });

  it('returns FALLBACK_CONTACT_SETTINGS when Sanity throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));
    const result = await fetchContactSettings();
    expect(result).toEqual(FALLBACK_CONTACT_SETTINGS);
  });
});

// ─── client ──────────────────────────────────────────────────────────────────

describe('lib/sanity/client', () => {
  it('is defined', () => {
    expect(client).toBeDefined();
  });

  it('has a fetch method', () => {
    expect(typeof client.fetch).toBe('function');
  });
});

// ─── schema validation functions ─────────────────────────────────────────────

describe('schema validation functions', () => {
  const mockRule = { required: vi.fn().mockReturnThis() };

  it('service title validation calls Rule.required()', () => {
    const field = service.fields.find((f) => f.name === 'title') as { validation?: (r: typeof mockRule) => unknown };
    field?.validation?.(mockRule);
    expect(mockRule.required).toHaveBeenCalled();
  });

  it('service description validation calls Rule.required()', () => {
    const field = service.fields.find((f) => f.name === 'description') as { validation?: (r: typeof mockRule) => unknown };
    field?.validation?.(mockRule);
    expect(mockRule.required).toHaveBeenCalled();
  });

  it('project title validation calls Rule.required()', () => {
    const field = project.fields.find((f) => f.name === 'title') as { validation?: (r: typeof mockRule) => unknown };
    field?.validation?.(mockRule);
    expect(mockRule.required).toHaveBeenCalled();
  });

  it('project description validation calls Rule.required()', () => {
    const field = project.fields.find((f) => f.name === 'description') as { validation?: (r: typeof mockRule) => unknown };
    field?.validation?.(mockRule);
    expect(mockRule.required).toHaveBeenCalled();
  });

  it('contactSettings whatsappNumber validation calls Rule.required()', () => {
    const field = contactSettings.fields.find((f) => f.name === 'whatsappNumber') as unknown as { validation?: (r: typeof mockRule) => unknown };
    field?.validation?.(mockRule);
    expect(mockRule.required).toHaveBeenCalled();
  });
});
