"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EducationCarousel } from "./EducationCarousel";

export function About() {
  const t = useTranslations("about");

  const highlights = [
    { value: t("yearsValue"), label: t("yearsLabel") },
    { value: t("focusValue"), label: t("focusLabel") },
  ];

  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>{t("intro")}</p>
            <p>{t("philosophy")}</p>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2}>
              <EducationCarousel />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
