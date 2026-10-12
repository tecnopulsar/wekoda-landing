import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/devblog";
import { getStaticSitemapEntries } from "@/lib/sitemap-routes";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const posts = getAllPosts();
  const buildDate = new Date();
  const staticEntries = getStaticSitemapEntries(buildDate);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/devblog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.55
  }));

  return [...staticEntries, ...postEntries];
}
