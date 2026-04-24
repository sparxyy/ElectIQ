/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#7C6FCD",
        "primary-container": "#7568c5",
        "secondary": "#3d6751",
        "background": "#F5F0E8",
        "surface": "#fdf8ff",
        "on-background": "#1c1b21",
        "on-primary": "#ffffff",
        "pastel-blue": "#A8C8E8",
        "pastel-mint": "#A8D5BA",
        "pastel-yellow": "#F9C784",
        "pastel-pink": "#F4A7B9",
        "border-tactile": "#E0D7C8",
        "dark-bg": "#1a1a2e",
        "dark-surface": "#16213e",
        "dark-border": "#2a2a4a",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "16px",
        "3xl": "24px",
        "full": "9999px"
      },
      fontFamily: {
        "lexend": ["Lexend", "sans-serif"],
        "nunito": ["Nunito", "sans-serif"],
      },
      boxShadow: {
        "tactile": "0 4px 0 0 #E0D7C8",
        "tactile-primary": "0 4px 0 0 #463893",
        "flashcard": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        'slideIn': 'slideIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
