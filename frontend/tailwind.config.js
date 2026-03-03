/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0F19',
          secondary: '#0F1524',
          tertiary: '#141929',
        },
        accent: {
          DEFAULT: '#5B8CFF',
          dim: 'rgba(91,140,255,0.12)',
          glow: 'rgba(91,140,255,0.3)',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          dim: 'rgba(139,92,246,0.12)',
          glow: 'rgba(139,92,246,0.3)',
        },
        glass: {
          bg: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
          hover: 'rgba(91,140,255,0.35)',
        },
        text: {
          primary: '#F0F4FF',
          secondary: '#8B95B0',
          muted: '#4A5270',
        },
        brand: {
          green: '#22D3A0',
          orange: '#FF8C42',
          purple: '#A78BFA',
          red: '#FF6B6B',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'accent-gradient': 'linear-gradient(135deg, #5B8CFF 0%, #A78BFA 50%, #22D3A0 100%)',
      },
      animation: {
        'float': 'floatCard 5s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'marquee': 'marquee 35s linear infinite',
        'scan': 'scanLine 3s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};