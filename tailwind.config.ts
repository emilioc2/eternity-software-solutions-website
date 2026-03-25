import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        background: '#f5f0eb',
        surface: '#ffffff',
        'surface-dark': '#2d1f1a',
        'text-primary': '#1a1008',
        'text-muted': '#6b5c52',
        accent: '#c0522a',
        'accent-hover': '#a3431f',
        'accent-subtle': '#f0e0d6',
        border: '#e8ddd6',
        whatsapp: '#25D366',
      },
    },
  },
  plugins: [],
};

export default config;
