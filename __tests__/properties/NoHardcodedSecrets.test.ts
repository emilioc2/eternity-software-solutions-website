// Feature: eternity-software-website, Property 1: Color Token Consistency — no raw hex in className strings
// This test verifies that component source files use Tailwind tokens, not raw hex values in classNames.

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const COMPONENTS_DIR = path.resolve(__dirname, '../../components');

const componentFiles = fs.readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => ({ name: f, content: fs.readFileSync(path.join(COMPONENTS_DIR, f), 'utf-8') }));

// Regex to find raw hex color values in className strings (e.g. text-[#ffffff], bg-[#0f0f0f])
const rawHexInClassRegex = /className="[^"]*(?:text|bg|border|ring|shadow)-\[#[0-9a-fA-F]{3,8}\][^"]*"/g;

describe('Property 1: Color Token Consistency — no raw hex in className strings', () => {
  it.each(componentFiles)('$name does not use raw hex values in className attributes', ({ name, content }) => {
    const matches = content.match(rawHexInClassRegex);
    expect(matches, `Found raw hex in className in ${name}: ${matches?.join(', ')}`).toBeNull();
  });
});
