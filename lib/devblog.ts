import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface DevBlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  canonical?: string;
  audience?: string;
  readingMinutes: number;
}

export interface DevBlogPost extends DevBlogPostMeta {
  contentHtml: string;
}

const POSTS_DIR = path.join(process.cwd(), "devblog", "posts");

marked.setOptions({
  gfm: true,
  breaks: false
});

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function toStringArray(input: unknown): string[] {
  if (Array.isArray(input)) return input.map((v) => String(v));
  if (typeof input === "string") {
    return input
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

function readPostFile(filename: string): DevBlogPost {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const slug = filename.replace(/\.md$/, "");
  const title = String(data.title ?? slug);
  const date = String(data.date ?? "");
  const summary = String(data.summary ?? "");
  const tags = toStringArray(data.tags);
  const canonical = data.canonical ? String(data.canonical) : undefined;
  const audience = data.audience ? String(data.audience) : undefined;

  const bodyWithoutH1 = parsed.content.replace(/^\s*#\s+.+\n+/, "");
  const contentHtml = marked.parse(bodyWithoutH1) as string;

  return {
    slug,
    title,
    date,
    summary,
    tags,
    canonical,
    audience,
    readingMinutes: estimateReadingMinutes(parsed.content),
    contentHtml
  };
}

export function getAllPosts(): DevBlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => {
      const post = readPostFile(f);
      const { contentHtml: _c, ...meta } = post;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): DevBlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readPostFile(`${slug}.md`);
}

export function formatPostDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
