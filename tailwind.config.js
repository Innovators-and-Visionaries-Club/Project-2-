/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'risk-critical': '#ef4444',
        'risk-high': '#f97316',
        'risk-medium': '#f59e0b',
        'risk-low': '#10b981',
        'risk-safe': '#22c55e',
        'navy': '#0f172a',
        'slate-nav': '#1e293b',
        'fs-bg': '#0B1020',
        'fs-card': '#121A2B',
        'fs-accent': '#00D1FF',
        'fs-danger': '#FF4D4D',
        'fs-warning': '#FFB547',
        'fs-safe': '#22C55E',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
