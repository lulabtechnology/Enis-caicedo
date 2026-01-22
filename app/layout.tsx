import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";

import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Enis Caicedo | Soluciones Legales e Inmobiliarias en Panamá",
  description:
    "Servicios legales y acompañamiento inmobiliario en Panamá. Abogada y corredora de bienes raíces."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
