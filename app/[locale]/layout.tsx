import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://proyectozero.org"),
  title: "Sergio Moreno · Desarrollador web | ProyectoZero",
  description:
    "Portafolio de Sergio Moreno, desarrollador web especializado en backend (PHP, Java, TypeScript, Docker) en Zarautz, Gipuzkoa.",
  openGraph: {
    title: "Sergio Moreno · Desarrollador web",
    description:
      "Portafolio de Sergio Moreno, desarrollador web especializado en backend.",
    url: "https://proyectozero.org",
    siteName: "ProyectoZero",
    type: "website",
  },
};

const locales = ["es", "eu"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <Script
        src="https://stats.proyectozero.org/script.js"
        data-website-id="c700ad72-dc6c-4608-97a1-2c6dc3c87d67"
        strategy="afterInteractive"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
