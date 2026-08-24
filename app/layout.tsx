import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import {
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  absoluteUrl,
  getSiteUrl
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "WeKoda — Plataforma IoT para gestionar y automatizar dispositivos",
    template: `%s — ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: ORGANIZATION.legalName }],
  creator: ORGANIZATION.legalName,
  publisher: ORGANIZATION.legalName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: "WeKoda — Plataforma IoT para gestionar y automatizar dispositivos",
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: "WeKoda — Plataforma IoT",
    description: SITE_DESCRIPTION
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  category: "technology"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: ORGANIZATION.legalName,
  url: getSiteUrl(),
  logo: absoluteUrl("/icon"),
  email: ORGANIZATION.email,
  telephone: ORGANIZATION.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: ORGANIZATION.street,
    addressLocality: ORGANIZATION.city,
    addressRegion: ORGANIZATION.region,
    addressCountry: ORGANIZATION.country
  },
  sameAs: ORGANIZATION.social
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: getSiteUrl(),
  inLanguage: "es-AR",
  description: SITE_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <PublicNavbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <PublicFooter />
        </div>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema])
          }}
        />
      </body>
    </html>
  );
}
