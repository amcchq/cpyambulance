/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cream color palette for backgrounds (replacing white)
        cream: {
          50: '#FAF8F5',   // Lightest - for subtle backgrounds
          100: '#F5F0E8',  // Light cream
          200: '#EAE0CF',  // Main cream color (client specified)
          300: '#DED1BC',  // Slightly darker
          400: '#D2C2A9',  // Medium
          500: '#C6B396',  // Darker cream
        },
        // Ambons Primary - Hot Pink/Magenta (Professional Ambulance)
        primary: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#E91E63',  // Main Ambons pink
          700: '#DB2777',
          800: '#9D174D',
          900: '#831843',
          950: '#500724',
        },
        // Ambons Navy - Dark professional blue
        navy: {
          50: '#F5F7FF',   // Light lavender background (Ambons section bg)
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#3730A3',
          800: '#1E293B',  // Main heading color
          900: '#0F172A',  // Darkest navy (Ambons headings)
          950: '#0A1128',  // Extra dark
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px -15px rgba(220, 38, 38, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
