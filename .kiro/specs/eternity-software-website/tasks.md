# Implementation Plan: Eternity Software Services Website

## Overview

Incremental build of a Next.js 14 App Router site with Sanity CMS, Tailwind CSS, Formspree contact form, and Vitest + fast-check tests. Each task builds on the previous, ending with full integration and deployment config.

## Tasks

- [x] 1. Scaffold Next.js project and configure tooling
  - Initialise Next.js 14 App Router project (`npx create-next-app@latest`)
  - Install dependencies: `next-sanity`, `@sanity/client`, `@sanity/vision`, `sanity`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `fast-check`, `jsdom`
  - Create `tailwind.config.ts` with custom color tokens (`background`, `surface`, `surface-dark`, `text-primary`, `text-muted`, `accent`, `accent-hover`, `accent-subtle`, `border`) and content paths
  - Create `vitest.config.ts` with jsdom environment, globals, and `vitest.setup.ts` importing `@testing-library/jest-dom`
  - Create `.env.example` with all required variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`, `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - Copy `icon.png` to `public/`
  - _Requirements: 10.1, 10.4_

- [x] 2. Set up Sanity schemas and lib layer
  - [x] 2.1 Create `lib/sanity/config.ts` reading `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` from `process.env`
  - [x] 2.2 Create `lib/sanity/client.ts` exporting a configured `createClient` instance using `config.ts`; no hardcoded values
  - [x] 2.3 Create `lib/sanity/schemas/service.ts`, `project.ts`, `contactSettings.ts` matching the design document schemas; export all three from `lib/sanity/schemas/index.ts`
  - [x] 2.4 Create `lib/sanity/types.ts` exporting `Service`, `Project`, and `ContactSettings` interfaces
  - [x] 2.5 Create `lib/sanity/queries.ts` with `servicesQuery`, `projectsQuery`, `contactSettingsQuery` GROQ strings
  - [x] 2.6 Create `lib/sanity/fallbackData.ts` with `FALLBACK_SERVICES`, `FALLBACK_PROJECTS`, `FALLBACK_CONTACT_SETTINGS` typed against the interfaces; `whatsappNumber` reads from `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - [x] 2.7 Create `lib/sanity/fetchWithFallback.ts` with `fetchServices`, `fetchProjects`, `fetchContactSettings` — each wraps `client.fetch` in try/catch with empty-check fallback
  - [x] 2.8 Write unit tests for Sanity lib layer
    - Assert `client.ts` reads from `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID`
    - Assert each schema export contains expected field names
    - _Requirements: 8.1, 10.3_
  - _Requirements: 8.1, 8.4, 10.3_

- [x] 3. Implement root layout and global styles
  - Create `app/globals.css` with Tailwind directives and `html { scroll-behavior: smooth }`
  - Create `app/layout.tsx` loading Inter and Playfair Display (or Fraunces) via `next/font/google`; apply font CSS variables to `<body>`; include `<link rel="icon" href="/icon.png" />` in metadata
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 4. Implement Nav component
  - [x] 4.1 Create `components/Nav.tsx` with sticky positioning (`sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border`), `icon.png` logo, anchor links to `#hero`, `#what-we-do`, `#services`, `#about`, `#projects`, `#contact`, and a "Start a project" CTA button
  - [x] 4.2 Add hamburger menu toggle (local React state) that collapses nav links below 768px
  - [x] 4.3 Write unit tests for Nav
    - Assert logo image, all five section links, and CTA button are present in the DOM
    - _Requirements: 1.1, 1.4_
  - _Requirements: 1.1, 1.2, 1.4_

- [x] 5. Implement static section components
  - [x] 5.1 Create `components/HeroSection.tsx` with `id="hero"`, full-viewport-height (`min-h-screen`), headline, subheadline, tagline verbatim from PDF, "Start a project" CTA scrolling to `#contact`, and hero illustration image from `public/`
  - [x] 5.2 Create `components/WhatWeDoSection.tsx` with `id="what-we-do"` and all five capability statements verbatim from PDF
  - [x] 5.3 Create `components/AboutSection.tsx` with `id="about"`, about copy verbatim from PDF, and a decorative accent element
  - [x] 5.4 Create `components/Footer.tsx` with company name, tagline "Remote-first, available globally.", and copyright notice; use `bg-surface-dark text-white`
  - [x] 5.5 Write unit tests for static sections
    - Assert Hero headline, subheadline, tagline, and CTA button text are present
    - Assert all five What We Do capability statements appear
    - Assert About copy appears
    - Assert Footer company name, tagline, and copyright text are present
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 5.1, 1.5_
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 5.1, 1.5_

- [x] 6. Implement ServicesSection component
  - [x] 6.1 Create `components/ServicesSection.tsx` accepting `services: Service[]`; render each service as a card (`bg-surface rounded-2xl border border-border p-6 hover:shadow-md transition-shadow duration-200`); multi-column grid at ≥768px, single column below
  - [x] 6.2 Write property test for service cards match data length (Property 1)
    - **Property 1: Service cards match data length**
    - **Validates: Requirements 4.1**
  - [x] 6.3 Write property test for service content rendered verbatim (Property 2)
    - **Property 2: Service content is rendered verbatim**
    - **Validates: Requirements 4.2**
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 7. Implement ProjectsSection component
  - [x] 7.1 Create `components/ProjectsSection.tsx` accepting `projects: Project[]`; render each project as a card with title, description, and optional tag badge; multi-column grid at ≥768px
  - [x] 7.2 Write property test for project cards match data length (Property 3)
    - **Property 3: Project cards match data length**
    - **Validates: Requirements 6.1**
  - [x] 7.3 Write property test for project content rendered verbatim (Property 4)
    - **Property 4: Project content is rendered verbatim**
    - **Validates: Requirements 6.2**
  - _Requirements: 6.1, 6.2, 6.4_

- [x] 8. Implement ContactForm and WhatsAppButton components
  - [x] 8.1 Create `components/ContactForm.tsx` with required fields (name, email, message) and optional phone field; client-side validation showing inline errors for missing required fields; POST to `NEXT_PUBLIC_FORMSPREE_ENDPOINT` on submit; show success message on 2xx, error banner on failure
  - [x] 8.2 Create `components/WhatsAppButton.tsx` accepting `phoneNumber: string`; render `<a href="https://wa.me/{phoneNumber}" target="_blank">Chat on WhatsApp</a>`
  - [x] 8.3 Write property test for phone included in submission payload (Property 5)
    - **Property 5: Phone number is included in submission payload when provided**
    - **Validates: Requirements 7.3a**
  - [x] 8.4 Write property test for empty phone not a validation error (Property 6)
    - **Property 6: Empty phone number does not cause a validation error**
    - **Validates: Requirements 7.3b**
  - [x] 8.5 Write property test for missing required fields produce errors (Property 7)
    - **Property 7: Missing required fields produce inline errors**
    - **Validates: Requirements 7.5**
  - [x] 8.6 Write property test for WhatsApp URL correctly formed (Property 8)
    - **Property 8: WhatsApp button URL is correctly formed**
    - **Validates: Requirements 7.7**
  - [x] 8.7 Write unit tests for ContactForm
    - Assert three required fields and one optional phone field render with correct `required` attributes
    - Mock Formspree fetch → assert success message appears on 2xx
    - Assert error banner appears on network failure
    - _Requirements: 7.3, 7.4, 7.5, 7.6_
  - _Requirements: 7.1, 7.2, 7.3, 7.3a, 7.3b, 7.4, 7.5, 7.6, 7.7, 7.8_

- [x] 9. Implement ContactSection and wire dynamic components
  - Create `components/ContactSection.tsx` with `id="contact"`, heading and intro copy verbatim from PDF, `<ContactForm />`, and `<WhatsAppButton />`; visually separate the two options
  - _Requirements: 7.1, 7.2, 7.8_

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Sanity Studio route and revalidation webhook
  - [x] 11.1 Create `app/studio/[[...index]]/page.tsx` mounting Sanity Studio via `next-sanity`; mark with `'use client'` and `export const dynamic = 'force-dynamic'`
  - [x] 11.2 Create `app/api/revalidate/route.ts` using `parseBody` from `next-sanity/webhook` to verify `SANITY_WEBHOOK_SECRET`; call `revalidatePath('/')` on valid signature; return 401 on invalid
  - [x] 11.3 Write unit tests for revalidation webhook
    - Valid signature → `revalidatePath` called, returns 200
    - Invalid signature → returns 401
    - _Requirements: 8.2, 8.4_
  - _Requirements: 8.2, 8.3, 8.4_

- [x] 12. Assemble app/page.tsx and apply decorative styling
  - [x] 12.1 Create `app/page.tsx` calling `fetchServices`, `fetchProjects`, `fetchContactSettings` from `lib/sanity/fetchWithFallback`; render all section components in order: `<Nav>`, `<HeroSection>`, `<WhatWeDoSection>`, `<ServicesSection>`, `<AboutSection>`, `<ProjectsSection>`, `<ContactSection>`, `<Footer>`
  - [x] 12.2 Add decorative blob elements (absolutely-positioned `div` with `rounded-full`, low opacity, `blur-3xl`) in warm rust/brown tones as background accents in Hero and other sections
  - [x] 12.3 Apply hover transitions (`transition-all duration-200`) to all interactive elements (buttons, cards, links) across all components
  - _Requirements: 1.3, 9.2, 9.4_

- [x] 13. Write property tests for fallback and secrets
  - [x] 13.1 Write property test for Sanity fetch failure renders fallback (Property 10)
    - **Property 10: Sanity fetch failure renders fallback content**
    - Mock `client.fetch` to throw or return null/empty; assert returned data deep-equals corresponding fallback constant
    - **Validates: Requirements 4.1, 4.2, 6.1, 6.2, 7.7, 8.4**
  - [x] 13.2 Write property test for no hardcoded secrets (Property 9)
    - **Property 9: No secrets are hardcoded in source files**
    - Scan source files for literal secret patterns; assert all values are referenced via `process.env.*`
    - **Validates: Requirements 10.3**
  - _Requirements: 8.4, 10.3_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fc.array`, `fc.record`, `fc.emailAddress`, `fc.subarray` arbitraries with a minimum of 100 iterations each
- Tag each property test file with `// Feature: eternity-software-website, Property {N}: {property_text}`
- Property tests live in `__tests__/properties/`, unit tests in `__tests__/unit/`
- All secrets must be read from `process.env.*` — never hardcoded
