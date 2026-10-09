"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

function IndexCounter({ index }: { index: string }) {
  const target = parseInt(index, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(() =>
    reduceMotion || Number.isNaN(target) ? target : 0
  );

  useEffect(() => {
    if (!inView || reduceMotion || Number.isNaN(target)) return;
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      setValue(Math.min(current, target));
      if (current >= target) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [inView, reduceMotion, target]);

  if (Number.isNaN(target)) {
    return <span ref={ref}>{index}</span>;
  }

  return <span ref={ref}>{String(value).padStart(index.length, "0")}</span>;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  className = "mb-12 md:mb-16",
}: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
        <span className="text-accent">
          <IndexCounter index={index} />
        </span>{" "}
        / {eyebrow}
      </p>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 block h-px w-12 origin-left bg-accent"
        aria-hidden
      />
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
