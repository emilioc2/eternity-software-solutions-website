// Feature: eternity-software-website, Property 3: Reduced Motion Compliance — when prefers-reduced-motion: reduce is active, no running animations

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import * as fs from 'fs';
import * as path from 'path';

describe('Property 3: Reduced Motion Compliance', () => {
  beforeEach(() => {
    // Mock matchMedia to return prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('ParticleCanvas does not start animation loop when reduced motion is preferred', async () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

    // Dynamically import to ensure matchMedia mock is in place
    const { ParticleCanvas } = await import('../../components/ParticleCanvas');
    render(createElement(ParticleCanvas));

    // ParticleCanvas should not call requestAnimationFrame when reduced motion is active
    expect(rafSpy).not.toHaveBeenCalled();
    rafSpy.mockRestore();
  });

  it('globals.css contains a prefers-reduced-motion media query block', () => {
    const cssPath = path.resolve(__dirname, '../../app/globals.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    // Should disable animations within the block
    expect(css).toMatch(/prefers-reduced-motion: reduce[\s\S]*animation:\s*none/);
  });
});
