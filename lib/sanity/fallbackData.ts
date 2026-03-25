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
