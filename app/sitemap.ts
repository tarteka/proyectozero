import type { MetadataRoute } from "next";

const locales = ["es", "eu"] as const;
const base = "https://proyectozero.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}`]));

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    alternates: { languages },
  }));
}
