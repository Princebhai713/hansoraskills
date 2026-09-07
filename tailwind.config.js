/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sbs: {
          maroon: '#6B0000',      // Institutional Maroon (for top elements)
          gold: '#D4AF37',        // Premium Academic Gold Accent
          navy: '#0F172A',        // Deep Navy (for Banner/Hero contrast)
          navyLight: '#1E293B',
          slateBg: '#F8FAFC',     // Clean Soft Background
          emerald: '#059669',     // Success/Verification Accent
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}