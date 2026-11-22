import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["es", "eu"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export const config = {
  // /sideral/privacidad es una página estática (public/sideral/privacidad/index.html)
  // que no debe pasar por el enrutado de idiomas.
  matcher: "/((?!api|_next|_vercel|sideral(?:/|$)|.*\\..*).*)",
};
