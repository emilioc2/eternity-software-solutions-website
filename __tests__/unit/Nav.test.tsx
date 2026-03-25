import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '../../components/Nav';

describe('Nav', () => {
  it('renders the logo image', () => {
    render(<Nav />);
    expect(screen.getByAltText('Eternity Software Services logo')).toBeInTheDocument();
  });

  it('renders all section links', () => {
    render(<Nav />);
    // Use getAllBy since desktop + mobile both render the same links
    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    expect(homeLinks.length).toBeGreaterThan(0);
    homeLinks.forEach((l) => expect(l).toHaveAttribute('href', '#hero'));

    const servicesLinks = screen.getAllByRole('link', { name: /^services$/i });
    expect(servicesLinks.length).toBeGreaterThan(0);
    servicesLinks.forEach((l) => expect(l).toHaveAttribute('href', '#services'));

    const aboutLinks = screen.getAllByRole('link', { name: /^about$/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
    aboutLinks.forEach((l) => expect(l).toHaveAttribute('href', '#about'));

    const projectsLinks = screen.getAllByRole('link', { name: /^projects$/i });
    expect(projectsLinks.length).toBeGreaterThan(0);
    projectsLinks.forEach((l) => expect(l).toHaveAttribute('href', '#projects'));

    const contactLinks = screen.getAllByRole('link', { name: /^contact$/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    contactLinks.forEach((l) => expect(l).toHaveAttribute('href', '#contact'));
  });

  it('renders the "Start a project" CTA button', () => {
    render(<Nav />);
    const ctas = screen.getAllByRole('link', { name: /start a project/i });
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => expect(cta).toHaveAttribute('href', '#contact'));
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

  it('closes mobile menu when the "Start a project" CTA inside the menu is clicked', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    const mobileMenu = document.getElementById('mobile-menu')!;
    const cta = mobileMenu.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    fireEvent.click(cta);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });
});
