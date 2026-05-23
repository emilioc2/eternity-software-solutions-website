# Technical Design Document

## Overview

This design applies the Eleveight-inspired dark theme redesign to the existing Next.js 14 App Router website. The architecture remains unchanged — same page structure, same Sanity CMS data flow, same component hierarchy. Changes are purely visual: new color tokens, new font, new CSS animations, and updated component markup/classes.

## Architecture

### Font Loading Strategy

Since `next/font` does not natively support Fontshare, we use `next/font/local` with self-hosted Satoshi font files downloaded from Fontshare.

**Files to add:**
- `public/fonts/Satoshi-Regular.woff2`
- `public/fonts/Satoshi-Medium.woff2`
- `public/fonts/Satoshi-Bold.woff2`
- `public/fonts/Satoshi-Black.woff2`

**Layout change:** Replace `Space_Grotesk` import with `localFont` pointing to the Satoshi files. Keep `JetBrains_Mono` from `next/font/google`.

### Animation Architecture

| Animation | Implementation | Location |
|-----------|---------------|----------|
| Floating orbs | CSS `@keyframes` + Tailwind arbitrary classes | `globals.css` |
| Particle canvas | Client-side JS with `useEffect` + `requestAnimationFrame` | `components/ParticleCanvas.tsx` |
| Gradient shimmer text | CSS `@keyframes` with `background-position` animation | `globals.css` |
| Button pulse ring | CSS `@keyframes` with `::before` pseudo-element | `globals.css` |
| Scroll indicator bounce | CSS `@keyframes` | `globals.css` |
| Card hover lift + glow | Tailwind `transition` + `hover:` utilities | Component classes |
| Pill hover glow | CSS class with `transition` on `border-color`, `box-shadow`, `color` | `globals.css` |
| Nav active tracking | JS `IntersectionObserver` in client component | `components/Nav.tsx` |
| Section dividers | CSS class with `linear-gradient` background | `globals.css` |
| Grain overlay | CSS `::after` pseudo-element with SVG noise | `globals.css` |

### Reduced Motion

All CSS animations wrapped in `@media (prefers-reduced-motion: reduce)` to disable. The particle canvas checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and skips `requestAnimationFrame` if true.

## File Changes

### Configuration Files

#### `tailwind.config.ts`
- Replace all color tokens with dark theme values
- Add `surface-elevated` and `border-hover` tokens
- Update font family to reference Satoshi CSS variable
- Add custom animation keyframes for `float-1`, `float-2`, `float-3`, `bounce-down`, `gradient-shift`, `pulse-ring`

#### `app/layout.tsx`
- Replace `Space_Grotesk` with `localFont` for Satoshi
- Keep `JetBrains_Mono` from `next/font/google`
- Update favicon reference to `/new_logo.png`
- Add `grain` class to body wrapper
- Add `antialiased` to body classes

#### `app/globals.css`
- Remove: `scanlines`, `noise`, `btn-shimmer`, `typing-cursor`, `input-glow`, dot-grid styles
- Add: `grain` overlay, `section-divider`, `card-hover`, `link-underline`, `input-dark`, `text-shimmer`, `btn-pulse`, `pill-glow`, `scroll-indicator`, floating orb keyframes
- Update: `animate-on-scroll` timing, `stagger-children` easing, `page-enter` animation
- Add: `@media (prefers-reduced-motion: reduce)` block disabling all new animations

### New Components

#### `components/ParticleCanvas.tsx` (new file)
```typescript
'use client';
// Client component rendering a <canvas> with ~60 floating particles
// Uses useEffect + useRef for canvas context
// Checks prefers-reduced-motion before starting animation loop
// Resizes canvas on window resize
// Particles: { x, y, r, dx, dy, opacity } with rgba(125,211,252) fill
```

### Modified Components

#### `components/Nav.tsx`
- Change from `sticky` to `fixed top-0 left-0 right-0`
- Remove scroll progress bar
- Add `IntersectionObserver` for active section tracking
- Update logo to `new_logo.png`
- Add `data-section` attributes to nav links
- Add active state class (accent color + underline)
- Update CTA text to "Let's talk"
- Update all color classes to dark theme tokens
- Simplify mobile menu styling

#### `components/HeroSection.tsx`
- Remove: parallax blobs, dot grid, availability badge, tech stack strip, terminal block, hero illustration, Image import
- Add: background `<video>` element with gradient overlays
- Add: three floating orb `<div>` elements with animation classes
- Add: `<ParticleCanvas />` component
- Change headline to centered layout with `text-shimmer` class on "You dream it."
- Add `btn-pulse` class to primary CTA
- Replace trust badge list with pill-shaped `<span>` elements using `pill-glow` class
- Add scroll indicator `<div>` at bottom with bounce animation
- Remove `useEffect` for parallax (no longer needed)

#### `components/WhatWeDoSection.tsx`
- Change from card grid to 12-column grid (4/8 split)
- Replace capability strings with objects `{ title, description }`
- Add numbered prefixes (01-05) in monospace accent color
- Add hover indent (`hover:pl-2`) and heading color change
- Add section divider at top
- Add monospace uppercase label
- Remove background blobs

#### `components/ServicesSection.tsx`
- Update card classes: `bg-surface`, `border-border`, `card-hover`, `hover:border-border-hover`
- Add gradient overlay div inside each card (opacity-0, group-hover:opacity-100)
- Remove left accent line on hover
- Update icon container colors to accent/10 → accent on hover
- Add centered monospace label above heading
- Remove background blobs
- Add section divider at top

#### `components/AboutSection.tsx`
- Change to 12-column grid (5-col image, 7-col text)
- Update image source to `about_illustration.jpg`
- Add `glow-accent` class to image container
- Add monospace uppercase label
- Remove any stats if present
- Add section divider at top
- Reverse order on mobile (text first via `order-1`/`order-2`)

#### `components/CtaBanner.tsx`
- Replace gradient/blob background with `<img>` for `cta-bg.jpg`
- Add dark overlay div (bg-background/70)
- Update to `rounded-3xl` with border
- Update button to baby blue pill style
- Add section divider at top

#### `components/ProjectsSection.tsx`
- Change to 3-column grid (lg), 2-column (md), 1-column (mobile)
- Add hover overlay with "View project →" pill label
- Update card classes to dark theme
- Add `card-hover` class for lift + glow
- Change image aspect ratio to `aspect-[4/3]`
- Add monospace tag label in accent color
- Add section divider at top
- Remove background blob

#### `components/ContactSection.tsx`
- Update info row icon containers: dark surface bg, border, hover accent glow
- Add monospace uppercase label
- Update heading and description text
- Add section divider at top
- Remove background blob

#### `components/ContactForm.tsx`
- Replace `input-glow` with `input-dark` class on all inputs
- Update error styling to dark theme (red-500/10 bg, red-400 text)
- Update submit button to baby blue pill style
- Update label colors to text-muted
- Add success state with accent icon

#### `components/Footer.tsx`
- Update background from `bg-surface-dark` to `border-t border-border` (no bg, inherits page bg)
- Update section headers to monospace, uppercase, reduced opacity
- Update logo to `new_logo.png`
- Remove `noise` class
- Update link hover colors
- Update copyright text opacity

#### `components/WhatsAppButton.tsx`
- Update text colors to dark theme tokens
- Update hover color to whatsapp green (already correct)
- Minor class adjustments for dark context

### Assets

| Asset | Location | Usage |
|-------|----------|-------|
| `new_logo.png` | `public/new_logo.png` | Nav logo, footer logo, favicon |
| `hero-bg.mp4` | `public/hero-bg.mp4` | Hero background video |
| `about_illustration.jpg` | `public/about_illustration.jpg` | About section image |
| `cta-bg.jpg` | `public/cta-bg.jpg` | CTA banner background |
| `Satoshi-*.woff2` | `public/fonts/` | Font files (4 weights) |

### `lib/useStagger.ts`

Implement the stagger hook using `IntersectionObserver`:
```typescript
// Returns a ref to attach to a container
// When container enters viewport, adds 'is-visible' class
// CSS handles the staggered child animations via .stagger-children.is-visible > *:nth-child(n)
```

## Data Flow

No changes to data flow. All Sanity fetches, fallback data, types, and the page-level `Promise.all` remain identical. Components receive the same props — only their rendering markup changes.

## Testing Impact

Existing tests will need updates due to:
1. Changed class names and DOM structure
2. Removed elements (progress bar, tech stack, terminal, etc.)
3. New elements (particle canvas, video, orbs)
4. Changed text content in some labels

Tests to update:
- `__tests__/unit/Nav.test.tsx` — new DOM structure, removed progress bar
- `__tests__/unit/StaticSections.test.tsx` — updated section markup
- `__tests__/unit/ContactForm.test.tsx` — updated input classes
- `__tests__/unit/ContactSection.test.tsx` — updated layout
- `__tests__/properties/ServicesSection.test.tsx` — updated card structure
- `__tests__/properties/ProjectsSection.test.tsx` — updated card structure
- `__tests__/properties/WhatsAppButton.test.tsx` — minor class changes


## Components and Interfaces

### ParticleCanvas (new)

```typescript
// components/ParticleCanvas.tsx
'use client';

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  opacity: number;
}

// Props: none (self-contained)
// Renders: <canvas> element filling parent container
// Lifecycle: useEffect initializes particles and starts requestAnimationFrame loop
// Cleanup: cancels animation frame on unmount
// Reduced motion: checks matchMedia, renders static particles if reduced motion preferred
export function ParticleCanvas(): JSX.Element;
```

### Nav (modified interface)

```typescript
// components/Nav.tsx
// No prop changes — still receives no props
// Internal state additions:
//   activeSection: string — tracked via IntersectionObserver
// Removed state:
//   progress: number — scroll progress bar removed
```

### HeroSection (modified interface)

```typescript
// components/HeroSection.tsx
// No prop changes — still receives no props
// Removed: blob1Ref, blob2Ref, parallax useEffect
// Added: imports ParticleCanvas component
// Constants removed: TECH_STACK
// Constants kept: TRUST_BADGES
```

### WhatWeDoSection (modified interface)

```typescript
// components/WhatWeDoSection.tsx
// No prop changes — still receives no props
// Data structure change:
interface Capability {
  title: string;
  description: string;
}
// capabilities changes from string[] to Capability[]
```

### All other components

Props and interfaces remain unchanged:
- `ServicesSection({ services: Service[] })`
- `ProjectsSection({ projects: Project[] })`
- `ContactSection({ settings: ContactSettings })`
- `ContactForm()` — no props
- `WhatsAppButton({ phoneNumber: string })`
- `Footer()` — no props
- `CtaBanner()` — no props
- `AboutSection()` — no props

## Data Models

No data model changes. All Sanity types remain identical:

```typescript
// lib/sanity/types.ts — NO CHANGES
export interface Service { _id: string; title: string; description: string; }
export interface SanityImage { asset: { _ref: string; url: string; }; alt?: string; }
export interface Project { _id: string; title: string; description: string; tag?: string; url?: string; previewImage?: SanityImage; }
export interface ContactSettings { whatsappNumber: string; }
```

The Tailwind config color tokens change but these are not data models — they are design tokens defined in `tailwind.config.ts`.

## Error Handling

- **Video load failure**: The `<video>` element uses a solid-color SVG poster as fallback. If the video fails to load, the poster (matching background color) displays seamlessly.
- **Font load failure**: Satoshi loaded via `next/font/local` with `system-ui` as fallback in the font stack. If woff2 files are missing, the site renders with system fonts.
- **Image load failure**: `about_illustration.jpg` and `cta-bg.jpg` are decorative. Their containers have solid background colors that show through if images fail. No broken layout.
- **Canvas not supported**: ParticleCanvas checks for canvas context availability. If `getContext('2d')` returns null, the component renders nothing (empty canvas, no error).
- **IntersectionObserver not supported**: Nav active tracking wrapped in a feature check. Falls back to no active highlighting.

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

All existing test files updated to match new DOM structure:

1. **Nav.test.tsx**: Verify fixed positioning class, logo renders with new_logo.png src, "Let's talk" CTA present, no progress bar element, mobile menu toggle works
2. **StaticSections.test.tsx**: Verify WhatWeDo renders numbered items (01-05), About renders image with .jpg extension, CTA banner renders background image, section dividers present
3. **ContactForm.test.tsx**: Verify input-dark class on inputs, form validation still works, success/error states render correctly
4. **ContactSection.test.tsx**: Verify contact info rows render, WhatsApp button present, form container has surface styling

### Property Tests (fast-check)

Existing property tests updated for new class names but logic unchanged:
- **ServicesSection**: Still verifies all services render with correct titles/descriptions
- **ProjectsSection**: Still verifies all projects render with correct data
- **ContactForm**: Still verifies validation rules hold for arbitrary inputs
- **WhatsAppButton**: Still verifies phone number cleaning logic

### Coverage Target

Maintain 80% coverage threshold across statements, branches, functions, and lines as defined in `vitest.config.ts`.

## Correctness Properties

### Property 1: Color Token Consistency
Every text element uses either `text-primary` (#ffffff) or `text-muted` (#8a8a8a). No raw hex values in component className strings.

**Validates: Requirements 1.1, 1.4, 1.5**

### Property 2: Accent Exclusivity
The accent color (#7dd3fc) is used exclusively for interactive elements (links, buttons, hover states, labels) — never for body text.

**Validates: Requirements 1.6**

### Property 3: Reduced Motion Compliance
When `prefers-reduced-motion: reduce` is active, no element on the page has a running CSS animation or JS animation loop.

**Validates: Requirements 4.13, 13.5**

### Property 4: Asset Fallback Resilience
If any of the 4 new assets (video, 2 images, logo) fail to load, the page remains fully functional with no layout shift.

**Validates: Requirements 12.5**

### Property 5: Accessibility Preservation
All existing `aria-label`, `aria-expanded`, `aria-required`, `role` attributes are preserved. New decorative elements use `aria-hidden="true"`.

**Validates: Requirements 3.1, 4.1**

### Property 6: Data Integrity
No Sanity fetch logic, query, or fallback data is modified. Component output for dynamic content (services, projects, contact settings) remains data-driven.

**Validates: Requirements 6.1, 9.1**
