import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HtmlLang } from "@/components/providers/HtmlLang";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const locales = ["es", "eu"] as const;
const ogLocale: Record<(typeof locales)[number], string> = {
  es: "es_ES",
  eu: "eu_ES",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Rutas como /favicon.ico o /service-worker.js llegan aquí como "idioma":
  // el layout responde 404, sin intentar cargar mensajes que no existen.
  if (!(locales as readonly string[]).includes(locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  const other = locales.find((l) => l !== locale) ?? "es";
  const localePath = locale === "es" ? "/" : `/${locale}`;

  return {
    metadataBase: new URL("https://proyectozero.org"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath,
      languages: {
        es: "/",
        eu: "/eu",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath,
      siteName: "ProyectoZero",
      locale: ogLocale[locale as (typeof locales)[number]] ?? ogLocale.es,
      alternateLocale: ogLocale[other],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const site = "https://proyectozero.org";
  const localePath = locale === "es" ? "" : `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: "ProyectoZero",
        inLanguage: ["es", "eu"],
        publisher: { "@id": `${site}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: "Sergio Moreno",
        url: `${site}${localePath}`,
        image: `${site}/images/sergio-moreno.jpg`,
        jobTitle: locale === "eu" ? "Full Stack web garatzailea" : "Desarrollador web Full Stack",
        description: t("description"),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Zarautz",
          addressRegion: "Gipuzkoa",
          addressCountry: "ES",
        },
        knowsLanguage: ["es", "eu"],
        knowsAbout: [
          locale === "eu" ? "Web garapena" : "Desarrollo web",
          "Backend",
          "PHP",
          "Symfony",
          "Laravel",
          "Java",
          "Spring Boot",
          "Python",
          "FastAPI",
          "TypeScript",
          "Angular",
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Docker",
          locale === "eu" ? "Arkitektura hexagonala" : "Arquitectura hexagonal",
          "DDD",
        ],
        sameAs: [
          "https://github.com/tarteka",
          "https://www.linkedin.com/in/sergio-moreno-tes",
        ],
      },
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-none focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
      >
        {tNav("skipToContent")}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MotionProvider>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
