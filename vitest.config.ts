import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'next.config.mjs',
        'postcss.config.js',
        'tailwind.config.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
        'lib/sanity/types.ts',
        'lib/sanity/client.ts',
        'app/**',
        'node_modules/**',
        'coverage/**',
        '.next/**',
        '**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
