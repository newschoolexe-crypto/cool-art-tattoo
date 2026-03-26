/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          dark: "#111111",
          charcoal: "#1a1a1a",
          gray: "#2a2a2a",
          muted: "#888888",
          cream: "#f5f0eb",
          gold: "#c9a96e",
          "gold-light": "#dfc397",
          white: "#fafafa",
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', "serif"],
        body: ['"Montserrat"', "sans-serif"],
        accent: ['"Oswald"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
