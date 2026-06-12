/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/presentation_module/index.html",
    "./client/presentation_module/src/**/*.{js,ts,jsx,tsx}",
    "./client/presentation_module/src/*.{js,ts,jsx,tsx}",
    "./client/presentation_module/src/components/**/*.{js,ts,jsx,tsx}",
    "./client/presentation_module/src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
