"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
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

function ProjectPreview({ project }: { project: Project }) {
  const t = useTranslations("portfolio");
  const domain = (project.url ?? project.repo ?? "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const Icon = placeholderIcons[project.id];

  return (
    <div className="border-b border-border bg-surface-muted">
      {/* Barra de navegador */}
      <div className="flex h-9 items-center gap-3 border-b border-border px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <span className="truncate font-mono text-[11px] text-subtle">{domain}</span>
      </div>

      <div className="relative aspect-16/10 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px]">
            {Icon && (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-accent shadow-sm transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-8 w-8" />
              </span>
            )}
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              {t("previewSoon")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("portfolio");
  const showVisit = project.url && project.status === "live";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">
            {project.type}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[project.status]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {t(`status.${project.status}`)}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-foreground/70">
          {t(`items.${project.id}.tagline`)}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
          {t(`items.${project.id}.description`)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(showVisit || project.repo) && (
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-5 border-t border-border pt-5">
            {showVisit && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" />
                {t("code")}
              </a>
            )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <section
      id="portfolio"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1} className="h-full">
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
