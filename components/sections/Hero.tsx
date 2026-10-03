"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiArrowRight, HiLocationMarker } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const glowX = useSpring(0, { stiffness: 50, damping: 20 });
  const glowY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // El centro del glow está a 80px del borde superior (-top-40 + h-120 / 2)
    glowX.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    glowY.set((e.clientY - rect.top - 80) * 0.25);
  };

  const handleMouseLeave = () => {
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-40 left-1/2 -z-10 h-120 w-120 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto] md:gap-16"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {t("available")}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
              <HiLocationMarker className="h-3.5 w-3.5" />
              {t("location")}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mb-2 text-lg text-muted">
            {t("greeting")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t("name")}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-xl font-medium text-foreground/80 md:text-2xl"
          >
            {t("role")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {t("ctaPortfolio")}
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              {t("ctaContact")}
            </a>

            <span className="mx-2 hidden h-6 w-px bg-border sm:block" aria-hidden />

            <div className="flex items-center gap-1">
              <a
                href="https://github.com/tarteka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sergio-moreno-tes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="/sergio-moreno-cv.pdf"
                download="sergio-moreno-cv.pdf"
                aria-label={t("cv")}
                title={t("cv")}
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                <HiArrowDownTray className="h-4 w-4" />
                CV
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="group relative mx-auto w-56 sm:w-64 md:w-72"
        >
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-accent/40 bg-accent-soft transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-5 motion-safe:group-hover:translate-y-5"
            aria-hidden
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-surface-muted transition-transform duration-500 ease-out motion-safe:group-hover:-translate-x-1 motion-safe:group-hover:-translate-y-1">
            <Image
              src="/images/sergio-moreno.jpg"
              alt="Sergio Moreno"
              fill
              priority
              sizes="(min-width: 768px) 288px, 256px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
