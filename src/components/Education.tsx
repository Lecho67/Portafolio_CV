import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  GraduationCap,
  X,
} from 'lucide-react';
import { certifications, education, type Certification } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';
import { TechIcon } from './TechIcon';

/**
 * "04 — Formación y certificaciones": titulación académica + certificaciones.
 * Cada certificación abre un detalle (descripción + qué aportó) en un modal.
 * Mientras no haya certificaciones reales, muestra un estado vacío elegante.
 */
export function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeCert = openIndex !== null ? certifications[openIndex] : null;

  return (
    <Section id="education" index="04" kicker="Formación y certificaciones" title="Formación.">
      {/* Titulación */}
      <Reveal
        as="article"
        className="flex max-w-xl flex-col rounded-xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
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
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{education.institution}</p>
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
      <div className="mt-10">
        {certifications.length === 0 ? (
          <Reveal
            as="article"
            delay={80}
            className="flex max-w-xl flex-col justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-6 dark:border-ink-600 dark:bg-ink-900/50"
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
          <>
            <Reveal>
              <p className="kicker mb-4">Certificaciones</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, i) => (
                <Reveal key={`${cert.title}-${cert.issuer}`} delay={80 + i * 70} className="h-full">
                  <CertCard cert={cert} onOpen={() => setOpenIndex(i)} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {activeCert && <CertModal cert={activeCert} onClose={() => setOpenIndex(null)} />}
    </Section>
  );
}

/** Tarjeta de certificación: abre el detalle (descripción + qué aportó) al hacer clic. */
function CertCard({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-brand-500/40 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/40"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
          <BadgeCheck size={20} />
        </span>
        <span className="kicker">{cert.date}</span>
      </div>
      <h3 className="mt-3 font-display font-semibold text-slate-900 dark:text-white">
        {cert.title}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{cert.issuer}</p>

      {cert.skills && cert.skills.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {cert.skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600 dark:bg-ink-800 dark:text-slate-300"
            >
              <TechIcon
                slug={skill.toLowerCase()}
                className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
              />
              {skill}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
        Ver detalle
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

/** Detalle de una certificación: descripción, qué aportó y enlace de verificación. */
function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
            <BadgeCheck size={22} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <p className="kicker mt-4">
          {cert.issuer} · {cert.date}
        </p>
        <h3 className="mt-1 text-balance font-display text-xl font-semibold text-slate-900 dark:text-white">
          {cert.title}
        </h3>

        {cert.description && (
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {cert.description}
          </p>
        )}

        {cert.contribution && cert.contribution.length > 0 && (
          <div className="mt-5">
            <p className="kicker mb-2.5">Qué me aportó</p>
            <ul className="space-y-2">
              {cert.contribution.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-500 dark:text-brand-400" />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {cert.skills && cert.skills.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {cert.skills.map((skill) => (
              <li
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
              >
                <TechIcon
                  slug={skill.toLowerCase()}
                  className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
                />
                {skill}
              </li>
            ))}
          </ul>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Verificar credencial
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
