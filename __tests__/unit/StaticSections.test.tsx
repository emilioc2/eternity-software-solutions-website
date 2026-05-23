import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../components/HeroSection';
import { WhatWeDoSection } from '../../components/WhatWeDoSection';
import { AboutSection } from '../../components/AboutSection';
import { Footer } from '../../components/Footer';

describe('HeroSection', () => {
  it('renders the headline with shimmer text', () => {
    render(<HeroSection />);
    expect(
      screen.getByText((_, el) =>
        el?.tagName === 'H1' &&
        el.textContent?.includes('You dream it.') === true &&
        el.textContent?.includes('We build it.') === true
      )
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/We design and build modern digital products/i)
    ).toBeInTheDocument();
  });

  it('renders the "Start a project" CTA linking to #contact', () => {
    render(<HeroSection />);
    const cta = screen.getByRole('link', { name: /start a project/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '#contact');
  });

  it('renders trust badges as pill elements', () => {
    render(<HeroSection />);
    expect(screen.getByText('Unbeatable quality')).toBeInTheDocument();
    expect(screen.getByText('Reasonable pricing')).toBeInTheDocument();
    expect(screen.getByText('Fast delivery')).toBeInTheDocument();
  });

  it('renders a scroll indicator linking to next section', () => {
    render(<HeroSection />);
    const scrollLink = screen.getByRole('link', { name: /scroll to next section/i });
    expect(scrollLink).toHaveAttribute('href', '#what-we-do');
  });

  it('has the hero section id', () => {
    render(<HeroSection />);
    expect(document.getElementById('hero')).toBeInTheDocument();
  });

  it('renders a background video element', () => {
    render(<HeroSection />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.loop).toBe(true);
  });
});

describe('WhatWeDoSection', () => {
  beforeEach(() => render(<WhatWeDoSection />));

  it('renders the monospace section label', () => {
    expect(screen.getByText('What we do')).toBeInTheDocument();
  });

  it('renders numbered items (01-05) with titles', () => {
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
  });

  it('renders all five capability titles', () => {
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Custom Software & Tools')).toBeInTheDocument();
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    expect(screen.getByText('Technical Consulting')).toBeInTheDocument();
    expect(screen.getByText('Remote Delivery')).toBeInTheDocument();
  });

  it('renders capability descriptions', () => {
    expect(
      screen.getByText(/We build websites that are fast, clean, and easy to manage/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We create custom software and tools/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We design interfaces that feel intuitive/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We help you make smart technical decisions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We work remotely with clients worldwide/i)
    ).toBeInTheDocument();
  });

  it('has the what-we-do section id', () => {
    expect(document.getElementById('what-we-do')).toBeInTheDocument();
  });

  it('renders a section divider', () => {
    const section = document.getElementById('what-we-do')!;
    const divider = section.querySelector('.section-divider');
    expect(divider).toBeInTheDocument();
  });
});

describe('AboutSection', () => {
  beforeEach(() => render(<AboutSection />));

  it('renders the monospace section label', () => {
    expect(screen.getByText('About us')).toBeInTheDocument();
  });

  it('renders the About Us heading', () => {
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders the about image with .jpg extension', () => {
    const img = screen.getByAltText(/team collaborating/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('about_illustration.jpg'));
  });

  it('renders the about copy', () => {
    expect(
      screen.getByText(/small, focused software team/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/understand what you actually need/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remote-first and work with clients around the world/i)
    ).toBeInTheDocument();
  });

  it('has the about section id', () => {
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders a section divider', () => {
    const section = document.getElementById('about')!;
    const divider = section.querySelector('.section-divider');
    expect(divider).toBeInTheDocument();
  });
});

describe('Footer', () => {
  beforeEach(() => render(<Footer />));

  it('renders the company name', () => {
    expect(screen.getByText('Eternity Software Solutions')).toBeInTheDocument();
  });

  it('renders the logo with new_logo.png', () => {
    const logo = screen.getByAltText('Eternity Software Solutions logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('new_logo.png'));
  });

  it('renders the tagline', () => {
    expect(screen.getByText('Remote-first, available globally.')).toBeInTheDocument();
  });

  it('renders a copyright notice', () => {
    expect(screen.getByText(/eternity software solutions\. all rights reserved/i)).toBeInTheDocument();
  });

  it('renders quick links', () => {
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders privacy policy and terms links', () => {
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument();
  });

  it('uses monospace section headers', () => {
    const headers = document.querySelectorAll('h3');
    headers.forEach((h) => {
      expect(h.className).toContain('font-mono');
      expect(h.className).toContain('uppercase');
    });
  });

  it('uses border-t border-border instead of bg-surface-dark', () => {
    const footer = document.querySelector('footer')!;
    expect(footer.className).toContain('border-t');
    expect(footer.className).toContain('border-border');
    expect(footer.className).not.toContain('bg-surface-dark');
    expect(footer.className).not.toContain('noise');
  });
});
