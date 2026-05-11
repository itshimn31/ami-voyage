import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ami: {
          purple: '#8B2A9B',
          'purple-deep': '#5D1A6B',
          'purple-vivid': '#A020B0',
          magenta: '#D946D9',
          'magenta-soft': '#E879E8',
          cream: '#F8F5F2',
          ink: '#1A0F22',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'ami-signature':
          'linear-gradient(135deg, #5D1A6B 0%, #8B2A9B 50%, #D946D9 100%)',
        'ami-radial':
          'radial-gradient(ellipse at top right, #D946D9 0%, #8B2A9B 35%, #5D1A6B 100%)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'plane-fly': {
          '0%': { transform: 'translateX(-20vw) translateY(0)' },
          '100%': { transform: 'translateX(120vw) translateY(-30px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(217, 70, 217, 0.4)' },
          '50%': { boxShadow: '0 0 30px 10px rgba(217, 70, 217, 0.15)' },
        },
        'scroll-indicator': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(8px)', opacity: '0' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'plane-fly': 'plane-fly 18s linear infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.6s ease-in-out infinite',
      },
      boxShadow: {
        'ami-glow': '0 20px 60px -15px rgba(139, 42, 155, 0.45)',
        'ami-glow-strong': '0 25px 80px -10px rgba(217, 70, 217, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
