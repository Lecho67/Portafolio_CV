import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  /** id para el ancla del navbar (#about, #projects, ...) */
  id: string;
  title: string;
  subtitle?: string;
  /** Número de orden, p. ej. '01' — se muestra como "01 — {kicker}" */
  index?: string;
  /** Etiqueta del marcador de sección, p. ej. 'Sobre mí' */
  kicker?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Envoltorio de sección: ancho máximo, ritmo vertical, `scroll-mt` para el
 * navbar fijo, un filete superior que separa cada sección y el encabezado
 * (marcador "01 — Sobre mí" en mono + título grande).
 */
export function Section({
  id,
  title,
  subtitle,
  index,
  kicker,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-slate-200/80 py-16 sm:py-20 lg:py-24 dark:border-ink-700 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="header" className="mb-12">
          {(index || kicker) && (
            <p className="eyebrow">
              {[index, kicker].filter(Boolean).join(' — ')}
            </p>
          )}
          <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
