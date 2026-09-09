import { ArrowUpRight, BadgeCheck, GraduationCap } from 'lucide-react';
import { certifications, education } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/**
 * "04 — Formación y certificaciones": titulación académica + certificaciones.
 * Mientras no haya certificaciones reales, muestra un estado vacío elegante.
 */
export function Education() {
  return (
    <Section id="education" index="04" kicker="Formación y certificaciones" title="Formación.">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Titulación */}
        <Reveal
          as="article"
          className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
              <GraduationCap size={22} />
            </span>
            <span className="kicker">titulado</span>
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
            {education.degree}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {education.institution}
          </p>
          {education.focus.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {education.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Certificaciones */}
        {certifications.length === 0 ? (
          <Reveal
            as="article"
            delay={80}
            className="flex flex-col justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6 dark:border-ink-600 dark:bg-ink-900/50"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-dashed border-slate-300 text-slate-400 dark:border-ink-600 dark:text-slate-500">
                <BadgeCheck size={20} />
              </span>
              <span className="kicker">certificaciones</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-slate-500 dark:text-slate-400">
              Espacio reservado
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-500">
              Cuando obtenga la primera credencial, esta tarjeta muestra el mismo formato: título,
              emisor, año y enlace a la verificación.
            </p>
            <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
              // próximamente
            </p>
          </Reveal>
        ) : (
          <div className="grid gap-4">
            {certifications.map((cert, i) => {
              const isLink = Boolean(cert.credentialUrl);
              return (
                <Reveal
                  as="article"
                  key={`${cert.title}-${cert.issuer}`}
                  delay={80 + i * 70}
                  className={`group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors dark:border-ink-700 dark:bg-ink-900 ${
                    isLink ? 'hover:border-brand-500/40 dark:hover:border-brand-500/40' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                      <BadgeCheck size={20} />
                    </span>
                    <span className="kicker">{cert.date}</span>
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-slate-900 dark:text-white">
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
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600 dark:bg-ink-800 dark:text-slate-300"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                  {isLink && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
                      Ver credencial
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  )}
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
