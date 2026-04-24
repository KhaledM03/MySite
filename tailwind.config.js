/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Engineering-inspired palette: white, soft gray, navy, muted blue
        ink: {
          DEFAULT: "#0F1B2D", // primary navy text
          soft: "#3B4A66",    // secondary text
          mute: "#6B7894",    // tertiary / labels
        },
        paper: {
          DEFAULT: "#F7F8FA", // page background
          card: "#FFFFFF",    // card surface
          line: "#E6E9EF",    // hairline borders
          grid: "#EEF1F6",    // blueprint grid line
        },
        accent: {
          DEFAULT: "#3E6BE0", // muted blue accent
          soft: "#E8EEFB",    // tint for chips / hovers
          deep: "#2A4FB8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 27, 45, 0.04), 0 8px 24px -12px rgba(15, 27, 45, 0.08)",
        soft: "0 1px 2px rgba(15, 27, 45, 0.05)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        // Subtle blueprint grid — used on the page background
        "blueprint-grid":
          "linear-gradient(to right, rgba(62, 107, 224, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(62, 107, 224, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
    },
  },
  plugins: [],
};
