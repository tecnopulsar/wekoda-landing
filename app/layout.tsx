import type { Metadata } from "next";
import "./globals.css";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "We Koda — Plataforma IoT",
  description:
    "Gestioná, asegurá y escalá dispositivos conectados con control total y un modelo de seguridad Zero Trust."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <PublicNavbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <PublicFooter />
        </div>
      </body>
    </html>
  );
}
