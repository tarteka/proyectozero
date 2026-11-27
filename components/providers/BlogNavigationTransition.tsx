"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { buildPixelFrames } from "@/lib/pixelThemeTransition";

type Transition = {
  overlay: HTMLDivElement;
  frames: string[];
  timeout: number;
};

function routeKind(path: string): "home" | "blog" | null {
  const normalized = path.replace(/^\/(?:es|eu)(?=\/|$)/, "") || "/";
  if (normalized === "/") return "home";
  if (normalized === "/blog" || normalized.startsWith("/blog/")) return "blog";
  return null;
}

export function BlogNavigationTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<Transition | null>(null);

  useEffect(() => {
    const transition = pending.current;
    if (!transition) return;
    pending.current = null;
    window.clearTimeout(transition.timeout);
    const animation = transition.overlay.animate(
      { clipPath: [...transition.frames].reverse() },
      { duration: 380, easing: "linear", fill: "forwards" },
    );
    animation.finished.catch(() => {}).finally(() => transition.overlay.remove());
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !CSS.supports("clip-path", "path('M0 0')") ||
        typeof Element.prototype.animate !== "function"
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download") ||
          (link.target && link.target !== "_self")) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin ||
          url.pathname === window.location.pathname) return;
      const from = routeKind(window.location.pathname);
      const to = routeKind(url.pathname);
      if (!from || !to || (from !== "blog" && to !== "blog")) return;

      if (pending.current) return;
      event.preventDefault();

      const rect = link.getBoundingClientRect();
      const frames = buildPixelFrames(
        event.detail ? event.clientX : rect.left + rect.width / 2,
        event.detail ? event.clientY : rect.top + rect.height / 2,
        window.innerWidth,
        window.innerHeight,
      );
      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        zIndex: "9999",
        pointerEvents: "none",
        background: "var(--accent)",
      });
      document.body.appendChild(overlay);
      const timeout = window.setTimeout(() => {
        overlay.remove();
        if (pending.current?.overlay === overlay) pending.current = null;
      }, 5000);
      pending.current = { overlay, frames, timeout };

      const animation = overlay.animate(
        { clipPath: frames },
        { duration: 380, easing: "linear", fill: "forwards" },
      );
      animation.finished.then(() => {
        if (pending.current?.overlay === overlay) {
          router.push(`${url.pathname}${url.search}${url.hash}`);
        }
      }).catch(() => {
        window.clearTimeout(timeout);
        overlay.remove();
        pending.current = null;
        window.location.assign(url.href);
      });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (pending.current) {
        window.clearTimeout(pending.current.timeout);
        pending.current.overlay.remove();
        pending.current = null;
      }
    };
  }, [router]);

  return null;
}
