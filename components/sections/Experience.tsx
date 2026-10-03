'use client';

import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { FaAmbulance } from 'react-icons/fa';
import {
  HiArrowUpRight,
  HiChevronDown,
  HiChevronRight,
  HiCodeBracket,
  HiCommandLine,
} from 'react-icons/hi2';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface Job {
  id: 'ambulancias' | 'hispavista' | 'tes';
  icon: IconType;
  current?: boolean;
  stack?: string[];
  url?: string;
}

// Del más reciente al más antiguo. Textos en messages/*.json → experience.items.<id>
const jobs: Job[] = [
  {
    id: 'ambulancias',
    icon: HiCommandLine,
    current: true,
    url: 'https://ambulanciasgipuzkoa.eus/',
    stack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Angular',
      'TypeScript',
      'Kotlin',
      'Android nativo',
      'DDD',
      'Hexagonal',
      'HL7',
    ],
  },
  {
    id: 'hispavista',
    icon: HiCodeBracket,
    url: 'https://hispavistalabs.com/',
    stack: ['PHP', 'Symfony', 'DDD', 'Hexagonal', 'MongoDB', 'Docker Compose', 'Nginx', 'GitLab'],
  },
  { id: 'tes', icon: FaAmbulance },
];

export function Experience() {
  const t = useTranslations('experience');

  return (
    <section
      id="experience"
      className="border-t border-border bg-surface-muted/40 bg-dots py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <ol className="relative">
          {jobs.map((job, i) => {
            const bullets = t.raw(`items.${job.id}.bullets`) as string[];
            const path = t.has(`items.${job.id}.path`)
              ? (t.raw(`items.${job.id}.path`) as string[])
              : null;
            const company = t(`items.${job.id}.company`);
            const rest = [t(`items.${job.id}.location`), t(`items.${job.id}.meta`)].filter(Boolean);
            const isLast = i === jobs.length - 1;

            return (
              <li key={job.id} className={`relative ${isLast ? '' : 'pb-10 md:pb-12'}`}>
                {!isLast && (
                  <div aria-hidden className="absolute left-5 top-10 bottom-0 w-px bg-border">
                    <span className="absolute bottom-1.5 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-surface-muted">
                      <HiChevronDown className="h-3 w-3 text-subtle" />
                    </span>
                  </div>
                )}

                <Reveal delay={i * 0.1} className="flex gap-4 md:gap-6">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    <job.icon className="h-5 w-5" />
                  </span>

                  <article className="min-w-0 flex-1 rounded-2xl border border-border bg-surface p-6 md:p-7">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
                        {job.current && (
                          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                        )}
                        {t(`items.${job.id}.period`)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                      {t(`items.${job.id}.role`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {company}
                          <HiArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        company
                      )}
                      {rest.length > 0 && ` · ${rest.join(' · ')}`}
                    </p>

                    {path && (
                      <div className="mt-4">
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
                          {t('pathLabel')}
                        </p>
                        <ol className="flex flex-wrap items-center gap-1.5">
                          {path.map((company, j) => (
                            <li key={company} className="inline-flex items-center gap-1.5">
                              <span
                                className={`rounded-md border px-2 py-1 text-xs font-medium ${
                                  j === path.length - 1
                                    ? 'border-accent/40 bg-accent-soft text-accent'
                                    : 'border-border bg-surface-muted text-muted'
                                }`}
                              >
                                {company}
                              </span>
                              {j < path.length - 1 && (
                                <HiChevronRight className="h-3 w-3 text-subtle" aria-hidden />
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <ul className="mt-5 space-y-2.5">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="relative pl-5 text-sm leading-relaxed text-muted md:text-[15px]"
                        >
                          <span
                            className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-accent"
                            aria-hidden
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {job.stack && (
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {job.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-[11px] text-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
