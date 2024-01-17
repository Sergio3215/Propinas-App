// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}","./Component/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
      },
      screens: {
        'smb': '140px',
        // => @media (min-width: 140px) { ... }
        'mb': '240px',
        // => @media (min-width: 240px) { ... }

        'cmb': '320px',
        // => @media (min-width: 320px) { ... }

        'lmb': '454px',
        // => @media (min-width: 454px) { ... }
        'sm': '684px',
        // => @media (min-width: 684px) { ... }

        'md': '960px',
        // => @media (min-width: 960px) { ... }

        'os': '1024px',
        // => @media (min-width: 1024px) { ... }

        'ws': '1280px',
        // => @media (min-width: 1280px) { ... }

        'lg': '1440px',
        // => @media (min-width: 1440px) { ... }

        'xlg': '1920px',
        // => @media (min-width: 1440px) { ... }
      },
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};