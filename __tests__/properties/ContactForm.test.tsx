// Feature: eternity-software-website, Property 5: Accessibility Preservation — aria attributes preserved
// Feature: eternity-software-website, Property 7: Missing required fields produce inline errors

import { describe, it, vi } from 'vitest';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import { ContactForm } from '../../components/ContactForm';

const validFormArb = fc.record({
  name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
  email: fc.emailAddress(),
  message: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
});

describe('Property 5: Accessibility Preservation — aria attributes preserved', () => {
  it('all required inputs have aria-required="true"', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { getByLabelText } = render(<ContactForm />);
        const nameInput = getByLabelText(/name/i);
        const emailInput = getByLabelText(/email/i);
        const messageInput = getByLabelText(/message/i);
        const result =
          nameInput.getAttribute('aria-required') === 'true' &&
          emailInput.getAttribute('aria-required') === 'true' &&
          messageInput.getAttribute('aria-required') === 'true';
        cleanup();
        return result;
      }),
      { numRuns: 5 }
    );
  });

  it('all inputs use input-dark class', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { getByLabelText } = render(<ContactForm />);
        const nameInput = getByLabelText(/name/i);
        const emailInput = getByLabelText(/email/i);
        const phoneInput = getByLabelText(/phone/i);
        const messageInput = getByLabelText(/message/i);
        const result =
          nameInput.className.includes('input-dark') &&
          emailInput.className.includes('input-dark') &&
          phoneInput.className.includes('input-dark') &&
          messageInput.className.includes('input-dark');
        cleanup();
        return result;
      }),
      { numRuns: 5 }
    );
  });
});

describe('Property 7: Missing required fields produce inline errors', () => {
  it('shows an error for each missing required field and does not call fetch', () => {
    fc.assert(
      fc.property(
        fc.subarray(['name', 'email', 'message'] as const, { minLength: 1 }),
        fc.record({
          name: fc.string({ minLength: 1 }),
          email: fc.emailAddress(),
          message: fc.string({ minLength: 1 }),
        }),
        (missingFields, formData) => {
          const mockFetch = vi.fn();
          vi.stubGlobal('fetch', mockFetch);
          let result = false;
          try {
            const { getByLabelText, getByRole, queryAllByRole } = render(<ContactForm />);
            if (!missingFields.includes('name')) {
              fireEvent.change(getByLabelText(/name/i), { target: { value: formData.name } });
            }
            if (!missingFields.includes('email')) {
              fireEvent.change(getByLabelText(/email/i), { target: { value: formData.email } });
            }
            if (!missingFields.includes('message')) {
              fireEvent.change(getByLabelText(/message/i), { target: { value: formData.message } });
            }
            fireEvent.click(getByRole('button', { name: /send message/i }));
            const alerts = queryAllByRole('alert');
            const errorCount = alerts.filter((el) => el.textContent?.includes('required')).length;
            result = errorCount >= missingFields.length && mockFetch.mock.calls.length === 0;
          } finally {
            cleanup();
            vi.restoreAllMocks();
          }
          return result;
        }
      ),
      { numRuns: 50 }
    );
  });
});

describe('Phone number handling', () => {
  it('includes phone in payload when provided, omits when empty', async () => {
    await fc.assert(
      fc.asyncProperty(
        validFormArb,
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        async (formData, phone) => {
          const mockFetch = vi.fn().mockResolvedValue({ ok: true });
          vi.stubGlobal('fetch', mockFetch);
          let result = false;
          try {
            const { getByLabelText, getByRole } = render(<ContactForm />);
            fireEvent.change(getByLabelText(/name/i), { target: { value: formData.name } });
            fireEvent.change(getByLabelText(/email/i), { target: { value: formData.email } });
            fireEvent.change(getByLabelText(/phone/i), { target: { value: phone } });
            fireEvent.change(getByLabelText(/message/i), { target: { value: formData.message } });
            fireEvent.click(getByRole('button', { name: /send message/i }));
            await waitFor(() => expect(mockFetch).toHaveBeenCalled());
            const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
            const payload = JSON.parse(options.body as string) as Record<string, string>;
            result = payload.phone === phone.trim();
          } finally {
            cleanup();
            vi.restoreAllMocks();
          }
          return result;
        }
      ),
      { numRuns: 20 }
    );
  }, 30000);
});
