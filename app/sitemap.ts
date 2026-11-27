import type { MetadataRoute } from "next";
import {
  blogLocales,
  getBlogPath,
  getPostPath,
  getPublishedPosts,
  type BlogLocale,
  type BlogPost,
} from "@/lib/blog";

const base = "https://proyectozero.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = {
    es: base,
    eu: `${base}/eu`,
  };

  const home: MetadataRoute.Sitemap = blogLocales.map((locale) => ({
    url: locale === "es" ? base : `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    alternates: { languages },
  }));

  const blogLanguages = {
    es: `${base}${getBlogPath("es")}`,
    eu: `${base}${getBlogPath("eu")}`,
  };

  const blog: MetadataRoute.Sitemap = blogLocales.map((locale) => ({
    url: `${base}${getBlogPath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    alternates: { languages: blogLanguages },
  }));

  const published = new Map<string, Partial<Record<BlogLocale, BlogPost>>>();

  for (const locale of blogLocales) {
    for (const post of await getPublishedPosts(locale)) {
      const entry = published.get(post.slug) ?? {};
      entry[locale] = post;
      published.set(post.slug, entry);
    }
  }

  const articles: MetadataRoute.Sitemap = [];

  for (const [slug, translations] of published) {
    const availableLocales = blogLocales.filter(
      (locale) => translations[locale] !== undefined,
    );
    const articleLanguages = Object.fromEntries(
      availableLocales.map((locale) => [
        locale,
        `${base}${getPostPath(locale, slug)}`,
      ]),
    );

    for (const locale of availableLocales) {
      const post = translations[locale];
      if (!post) continue;

      articles.push({
        url: `${base}${getPostPath(locale, slug)}`,
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages: articleLanguages },
      });
    }
  }

  return [...home, ...blog, ...articles];
}
