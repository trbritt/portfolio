import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Build-time reader for the Astro blog's frontmatter.
 *
 * The blog deploys separately to blogs.tbritt.xyz, but its markdown lives in
 * this repo — so the portfolio can list recent posts without a network call or
 * a feed fetch at runtime. This module is Node-only; import it from
 * `getStaticProps`, never from a component.
 */

const BLOG_CONTENT_DIR = path.join(process.cwd(), "blog", "src", "content", "blog");
const BLOG_URL = "https://blogs.tbritt.xyz";

export type BlogPost = {
  code: string;
  title: string;
  description: string;
  location: string;
  /** ISO date string — Date objects are not serialisable across getStaticProps. */
  date: string;
  technologies: string[];
  externalLink: string;
};

/** `2026-07-14` -> `JUL 2026`, matching the terse register of the other panels. */
function formatMonth(date: Date): string {
  return date
    .toLocaleDateString("en-CA", { year: "numeric", month: "short", timeZone: "UTC" })
    .toUpperCase();
}

export function getBlogPosts(limit = 8): BlogPost[] {
  // The portfolio must still build if the blog directory is missing.
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => /\.mdx?$/.test(file));

  const posts = files.flatMap((file) => {
    const raw = fs.readFileSync(path.join(BLOG_CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);

    // Drafts are stripped from the blog build; keep them off here too.
    if (data.draft) return [];
    if (!data.title || !data.pubDate) return [];

    const slug = file.replace(/\.mdx?$/, "");
    const date = new Date(data.pubDate);

    return [
      {
        code: slug.toUpperCase().replace(/-/g, "_"),
        title: String(data.title),
        description: String(data.description ?? "").trim(),
        location: formatMonth(date),
        date: date.toISOString(),
        technologies: Array.isArray(data.tags) ? data.tags.map(String) : [],
        externalLink: `${BLOG_URL}/posts/${slug}/`,
      },
    ];
  });

  return posts
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
