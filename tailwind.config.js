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
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
