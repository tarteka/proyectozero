"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { markLocaleSwitch } from "@/lib/localeSwitch";

const languages = [
  { code: "es", label: "ES", name: "Español" },
  { code: "eu", label: "EU", name: "Euskara" },
];

function saveLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageToggle() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    // El middleware de next-intl recuerda el idioma en esta cookie y, si sigue
    // valiendo el anterior, redirige de "/" a "/eu" y el cambio a español no
    // hace nada. Se actualiza antes de navegar.
    saveLocaleCookie(newLocale);
    markLocaleSwitch();
    const pathWithoutLocale = pathname.replace(/^\/(?:es|eu)(?=\/|$)/, "") || "/";
    const newPathname =
      newLocale === "es"
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    router.replace(newPathname, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex h-9 items-center rounded-none border border-line p-0.5"
    >
      {languages.map((lang) => {
        const active = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            aria-pressed={active}
            title={lang.name}
            className={`cursor-pointer h-full rounded-none px-2.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
