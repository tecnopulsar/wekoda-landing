import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/devblog";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const posts = getAllPosts();
  const lastPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/devblog`,
      lastModified: lastPostDate,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/soluciones/ir-repeater`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/devblog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
