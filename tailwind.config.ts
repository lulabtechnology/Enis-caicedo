import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Teal/azul (inspirado en la paleta tipo Pantone que enviaste)
          ice: "#E8FAFA",   // fondo muy claro teal
          mist: "#BFEDEE",  // teal claro
          aqua: "#12B6B6",  // principal
          teal: "#0E8F93",  // medio
          deep: "#06373B",  // profundo
          ink: "#07161C",   // texto/cta dark-teal
          gold: "#D6B15E"   // acento premium
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 22, 28, 0.14)",
        glow: "0 18px 70px rgba(18, 182, 182, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
