import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  blogDateToIso,
  formatBlogDate,
  getAllPublishedSlugs,
  getBlogPath,
  getBlogPostView,
  getPostPath,
  getPublishedLocales,
  isBlogLocale,
  isDraftPreviewEnabled,
  isValidSlug,
  type BlogLocale,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const site = "https://proyectozero.org";
const ogLocale: Record<BlogLocale, string> = {
  es: "es_ES",
  eu: "eu_ES",
};

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();

  return slugs.map((slug) => ({ slug }));
}

// Solo se sirven los slugs publicados en generateStaticParams. Un borrador o
// una ruta inventada responde 404 sin ejecutar el import dinámico.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale) || !isValidSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const view = await getBlogPostView(locale, slug);

  if (!view) return {};

  if (view.status === "translation-missing") {
    const language = t(`languages.${view.originalLocale}.name`);
    const languageIn = t(`languages.${view.originalLocale}.in`);
    const requestedLanguage = t(`languages.${locale}.name`);
    const requestedLanguageIn = t(`languages.${locale}.in`);

    return {
      title: `${t("translationMissing.metaTitle", {
        language,
        languageIn,
      })} · ProyectoZero`,
      description: t("translationMissing.metaDescription", {
        language,
        languageIn,
        requestedLanguage,
        requestedLanguageIn,
      }),
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: getPostPath(view.originalLocale, slug),
      },
      openGraph: {
        title: t("translationMissing.metaTitle", { language, languageIn }),
        description: t("translationMissing.metaDescription", {
          language,
          languageIn,
          requestedLanguage,
          requestedLanguageIn,
        }),
        url: getPostPath(locale, slug),
        siteName: "ProyectoZero",
        locale: ogLocale[locale],
        type: "website",
      },
      twitter: {
        card: "summary",
        title: t("translationMissing.metaTitle", { language, languageIn }),
        description: t("translationMissing.metaDescription", {
          language,
          languageIn,
          requestedLanguage,
          requestedLanguageIn,
        }),
      },
    };
  }

  const { post } = view;
  const publishedLocales = await getPublishedLocales(slug);
  const otherLocales = publishedLocales.filter((candidate) => candidate !== locale);
  const languages: Record<string, string> = {};
  const ogImage =
    locale === "es" ? "/opengraph-image" : `/${locale}/opengraph-image`;

  for (const publishedLocale of publishedLocales) {
    languages[publishedLocale] = getPostPath(publishedLocale, slug);
  }

  const defaultLocale = publishedLocales.includes("es")
    ? "es"
    : publishedLocales[0];

  if (defaultLocale) {
    languages["x-default"] = getPostPath(defaultLocale, slug);
  }

  return {
    title: `${post.title} · ProyectoZero`,
    description: post.description,
    keywords: post.tags,
    ...(post.draft || isDraftPreviewEnabled()
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: {
      canonical: getPostPath(locale, slug),
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: getPostPath(locale, slug),
      siteName: "ProyectoZero",
      locale: ogLocale[locale],
      ...(otherLocales.length > 0
        ? { alternateLocale: otherLocales.map((item) => ogLocale[item]) }
        : {}),
      type: "article",
      publishedTime: blogDateToIso(post.date),
      authors: ["Sergio Moreno"],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale) || !isValidSlug(slug)) notFound();

  const view = await getBlogPostView(locale, slug);

  if (!view) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const blogPath = getBlogPath(locale);

  if (view.status === "translation-missing") {
    const language = t(`languages.${view.originalLocale}.name`);
    const languageIn = t(`languages.${view.originalLocale}.in`);
    const requestedLanguage = t(`languages.${locale}.name`);
    const requestedLanguageIn = t(`languages.${locale}.in`);
    // Un prefijo explícito permite que next-intl actualice la cookie de idioma
    // antes de redirigir a la URL canónica sin prefijo del español.
    const originalPath = `/${view.originalLocale}/blog/${slug}`;

    return (
      <main id="main" className="pt-28 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <a
            href={blogPath}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span>
            {t("backToBlog")}
          </a>

          <div className="shadow-block mt-8 border border-line bg-surface p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t("translationMissing.eyebrow")}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("translationMissing.title", { language, languageIn })}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {t("translationMissing.description", {
                language,
                languageIn,
                requestedLanguage,
                requestedLanguageIn,
              })}
            </p>
            <a
              href={originalPath}
              hrefLang={view.originalLocale}
              className="lift mt-6 inline-flex items-center gap-2 border border-line bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              {t("translationMissing.readOriginal", { language, languageIn })}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </main>
    );
  }

  const { post, Content } = view;
  const articleUrl = `${site}${getPostPath(locale, slug)}`;
  const published = blogDateToIso(post.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#post`,
    headline: post.title,
    description: post.description,
    datePublished: published,
    dateModified: published,
    inLanguage: locale,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: post.tags.join(", "),
    author: { "@id": `${site}/#person` },
    publisher: { "@id": `${site}/#person` },
    isPartOf: { "@id": `${site}/#website` },
  };

  return (
    <main id="main" className="pt-28 pb-24 md:pt-32 md:pb-32">
      {!post.draft && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <article className="mx-auto max-w-3xl px-6">
        <a
          href={blogPath}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span>
          {t("backToBlog")}
        </a>

        <header className="mt-8 border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
            <time dateTime={post.date} className="tabular-nums">
              <span className="sr-only">{t("publishedOn")} </span>
              {formatBlogDate(post.date, locale)}
            </time>
            {post.draft && (
              <span className="border border-line bg-warning-soft px-1.5 py-0.5 text-warning">
                {t("draft")}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {post.description}
          </p>

          <ul
            aria-label={t("tagsLabel")}
            className="mt-5 flex flex-wrap gap-1.5"
          >
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="border border-line bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-10 min-w-0">
          <Content />
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <a
            href={blogPath}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span>
            {t("backToBlog")}
          </a>
        </footer>
      </article>
    </main>
  );
}
