import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["es", "eu"],
  defaultLocale: "es",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(es|eu)/:path*"],
};
