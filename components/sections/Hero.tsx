"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

// Patrón de estática TV: ruido generado con un filtro SVG feTurbulence.
const noiseSvg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
const noiseDataUri = `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;

// Secuencias de la "sintonización": al entrar, la foto parpadea entre el
// original y la versión pixel art junto con estática y líneas de escaneo
// antes de asentarse; al salir, se revierte de forma más breve.
const tuneIn = {
  duration: 0.6,
  times: [0, 0.08, 0.16, 0.24, 0.32, 0.45, 0.65, 1],
  base: [1, 0.15, 0.8, 0.1, 0.55, 0.05, 0, 0],
  pixel: [0, 0.7, 0.15, 0.75, 0.25, 0.85, 1, 1],
  noise: [0, 0.85, 0.5, 0.9, 0.35, 0.5, 0, 0],
  scan: [0, 0.55, 0.55, 0.5, 0.5, 0.35, 0.18, 0.18],
  jitter: [0, -4, 3, -3, 2, -1, 0, 0],
};
const tuneOut = {
  duration: 0.45,
  times: [0, 0.2, 0.45, 0.7, 1],
  base: [0, 0.6, 0.15, 0.7, 1],
  pixel: [1, 0.5, 0.85, 0.3, 0],
  noise: [0, 0.6, 0.3, 0.4, 0],
  scan: [0.18, 0.4, 0.3, 0.2, 0],
  jitter: [0, 2, -2, 1, 0],
};

function HeroPhoto({ location }: { location: string }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const seq = hovered ? tuneIn : tuneOut;

  const transition = reduceMotion
    ? { duration: 0.2 }
    : { duration: seq.duration, times: seq.times, ease: "linear" as const };

  const handleClick = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      return;
    }
    setHovered((v) => !v);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="group relative mx-auto w-56 sm:w-64 md:w-72"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Marco de esquinas: aparece al hover (o al tap en táctil), sin desplazar ni escalar la foto */}
      <span
        className={`pointer-events-none absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100 ${!reduceMotion && hovered ? "opacity-100" : ""}`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100 ${!reduceMotion && hovered ? "opacity-100" : ""}`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100 ${!reduceMotion && hovered ? "opacity-100" : ""}`}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100 ${!reduceMotion && hovered ? "opacity-100" : ""}`}
        aria-hidden
      />

      <div className="relative aspect-4/5 overflow-hidden border border-border bg-surface-muted">
        {/* Foto original */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: reduceMotion ? (hovered ? 0 : 1) : seq.base }}
          transition={transition}
        >
          <Image
            src="/images/sergio-moreno.jpg"
            alt="Sergio Moreno"
            fill
            priority
            sizes="(min-width: 768px) 288px, 256px"
            className="object-cover"
          />
        </motion.div>

        {/* Versión pixel art */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: reduceMotion ? (hovered ? 1 : 0) : seq.pixel,
            x: reduceMotion ? 0 : seq.jitter,
          }}
          transition={transition}
        >
          <Image
            src="/images/sergio-moreno-pixelart.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 288px, 256px"
            className="object-cover"
          />
        </motion.div>

        {!reduceMotion && (
          <>
            {/* Líneas de escaneo */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
              }}
              animate={{ opacity: seq.scan }}
              transition={transition}
              aria-hidden
            />

            {/* Estática */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{ backgroundImage: noiseDataUri, backgroundSize: "120px 120px" }}
              animate={{ opacity: seq.noise }}
              transition={transition}
              aria-hidden
            />
          </>
        )}
      </div>

      <span className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-subtle shadow-sm">
        <HiLocationMarker className="h-3.5 w-3.5" />
        {location}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const glowX = useSpring(0, { stiffness: 50, damping: 20 });
  const glowY = useSpring(0, { stiffness: 50, damping: 20 });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const name = t("name");
  const [typedName, setTypedName] = useState(() => (reduceMotion ? name : ""));

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (reduceMotion) {
      timeoutId = setTimeout(() => {
        if (!cancelled) setTypedName(name);
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
      };
    }

    // Arranca justo cuando el <h1> empieza su propio fadeUp (delay del stagger),
    // sin esperar a que el resto del Hero termine de entrar.
    const typeChar = (i: number) => {
      if (cancelled) return;
      setTypedName(name.slice(0, i));
      if (i < name.length) {
        timeoutId = setTimeout(() => typeChar(i + 1), 70);
      }
    };
    timeoutId = setTimeout(() => {
      setTypedName("");
      typeChar(1);
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [name, reduceMotion]);

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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32"
    >
      <motion.div
        style={{ y: reduceMotion ? 0 : gridY }}
        className="bg-grid absolute inset-0 -z-10"
        aria-hidden
      />
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          opacity: reduceMotion ? 1 : glowOpacity,
        }}
        className="absolute -top-40 left-1/2 -z-10 h-120 w-120 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        style={{
          y: reduceMotion ? 0 : contentY,
          opacity: reduceMotion ? 1 : contentOpacity,
        }}
      >
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
          <motion.p variants={fadeUp} className="mb-2 text-lg text-muted">
            {t("greeting")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span aria-hidden>{typedName}</span>
            <span className="sr-only">{name}</span>
            <span className="animate-blink font-mono text-accent">_</span>
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
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
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

        <HeroPhoto location={t("location")} />
      </motion.div>
      </motion.div>
    </section>
  );
}
