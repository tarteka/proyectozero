"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EducationCarousel } from "./EducationCarousel";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>{t("intro")}</p>
            <p>{t("philosophy")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <EducationCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
