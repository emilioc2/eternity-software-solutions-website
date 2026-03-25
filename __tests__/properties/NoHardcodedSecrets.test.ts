// Feature: eternity-software-website, Property 9: No secrets are hardcoded in source files

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property 9: No secrets are hardcoded in source files.
 *
 * Scans all TypeScript/TSX source files under app/, components/, and lib/
 * for patterns that look like hardcoded secret values. All such values must
 * be referenced only via process.env.* calls.
 *
 * This is a static-analysis property — it runs once, not randomized.
 */

const SOURCE_DIRS = ['app', 'components', 'lib'];
const SOURCE_EXTENSIONS = ['.ts', '.tsx'];

/** Patterns that indicate a hardcoded secret value */
const SECRET_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  // Sanity project IDs are alphanumeric strings of ~8 chars assigned by Sanity Cloud
  {
    name: 'Sanity project ID (hardcoded alphanumeric ID)',
    pattern: /projectId\s*[:=]\s*['"`][a-z0-9]{6,}['"`]/,
  },
  // Sanity API tokens start with "sk"
  {
    name: 'Sanity API token (sk...)',
    pattern: /['"`]sk[A-Za-z0-9]{20,}['"`]/,
  },
  // Formspree endpoints contain formspree.io/f/
  {
    name: 'Formspree endpoint (hardcoded URL)',
    pattern: /['"`]https:\/\/formspree\.io\/f\/[A-Za-z0-9]+['"`]/,
  },
  // Resend API keys start with "re_"
  {
    name: 'Resend API key (re_...)',
    pattern: /['"`]re_[A-Za-z0-9]{10,}['"`]/,
  },
  // Phone numbers: digit strings of 7+ chars (e.g. 0825235838) not inside process.env
  {
    name: 'Hardcoded phone number',
    pattern: /(?<!process\.env\.\w{1,60}['"`\s]*[=:?]{0,2}\s*)['"`]\+?[0-9]{7,}['"`]/,
  },
  // Webhook secrets: long random strings assigned as literals
  {
    name: 'Webhook secret (long random string literal)',
    pattern: /webhookSecret\s*[:=]\s*['"`][A-Za-z0-9+/=_-]{16,}['"`]/,
  },
];

function collectSourceFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectSourceFiles(fullPath));
    } else if (SOURCE_EXTENSIONS.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

const workspaceRoot = path.resolve(__dirname, '../..');
const allSourceFiles = SOURCE_DIRS.flatMap((dir) =>
  collectSourceFiles(path.join(workspaceRoot, dir))
);

describe('Property 9: No secrets are hardcoded in source files', () => {
  it('finds at least one source file to scan', () => {
    expect(allSourceFiles.length).toBeGreaterThan(0);
  });

  for (const { name, pattern } of SECRET_PATTERNS) {
    it(`no file contains a ${name}`, () => {
      const violations: string[] = [];
      for (const filePath of allSourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          // Skip lines that are already a process.env assignment or comment
          if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
          if (pattern.test(line)) {
            const relativePath = path.relative(workspaceRoot, filePath);
            violations.push(`${relativePath}:${idx + 1} — ${line.trim()}`);
          }
        });
      }
      if (violations.length > 0) {
        throw new Error(
          `Hardcoded secret pattern "${name}" found in source files:\n` +
            violations.map((v) => `  ${v}`).join('\n')
        );
      }
    });
  }

  it('all env variable references use process.env.*', () => {
    const envVarNames = [
      'NEXT_PUBLIC_SANITY_PROJECT_ID',
      'NEXT_PUBLIC_SANITY_DATASET',
      'SANITY_API_TOKEN',
      'SANITY_WEBHOOK_SECRET',
      'NEXT_PUBLIC_FORMSPREE_ENDPOINT',
      'RESEND_API_KEY',
      'RESEND_TO_EMAIL',
      'NEXT_PUBLIC_WHATSAPP_NUMBER',
    ];

    const violations: string[] = [];
    for (const filePath of allSourceFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(workspaceRoot, filePath);
      for (const varName of envVarNames) {
        // If the file references the var name, it must do so via process.env
        const bareUsage = new RegExp(`(?<!process\\.env\\.)\\b${varName}\\b`);
        if (bareUsage.test(content)) {
          violations.push(`${relativePath} references ${varName} without process.env.*`);
        }
      }
    }
    expect(violations).toEqual([]);
  });
});
