import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { certifications } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Certificaciones y cursos con credencial verificable. */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      index="04"
      kicker="Formación"
      title="Certificaciones"
      subtitle="Formación complementaria y credenciales verificables."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const isLink = Boolean(cert.credentialUrl);

          return (
            <Reveal key={`${cert.title}-${cert.issuer}`} delay={i * 80} className="group h-full">
              <article
                className={`relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all dark:border-slate-800 dark:bg-slate-900/50 ${
                  isLink
                    ? 'group-hover:-translate-y-1 group-hover:border-brand-500/40 group-hover:shadow-xl group-hover:shadow-slate-900/5 dark:group-hover:border-brand-500/40 dark:group-hover:shadow-black/30'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-brand-500 dark:text-brand-400">
                    <BadgeCheck size={22} />
                  </span>
                  <span className="rounded-full border border-slate-200 px-2.5 py-0.5 font-display text-xs font-medium tabular-nums text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    {cert.date}
                  </span>
                </div>

                <h3 className="mt-4 font-display font-semibold text-slate-900 dark:text-white">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{cert.issuer}</p>

                {cert.skills && cert.skills.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}

                {isLink && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    Ver credencial
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
