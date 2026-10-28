import type { MetadataRoute } from "next";
import { SHOW_DEVBLOG } from "@/lib/constants";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: SHOW_DEVBLOG ? "/api/" : ["/api/", "/devblog"]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
