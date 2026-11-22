import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
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

export default withNextIntl(nextConfig);
