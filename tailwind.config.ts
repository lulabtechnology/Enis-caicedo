import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Teal (alineado a la paleta que enviaste: gama azul/teal)
          aqua: "#12B6B6", // teal principal
          teal: "#0E8F93", // teal medio
          deep: "#06373B", // teal profundo (overlay)
          ink: "#07161C",  // casi negro con tinte teal (tipografía/CTA)
          gold: "#D6B15E"  // dorado elegante (accent)
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 22, 28, 0.14)"
      }
    }
  },
  plugins: []
} satisfies Config;
