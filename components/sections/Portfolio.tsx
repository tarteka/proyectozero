"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaPaw } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { TbArrowsExchange } from "react-icons/tb";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project, type ProjectStatus } from "@/lib/projects";

const statusStyles: Record<ProjectStatus, string> = {
  live: "bg-success-soft text-success",
  maintenance: "bg-warning-soft text-warning",
  soon: "bg-info-soft text-info",
};

const placeholderIcons: Partial<Record<Project["id"], IconType>> = {
  divisas: TbArrowsExchange,
  vettrack: FaPaw,
};

function ProjectScreen({ project }: { project: Project }) {
  const t = useTranslations("portfolio");
  const domain = (project.url ?? project.repo ?? "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const Icon = placeholderIcons[project.id];
  const showVisit = project.url && project.status === "live";

  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start 95%", "start 55%"],
  });
  const reveal = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(reveal, (v) => `inset(0 0 ${v}% 0)`);

  return (
    <div className="border-b border-border bg-surface-muted">
      {/* Barra de navegador: siempre visible, nunca se tapa */}
      <div className="relative z-10 flex h-9 items-center gap-3 border-b border-border bg-surface-muted px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="truncate font-mono text-[11px] text-subtle">{domain}</span>
        <span
          className={`ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[project.status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {t(`status.${project.status}`)}
        </span>
      </div>

      {/* "Pantalla": imagen + panel de detalle, que sube desde abajo sin tapar la barra */}
      <div ref={mediaRef} className="relative aspect-16/10 overflow-hidden">
        <motion.div
          style={{ clipPath: reduceMotion ? "inset(0 0 0% 0)" : clipPath }}
          className="absolute inset-0"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-105"
            />
          ) : (
            <div className="bg-dots flex h-full flex-col items-center justify-center gap-4">
              {Icon && (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-accent shadow-sm">
                  <Icon className="h-8 w-8" />
                </span>
              )}
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                {t("previewSoon")}
              </span>
            </div>
          )}
        </motion.div>

        {/* Detalle: en escritorio sube desde abajo al hacer hover, sin salir de esta "pantalla".
            En táctil (sin hover) se muestra siempre, al no existir forma de "pasar por encima". */}
        <div
          className="absolute inset-0 flex translate-y-0 flex-col justify-end overflow-y-auto bg-black/85 p-5 transition-transform duration-300 ease-out [@media(hover:hover)]:translate-y-full [@media(hover:hover)]:group-hover:translate-y-0"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/60">
            {project.type}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-white md:text-xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/80">
            {t(`items.${project.id}.tagline`)}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-white/70">
            {t(`items.${project.id}.description`)}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/20 bg-white/10 px-2 py-1 font-mono text-[11px] text-white/80"
              >
                {tech}
              </li>
            ))}
          </ul>

          {(showVisit || project.repo) && (
            <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-white/15 pt-3.5">
              {showVisit && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent"
                >
                  {t("visit")}
                  <HiArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                >
                  <FaGithub className="h-4 w-4" />
                  {t("code")}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      className="spotlight group relative isolate overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
    >
      <ProjectScreen project={project} />
    </article>
  );
}

export function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="https://github.com/tarteka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
          >
            <FaGithub className="h-4 w-4" />
            {t("allGithub")}
            <HiArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
