import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          aqua: "#13B8B8",
          gold: "#D6B15E",
          ink: "#0B1220"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;
