import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && ["es", "eu"].includes(requested) ? requested : "es";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
