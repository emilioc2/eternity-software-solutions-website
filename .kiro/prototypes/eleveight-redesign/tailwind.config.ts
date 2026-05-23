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
        sans: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#141414',
        'surface-dark': '#0a0a0a',
        'surface-elevated': '#1a1a1a',
        'text-primary': '#f5f5f5',
        'text-muted': '#888888',
        accent: '#e8562a',
        'accent-hover': '#ff6b3d',
        'accent-subtle': 'rgba(232, 86, 42, 0.1)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(255, 255, 255, 0.15)',
        whatsapp: '#25D366',
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-in': 'slide-in 0.6s ease forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
