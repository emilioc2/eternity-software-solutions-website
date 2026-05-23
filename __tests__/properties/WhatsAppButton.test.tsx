// Feature: eternity-software-website, Property 5: Accessibility Preservation — aria-label preserved
// Feature: eternity-software-website, Property 8: WhatsApp button URL strips non-digits

import { describe, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { WhatsAppButton } from '../../components/WhatsAppButton';

// Generates phone strings with various formats (spaces, dashes, parens, plus)
const phoneArb = fc
  .tuple(
    fc.constantFrom('+', ''),
    fc.array(
      fc.tuple(
        fc.stringOf(fc.constantFrom(' ', '-', '(', ')'), { minLength: 0, maxLength: 2 }),
        fc.stringOf(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), { minLength: 1, maxLength: 4 })
      ),
      { minLength: 2, maxLength: 5 }
    )
  )
  .map(([prefix, parts]) => prefix + parts.map(([sep, digits]) => sep + digits).join(''));

describe('Property 5: Accessibility Preservation — aria-label preserved', () => {
  it('always renders aria-label="Chat on WhatsApp"', () => {
    fc.assert(
      fc.property(phoneArb, (phoneNumber) => {
        const { container } = render(<WhatsAppButton phoneNumber={phoneNumber} />);
        const anchor = container.querySelector('a');
        const hasAriaLabel = anchor?.getAttribute('aria-label') === 'Chat on WhatsApp';
        cleanup();
        return hasAriaLabel;
      }),
      { numRuns: 50 }
    );
  });
});

describe('Property 8: WhatsApp button URL strips non-digits', () => {
  it('renders href as https://wa.me/{digits only} for any phone format', () => {
    fc.assert(
      fc.property(phoneArb, (phoneNumber) => {
        const { container } = render(<WhatsAppButton phoneNumber={phoneNumber} />);
        const anchor = container.querySelector('a');
        const expectedDigits = phoneNumber.replace(/\D/g, '');
        const hrefOk = anchor?.getAttribute('href') === `https://wa.me/${expectedDigits}`;
        const targetOk = anchor?.getAttribute('target') === '_blank';
        cleanup();
        return hrefOk === true && targetOk === true;
      }),
      { numRuns: 50 }
    );
  });

  it('uses dark theme text tokens', () => {
    fc.assert(
      fc.property(phoneArb, (phoneNumber) => {
        const { container } = render(<WhatsAppButton phoneNumber={phoneNumber} />);
        const primaryText = container.querySelector('.text-text-primary');
        const mutedText = container.querySelector('.text-text-muted');
        cleanup();
        return primaryText !== null && mutedText !== null;
      }),
      { numRuns: 50 }
    );
  });
});
