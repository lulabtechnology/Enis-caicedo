"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ExperienceLayer from "@/components/site/ExperienceLayer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlogAdmin = pathname?.startsWith("/admin/blog");

  if (isBlogAdmin) return <>{children}</>;

  return (
    <>
      <ExperienceLayer />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
