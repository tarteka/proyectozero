import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["es", "eu"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
