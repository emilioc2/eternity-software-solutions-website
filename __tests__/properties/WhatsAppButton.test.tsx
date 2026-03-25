// Feature: eternity-software-website, Property 8: WhatsApp button URL is correctly formed

import { describe, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { WhatsAppButton } from '../../components/WhatsAppButton';

// Generates phone strings like "+12345678" (7–15 digits with leading +)
const phoneArb = fc
  .stringMatching(/^\+[1-9]\d{6,14}$/)
  .filter((s) => s.length >= 7);

describe('Property 8: WhatsApp button URL is correctly formed', () => {
  it('renders href as https://wa.me/{phoneNumber} and target as _blank', () => {
    fc.assert(
      fc.property(phoneArb, (phoneNumber) => {
        const { container } = render(<WhatsAppButton phoneNumber={phoneNumber} />);
        const anchor = container.querySelector('a');
        const hrefOk = anchor?.getAttribute('href') === `https://wa.me/${phoneNumber}`;
        const targetOk = anchor?.getAttribute('target') === '_blank';
        cleanup();
        return hrefOk === true && targetOk === true;
      }),
      { numRuns: 100 }
    );
  });
});
