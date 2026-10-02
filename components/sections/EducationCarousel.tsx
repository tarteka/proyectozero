"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiAcademicCap,
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
  HiDocumentText,
} from "react-icons/hi2";
import { FaAmbulance } from "react-icons/fa";

interface Degree {
  id: "daw" | "das" | "tes";
  grade: string;
  logo?: string;
  icon?: IconType;
  link?: string;
}

// Del más reciente al más antiguo. Textos en messages/*.json → about.degrees.<id>
const degrees: Degree[] = [
  {
    id: "daw",
    grade: "9,00",
    logo: "/images/Birt.svg",
    link: "https://www.birt.eus/ciclo-formativo/desarrollo-de-aplicaciones-web/",
  },
  {
    id: "das",
    grade: "9,60",
    icon: HiDocumentText,
    link: "https://osoki.eus",
  },
  { id: "tes", grade: "8,57", icon: FaAmbulance },
];

export function EducationCarousel() {
  const t = useTranslations("about");
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const arrowClass =
    "cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("education")}
      className="rounded-2xl border border-border bg-surface"
    >
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          <HiAcademicCap className="h-4 w-4 text-accent" />
          {t("education")}
          <span className="tracking-normal text-subtle/70">
            {index + 1}/{degrees.length}
          </span>
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={t("prev")}
            className={arrowClass}
          >
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === degrees.length - 1}
            aria-label={t("next")}
            className={arrowClass}
          >
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        {degrees.map((degree, i) => (
          <div
            key={degree.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${degrees.length}`}
            className="flex w-full shrink-0 snap-start flex-col p-6"
          >
            <div className="flex items-start gap-4">
              {degree.logo ? (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5">
                  <Image
                    src={degree.logo}
                    alt=""
                    width={40}
                    height={20}
                    className="h-auto w-full object-contain"
                  />
                </span>
              ) : (
                degree.icon && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-accent-soft text-accent">
                    <degree.icon className="h-5 w-5" />
                  </span>
                )
              )}
              <div>
                <h3 className="font-semibold leading-snug text-foreground">
                  {t(`degrees.${degree.id}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t(`degrees.${degree.id}.school`)}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5">
              <span className="text-sm text-muted">
                {t("gradeLabel")}{" "}
                <span className="font-semibold text-foreground">{degree.grade}</span>
              </span>
              <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success">
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
                  <HiArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 pb-5">
        {degrees.map((degree, i) => (
          <button
            key={degree.id}
            onClick={() => goTo(i)}
            aria-label={t("goTo", { n: i + 1 })}
            aria-current={index === i}
            className={`cursor-pointer h-1.5 rounded-full transition-all ${
              index === i ? "w-6 bg-foreground" : "w-1.5 bg-border hover:bg-subtle"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
