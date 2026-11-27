import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  blogLocales,
  getBlogPath,
  getPublishedPosts,
  isBlogLocale,
  isDraftPreviewEnabled,
  type BlogLocale,
} from "@/lib/blog";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[]; tag?: string | string[] }>;
};

const PAGE_SIZE = 10;

function pageNumber(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

function pagePath(path: string, page: number, tag?: string): string {
  const query = new URLSearchParams();
  if (tag) query.set("tag", tag);
  if (page > 1) query.set("page", String(page));
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
}

const ogLocale: Record<BlogLocale, string> = {
  es: "es_ES",
  eu: "eu_ES",
};

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isBlogLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const query = await searchParams;
  const page = pageNumber(query.page) ?? 1;
  const filtered = typeof query.tag === "string" && query.tag.length > 0;
  const path = pagePath(getBlogPath(locale), filtered ? 1 : page);
  const otherLocale = blogLocales.find((candidate) => candidate !== locale);

  return {
    title: `${t("title")} · ProyectoZero`,
    description: t("description"),
    ...(isDraftPreviewEnabled()
      ? { robots: { index: false, follow: false } }
      : filtered ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: path,
      ...(page === 1 && !filtered ? { languages: {
        es: "/blog",
        eu: "/eu/blog",
        "x-default": "/blog",
      } } : {}),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: path,
      siteName: "ProyectoZero",
      locale: ogLocale[locale],
      ...(otherLocale ? { alternateLocale: ogLocale[otherLocale] } : {}),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;

  if (!isBlogLocale(locale)) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getPublishedPosts(locale);
  const blogPath = getBlogPath(locale);
  const query = await searchParams;
  if (Array.isArray(query.tag)) notFound();
  const tag = query.tag || undefined;
  const filteredPosts = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;
  const page = pageNumber(query.page);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  if (page === null || page > totalPages) notFound();
  const pagePosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main id="main" className="pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            <span className="text-accent">$</span> / {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {t("description")}
          </p>
        </header>

        {tag && (
          <p className="mt-8 font-mono text-sm text-muted">
            {t("filter.active", { tag })}{" "}
            <a href={blogPath} className="text-accent underline underline-offset-4">
              {t("filter.clear")}
            </a>
          </p>
        )}

        {tag && filteredPosts.length === 0 ? (
          <p className="mt-8 text-muted">{t("filter.empty", { tag })}</p>
        ) : posts.length === 0 ? (
          <div className="mt-12 border border-line bg-surface p-6 md:p-8">
            <p className="font-mono text-xs text-accent">
              {t("emptyCommand", { locale })}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {t("emptyTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
              {t("emptyDescription")}
            </p>
          </div>
        ) : (
          <div className="mt-12 border-t border-line">
            {pagePosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-line py-4"
              >
                <span aria-hidden className="font-mono text-accent">&gt;</span>
                <time dateTime={post.date} className="font-mono text-xs tabular-nums tracking-wide text-muted">
                  {locale === "es"
                    ? post.date.split("-").reverse().join("/")
                    : post.date.replaceAll("-", "/")}
                </time>
                <h2 className="text-base font-semibold text-foreground">
                  <a
                    href={`${blogPath}/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </a>
                </h2>
                {post.draft && (
                  <span className="border border-line bg-warning-soft px-1.5 py-0.5 font-mono text-xs text-warning">
                    {t("draft")}
                  </span>
                )}
                {post.tags.length > 0 && (
                  <ul aria-label={t("tagsLabel")} className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <a
                          href={pagePath(blogPath, 1, tag === query.tag ? undefined : tag)}
                          aria-label={t(tag === query.tag ? "filter.remove" : "filter.apply", { tag })}
                          aria-current={tag === query.tag ? "true" : undefined}
                          className={`inline-block border border-line px-2 py-1 font-mono text-[11px] transition-colors ${
                            tag === query.tag
                              ? "bg-accent text-accent-foreground"
                              : "bg-surface-muted text-muted hover:text-accent"
                          }`}
                        >
                          {tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <nav aria-label={t("pagination.label")} className="mt-8 flex flex-wrap items-center gap-4 font-mono text-sm">
            {page > 1 && (
              <a href={pagePath(blogPath, page - 1, tag)} className="text-muted transition-colors hover:text-accent">
                ← {t("pagination.previous")}
              </a>
            )}
            <span className="text-muted">{t("pagination.current", { page, total: totalPages })}</span>
            {page < totalPages && (
              <a href={pagePath(blogPath, page + 1, tag)} className="text-muted transition-colors hover:text-accent">
                {t("pagination.next")} →
              </a>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
