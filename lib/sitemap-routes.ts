import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export type SitemapEntry = MetadataRoute.Sitemap[number];

/** Rutas estáticas indexables (orden = prioridad de negocio para crawlers). */
export function getStaticSitemapEntries(lastModified: Date): SitemapEntry[] {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/soluciones/digital-signage`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95
    },
    {
      url: `${siteUrl}/devblog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/soluciones/ir-repeater`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];
}
