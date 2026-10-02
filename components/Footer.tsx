"use client";

import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} · {t("credits")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/tarteka"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/sergio-moreno-tes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
          <span className="mx-2 h-5 w-px bg-border" aria-hidden />
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            {t("backToTop")}
            <HiArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
