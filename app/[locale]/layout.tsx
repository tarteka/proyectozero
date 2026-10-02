import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  const t = await getTranslations({ locale, namespace: "metadata" });
  const other = locales.find((l) => l !== locale) ?? "es";

  return {
    metadataBase: new URL("https://proyectozero.org"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        eu: "/eu",
        "x-default": "/es",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sergio Moreno",
    url: "https://proyectozero.org",
    image: "https://proyectozero.org/images/sergio-moreno.jpg",
    jobTitle: locale === "eu" ? "Full Stack web garatzailea" : "Desarrollador web Full Stack",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zarautz",
      addressRegion: "Gipuzkoa",
      addressCountry: "ES",
    },
    sameAs: [
      "https://github.com/tarteka",
      "https://www.linkedin.com/in/sergio-moreno-tes",
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          src="https://stats.proyectozero.org/script.js"
          data-website-id="c700ad72-dc6c-4608-97a1-2c6dc3c87d67"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="proyectozero-theme"
        >
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <Navbar />
              {children}
              <Footer />
              <ScrollToTop />
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
