"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "es", label: "ES", name: "Español" },
  { code: "eu", label: "EU", name: "Euskara" },
];

export function LanguageToggle() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex h-9 items-center rounded-full border border-border p-0.5"
    >
      {languages.map((lang) => {
        const active = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            aria-pressed={active}
            title={lang.name}
            className={`cursor-pointer h-full rounded-full px-2.5 text-xs font-semibold transition-colors ${
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
