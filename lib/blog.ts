import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export const blogLocales = ["es", "eu"] as const;
export type BlogLocale = (typeof blogLocales)[number];
export const defaultBlogLocale: BlogLocale = "es";

export interface BlogPostMeta {
  title: string;
  description: string;
  /** Fecha de publicación en formato YYYY-MM-DD. */
  date: string;
  tags: string[];
  draft: boolean;
}

export interface BlogPost extends BlogPostMeta {
  slug: string;
  locale: BlogLocale;
}

export type BlogPostView =
  | {
      status: "published";
      post: BlogPost;
      Content: ComponentType;
    }
  | {
      status: "translation-missing";
      originalLocale: BlogLocale;
      originalPost: BlogPost;
    }
  | null;

interface MdxModule {
  default: ComponentType;
  metadata?: unknown;
}

interface PublishedEntry {
  post: BlogPost;
  Content: ComponentType;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isBlogLocale(value: string): value is BlogLocale {
  return (blogLocales as readonly string[]).includes(value);
}

export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

export function localePath(locale: BlogLocale): string {
  return locale === "es" ? "" : `/${locale}`;
}

export function getBlogPath(locale: BlogLocale): string {
  return `${localePath(locale)}/blog`;
}

export function getPostPath(locale: BlogLocale, slug: string): string {
  return `${getBlogPath(locale)}/${slug}`;
}

/**
 * Los borradores se ven siempre en desarrollo y, en despliegues de preview,
 * solo si BLOG_PREVIEW=true. En producción nunca se muestran, aunque la
 * variable esté mal configurada.
 */
export function isDraftPreviewEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true;

  return (
    process.env.BLOG_PREVIEW === "true" &&
    process.env.VERCEL_ENV === "preview"
  );
}

function contentFile(locale: BlogLocale, slug: string): string {
  return path.join(CONTENT_DIR, locale, `${slug}.mdx`);
}

function assertSourcePath(locale: BlogLocale, slug: string): void {
  if (!isBlogLocale(locale) || !isValidSlug(slug)) {
    throw new Error(`Ruta de artículo no válida: ${locale}/${slug}`);
  }
}

function readSlugs(locale: BlogLocale): string[] {
  const dir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.slice(0, -".mdx".length))
    .map((slug) => {
      if (!isValidSlug(slug)) {
        throw new Error(
          `Slug no válido en ${locale}/${slug}.mdx. Usa solo minúsculas, números y guiones.`,
        );
      }
      return slug;
    })
    .sort();
}

function parseDate(value: unknown, source: string): string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `${source}: "date" debe ser una fecha en formato YYYY-MM-DD.`,
    );
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`${source}: "date" no es una fecha real (${value}).`);
  }

  return value;
}

function parseMeta(value: unknown, source: string): BlogPostMeta {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(
      `${source}: falta el export "metadata" con los datos del artículo.`,
    );
  }

  const record = value as Record<string, unknown>;
  const { title, description, tags, draft } = record;

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error(`${source}: "title" debe ser un texto no vacío.`);
  }

  if (typeof description !== "string" || description.trim() === "") {
    throw new Error(`${source}: "description" debe ser un texto no vacío.`);
  }

  if (
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === "string" && tag.trim() !== "")
  ) {
    throw new Error(`${source}: "tags" debe ser una lista de textos no vacíos.`);
  }

  if (typeof draft !== "boolean") {
    throw new Error(`${source}: "draft" debe ser true o false.`);
  }

  return {
    title: title.trim(),
    description: description.trim(),
    date: parseDate(record.date, source),
    tags: [...new Set(tags.map((tag) => tag.trim()))],
    draft,
  };
}

async function loadMdx(locale: BlogLocale, slug: string): Promise<MdxModule> {
  assertSourcePath(locale, slug);

  // La ruta se construye dentro de content/blog/{es,eu}; el slug se valida
  // antes para impedir traversal y el bundle incluye todos los .mdx locales.
  const mod = (await import(
    `@/content/blog/${locale}/${slug}.mdx`
  )) as MdxModule;

  if (typeof mod.default !== "function") {
    throw new Error(
      `content/blog/${locale}/${slug}.mdx no exporta un componente MDX válido.`,
    );
  }

  return mod;
}

async function readPublishedEntry(
  locale: BlogLocale,
  slug: string,
): Promise<PublishedEntry | null> {
  if (!isValidSlug(slug) || !fs.existsSync(contentFile(locale, slug))) {
    return null;
  }

  const mod = await loadMdx(locale, slug);
  const post = {
    ...parseMeta(mod.metadata, `content/blog/${locale}/${slug}.mdx`),
    slug,
    locale,
  };

  if (post.draft && !isDraftPreviewEnabled()) return null;

  return { post, Content: mod.default };
}

export async function getPublishedPost(
  locale: BlogLocale,
  slug: string,
): Promise<BlogPost | null> {
  const entry = await readPublishedEntry(locale, slug);
  return entry?.post ?? null;
}

export async function getPublishedPosts(
  locale: BlogLocale,
): Promise<BlogPost[]> {
  const posts = await Promise.all(
    readSlugs(locale).map((slug) => getPublishedPost(locale, slug)),
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export async function getPublishedLocales(
  slug: string,
): Promise<BlogLocale[]> {
  if (!isValidSlug(slug)) return [];

  const checks = await Promise.all(
    blogLocales.map(async (locale) => ({
      locale,
      post: await getPublishedPost(locale, slug),
    })),
  );

  return checks.filter(({ post }) => post !== null).map(({ locale }) => locale);
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const slugs = new Set<string>();

  for (const locale of blogLocales) {
    for (const post of await getPublishedPosts(locale)) {
      slugs.add(post.slug);
    }
  }

  return [...slugs].sort();
}

/**
 * Devuelve el artículo en el idioma solicitado o, si no existe, la versión
 * publicada en el otro idioma. Un slug que no existe en ningún idioma (o que
 * solo existe como borrador fuera de preview) devuelve null.
 */
export async function getBlogPostView(
  locale: BlogLocale,
  slug: string,
): Promise<BlogPostView> {
  if (!isValidSlug(slug)) return null;

  const requested = await readPublishedEntry(locale, slug);
  if (requested) {
    return {
      status: "published",
      post: requested.post,
      Content: requested.Content,
    };
  }

  const otherLocale = blogLocales.find((candidate) => candidate !== locale);
  if (!otherLocale) return null;

  const original = await readPublishedEntry(otherLocale, slug);
  if (!original) return null;

  return {
    status: "translation-missing",
    originalLocale: otherLocale,
    originalPost: original.post,
  };
}

export function formatBlogDate(date: string, locale: BlogLocale): string {
  return new Intl.DateTimeFormat(locale === "eu" ? "eu-ES" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function blogDateToIso(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}
