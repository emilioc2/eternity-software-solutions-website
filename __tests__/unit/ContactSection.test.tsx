import { render, screen } from '@testing-library/react';
import { ContactSection } from '../../components/ContactSection';

const mockSettings = { whatsappNumber: '+1234567890' };

describe('ContactSection', () => {
  beforeEach(() => render(<ContactSection settings={mockSettings} />));

  it('has the contact section id', () => {
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the heading verbatim', () => {
    expect(
      screen.getByText('Get in Touch')
    ).toBeInTheDocument();
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
    expect(link).toHaveAttribute('href', 'https://wa.me/+1234567890');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders contact info rows', () => {
    expect(screen.getByText('Cape Town, South Africa')).toBeInTheDocument();
    expect(screen.getByText('Within 24 hours')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });
});
