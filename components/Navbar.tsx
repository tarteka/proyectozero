"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const sections = ["about", "experience", "portfolio", "skills", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const homePath = locale === "es" ? "/" : `/${locale}`;
  const blogPath = locale === "es" ? "/blog" : `/${locale}/blog`;
  const isHome = pathname === homePath || pathname === `${homePath}/`;
  const isBlog = pathname === blogPath || pathname.startsWith(`${blogPath}/`);
  const sectionHref = (id: string) => (isHome ? `#${id}` : `${homePath}#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el enlace de la sección visible. La portada (#top) también se
  // observa para quitar el resaltado cuando se vuelve al inicio.
  useEffect(() => {
    // La navbar permanece montada entre rutas: descartar la sección anterior.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(null);
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...sections].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href={isHome ? "#top" : homePath}
          aria-label="proyectozero.org"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={sectionHref(id)}
                aria-current={isHome && active === id ? "location" : undefined}
                className={`relative isolate block rounded-none border border-transparent px-3.5 py-2 text-sm transition-colors ${
                  isHome && active === id
                    ? "font-medium text-accent"
                    : "text-muted hover:border-line hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {isHome && active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -inset-px -z-10 rounded-none border border-accent bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(id)}
              </a>
            </li>
          ))}
          <li>
            <a
              href={blogPath}
              aria-current={isBlog ? "location" : undefined}
              className={`relative isolate block rounded-none border border-transparent px-3.5 py-2 text-sm transition-colors ${
                isBlog
                  ? "font-medium text-accent"
                  : "text-muted hover:border-line hover:bg-surface-muted hover:text-foreground"
              }`}
            >
              {isBlog && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -inset-px -z-10 rounded-none border border-accent bg-accent-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {t("blog")}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-none border border-line text-foreground md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
          >
            {open ? <HiX className="h-4 w-4" /> : <HiMenuAlt4 className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={sectionHref(id)}
                    onClick={(e) => {
                      // Desde una página que no es la portada, el enlace debe
                      // navegar a la portada con el hash. Solo se intercepta en
                      // la portada, donde la sección ya está montada.
                      if (!isHome) {
                        setOpen(false);
                        return;
                      }
                      // Se desplaza manualmente tras cerrar el menú: si el
                      // salto nativo ocurre mientras el desplegable todavía
                      // se está colapsando, el cambio de layout lo cancela
                      // (reproducible en Android).
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    aria-current={isHome && active === id ? "location" : undefined}
                    className={`block py-3 text-lg font-medium ${isHome && active === id ? "text-accent" : "text-foreground"}`}
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={blogPath}
                  onClick={() => setOpen(false)}
                  aria-current={isBlog ? "location" : undefined}
                  className={`block py-3 text-lg font-medium ${isBlog ? "text-accent" : "text-foreground"}`}
                >
                  {t("blog")}
                </a>
              </li>
              <li className="flex items-center gap-2 pt-4 sm:hidden">
                <LanguageToggle />
                <ThemeToggle onToggle={() => setOpen(false)} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
