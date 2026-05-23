# Requirements Document

## Introduction

Visual redesign of the Eternity Software Solutions website, transitioning from a warm beige/cream theme with orange accents to a dark theme with baby blue accents. The redesign applies the approved prototype at `.kiro/prototypes/eleveight-redesign/preview.html`. The site structure, content, Sanity CMS integration, and data flow remain unchanged — only the visual presentation, typography, layout arrangements, and animations change.

## Glossary

- **Website**: The Eternity Software Solutions Next.js application served at the root URL
- **Theme_System**: The Tailwind CSS configuration and CSS custom properties that define the visual design tokens (colors, fonts, spacing)
- **Nav_Component**: The top-level navigation bar rendered on every page
- **Hero_Section**: The full-viewport introductory section at the top of the page
- **WhatWeDo_Section**: The section describing the team's capabilities in a numbered list format
- **Services_Section**: The section displaying service offerings as cards, data sourced from Sanity CMS
- **About_Section**: The section presenting company information with an image and text
- **CTA_Banner**: The call-to-action section with a background image and overlay
- **Projects_Section**: The section showcasing portfolio projects in a grid, data sourced from Sanity CMS
- **Contact_Section**: The section containing contact information and a form
- **Footer_Component**: The bottom section with navigation links, services list, and contact details
- **Particle_Canvas**: An HTML5 canvas element rendering animated floating particles in the Hero_Section
- **Floating_Orbs**: Blurred, animated gradient circles providing ambient background movement
- **Scroll_Indicator**: An animated arrow at the bottom of the Hero_Section prompting users to scroll down
- **Satoshi_Font**: The primary sans-serif typeface loaded from Fontshare (weights: 400, 500, 700, 900)
- **JetBrains_Mono_Font**: The monospace typeface used for code-style labels and section headers
- **Dark_Theme**: The color scheme using #0f0f0f background, #ffffff primary text, and #7dd3fc accent
- **Reduced_Motion**: The user's operating system preference for minimized animations (prefers-reduced-motion: reduce)

## Requirements

### Requirement 1: Dark Theme Color System

**User Story:** As a visitor, I want the website to use a dark color scheme with baby blue accents, so that the visual identity feels modern and premium.

#### Acceptance Criteria

1. THE Theme_System SHALL define the background color as #0f0f0f
2. THE Theme_System SHALL define the surface color as #181818
3. THE Theme_System SHALL define a surface-elevated color as #222222
4. THE Theme_System SHALL define the primary text color as #ffffff
5. THE Theme_System SHALL define the muted text color as #8a8a8a
6. THE Theme_System SHALL define the accent color as #7dd3fc
7. THE Theme_System SHALL define the accent-hover color as #a5e1ff
8. THE Theme_System SHALL define the border color as rgba(255,255,255,0.06)
9. THE Theme_System SHALL define the border-hover color as rgba(125,211,252,0.2)
10. THE Theme_System SHALL remove the previous warm beige (#f5f0eb), orange (#c0522a), and cream color tokens

### Requirement 2: Typography System

**User Story:** As a visitor, I want the website to use the Satoshi font for body text and JetBrains Mono for monospace elements, so that the typography feels contemporary and legible on dark backgrounds.

#### Acceptance Criteria

1. THE Website SHALL load Satoshi_Font from Fontshare at weights 400, 500, 700, and 900
2. THE Website SHALL load JetBrains_Mono_Font at weights 400 and 500
3. THE Theme_System SHALL set Satoshi_Font as the primary sans-serif font family with system-ui as fallback
4. THE Theme_System SHALL set JetBrains_Mono_Font as the monospace font family
5. THE Website SHALL use the `next/font` mechanism or an equivalent local/preconnect strategy that avoids render-blocking font loads
6. THE Website SHALL remove the Space Grotesk font dependency

### Requirement 3: Fixed Transparent Navigation

**User Story:** As a visitor, I want the navigation bar to be fixed at the top and become translucent with a blur effect on scroll, so that I always have access to navigation without it obstructing content.

#### Acceptance Criteria

1. THE Nav_Component SHALL use fixed positioning at the top of the viewport
2. WHILE the page scroll position is zero, THE Nav_Component SHALL render with a fully transparent background
3. WHEN the page scroll position exceeds 50 pixels, THE Nav_Component SHALL render with a semi-transparent background (#0f0f0f at 85% opacity) and a 20px backdrop blur
4. WHEN the page scroll position exceeds 50 pixels, THE Nav_Component SHALL display a 1px bottom border at rgba(255,255,255,0.06)
5. THE Nav_Component SHALL highlight the currently visible section's link with the accent color (#7dd3fc) and a full-width underline
6. THE Nav_Component SHALL display the new_logo.png as the site logo
7. THE Nav_Component SHALL include a "Let's talk" CTA button styled as a baby blue pill linking to the contact section
8. THE Nav_Component SHALL remove the scroll progress bar from the previous design

### Requirement 4: Hero Section with Video Background and Animations

**User Story:** As a visitor, I want the hero section to feature a background video, floating orbs, particle effects, and an animated gradient headline, so that the first impression is visually engaging and memorable.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a centered layout with text content aligned to the center
2. THE Hero_Section SHALL render a background video (hero-bg.mp4) that autoplays, loops, is muted, and uses playsinline, with 40% opacity
3. THE Hero_Section SHALL overlay gradient masks on the video to blend it into the #0f0f0f background
4. THE Hero_Section SHALL render three Floating_Orbs with independent animation timings (12s, 15s, 18s cycles)
5. THE Hero_Section SHALL render a Particle_Canvas with approximately 60 particles colored rgba(125,211,252) at varying opacities
6. THE Hero_Section SHALL display the headline "You dream it." with a shimmer gradient animation (baby blue to white, 6s cycle)
7. THE Hero_Section SHALL display a primary CTA button ("Start a project") with a pulse ring animation (2.5s cycle, baby blue border expanding outward)
8. THE Hero_Section SHALL display trust badges as pill-shaped elements with border glow on hover
9. THE Hero_Section SHALL display a Scroll_Indicator arrow at the bottom with a bounce animation (2s cycle)
10. THE Hero_Section SHALL remove the "Now accepting projects" badge from the previous design
11. THE Hero_Section SHALL remove the tech stack marquee strip from the previous design
12. THE Hero_Section SHALL remove the terminal block and hero illustration from the previous design
13. WHILE Reduced_Motion is active, THE Hero_Section SHALL disable all animations (particles, orbs, shimmer, pulse ring, scroll indicator)

### Requirement 5: What We Do Section Layout

**User Story:** As a visitor, I want the "What We Do" section to use a two-column layout with numbered items that respond to hover, so that the content is scannable and interactive.

#### Acceptance Criteria

1. THE WhatWeDo_Section SHALL use a 12-column grid with a 4-column left panel and 8-column right panel on large screens
2. THE WhatWeDo_Section SHALL display a monospace uppercase label ("What we do") in the accent color above the heading in the left panel
3. THE WhatWeDo_Section SHALL display list items with a monospace-styled number prefix (01, 02, 03, etc.) in accent color at reduced opacity
4. WHEN a list item is hovered, THE WhatWeDo_Section SHALL indent the item by adding left padding with a 300ms transition
5. WHEN a list item is hovered, THE WhatWeDo_Section SHALL change the item heading color to the accent color
6. THE WhatWeDo_Section SHALL separate items with a 1px border in the border color, except the last item

### Requirement 6: Services Section Card Grid

**User Story:** As a visitor, I want the services section to display cards in a 2x2 grid with hover effects, so that each service offering is visually distinct and interactive.

#### Acceptance Criteria

1. THE Services_Section SHALL display service cards in a 2-column grid on medium screens and above (single column on mobile)
2. THE Services_Section SHALL style each card with bg-surface, rounded-2xl corners, and a 1px border in the border color
3. WHEN a service card is hovered, THE Services_Section SHALL translate the card upward by 4px
4. WHEN a service card is hovered, THE Services_Section SHALL change the card border to border-hover color (rgba(125,211,252,0.2))
5. WHEN a service card is hovered, THE Services_Section SHALL display a gradient overlay (accent color at 3% opacity fading to transparent)
6. WHEN a service card is hovered, THE Services_Section SHALL apply a box shadow glow (rgba(125,211,252,0.08) at 20px spread, rgba(125,211,252,0.04) at 40px spread)
7. THE Services_Section SHALL display a centered section header with monospace uppercase label in accent color

### Requirement 7: About Section Layout

**User Story:** As a visitor, I want the about section to show an image alongside descriptive text in a clean grid layout, so that the company story is presented with visual context.

#### Acceptance Criteria

1. THE About_Section SHALL use a 12-column grid with a 5-column image area and 7-column text area on large screens
2. THE About_Section SHALL display the about_illustration.jpg image with rounded-2xl corners, a border, and a subtle accent glow shadow
3. THE About_Section SHALL display a monospace uppercase label ("About us") in the accent color above the heading
4. THE About_Section SHALL remove the statistics row from the previous design
5. THE About_Section SHALL display the image on the left and text on the right on large screens, with reversed order on mobile (text first)

### Requirement 8: CTA Banner with Background Image

**User Story:** As a visitor, I want the CTA banner to feature a background image with a dark overlay, so that the call-to-action stands out as a visually distinct break in the page.

#### Acceptance Criteria

1. THE CTA_Banner SHALL display cta-bg.jpg as a full-cover background image
2. THE CTA_Banner SHALL overlay the background with a semi-transparent dark layer (#0f0f0f at 70% opacity)
3. THE CTA_Banner SHALL use rounded-3xl corners with a 1px border in the border color
4. THE CTA_Banner SHALL center-align the heading, description, and CTA button
5. THE CTA_Banner SHALL style the CTA button as a baby blue pill with the background color as text

### Requirement 9: Projects Section Grid with Hover Overlay

**User Story:** As a visitor, I want the projects section to display in a 3-column grid with a hover overlay showing "View project →", so that I can browse the portfolio and understand each card is interactive.

#### Acceptance Criteria

1. THE Projects_Section SHALL display project cards in a 3-column grid on large screens, 2-column on medium, and single column on mobile
2. THE Projects_Section SHALL style each card with bg-surface, rounded-2xl corners, and a 1px border in the border color
3. WHEN a project card is hovered, THE Projects_Section SHALL display a semi-transparent overlay (background color at 50% opacity) over the project image
4. WHEN a project card is hovered, THE Projects_Section SHALL display a "View project →" label centered on the overlay, styled with accent color text and an accent border pill
5. WHEN a project card is hovered, THE Projects_Section SHALL translate the card upward by 4px and change the border to border-hover color
6. THE Projects_Section SHALL display a monospace category label in accent color above each project title

### Requirement 10: Dark-Themed Contact Form

**User Story:** As a visitor, I want the contact form to use dark-themed inputs with accent-colored focus states, so that the form feels integrated with the overall dark design.

#### Acceptance Criteria

1. THE Contact_Section SHALL style form inputs with a dark background (rgba(255,255,255,0.03)) and a 1px border (rgba(255,255,255,0.06))
2. WHEN a form input receives focus, THE Contact_Section SHALL change the border color to rgba(125,211,252,0.5) and apply a 3px accent-colored ring (rgba(125,211,252,0.08))
3. THE Contact_Section SHALL display contact information items (email, location, response time, phone) with icon containers that glow with accent color on hover
4. THE Contact_Section SHALL style the form container with bg-surface, rounded-2xl corners, and a border
5. THE Contact_Section SHALL style the submit button as a baby blue pill matching the site CTA style

### Requirement 11: Minimal Footer with Monospace Headers

**User Story:** As a visitor, I want the footer to use monospace-styled section headers and a minimal layout, so that it feels consistent with the dark theme and typographic system.

#### Acceptance Criteria

1. THE Footer_Component SHALL display section headers in monospace font, uppercase, with reduced opacity and widest letter-spacing
2. THE Footer_Component SHALL use a 4-column grid on large screens (brand, navigation, services, contact)
3. THE Footer_Component SHALL display the new_logo.png in the brand column
4. THE Footer_Component SHALL separate the main content from the copyright bar with a 1px border in the border color
5. THE Footer_Component SHALL display link items that transition to primary text color on hover

### Requirement 12: New Asset Integration

**User Story:** As a developer, I want the redesign to reference the correct new assets, so that the visual identity is consistent with the approved prototype.

#### Acceptance Criteria

1. THE Website SHALL use new_logo.png as both the navigation logo and the favicon
2. THE Hero_Section SHALL reference hero-bg.mp4 as the background video source
3. THE About_Section SHALL reference about_illustration.jpg as the section image
4. THE CTA_Banner SHALL reference cta-bg.jpg as the background image
5. IF an asset file fails to load, THEN THE Website SHALL display a graceful fallback (solid background color matching the section theme) without breaking the layout

### Requirement 13: Animation and Motion System

**User Story:** As a visitor, I want smooth, purposeful animations throughout the site, so that interactions feel polished without being distracting.

#### Acceptance Criteria

1. THE Website SHALL implement a fade-up animation for elements entering the viewport (0.8s duration, 30px translate)
2. THE Website SHALL implement staggered animation delays (100ms increments) for sequential content blocks
3. THE Website SHALL apply cubic-bezier(0.16, 1, 0.3, 1) easing to card hover transforms
4. THE Website SHALL implement a grain/noise texture overlay at low opacity (0.02-0.03) across the full page
5. WHILE Reduced_Motion is active, THE Website SHALL disable all animations and transitions, displaying content in its final state immediately
6. THE Website SHALL implement section dividers as horizontal gradient lines (transparent → accent at 10% → transparent)

### Requirement 14: Removed Elements

**User Story:** As a developer, I want deprecated visual elements cleanly removed, so that the codebase does not contain dead code from the previous design.

#### Acceptance Criteria

1. THE Hero_Section SHALL NOT render a tech stack marquee strip
2. THE Hero_Section SHALL NOT render a "Now accepting projects" availability badge
3. THE About_Section SHALL NOT render a statistics row
4. THE Hero_Section SHALL NOT render a terminal code block
5. THE Hero_Section SHALL NOT render the hero-illustration.png image
6. THE Nav_Component SHALL NOT render a scroll progress bar
