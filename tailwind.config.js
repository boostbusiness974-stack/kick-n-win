/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF3B3B", // rouge/orange du logo
        secondary: "#00D4D4", // turquoise du logo
        dark: "#0B1220", // fond sombre
        "dark-2": "#111827" // variante
      },
      boxShadow: {
        glow: "0 0 0 4px rgba(255,59,59,.18), 0 14px 38px rgba(0,0,0,.35)"
      }
    }
  },
  plugins: []
};