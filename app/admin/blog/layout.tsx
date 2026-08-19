import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administración del blog | Enis Caicedo",
  robots: { index: false, follow: false }
};

export default function BlogAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
