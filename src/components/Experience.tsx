import { ArrowRight, Briefcase } from 'lucide-react';
import { experiences } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** "02 — Experiencia": línea de tiempo laboral. UESValle enlaza a su caso completo en Proyectos. */
export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      kicker="Trayectoria"
      title="Experiencia."
      subtitle="Más de 3 años combinando desarrollo de producto con procesos y datos en organizaciones reales."
    >
      <ol className="space-y-5">
        {experiences.map((exp, i) => (
          <Reveal
            as="li"
            key={exp.company}
            delay={i * 90}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                <Briefcase size={20} />
              </span>
              <span className="kicker text-right">{exp.period}</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
              {exp.role}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{exp.company}</p>

            <div className="mt-3 space-y-2">
              {exp.description.map((paragraph, j) => (
                <p key={j} className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {paragraph}
                </p>
              ))}
            </div>

            {exp.projectSlug && (
              <a
                href={`#/proyectos/${exp.projectSlug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Ver caso completo
                <ArrowRight size={15} />
              </a>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
