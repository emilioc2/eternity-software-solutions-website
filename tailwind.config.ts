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
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: '#0f0f0f',
        surface: '#181818',
        'surface-elevated': '#222222',
        'text-primary': '#ffffff',
        'text-muted': '#8a8a8a',
        accent: '#7dd3fc',
        'accent-hover': '#a5e1ff',
        border: 'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(125,211,252,0.2)',
        whatsapp: '#25D366',
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-30px, 20px) scale(1.05)' },
          '66%': { transform: 'translate(20px, -30px) scale(0.95)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, 30px) scale(0.95)' },
          '66%': { transform: 'translate(-30px, -20px) scale(1.05)' },
        },
        'bounce-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'float-1': 'float-1 12s ease-in-out infinite',
        'float-2': 'float-2 15s ease-in-out infinite',
        'float-3': 'float-3 18s ease-in-out infinite',
        'bounce-down': 'bounce-down 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
