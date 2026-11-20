"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  HiAcademicCap,
  HiArrowUpRight,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

interface Degree {
  id: "daw" | "das" | "tes";
  grade: string;
  logo: string;
  // Los logos de Easo y Osoki son blancos (para cabeceras oscuras): van sobre fondo oscuro.
  logoTone: "light" | "dark";
  link?: string;
}

// Del más reciente al más antiguo. Textos en messages/*.json → about.degrees.<id>
const degrees: Degree[] = [
  {
    id: "daw",
    grade: "9,00",
    logo: "/images/Birt.svg",
    logoTone: "light",
    link: "https://www.birt.eus/ciclo-formativo/desarrollo-de-aplicaciones-web/",
  },
  {
    id: "das",
    grade: "9,60",
    logo: "/images/osoki.png",
    logoTone: "dark",
    link: "https://osoki.eus",
  },
  {
    id: "tes",
    grade: "8,57",
    logo: "/images/easo.png",
    logoTone: "dark",
    link: "https://easo.eus/es/heziketa-zikloa/emergencias-sanitarias/",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const arrowClass =
  "cursor-pointer inline-flex h-8 w-8 items-center justify-center border border-line text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground";

export function EducationCarousel() {
  const t = useTranslations("about");
  const reduceMotion = useReducedMotionSafe();
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(next, degrees.length - 1));
    if (clamped === index) return;
    setPage([clamped, clamped > index ? 1 : -1]);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) goTo(index + 1);
    else if (info.offset.x > 50) goTo(index - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const degree = degrees[index];
  const shift = reduceMotion ? 0 : 48;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("education")}
      onKeyDown={handleKeyDown}
      className="border border-line bg-surface transition-[box-shadow,transform] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--accent)] motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="flex items-center justify-between border-b border-line bg-surface-muted px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <HiAcademicCap className="h-4 w-4 text-accent" aria-hidden />
          {t("education")}
          <span className="tracking-normal text-foreground">
            {String(index + 1).padStart(2, "0")}/{String(degrees.length).padStart(2, "0")}
          </span>
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={t("prev")}
            className={arrowClass}
          >
            <HiChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === degrees.length - 1}
            aria-label={t("next")}
            className={arrowClass}
          >
            <HiChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="relative min-h-72 overflow-hidden" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={degree.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${degrees.length}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * shift, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: -d * shift, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.15 : 0.45, ease }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="flex min-h-72 flex-col p-6"
          >
            <span
              className="pointer-events-none absolute right-4 top-2 select-none font-mono text-7xl font-bold leading-none text-accent/15"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease }}
              className="relative"
            >
              <span
                className={`mb-4 flex h-12 w-32 shrink-0 items-center justify-center border border-line p-2 ${
                  degree.logoTone === "dark" ? "bg-[#18181b]" : "bg-white"
                }`}
              >
                <Image
                  src={degree.logo}
                  alt=""
                  width={160}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="min-w-0 pr-14">
                <h3 className="font-semibold leading-snug text-foreground">
                  {t(`degrees.${degree.id}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t(`degrees.${degree.id}.school`)}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16, ease }}
              className="relative mt-auto flex flex-wrap items-end gap-x-6 gap-y-3 pt-6"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
                  {t("gradeLabel")}
                </p>
                <p className="font-mono text-4xl font-bold leading-none tabular-nums text-accent">
                  {degree.grade}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 border border-success px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-success">
                <HiCheck className="h-3.5 w-3.5" aria-hidden />
                {t("status")}
              </span>
              {degree.link && (
                <a
                  href={degree.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group ml-auto inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {t("moreInfo")}
                  <HiArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5 border-t border-line p-3">
        {degrees.map((d, i) => (
          <button
            key={d.id}
            onClick={() => goTo(i)}
            aria-label={t("goTo", { n: i + 1 })}
            aria-current={index === i}
            className="group relative h-4 flex-1 cursor-pointer"
          >
            <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-border transition-colors group-hover:bg-subtle" />
            <motion.span
              className="absolute inset-x-0 top-1/2 h-1.5 origin-left -translate-y-1/2 bg-accent"
              initial={false}
              animate={{ scaleX: index === i ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.45, ease }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
