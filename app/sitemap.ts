import type { MetadataRoute } from "next";
import { getStaticSitemapEntries } from "@/lib/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getStaticSitemapEntries(new Date());
}
