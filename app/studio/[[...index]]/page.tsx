'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { sanityConfig } from '../../../lib/sanity/config';
import { service, project, contactSettings } from '../../../lib/sanity/schemas';

export const dynamic = 'force-dynamic';

const studioConfig = defineConfig({
  ...sanityConfig,
  name: 'eternity-software-studio',
  title: 'Eternity Software Studio',
  plugins: [structureTool()],
  schema: {
    types: [service, project, contactSettings],
  },
});

export default function StudioPage() {
  return <NextStudio config={studioConfig} />;
}
