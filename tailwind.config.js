/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          background: "var(--color-bg)",
          text: "var(--color-text)",
          secondary: "var(--color-secondary)",
          card: "var(--color-card)",
          border: "var(--color-border)",
        },
      },
    },
    plugins: [],
}