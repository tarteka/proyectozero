import type { MetadataRoute } from "next";

const locales = ["es", "eu"] as const;
const base = "https://proyectozero.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    es: base,
    eu: `${base}/eu`,
  };

  return locales.map((locale) => ({
    url: locale === "es" ? base : `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    alternates: { languages },
  }));
}
