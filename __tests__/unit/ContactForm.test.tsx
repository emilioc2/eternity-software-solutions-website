import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../../components/ContactForm';

function fillRequired() {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } });
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders name, email, and message as required fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('required');
  });

  it('renders phone as an optional field (no required attribute)', () => {
    render(<ContactForm />);
    const phone = screen.getByLabelText(/phone/i);
    expect(phone).not.toHaveAttribute('required');
  });

  it('shows inline errors for all missing required fields on submit', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('does not call fetch when required fields are missing', () => {
    const mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('shows success message after a 2xx response', async () => {
    render(<ContactForm />);
    fillRequired();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/thanks/i);
  });

  it('shows error banner on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    render(<ContactForm />);
    fillRequired();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
  });

  it('shows error banner on non-2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<ContactForm />);
    fillRequired();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
  });

  it('includes phone in payload when provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    render(<ContactForm />);
    fillRequired();
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(options.body as string) as Record<string, string>;
    expect(payload.phone).toBe('+1234567890');
  });

  it('omits phone from payload when left empty', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    render(<ContactForm />);
    fillRequired();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(options.body as string) as Record<string, string>;
    expect(payload.phone).toBeUndefined();
  });
});
