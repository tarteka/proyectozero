"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { pixelThemeTransition } from "@/lib/pixelThemeTransition";

export function ThemeToggle({ onToggle }: { onToggle?: () => void }) {
  const t = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This setState on mount is intentional to avoid SSR/client hydration mismatch for next-themes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const baseClass =
    "cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-none border border-line text-muted transition-colors hover:bg-surface-muted hover:text-foreground";

  if (!mounted) {
    // SSR y primer render cliente iguales
    return <span className={baseClass} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    pixelThemeTransition(e.currentTarget, () => {
      // Se aplica la clase a mano para que el cambio sea síncrono dentro de la
      // transición; next-themes la deja igual al actualizar su estado.
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      flushSync(() => {
        setTheme(next);
        onToggle?.();
      });
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={baseClass}
      aria-label={t("toggleTheme")}
    >
      {isDark ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
    </button>
  );
}
