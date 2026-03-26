'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { service, project, contactSettings } from '../../../lib/sanity/schemas';

export const dynamic = 'force-dynamic';

export default function StudioPage() {
  const studioConfig = defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    name: 'eternity-software-studio',
    title: 'Eternity Software Studio',
    plugins: [structureTool()],
    schema: {
      types: [service, project, contactSettings],
    },
  });

  return <NextStudio config={studioConfig} />;
}
