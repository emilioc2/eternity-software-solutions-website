import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '../../components/Nav';

describe('Nav', () => {
  it('renders the logo image with new_logo.png', () => {
    render(<Nav />);
    const logo = screen.getByAltText('Eternity Software Solutions logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('new_logo.png'));
  });

  it('uses fixed positioning', () => {
    render(<Nav />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav.className).toContain('fixed');
    expect(nav.className).toContain('top-0');
    expect(nav.className).toContain('left-0');
    expect(nav.className).toContain('right-0');
  });

  it('does not render a scroll progress bar', () => {
    render(<Nav />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    // The old progress bar had a style attribute with width percentage
    const progressBars = nav.querySelectorAll('[style*="width"]');
    expect(progressBars.length).toBe(0);
  });

  it('renders all section links with data-section attributes', () => {
    render(<Nav />);
    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    expect(homeLinks.length).toBeGreaterThan(0);
    homeLinks.forEach((l) => {
      expect(l).toHaveAttribute('href', '#hero');
      expect(l).toHaveAttribute('data-section', 'hero');
    });

    const servicesLinks = screen.getAllByRole('link', { name: /^services$/i });
    expect(servicesLinks.length).toBeGreaterThan(0);
    servicesLinks.forEach((l) => {
      expect(l).toHaveAttribute('href', '#services');
      expect(l).toHaveAttribute('data-section', 'services');
    });

    const aboutLinks = screen.getAllByRole('link', { name: /^about$/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
    aboutLinks.forEach((l) => {
      expect(l).toHaveAttribute('href', '#about');
      expect(l).toHaveAttribute('data-section', 'about');
    });

    const projectsLinks = screen.getAllByRole('link', { name: /^projects$/i });
    expect(projectsLinks.length).toBeGreaterThan(0);
    projectsLinks.forEach((l) => {
      expect(l).toHaveAttribute('href', '#projects');
      expect(l).toHaveAttribute('data-section', 'projects');
    });

    const contactLinks = screen.getAllByRole('link', { name: /^contact$/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    contactLinks.forEach((l) => {
      expect(l).toHaveAttribute('href', '#contact');
      expect(l).toHaveAttribute('data-section', 'contact');
    });
  });

  it('renders nav links with link-underline class', () => {
    render(<Nav />);
    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    // Desktop link should have link-underline class
    const desktopLink = homeLinks.find((l) => l.className.includes('link-underline'));
    expect(desktopLink).toBeDefined();
  });

  it('renders the "Let\'s talk" CTA button with baby blue pill style', () => {
    render(<Nav />);
    const ctas = screen.getAllByRole('link', { name: /let's talk/i });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => {
      expect(cta).toHaveAttribute('href', '#contact');
    });
    // Desktop CTA should have accent bg and background text color
    const desktopCta = ctas.find((c) => c.className.includes('bg-accent'));
    expect(desktopCta).toBeDefined();
    expect(desktopCta!.className).toContain('text-background');
    expect(desktopCta!.className).toContain('rounded-full');
  });

  it('renders hamburger button with accessible label', () => {
    render(<Nav />);
    const btn = screen.getByRole('button', { name: /open menu/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles mobile menu open and closed', () => {
    render(<Nav />);
    const btn = screen.getByRole('button', { name: /open menu/i });

    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();

    const links = mobileMenu!.querySelectorAll('a');
    fireEvent.click(links[0]);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('closes mobile menu when the CTA inside the menu is clicked', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    const mobileMenu = document.getElementById('mobile-menu')!;
    const cta = mobileMenu.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    fireEvent.click(cta);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('starts with transparent background when not scrolled', () => {
    render(<Nav />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav.className).toContain('bg-transparent');
  });
});
