import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        brand: {
          green: '#16a34a',
          'green-light': '#22c55e',
          'green-dark': '#15803d',
          teal: '#0d9488',
          blue: '#1e3a5f',
          'blue-light': '#2563eb',
          'blue-dark': '#1e3a8a',
          mint: '#ecfdf5',
          lavender: '#eef2ff',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
