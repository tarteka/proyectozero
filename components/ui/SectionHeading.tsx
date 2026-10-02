import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
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
        <span className="text-accent">{index}</span> / {eyebrow}
      </p>
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
