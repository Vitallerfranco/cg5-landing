/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        purple: {
          cg: '#7B2FBE',
          light: '#9B4FDE',
          dark: '#5B1F9E',
        },
        magenta: {
          cg: '#E040FB',
          light: '#F060FF',
          dark: '#C020DB',
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(123, 47, 190, 0.5), 0 0 40px rgba(123, 47, 190, 0.2)',
        'glow-magenta': '0 0 20px rgba(224, 64, 251, 0.5), 0 0 40px rgba(224, 64, 251, 0.2)',
        'glow-card': '0 0 0 1px rgba(123, 47, 190, 0.3), 0 4px 24px rgba(123, 47, 190, 0.15)',
        'glow-card-hover': '0 0 0 1px rgba(224, 64, 251, 0.6), 0 8px 40px rgba(123, 47, 190, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'particle': 'particle 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
