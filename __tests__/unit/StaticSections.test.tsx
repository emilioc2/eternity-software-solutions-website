import { render, screen } from '@testing-library/react';
import { HeroSection } from '../../components/HeroSection';
import { WhatWeDoSection } from '../../components/WhatWeDoSection';
import { AboutSection } from '../../components/AboutSection';
import { Footer } from '../../components/Footer';

describe('HeroSection', () => {
  it('renders the headline', () => {
    render(<HeroSection />);
    expect(
      screen.getByText((_, el) =>
        el?.tagName === 'H1' &&
        el.textContent?.includes('You dream it.') === true &&
        el.textContent?.includes('We build it.') === true
      )
    ).toBeInTheDocument();
  });

  it('renders the subheadline', () => {
    render(<HeroSection />);
    expect(
      screen.getByText(
        'We design and build modern digital products — websites, apps, dashboards, and tools — crafted to feel effortless today and stay reliable long into the future.'
      )
    ).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<HeroSection />);
    expect(
      screen.getByText((_, el) =>
        el?.tagName === 'H1' &&
        el.textContent?.includes('You dream it.') === true &&
        el.textContent?.includes('We build it. No tech headaches, no mystery buttons.') === true
      )
    ).toBeInTheDocument();
  });

  it('renders the "Start a project" CTA linking to #contact', () => {
    render(<HeroSection />);
    const cta = screen.getByRole('link', { name: /start a project/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '#contact');
  });

  it('has the hero section id', () => {
    render(<HeroSection />);
    expect(document.getElementById('hero')).toBeInTheDocument();
  });
});

describe('WhatWeDoSection', () => {
  beforeEach(() => render(<WhatWeDoSection />));

  it('renders the section heading', () => {
    expect(screen.getByText('What We Do')).toBeInTheDocument();
  });

  it('renders all five capability statements', () => {
    expect(
      screen.getByText(
        'We build websites that are fast, clean, and easy to manage — designed to grow with your business.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We create custom software and tools tailored to how your business actually works.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We design interfaces that feel intuitive from the first click — no learning curve required.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We help you make smart technical decisions early, so you avoid costly mistakes later.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We work remotely with clients worldwide, delivering reliable results without the overhead.'
      )
    ).toBeInTheDocument();
  });

  it('has the what-we-do section id', () => {
    expect(document.getElementById('what-we-do')).toBeInTheDocument();
  });
});

describe('AboutSection', () => {
  beforeEach(() => render(<AboutSection />));

  it('renders the About Us heading', () => {
    expect(screen.getByText('About Us')).toBeInTheDocument();
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
});

describe('Footer', () => {
  beforeEach(() => render(<Footer />));

  it('renders the company name', () => {
    expect(screen.getByText('Eternity Software Services')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    expect(screen.getByText('Remote-first, available globally.')).toBeInTheDocument();
  });

  it('renders a copyright notice', () => {
    expect(screen.getByText(/eternity software services\. all rights reserved/i)).toBeInTheDocument();
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
});
