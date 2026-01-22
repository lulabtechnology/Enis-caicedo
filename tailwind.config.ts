import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ice: "#E8FAFA",
          mist: "#BFEDEE",
          aqua: "#12B6B6", // verde/teal principal
          teal: "#0E8F93",
          deep: "#06373B",
          ink: "#07161C"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 22, 28, 0.14)",
        glow: "0 18px 70px rgba(18, 182, 182, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
