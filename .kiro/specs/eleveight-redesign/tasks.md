# Implementation Plan: Eleveight Redesign

## Overview

Apply the Eleveight-inspired dark theme redesign to the existing Next.js 14 website. This is a purely visual transformation — same page structure, same Sanity CMS data flow, same component hierarchy. Changes include new color tokens, Satoshi font, CSS animations, updated component markup/classes, a new ParticleCanvas client component, and updated tests to match the new DOM structure.

## Tasks

- [ ] 1. Update configuration and global styles
  - [x] 1.1 Update tailwind.config.ts with dark theme tokens
    - Replace all color tokens with dark theme values (background: #0f0f0f, surface: #181818, surface-elevated: #222222, text-primary: #ffffff, text-muted: #8a8a8a, accent: #7dd3fc, accent-hover: #a5e1ff, border: rgba(255,255,255,0.06), border-hover: rgba(125,211,252,0.2))
    - Remove old warm beige/orange tokens (background: #f5f0eb, accent: #c0522a, accent-hover: #a3431f, accent-subtle: #f0e0d6, border: #e8ddd6, surface-dark: #2d1f1a)
    - Add surface-elevated and border-hover tokens
    - Update font family to reference Satoshi CSS variable (`--font-sans`)
    - Add custom animation keyframes: float-1, float-2, float-3, bounce-down, gradient-shift, pulse-ring
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 13.3_

  - [x] 1.2 Update app/layout.tsx with Satoshi font and new metadata
    - Replace `Space_Grotesk` import with `localFont` from `next/font/local` pointing to `public/fonts/Satoshi-Regular.woff2`, `Satoshi-Medium.woff2`, `Satoshi-Bold.woff2`, `Satoshi-Black.woff2`
    - Keep `JetBrains_Mono` from `next/font/google`
    - Update CSS variable from `--font-space` to `--font-sans`
    - Update favicon reference to `/new_logo.png`
    - Add `grain` class and `antialiased` to body element
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 12.1, 13.4_

  - [x] 1.3 Rewrite app/globals.css with dark theme animations and utilities
    - Remove: `scanlines`, `noise`, `btn-shimmer`, `typing-cursor`, `input-glow`, dot-grid styles
    - Add: `grain` overlay (fixed, SVG noise at 0.02-0.03 opacity), `section-divider` (gradient line), `card-hover` (translateY + glow), `link-underline` (animated underline), `input-dark` (dark bg + accent focus ring), `text-shimmer` (gradient-shift animation), `btn-pulse` (pulse-ring ::before), `pill-glow` (border + shadow on hover), `scroll-indicator` (bounce-down animation)
    - Add floating orb keyframes (float-1, float-2, float-3)
    - Update `animate-on-scroll` timing and `stagger-children` easing
    - Add comprehensive `@media (prefers-reduced-motion: reduce)` block disabling all new animations
    - _Requirements: 4.6, 4.7, 4.8, 4.9, 6.3, 6.4, 6.5, 6.6, 9.3, 9.4, 9.5, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [x] 2. Implement new components and hooks
  - [x] 2.1 Implement lib/useStagger.ts hook
    - Export a `useStagger` function that returns a ref
    - Use `IntersectionObserver` to detect when the container enters the viewport
    - Add `is-visible` class to the container when it intersects
    - CSS in globals.css handles the staggered child animations via `.stagger-children.is-visible > *:nth-child(n)`
    - _Requirements: 13.1, 13.2_

  - [x] 2.2 Create components/ParticleCanvas.tsx client component
    - Create a `'use client'` component rendering a `<canvas>` element
    - Use `useEffect` + `useRef` for canvas context and animation loop
    - Initialize ~60 particles with `{ x, y, r, dx, dy, opacity }` using `rgba(125,211,252)` fill
    - Resize canvas on window resize
    - Check `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, render static particles only
    - Check `getContext('2d')` availability — render nothing if null
    - Cancel `requestAnimationFrame` on unmount
    - _Requirements: 4.5, 4.13, 12.5_

- [x] 3. Checkpoint
  - Ensure the project builds without errors (`npm run build`), ask the user if questions arise.

- [ ] 4. Update navigation and hero components
  - [x] 4.1 Rewrite components/Nav.tsx for dark theme
    - Change from `sticky` to `fixed top-0 left-0 right-0`
    - Remove scroll progress bar state and DOM element
    - Add `IntersectionObserver` for active section tracking (activeSection state)
    - Implement transparent → semi-transparent background transition on scroll (bg-background/85 + backdrop-blur-xl after 50px)
    - Update logo to `new_logo.png` via `next/image`
    - Add `data-section` attributes and `link-underline` class to nav links
    - Add active state class (accent color + full underline) based on activeSection
    - Update CTA text to "Let's talk" with baby blue pill style (bg-accent text-background)
    - Update all color classes to dark theme tokens
    - Simplify mobile menu styling for dark theme
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 14.6_

  - [x] 4.2 Rewrite components/HeroSection.tsx for dark theme
    - Remove: parallax blobs, dot grid, availability badge, tech stack strip, terminal block, hero illustration, `Image` import, `useRef` for blobs, parallax `useEffect`, `TECH_STACK` constant
    - Add: background `<video>` element (hero-bg.mp4, autoplay, muted, loop, playsinline, 40% opacity) with SVG poster fallback
    - Add: gradient overlays on video (top-to-bottom and left-to-right blending into #0f0f0f)
    - Add: three floating orb `<div>` elements with `orb-1`, `orb-2`, `orb-3` animation classes
    - Add: `<ParticleCanvas />` component import and render
    - Change to centered layout with `text-shimmer` class on "You dream it."
    - Add `btn-pulse` class to primary CTA button, style as baby blue pill
    - Replace trust badge `<ul>` with pill-shaped `<span>` elements using `pill-glow` class
    - Add scroll indicator `<div>` at bottom with `scroll-indicator` class and bounce animation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.13, 12.2, 14.1, 14.2, 14.4, 14.5_

- [ ] 5. Update content sections
  - [x] 5.1 Rewrite components/WhatWeDoSection.tsx for dark theme
    - Change from card grid to 12-column grid (4-col left panel, 8-col right panel)
    - Replace `capabilities` from `string[]` to `Capability[]` objects with `{ title, description }`
    - Add numbered prefixes (01-05) in monospace accent color at reduced opacity
    - Add hover indent (`hover:pl-2`) with 300ms transition and heading color change to accent
    - Add `section-divider` at top
    - Add monospace uppercase label ("What we do") in accent color
    - Separate items with 1px border-b except last item
    - Remove background blobs
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 5.2 Update components/ServicesSection.tsx for dark theme
    - Update card classes: `bg-surface`, `border-border`, add `card-hover` class, `hover:border-border-hover`
    - Add gradient overlay div inside each card (opacity-0, group-hover:opacity-100, accent at 3%)
    - Remove left accent line on hover
    - Update icon container: `bg-accent/10 text-accent` → `group-hover:bg-accent group-hover:text-background`
    - Add centered monospace uppercase label ("Services") above heading in accent color
    - Remove background blobs
    - Add `section-divider` at top
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [x] 5.3 Rewrite components/AboutSection.tsx for dark theme
    - Change to 12-column grid (5-col image, 7-col text)
    - Update image source to `about_illustration.jpg` with `next/image`
    - Add `glow-accent` class to image container, rounded-2xl, border
    - Add monospace uppercase label ("About us") in accent color
    - Reverse order on mobile (text first via `order-1`/`order-2`)
    - Add `section-divider` at top
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 12.3_

  - [x] 5.4 Rewrite components/CtaBanner.tsx for dark theme
    - Replace gradient/blob background with `<img>` (or `next/image`) for `cta-bg.jpg`
    - Add dark overlay div (bg-background/70)
    - Update to `rounded-3xl` with 1px border in border color
    - Center-align heading, description, and CTA button
    - Update button to baby blue pill style (bg-accent text-background)
    - Add `section-divider` at top
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 12.4_

  - [x] 5.5 Update components/ProjectsSection.tsx for dark theme
    - Change to 3-column grid (lg), 2-column (md), 1-column (mobile)
    - Add hover overlay with "View project →" pill label (bg-background/50, accent text + border pill)
    - Update card classes to dark theme: `bg-surface`, `border-border`, `card-hover`, `hover:border-border-hover`
    - Change image aspect ratio to `aspect-[4/3]`
    - Add monospace tag label in accent color
    - Add `section-divider` at top
    - Remove background blob
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 6. Update contact, footer, and remaining components
  - [x] 6.1 Update components/ContactSection.tsx for dark theme
    - Update info row icon containers: dark surface bg, border, hover accent glow
    - Add monospace uppercase label ("Contact") in accent color
    - Update heading and description text colors
    - Style form container with `bg-surface rounded-2xl border border-border`
    - Add `section-divider` at top
    - Remove background blob
    - _Requirements: 10.3, 10.4_

  - [x] 6.2 Update components/ContactForm.tsx for dark theme
    - Replace `input-glow` with `input-dark` class on all inputs/textarea
    - Update error styling to dark theme (bg-red-500/10, text-red-400)
    - Update submit button to baby blue pill style (bg-accent text-background)
    - Update label colors to text-muted
    - Update success state styling for dark theme
    - _Requirements: 10.1, 10.2, 10.5_

  - [x] 6.3 Rewrite components/Footer.tsx for dark theme
    - Remove `bg-surface-dark` background, use `border-t border-border` (inherits page bg)
    - Update section headers to `font-mono uppercase tracking-widest` with reduced opacity
    - Update logo to `new_logo.png`
    - Remove `noise` class
    - Update link hover colors to `hover:text-text-primary`
    - Update copyright text opacity
    - Use 4-column grid on large screens
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 12.1_

  - [x] 6.4 Update components/WhatsAppButton.tsx for dark theme
    - Update text colors to dark theme tokens (text-text-primary, text-text-muted)
    - Update hover color references
    - Minor class adjustments for dark context
    - _Requirements: 10.3_

- [x] 7. Checkpoint
  - Ensure the project builds without errors (`npm run build`), ask the user if questions arise.

- [ ] 8. Update unit tests
  - [x] 8.1 Update __tests__/unit/Nav.test.tsx
    - Verify fixed positioning class present
    - Verify logo renders with new_logo.png src
    - Verify "Let's talk" CTA text present
    - Verify no progress bar element in DOM
    - Verify mobile menu toggle still works
    - Remove assertions for scroll progress bar
    - _Requirements: 3.1, 3.6, 3.7, 3.8, 14.6_

  - [x] 8.2 Update __tests__/unit/StaticSections.test.tsx
    - Verify WhatWeDo renders numbered items (01-05) with titles and descriptions
    - Verify About renders image with .jpg extension
    - Verify CTA banner renders background image element
    - Verify section dividers present where expected
    - _Requirements: 5.1, 5.3, 7.2, 8.1, 13.6_

  - [x] 8.3 Update __tests__/unit/ContactForm.test.tsx
    - Verify `input-dark` class on inputs
    - Verify form validation still works (name, email, message required)
    - Verify success/error states render correctly
    - Verify submit button has accent pill styling
    - _Requirements: 10.1, 10.2, 10.5_

  - [x] 8.4 Update __tests__/unit/ContactSection.test.tsx
    - Verify contact info rows render with correct labels
    - Verify WhatsApp button present
    - Verify form container has surface styling (bg-surface, border)
    - _Requirements: 10.3, 10.4_

- [ ] 9. Update property-based tests
  - [x]* 9.1 Update __tests__/properties/ServicesSection.test.tsx
    - Update assertions for new card structure (gradient overlay, card-hover class, no left accent line)
    - Verify all services still render with correct titles/descriptions for arbitrary service arrays
    - **Property 6: Data Integrity — services output remains data-driven**
    - **Validates: Requirements 6.1, 6.2**

  - [x]* 9.2 Update __tests__/properties/ProjectsSection.test.tsx
    - Update assertions for new card structure (3-col grid, hover overlay, aspect-[4/3])
    - Verify all projects still render with correct data for arbitrary project arrays
    - **Property 6: Data Integrity — projects output remains data-driven**
    - **Validates: Requirements 9.1, 9.2**

  - [x]* 9.3 Update __tests__/properties/ContactForm.test.tsx
    - Update assertions for new input classes (input-dark instead of input-glow)
    - Verify validation rules still hold for arbitrary inputs
    - **Property 5: Accessibility Preservation — aria attributes preserved**
    - **Validates: Requirements 10.1, 10.2**

  - [x]* 9.4 Update __tests__/properties/WhatsAppButton.test.tsx
    - Update class assertions for dark theme tokens
    - Verify phone number cleaning logic still works for arbitrary phone strings
    - **Property 5: Accessibility Preservation — aria-label preserved**
    - **Validates: Requirements 10.3**

  - [x]* 9.5 Write property test for color token consistency
    - **Property 1: Color Token Consistency — every text element uses text-primary or text-muted tokens, no raw hex in className strings**
    - Render each section component and verify no raw hex color values appear in className attributes
    - **Validates: Requirements 1.1, 1.4, 1.5**

  - [x]* 9.6 Write property test for reduced motion compliance
    - **Property 3: Reduced Motion Compliance — when prefers-reduced-motion: reduce is active, no running animations**
    - Mock matchMedia to return `prefers-reduced-motion: reduce`
    - Verify ParticleCanvas does not start animation loop
    - Verify CSS animations are disabled via the media query block
    - **Validates: Requirements 4.13, 13.5**

- [x] 10. Final checkpoint
  - Ensure all tests pass (`npm run test`), verify build succeeds (`npm run build`), ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Font files (Satoshi woff2) must be manually downloaded from Fontshare and placed in `public/fonts/` before task 1.2
- The prototype at `.kiro/prototypes/eleveight-redesign/preview.html` serves as the visual reference for all styling decisions
- Assets already exist in `public/`: new_logo.png, hero-bg.mp4, about_illustration.jpg, cta-bg.jpg

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.2"] },
    { "id": 2, "tasks": ["4.1", "4.2", "5.1", "5.2", "5.3", "5.4", "5.5"] },
    { "id": 3, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 4, "tasks": ["8.1", "8.2", "8.3", "8.4"] },
    { "id": 5, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6"] }
  ]
}
```
