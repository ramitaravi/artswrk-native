/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#0A0B34', // Dark navy for headings
        },
        'purple': {
          100: '#F3E8FF', // Light purple for badge background
          600: '#7E22CE', // Purple for primary button
          700: '#6B21A8', // Darker purple for hover state
          50: '#FAF5FF', // Very light purple background
        },
      },
      gradients: {
        'brand': {
          'from': '#134E4A',
          'to': '#115E59',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 