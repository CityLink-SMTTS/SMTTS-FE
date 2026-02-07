/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Transport Blue -> Tech Blue
        primary: {
          start: '#0F2027',
          mid: '#203A43',
          end: '#2C5364'
        },
        // Eco/SDG: Teal -> Bright Emerald
        eco: {
          start: '#134E5E',
          end: '#71B280',
          dark: '#134E5E',
          light: '#71B280'
        },
        // NFC/Tech: Cyan -> Electric Blue
        tech: {
          start: '#4facfe',
          end: '#00f2fe'
        },
        // Rewards: Gold -> Orange
        gold: {
          start: '#f6d365',
          end: '#fda085'
        },
        // Alerts: Red -> Crimson
        alert: {
          start: '#ff416c',
          end: '#ff4b2b'
        }
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        'grad-eco': 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
        'grad-tech': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'grad-gold': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'grad-alert': 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
        'glass-pattern': 'radial-gradient(at 0% 0%, rgba(79, 172, 254, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(113, 178, 128, 0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
        'glow': '0 0 15px rgba(79, 172, 254, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
