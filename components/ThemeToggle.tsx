"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const t = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This setState on mount is intentional to avoid SSR/client hydration mismatch for next-themes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const baseClass =
    "cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-muted hover:text-foreground";

  if (!mounted) {
    // SSR y primer render cliente iguales
    return <span className={baseClass} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={baseClass}
      aria-label={t("toggleTheme")}
    >
      {isDark ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
    </button>
  );
}
