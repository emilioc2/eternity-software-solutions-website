# Requirements Document

## Introduction

Eternity Software Services needs a production-ready business website built with Next.js, Sanity CMS, and deployed to Vercel. The site presents the company's services, portfolio, and contact options to prospective clients. Content is managed via Sanity CMS so non-technical staff can update copy and projects without code changes. The design follows a dark, modern aesthetic inspired by the prototype at https://rainbow-vertex-build-labs.base44.app/, using the company's icon.png logo and copy sourced exclusively from the provided PDF.

## Glossary

- **Website**: The Next.js application deployed to Vercel representing Eternity Software Services
- **CMS**: Sanity content management system used to manage editable content
- **Visitor**: An anonymous user browsing the Website
- **Admin**: An authenticated Sanity Studio user who manages content
- **Contact_Form**: The web form on the contact section that submits messages via Formspree or Resend
- **WhatsApp_Button**: The call-to-action that opens a WhatsApp chat with the business
- **Hero_Section**: The top-of-page section with the primary headline and CTA
- **Services_Section**: The section listing the four core service offerings
- **About_Section**: The section describing the team and philosophy
- **Projects_Section**: The section showcasing portfolio/demo projects
- **Contact_Section**: The bottom section containing the Contact_Form and WhatsApp_Button
- **Sanity_Studio**: The CMS editing interface accessible at /studio

---

## Requirements

### Requirement 1: Site Structure and Navigation

**User Story:** As a Visitor, I want to navigate a clear single-page website, so that I can quickly find information about the company's services and contact them.

#### Acceptance Criteria

1. THE Website SHALL render a sticky top navigation bar containing the company logo (icon.png), navigation links to each section (Home, Services, About, Projects, Contact), and a primary CTA button. Each navigation link SHALL target its corresponding page section so that clicking any link scrolls the Visitor directly to that section.
2. WHEN a Visitor clicks a navigation link, THE Website SHALL smoothly scroll to the corresponding section on the page.
3. THE Website SHALL be a single-page application with sections ordered: Hero, What We Do, Services, About, Projects, Contact.
4. WHEN the viewport width is below 768px, THE Website SHALL collapse the navigation links into a mobile-friendly hamburger menu.
5. THE Website SHALL render a footer containing the company name, tagline "Remote-first, available globally.", and copyright notice.

---

### Requirement 2: Hero Section

**User Story:** As a Visitor, I want to immediately understand what Eternity Software Services does, so that I can decide whether to explore further.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the headline: "Building websites and software that grow with your business."
2. THE Hero_Section SHALL display the subheadline: "We design and build modern digital products — websites, apps, dashboards, and tools — crafted to feel effortless today and stay reliable long into the future."
3. THE Hero_Section SHALL display the tagline: "You dream it. We build it. No tech headaches, no mystery buttons."
4. THE Hero_Section SHALL include a primary CTA button labelled "Start a project" that scrolls to the Contact_Section when clicked.
5. THE Hero_Section SHALL occupy at minimum the full viewport height on initial page load.

---

### Requirement 3: What We Do Section

**User Story:** As a Visitor, I want to see a concise list of capabilities, so that I can quickly assess whether the company can help me.

#### Acceptance Criteria

1. THE Website SHALL render a "What We Do" section displaying the five capability statements from the PDF as a styled list or card grid.
2. THE Website SHALL display each capability statement verbatim from the PDF copy.

---

### Requirement 4: Services Section

**User Story:** As a Visitor, I want to read about each service offering in detail, so that I can identify which service fits my needs.

#### Acceptance Criteria

1. THE Services_Section SHALL display four service cards: Web Development, Custom Software, UI/UX Design, and Technical Consulting.
2. THE Services_Section SHALL display the description for each service verbatim from the PDF copy.
3. WHEN a Visitor views the Services_Section on a viewport width of 768px or above, THE Website SHALL render the service cards in a multi-column grid layout.
4. WHEN a Visitor views the Services_Section on a viewport width below 768px, THE Website SHALL render the service cards in a single-column stacked layout.

---

### Requirement 5: About Section

**User Story:** As a Visitor, I want to learn about the team and their philosophy, so that I can decide whether to trust them with my project.

#### Acceptance Criteria

1. THE About_Section SHALL display the about copy verbatim from the PDF.
2. THE About_Section SHALL include a visual element (such as an accent graphic or icon) consistent with the overall design aesthetic.

---

### Requirement 6: Projects Section

**User Story:** As a Visitor, I want to see examples of past or demo work, so that I can evaluate the quality of the company's output.

#### Acceptance Criteria

1. THE Projects_Section SHALL display three project cards: "Business Dashboard (Concept)", "Portfolio Website (Demo)", and "Workflow Tool (Prototype)".
2. THE Projects_Section SHALL display each project title and description verbatim from the PDF copy.
3. WHEN an Admin adds, edits, or removes a project in the CMS, THE Website SHALL reflect the updated project list within one Vercel deployment or on-demand revalidation.
4. WHEN the Projects_Section is viewed on a viewport width of 768px or above, THE Website SHALL render project cards in a multi-column grid.

---

### Requirement 7: Contact Section

**User Story:** As a Visitor, I want to reach out to the company easily, so that I can start a conversation about my project.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the heading: "Let's build something meaningful — and built to last."
2. THE Contact_Section SHALL display the contact intro copy verbatim from the PDF.
3. THE Contact_Section SHALL render the Contact_Form with required fields for name, email, and message, and an optional phone number field.
3a. WHERE a Visitor provides a phone number, THE Contact_Form SHALL accept and submit the value alongside the required fields.
3b. IF a Visitor leaves the phone number field empty, THEN THE Contact_Form SHALL not treat the omission as a validation error.
4. WHEN a Visitor submits the Contact_Form with all required fields filled, THE Contact_Form SHALL submit the data to Formspree or Resend and display a success confirmation message to the Visitor.
5. IF a Visitor submits the Contact_Form with one or more required fields empty, THEN THE Contact_Form SHALL display inline validation error messages identifying the missing fields without submitting the form.
6. IF the Contact_Form submission fails due to a network or service error, THEN THE Contact_Form SHALL display an error message instructing the Visitor to try again.
7. THE Contact_Section SHALL render a WhatsApp_Button labelled "Chat on WhatsApp" that opens a WhatsApp conversation with the business phone number in a new browser tab.
8. THE Contact_Section SHALL display both the Contact_Form and the WhatsApp_Button as distinct, visually separated options.

---

### Requirement 8: CMS Integration (Sanity)

**User Story:** As an Admin, I want to manage website content through a CMS, so that I can update copy and projects without touching code.

#### Acceptance Criteria

1. THE CMS SHALL expose editable schemas for: Services (title, description), Projects (title, description, tag/label), and Contact settings (WhatsApp phone number).
2. WHEN an Admin publishes a content change in Sanity_Studio, THE Website SHALL reflect the updated content on the next page load or on-demand revalidation.
3. THE Sanity_Studio SHALL be accessible at the /studio route of the deployed Website.
4. THE Website SHALL fetch content from the CMS at build time using Next.js static generation, with on-demand revalidation support via a Sanity webhook.

---

### Requirement 9: Design and Visual Identity

**User Story:** As a Visitor, I want the website to feel modern, polished, and trustworthy, so that I have confidence in the company's quality.

#### Acceptance Criteria

1. THE Website SHALL use the icon.png file as the logo in the navigation bar and as the browser favicon.
2. THE Website SHALL apply a warm, light color palette consistent with the prototype aesthetic — cream/off-white background (`#f5f0eb`), dark warm text, and terracotta/rust accent (`#c0522a`) for buttons and highlights.
3. THE Website SHALL use Inter (body) and a serif display font (e.g. Playfair Display or Fraunces) for headings, loaded via Next.js font optimization (`next/font/google`).
4. THE Website SHALL apply smooth hover transitions on interactive elements (buttons, cards, links) with a transition duration between 150ms and 300ms.
5. THE Website SHALL achieve a Lighthouse performance score of 80 or above on desktop when measured on the Vercel production deployment.
6. THE Website SHALL render without layout shifts or broken styles on Chrome, Firefox, and Safari at viewport widths of 375px, 768px, and 1440px.

---

### Requirement 10: Deployment and Production Readiness

**User Story:** As a developer, I want the site to be deployable to Vercel with minimal configuration, so that it can go live quickly and reliably.

#### Acceptance Criteria

1. THE Website SHALL be a Next.js 14+ application using the App Router.
2. THE Website SHALL include a `vercel.json` or rely on Vercel's zero-config Next.js detection for deployment.
3. THE Website SHALL read all secrets (Sanity project ID, dataset, API token, Formspree endpoint or Resend API key, WhatsApp number) from environment variables and SHALL NOT hardcode any secrets in source code.
4. THE Website SHALL include a `.env.example` file documenting all required environment variables.
5. WHEN the `NODE_ENV` is set to `production`, THE Website SHALL serve all pages with appropriate HTTP cache headers to enable Vercel's edge caching.
