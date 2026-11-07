/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001026",
        "primary-container": "#0b2545",
        "on-primary": "#ffffff",
        "on-primary-container": "#778db2",
        secondary: "#b02f00",
        "secondary-container": "#fd5927",
        "on-secondary": "#ffffff",
        "navy-deep": "#07172B",
        "orange-vibrant": "#F05A28",
        "gold-warm": "#E5A823",
        "whatsapp-green": "#25D366",
        surface: "#f8f9ff",
        "surface-bright": "#f8f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-subtle": "#F1F5F9",
        "surface-border": "#E2E8F0",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#44474e",
        outline: "#74777f",
        "outline-variant": "#c4c6cf",
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Poppins', 'sans-serif'],
        headline: ['Montserrat', 'Poppins', 'sans-serif'],
        body: ['"Hanken Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      }
    },
  },
  plugins: [],
}
