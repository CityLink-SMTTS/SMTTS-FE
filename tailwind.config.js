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
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px 0 rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
