"use client";

import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  SiLaravel,
  SiSymfony,
  SiSpringboot,
  SiAngular,
  SiDocker,
  SiMysql,
  SiPostgresql,
  SiLinux,
  SiGit,
  SiPhp,
  SiTypescript,
  SiNginx,
  SiMongodb,
  SiPython,
  SiFastapi,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiOracle } from "@/components/ui/icons";

interface Skill {
  name: string;
  icon: IconType;
  // undefined → usa el color del texto (logos negros o poco legibles en claro)
  color?: string;
}

const groups: { key: "backend" | "frontend" | "databases" | "devops"; skills: Skill[] }[] = [
  {
    key: "backend",
    skills: [
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Symfony", icon: SiSymfony },
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
    ],
  },
  {
    key: "databases",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    key: "devops",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Linux", icon: SiLinux },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Oracle Cloud", icon: SiOracle, color: "#F80000" },
    ],
  },
];

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="border-t border-border bg-surface-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {groups.map((group, i) => (
            <Reveal key={group.key} delay={(i % 2) * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 md:p-7">
                <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                  {t(group.key)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
                    >
                      <skill.icon
                        className="h-4 w-4"
                        style={skill.color ? { color: skill.color } : undefined}
                        aria-hidden
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
