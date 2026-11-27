import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");
const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // El blog lee los nombres de archivo de content/blog en el servidor. En
  // despliegues con funciones de Vercel hay que incluirlos en el tracing,
  // aunque la página se genere estáticamente.
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*.mdx"],
  },
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      {
        source: "/es",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Sirve el HTML estático en /sideral/privacidad (sin barra final ni .html).
          source: "/sideral/privacidad",
          destination: "/sideral/privacidad/index.html",
        },
      ],
    };
  },
};

export default withNextIntl(withMDX(nextConfig));
