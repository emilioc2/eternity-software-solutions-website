# Design Document: Eternity Software Services Website

## Overview

A production-ready marketing website for Eternity Software Services built with Next.js 14 (App Router), Sanity CMS, Tailwind CSS, and deployed to Vercel. The site is a single-page layout with a sticky navigation bar and seven sections: Hero, What We Do, Services, About, Projects, Contact, and Footer. Content for Services, Projects, and Contact settings is managed via Sanity CMS; static copy (Hero, What We Do, About) is hardcoded from the approved PDF. Form submissions are handled by Formspree or Resend. The design follows a dark theme with vibrant accent colors inspired by the reference prototype.

### Key Design Decisions

- **App Router + Static Generation**: Pages are statically generated at build time (`generateStaticParams` / `fetch` with `cache: 'force-cache'`). On-demand revalidation is triggered by a Sanity webhook hitting `/api/revalidate`, keeping content fresh without full redeploys.
- **Sanity as the single source of truth for dynamic content**: Services, Projects, and Contact settings (WhatsApp number) live in Sanity. Everything else is static copy.
- **Formspree for contact form**: Zero-backend option; swap to Resend via an environment variable flag if needed.
- **Single-page scroll**: All sections live in `app/page.tsx`. The `/studio` route mounts Sanity Studio via the `next-sanity` package.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Vercel Edge                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Next.js 14 App Router               │   │
│  │                                                  │   │
│  │  app/                                            │   │
│  │  ├── page.tsx          ← single-page layout      │   │
│  │  ├── layout.tsx        ← root layout + fonts     │   │
│  │  ├── studio/[[...index]]/page.tsx  ← Sanity UI   │   │
│  │  └── api/revalidate/route.ts  ← webhook handler  │   │
│  │                                                  │   │
│  │  components/           ← section components      │   │
│  │  lib/sanity/           ← client, schemas, queries│   │
│  └──────────────────────────────────────────────────┘   │
│                          │                               │
│              Static HTML + ISR (on-demand)               │
└──────────────────────────┬──────────────────────────────┘
                           │ GROQ queries (build + revalidate)
                    ┌──────▼──────┐
                    │  Sanity CMS │
                    │  (hosted)   │
                    └─────────────┘
                           │ form POST
                    ┌──────▼──────┐
                    │  Formspree  │
                    │  (or Resend)│
                    └─────────────┘
```

### Data Flow

1. **Build time**: `app/page.tsx` calls `sanityFetch()` for services, projects, and contact settings. Next.js statically renders the page.
2. **Content update**: Admin publishes in Sanity Studio → Sanity fires a webhook to `/api/revalidate` → Next.js calls `revalidatePath('/')` → next visitor gets fresh HTML.
3. **Form submission**: Visitor submits contact form → client-side `fetch` POST to Formspree endpoint → success/error state shown inline.

---

## Components and Interfaces

### File Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
  studio/
    [[...index]]/
      page.tsx
  api/
    revalidate/
      route.ts

components/
  Nav.tsx
  HeroSection.tsx
  WhatWeDoSection.tsx
  ServicesSection.tsx
  AboutSection.tsx
  ProjectsSection.tsx
  ContactSection.tsx
  Footer.tsx
  ContactForm.tsx
  WhatsAppButton.tsx

lib/
  sanity/
    client.ts
    config.ts
    queries.ts
    types.ts
    fallbackData.ts
    fetchWithFallback.ts
    schemas/
      service.ts
      project.ts
      contactSettings.ts
      index.ts

public/
  icon.png

.env.example
```

### Component Interfaces

```typescript
// Nav
interface NavProps {
  logoSrc: string; // "/icon.png"
}

// HeroSection — all copy is static
// No props needed

// WhatWeDoSection — static copy list
// No props needed

// ServicesSection
interface Service {
  _id: string;
  title: string;
  description: string;
}
interface ServicesSectionProps {
  services: Service[];
}

// AboutSection — static copy
// No props needed

// ProjectsSection
interface Project {
  _id: string;
  title: string;
  description: string;
  tag?: string; // e.g. "Concept", "Demo", "Prototype"
}
interface ProjectsSectionProps {
  projects: Project[];
}

// ContactSection
interface ContactSettings {
  whatsappNumber: string; // e.g. "+1234567890"
}
interface ContactSectionProps {
  settings: ContactSettings;
}

// ContactForm
interface ContactFormProps {
  formspreeEndpoint: string; // from env, passed as prop or read client-side
}

// WhatsAppButton
interface WhatsAppButtonProps {
  phoneNumber: string;
}

// Footer — static
// No props needed
```

### Navigation Anchor IDs

| Section       | `id` attribute   |
|---------------|------------------|
| Hero          | `hero`           |
| What We Do    | `what-we-do`     |
| Services      | `services`       |
| About         | `about`          |
| Projects      | `projects`       |
| Contact       | `contact`        |

---

## Data Models

### Sanity Schema: `service`

```typescript
// lib/sanity/schemas/service.ts
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
};
```

### Sanity Schema: `project`

```typescript
// lib/sanity/schemas/project.ts
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Tag / Label',
      type: 'string',
      description: 'e.g. Concept, Demo, Prototype',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
};
```

### Sanity Schema: `contactSettings`

```typescript
// lib/sanity/schemas/contactSettings.ts
export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // singleton — no create/delete
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Phone Number',
      type: 'string',
      description: 'Include country code, e.g. +1234567890',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
```

### GROQ Queries

```typescript
// lib/sanity/queries.ts
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id, title, description
  }
`;

export const projectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id, title, description, tag
  }
`;

export const contactSettingsQuery = `
  *[_type == "contactSettings"][0] {
    whatsappNumber
  }
`;
```

### Environment Variables

```bash
# .env.example
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                    # read token for server-side fetches
SANITY_WEBHOOK_SECRET=               # used to verify revalidation webhook
NEXT_PUBLIC_FORMSPREE_ENDPOINT=      # e.g. https://formspree.io/f/xxxxx
# OR if using Resend:
RESEND_API_KEY=
RESEND_TO_EMAIL=
NEXT_PUBLIC_WHATSAPP_NUMBER=         # fallback if not set in CMS
```

### Revalidation Webhook Handler

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: Request) {
  const { isValidSignature, body } = await parseBody<{ _type: string }>(
    req,
    process.env.SANITY_WEBHOOK_SECRET
  );
  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 });
  }
  revalidatePath('/');
  return new Response('Revalidated', { status: 200 });
}
```

---

## Sanity Fallback Strategy

### Overview

If Sanity is unreachable at build time or during on-demand revalidation, the website must not crash or render empty content. Instead, it falls back to hardcoded static copy sourced from the approved PDF. This applies to the three dynamic sections: Services, Projects, and Contact Settings (WhatsApp number).

### Fallback Data File

All fallback constants live in a single dedicated file:

```typescript
// lib/sanity/fallbackData.ts
import type { Service, Project, ContactSettings } from './types';

export const FALLBACK_SERVICES: Service[] = [
  {
    _id: 'fallback-web-dev',
    title: 'Web Development',
    description:
      'Clean, fast, reliable websites built with modern tools and timeless structure. Designed to perform smoothly today — and stay easy to maintain as you grow.',
  },
  {
    _id: 'fallback-custom-software',
    title: 'Custom Software',
    description:
      "If your idea doesn't fit a template, we build it from the ground up. Custom tools, dashboards, and systems designed to simplify life and scale effortlessly into the future.",
  },
  {
    _id: 'fallback-uiux',
    title: 'UI/UX Design',
    description:
      'Simple, intuitive, and visually consistent interfaces that feel familiar from the first click — built with clarity and longevity in mind.',
  },
  {
    _id: 'fallback-consulting',
    title: 'Technical Consulting',
    description:
      'From early concepts to system planning, we help you make smart, confident decisions and avoid surprises down the road.',
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'fallback-dashboard',
    title: 'Business Dashboard (Concept)',
    description:
      'A clear, modern view of business performance — without the clutter or confusion.',
    tag: 'Concept',
  },
  {
    _id: 'fallback-portfolio',
    title: 'Portfolio Website (Demo)',
    description:
      'A modern, elegant showcase for creators — built to look good today and stay relevant tomorrow.',
    tag: 'Demo',
  },
  {
    _id: 'fallback-workflow',
    title: 'Workflow Tool (Prototype)',
    description:
      'A streamlined app designed to simplify tasks and support teams for the long haul.',
    tag: 'Prototype',
  },
];

export const FALLBACK_CONTACT_SETTINGS: ContactSettings = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
};
```

The `Service`, `Project`, and `ContactSettings` types are the same interfaces defined in the Components and Interfaces section — the fallback constants are typed against them directly.

### Fetch Wrapper Pattern

Each Sanity fetch in `app/page.tsx` is wrapped so that any thrown error or empty/null result triggers the fallback:

```typescript
// lib/sanity/fetchWithFallback.ts
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
```

`app/page.tsx` calls these wrappers instead of `client.fetch` directly, so the fallback is transparent to the rendering components.

### Fallback Trigger Conditions

| Condition | Fallback Applied |
|---|---|
| `client.fetch` throws (network error, auth failure, timeout) | Yes — catch block returns fallback constant |
| `client.fetch` returns an empty array for services or projects | Yes — length check returns fallback constant |
| `client.fetch` returns `null` for contact settings | Yes — nullish coalescing returns fallback constant |
| Sanity returns valid non-empty data | No — live data is used as normal |

### Design Rationale

- Fallback data is co-located in one file so it is easy to update when the PDF copy changes.
- The fallback for `whatsappNumber` reads from `NEXT_PUBLIC_WHATSAPP_NUMBER` so the number is still configurable via environment variable without a code change.
- The fetch wrappers are thin — they add no business logic beyond the try/catch and empty-check, keeping the Sanity client itself untouched.
- Build-time failures no longer abort the Vercel build; the site deploys with static copy and recovers automatically once Sanity is reachable on the next revalidation.

---

## Styling Approach

### Color Palette

The design uses a warm, light color scheme matching the prototype — not a dark theme.

| Token | Value | Usage |
|---|---|---|
| `background` | `#f5f0eb` | Page background (warm cream) |
| `surface` | `#ffffff` | Card and nav backgrounds |
| `surface-dark` | `#2d1f1a` | Dark sections (CTA banner, footer) |
| `text-primary` | `#1a1008` | Main body text (near-black warm) |
| `text-muted` | `#6b5c52` | Secondary/muted text |
| `accent` | `#c0522a` | Primary accent — terracotta/rust (buttons, highlights, links) |
| `accent-hover` | `#a3431f` | Accent hover state |
| `accent-subtle` | `#f0e0d6` | Soft accent background (badges, tags) |
| `border` | `#e8ddd6` | Card borders, dividers |

Tailwind config extension:
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: '#f5f0eb',
      surface: '#ffffff',
      'surface-dark': '#2d1f1a',
      'text-primary': '#1a1008',
      'text-muted': '#6b5c52',
      accent: '#c0522a',
      'accent-hover': '#a3431f',
      'accent-subtle': '#f0e0d6',
      border: '#e8ddd6',
    },
  },
}
```

### Typography

- `next/font/google` loading **Inter** for body text and UI elements
- **Playfair Display** or **Fraunces** for display headings (matches the serif weight visible in the prototype hero)
- Fallback: system-ui, sans-serif

### Hero Image

The prototype uses an AI-generated developer workspace illustration. We will source a free equivalent from [Unsplash](https://unsplash.com) or [unDraw](https://undraw.co) — a workspace/tech illustration in warm tones. The image is placed in `public/hero-illustration.png` (or `.jpg`).

### Decorative Elements

- Subtle circular blob shapes in muted rust/brown tones as background accents (matching the prototype's soft background circles)
- Implemented as absolutely-positioned `div` elements with `rounded-full`, low opacity, and `blur-3xl`

### Component Styles

- Sticky nav: `sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border`
- Primary button: `bg-accent text-white rounded-full px-6 py-2.5 hover:bg-accent-hover transition-colors duration-200`
- Secondary button: `border border-text-primary text-text-primary rounded-full px-6 py-2.5 hover:bg-surface-dark hover:text-white transition-colors duration-200`
- Cards: `bg-surface rounded-2xl border border-border p-6 hover:shadow-md transition-shadow duration-200`
- Dark CTA section: `bg-surface-dark text-white rounded-2xl`
- Footer: `bg-surface-dark text-white`
- Mobile hamburger: controlled by local React state in `Nav.tsx`
- Hover transitions: `transition-all duration-200` on all interactive elements

---


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Service cards match data length

*For any* array of service objects passed to `ServicesSection`, the number of rendered service cards should equal the length of the input array.

**Validates: Requirements 4.1**

---

### Property 2: Service content is rendered verbatim

*For any* service object with a `title` and `description`, when `ServicesSection` renders that service, both the title and description strings should appear in the rendered output unchanged.

**Validates: Requirements 4.2**

---

### Property 3: Project cards match data length

*For any* array of project objects passed to `ProjectsSection`, the number of rendered project cards should equal the length of the input array.

**Validates: Requirements 6.1**

---

### Property 4: Project content is rendered verbatim

*For any* project object with a `title` and `description`, when `ProjectsSection` renders that project, both the title and description strings should appear in the rendered output unchanged.

**Validates: Requirements 6.2**

---

### Property 5: Phone number is included in submission payload when provided

*For any* valid contact form submission that includes a non-empty phone number, the data object passed to the Formspree endpoint should contain the phone field with the submitted value.

**Validates: Requirements 7.3a**

---

### Property 6: Empty phone number does not cause a validation error

*For any* contact form submission where the phone field is empty or omitted, and all required fields (name, email, message) are filled, the form should pass validation and proceed to submission without reporting a phone-related error.

**Validates: Requirements 7.3b**

---

### Property 7: Missing required fields produce inline errors

*For any* non-empty subset of required fields (name, email, message) that are left blank, submitting the contact form should display a validation error for each missing field and should not invoke the Formspree endpoint.

**Validates: Requirements 7.5**

---

### Property 8: WhatsApp button URL is correctly formed

*For any* phone number string stored in `ContactSettings`, the `WhatsAppButton` component should render an anchor whose `href` is exactly `https://wa.me/{phoneNumber}` (with the number stripped of non-digit characters except the leading `+`) and whose `target` attribute is `_blank`.

**Validates: Requirements 7.7**

---

### Property 9: No secrets are hardcoded in source files

*For any* source file in the project, the file should not contain literal values matching the patterns of known secrets (Sanity project ID, API tokens, Formspree endpoint, Resend API key, WhatsApp number). All such values should be referenced only via `process.env.*` calls.

**Validates: Requirements 10.3**

---

### Property 10: Sanity fetch failure renders fallback content

*For any* Sanity fetch call (services, projects, or contact settings) that either throws an error or returns a null/empty result, the rendered output of the corresponding section should be identical to the output produced when the hardcoded fallback data from `lib/sanity/fallbackData.ts` is passed directly to that section's component.

**Validates: Requirements 4.1, 4.2, 6.1, 6.2, 7.7, 8.4**

---

## Error Handling

### Contact Form Errors

| Scenario | Handling |
|---|---|
| Required field empty on submit | Inline error message below the field; form not submitted |
| Invalid email format | Inline error message; form not submitted |
| Formspree/Resend network error (non-2xx) | Toast or inline banner: "Something went wrong. Please try again." |
| Formspree/Resend timeout | Same as network error |
| Successful submission | Replace form with: "Thanks! We'll be in touch soon." |

### Revalidation Webhook Errors

| Scenario | Handling |
|---|---|
| Invalid or missing `SANITY_WEBHOOK_SECRET` signature | Return `401 Unauthorized`; log warning |
| Revalidation throws | Return `500`; Next.js will retry on next webhook fire |

### Sanity Fetch Errors

| Scenario | Handling |
|---|---|
| Sanity unreachable at build time | `fetchServices` / `fetchProjects` / `fetchContactSettings` catch the error and return the corresponding fallback constant from `lib/sanity/fallbackData.ts`; build succeeds with static copy |
| Sanity unreachable during on-demand revalidation | Same fetch wrappers catch the error; the previously cached page remains live; next successful revalidation restores live data |
| Sanity returns empty array for services/projects | Length check in fetch wrapper returns fallback constant; sections render with hardcoded PDF copy |
| `contactSettings` document missing or returns `null` | Nullish coalescing in fetch wrapper returns `FALLBACK_CONTACT_SETTINGS`, which reads `NEXT_PUBLIC_WHATSAPP_NUMBER` from the environment |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. Unit tests cover specific examples, static copy assertions, and integration points. Property-based tests verify universal behaviors across generated inputs.

### Unit Tests (Vitest + React Testing Library)

Focus areas:
- **Static copy**: Assert exact strings from the PDF appear in Hero, What We Do, About, and Contact sections.
- **Nav rendering**: Logo image, all five section links, and CTA button are present.
- **Footer rendering**: Company name, tagline, and copyright text are present.
- **ContactForm fields**: Three required fields and one optional phone field render with correct `required` attributes.
- **Successful submission flow**: Mock Formspree fetch → assert success message appears.
- **Revalidation webhook**: Valid signature → `revalidatePath` called, returns 200. Invalid signature → returns 401.
- **Sanity schemas**: Each schema export contains the expected field names and types.
- **Environment variable usage**: `lib/sanity/client.ts` reads from `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` etc.
- **icon.png as favicon**: Root `layout.tsx` includes a `<link rel="icon">` pointing to `/icon.png`.

### Property-Based Tests (fast-check + Vitest)

Each property test runs a minimum of **100 iterations**.

Tag format for each test: `// Feature: eternity-software-website, Property {N}: {property_text}`

| Property | Test Description | fast-check Arbitraries |
|---|---|---|
| P1: Service cards match data length | Generate arrays of 0–20 service objects; render `ServicesSection`; assert card count equals array length | `fc.array(fc.record({ _id: fc.uuid(), title: fc.string(), description: fc.string() }))` |
| P2: Service content rendered verbatim | Generate a single service object; render; assert title and description appear in output | `fc.record({ _id: fc.uuid(), title: fc.string({minLength:1}), description: fc.string({minLength:1}) })` |
| P3: Project cards match data length | Same pattern as P1 for projects | `fc.array(fc.record({ _id: fc.uuid(), title: fc.string(), description: fc.string(), tag: fc.option(fc.string()) }))` |
| P4: Project content rendered verbatim | Same pattern as P2 for projects | Same as P3 single record |
| P5: Phone included in payload | Generate valid form data including a non-empty phone; mock submit; assert payload contains phone | `fc.record({ name: fc.string({minLength:1}), email: fc.emailAddress(), message: fc.string({minLength:1}), phone: fc.string({minLength:1}) })` |
| P6: Empty phone not a validation error | Generate valid form data with empty phone; assert no phone error and form submits | `fc.record({ name: fc.string({minLength:1}), email: fc.emailAddress(), message: fc.string({minLength:1}) })` |
| P7: Missing required fields produce errors | Generate a non-empty subset of {name, email, message} to omit; assert errors shown, fetch not called | `fc.subarray(['name','email','message'], {minLength:1})` |
| P8: WhatsApp URL correctly formed | Generate phone number strings; assert href equals `https://wa.me/{number}` and target is `_blank` | `fc.string({minLength:7, maxLength:15}).map(s => '+' + s.replace(/\D/g,''))` |
| P9: No hardcoded secrets | Scan source files for literal secret patterns; assert none found | Static analysis — run once, not randomized |
| P10: Sanity fetch failure renders fallback | Mock `client.fetch` to throw (or return null/empty); call each fetch wrapper; assert returned data deep-equals the corresponding fallback constant | `fc.oneof(fc.constant(null), fc.constant([]), fc.constant(new Error('network')))` |

### Test Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
```

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom';
```

Property tests should be placed in `__tests__/properties/` and unit tests in `__tests__/unit/`.
