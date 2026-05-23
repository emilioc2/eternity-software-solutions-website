import { render, screen } from '@testing-library/react';
import { ContactSection } from '../../components/ContactSection';

const mockSettings = { whatsappNumber: '+1234567890' };

describe('ContactSection', () => {
  beforeEach(() => render(<ContactSection settings={mockSettings} />));

  it('has the contact section id', () => {
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the monospace section label', () => {
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the heading', () => {
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders the intro copy', () => {
    expect(screen.getByText(/reach out through any of the channels/i)).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders the WhatsApp button with correct href', () => {
    const link = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://wa.me/1234567890');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders contact info rows with labels', () => {
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('LOCATION')).toBeInTheDocument();
    expect(screen.getByText('RESPONSE TIME')).toBeInTheDocument();
    expect(screen.getByText('PHONE / WHATSAPP')).toBeInTheDocument();
  });

  it('renders contact info values', () => {
    expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument();
    expect(screen.getByText('Within 24 hours')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });

  it('renders form container with surface styling', () => {
    const formContainer = screen.getByRole('button', { name: /send message/i }).closest('.bg-surface');
    expect(formContainer).toBeInTheDocument();
    expect(formContainer?.className).toContain('rounded-2xl');
    expect(formContainer?.className).toContain('border');
    expect(formContainer?.className).toContain('border-border');
  });

  it('renders icon containers with dark surface styling', () => {
    const section = document.getElementById('contact')!;
    const iconContainers = section.querySelectorAll('.bg-surface.border.border-border');
    expect(iconContainers.length).toBeGreaterThan(0);
  });

  it('renders a section divider', () => {
    const section = document.getElementById('contact')!;
    const divider = section.querySelector('.section-divider');
    expect(divider).toBeInTheDocument();
  });
});
