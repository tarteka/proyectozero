import { getLocale } from "next-intl/server";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Este layout NO depende del idioma en la ruta: al cambiar de idioma React no
// lo desmonta, así que <html>, el tema, las fuentes y el script de estadísticas
// se conservan (sin destello de tema ni recarga de las fuentes).

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // En el servidor da el idioma de la petición; en el cliente lo mantiene
  // actualizado <HtmlLang /> (este layout no se vuelve a renderizar al navegar).
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://stats.proyectozero.org" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
