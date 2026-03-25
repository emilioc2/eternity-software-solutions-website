import { client } from './client';
import {
  FALLBACK_SERVICES,
  FALLBACK_PROJECTS,
  FALLBACK_CONTACT_SETTINGS,
} from './fallbackData';
import { servicesQuery, projectsQuery, contactSettingsQuery } from './queries';
import type { Service, Project, ContactSettings } from './types';

export async function fetchServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>(servicesQuery);
    return data?.length ? data : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<Project[]>(projectsQuery);
    return data?.length ? data : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  try {
    const data = await client.fetch<ContactSettings | null>(contactSettingsQuery);
    return data ?? FALLBACK_CONTACT_SETTINGS;
  } catch {
    return FALLBACK_CONTACT_SETTINGS;
  }
}
