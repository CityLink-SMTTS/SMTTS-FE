/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SMTTS Brand Colors
        metro: {
          primary: '#1e3a5f',
          secondary: '#2d4a6f',
          dark: '#0f2847',
        },
        sustainable: {
          teal: '#14b8a6',
          emerald: '#10b981',
        },
        nfc: {
          cyan: '#06b6d4',
          electric: '#22d3ee',
        },
        commuter: {
          gold: '#f59e0b',
          orange: '#f97316',
        },
        // Crowd Density
        density: {
          low: '#22c55e',
          medium: '#eab308',
          high: '#ef4444',
        },
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
        },
        // Glass colors
        glass: {
          surface: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.5)',
          dark: 'rgba(15, 32, 39, 0.8)',
        }
      },
      backgroundImage: {
        // Brand Gradients
        'metro-prime': 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 100%)',
        'sustainable-city': 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
        'nfc-pulse': 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
        'commuter-rewards': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        // Density Gradients
        'density-low': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'density-medium': 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)',
        'density-high': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
        // Glass effect
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        // Main Gradients
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
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
        'glow': '0 0 15px rgba(79, 172, 254, 0.4)',
        'glow-eco': '0 10px 25px rgba(113, 178, 128, 0.4)',
        'glow-tech': '0 10px 25px rgba(79, 172, 254, 0.4)',
        'glow-gold': '0 10px 25px rgba(253, 160, 133, 0.4)',
        'premium': '0 20px 50px rgba(0,0,0,0.05)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-red': 'pulse-red 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'fade-in-up': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        'pulse-red': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
