// Palette, type stack, and keyframes live in the shared preset so the blog at
// blogs.tbritt.xyz stays visually locked to this site.
const preset = require('./design/tailwind-preset.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [preset],
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [],
  }