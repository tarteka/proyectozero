"use client";

import { motion, type Variants } from "framer-motion";
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

const skills: Skill[] = [
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Symfony", icon: SiSymfony },
  { name: "Java", icon: FaJava, color: "#E76F00" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Linux", icon: SiLinux },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Oracle Cloud", icon: SiOracle, color: "#F80000" },
];

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Skills() {
  const t = useTranslations("skills");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="skills"
      className="border-t border-border bg-surface-muted/40 bg-dots py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <Reveal>
          <div
            onMouseMove={handleMouseMove}
            className="spotlight overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            {/* Barra de ventana de terminal, como en Portfolio */}
            <div className="flex h-9 items-center gap-3 border-b border-border bg-surface-muted px-4">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] text-subtle">~/sergio/stack.sh</span>
            </div>

            <div className="p-6 md:p-10">
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">$</span> ls --stack
              </p>

              <motion.ul
                className="mt-6 flex flex-wrap gap-x-7 gap-y-4"
                variants={list}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    variants={item}
                    className="group inline-flex items-center gap-2"
                  >
                    <skill.icon
                      className="h-4 w-4 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                      style={skill.color ? { color: skill.color } : undefined}
                      aria-hidden
                    />
                    <span className="font-mono text-sm text-muted transition-colors duration-200 group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <p className="mt-8 font-mono text-sm text-muted">
                <span className="text-accent">$</span>{" "}
                <span
                  className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-accent"
                  aria-hidden
                />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
