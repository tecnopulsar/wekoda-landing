import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import {
  BRAND_ALTERNATE_NAMES,
  BRAND_LOGO_SRC,
  BRAND_NAME,
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
    default: "WeKoda — CMS Signage e IoT-over-IP | Cartelería digital",
    template: `%s — ${BRAND_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: BRAND_NAME,
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
    title: "WeKoda — CMS Signage e IoT-over-IP | Cartelería digital",
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: "WeKoda — CMS Signage e IoT-over-IP",
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

const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: BRAND_NAME,
  alternateName: [...BRAND_ALTERNATE_NAMES],
  url: getSiteUrl(),
  logo: absoluteUrl(BRAND_LOGO_SRC),
  description:
    "Marca de plataforma IoT-over-IP y cartelería digital WeKoda. No afiliada a Škoda Auto."
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  alternateName: [SITE_NAME, ...BRAND_ALTERNATE_NAMES],
  legalName: ORGANIZATION.legalName,
  url: getSiteUrl(),
  logo: absoluteUrl(BRAND_LOGO_SRC),
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
  name: BRAND_NAME,
  alternateName: [SITE_NAME, ...BRAND_ALTERNATE_NAMES],
  url: getSiteUrl(),
  inLanguage: "es-AR",
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: BRAND_NAME,
    url: getSiteUrl()
  }
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
            __html: JSON.stringify([brandSchema, organizationSchema, websiteSchema])
          }}
        />
      </body>
    </html>
  );
}
