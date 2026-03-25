// Feature: eternity-software-website, Property 5: Phone number is included in submission payload when provided
// Feature: eternity-software-website, Property 6: Empty phone number does not cause a validation error
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

describe('Property 5: Phone number is included in submission payload when provided', () => {
  it('includes phone in the fetch payload when a non-empty phone is provided', async () => {
    // numRuns: 20 keeps the test well within the timeout while still providing meaningful coverage
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

describe('Property 6: Empty phone number does not cause a validation error', () => {
  it('submits successfully when phone is empty and required fields are filled', async () => {
    await fc.assert(
      fc.asyncProperty(validFormArb, async (formData) => {
        const mockFetch = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', mockFetch);
        let result = false;
        try {
          const { getByLabelText, getByRole, queryAllByRole } = render(<ContactForm />);
          fireEvent.change(getByLabelText(/name/i), { target: { value: formData.name } });
          fireEvent.change(getByLabelText(/email/i), { target: { value: formData.email } });
          fireEvent.change(getByLabelText(/message/i), { target: { value: formData.message } });
          // phone left empty
          fireEvent.click(getByRole('button', { name: /send message/i }));
          await waitFor(() => expect(mockFetch).toHaveBeenCalled());
          const hasPhoneError = queryAllByRole('alert').some((el) =>
            el.textContent?.toLowerCase().includes('phone')
          );
          result = !hasPhoneError;
        } finally {
          cleanup();
          vi.restoreAllMocks();
        }
        return result;
      }),
      { numRuns: 20 }
    );
  }, 30000);
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
      { numRuns: 100 }
    );
  });
});
