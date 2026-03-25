---
inclusion: always
---

# Code Quality Standards

## General

- All code must be written in TypeScript with strict mode enabled (`"strict": true` in tsconfig)
- No `any` types — use proper interfaces or generics
- No hardcoded secrets, API keys, phone numbers, or environment-specific values — always use `process.env.*`
- All environment variables must be documented in `.env.example`
- No unused imports, variables, or dead code
- Prefer named exports over default exports for components and utilities (exception: Next.js page/layout files)

## Next.js Conventions

- Use the App Router (`app/` directory) — no Pages Router patterns
- Server Components by default; add `'use client'` only when browser APIs or React state/effects are needed
- Data fetching happens in Server Components or Route Handlers — never expose API keys to the client
- Use `next/font` for all font loading — no `<link>` tags to Google Fonts
- Use `next/image` for all images — no raw `<img>` tags
- Route Handlers live in `app/api/*/route.ts`

## Component Standards

- One component per file
- Props must be typed with explicit TypeScript interfaces defined in the same file or imported from `lib/sanity/types.ts`
- Components must be pure and side-effect free unless explicitly a Client Component
- All interactive elements must have accessible labels (`aria-label`, `aria-expanded`, etc.)
- Smooth hover transitions must use `transition-all duration-200` (150–300ms range)

## Styling

- Use Tailwind CSS utility classes only — no inline styles, no CSS modules, no styled-components
- Use the custom color tokens defined in `tailwind.config.ts` (e.g. `bg-accent`, `text-text-primary`) — do not use raw hex values in className strings
- Dark sections use `bg-surface-dark text-white`
- Cards use `bg-surface rounded-2xl border border-border`
- Buttons use `rounded-full` with `transition-colors duration-200`

## Testing Requirements

- Minimum **80% code coverage** across statements, branches, functions, and lines
- Run coverage with: `npx vitest run --coverage`
- Coverage thresholds enforced in `vitest.config.ts`:
  ```ts
  coverage: {
    provider: 'v8',
    thresholds: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  }
  ```
- Unit tests live in `__tests__/unit/` — use Vitest + React Testing Library
- Property-based tests live in `__tests__/properties/` — use fast-check with minimum 100 iterations
- Each property test must include the tag comment: `// Feature: eternity-software-website, Property {N}: {description}`
- Mock external dependencies (Sanity client, Formspree fetch) in tests — never make real network calls
- Test file naming: `ComponentName.test.tsx` for components, `moduleName.test.ts` for utilities

## Sanity / CMS

- All Sanity fetches must go through `lib/sanity/fetchWithFallback.ts` — never call `client.fetch` directly from page or component files
- Fallback data in `lib/sanity/fallbackData.ts` must stay in sync with the approved PDF copy
- Sanity schemas must include `validation: (Rule) => Rule.required()` on all required fields
- The `contactSettings` schema is a singleton — keep `__experimental_actions: ['update', 'publish']`

## Git / PR Standards

- Commit messages must be descriptive and reference the task number (e.g. `feat: implement ServicesSection [task 6]`)
- No commented-out code in committed files
- Each task should be a focused, reviewable unit of work
