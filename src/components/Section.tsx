import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  /** id para el ancla del navbar (#about, #projects, ...) */
  id: string;
  title: string;
  subtitle?: string;
  /** Número de orden mostrado en el encabezado, p. ej. '01' */
  index?: string;
  /** Etiqueta breve sobre el título, p. ej. 'Perfil' */
  kicker?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Envoltorio reutilizable para las secciones de la página:
 * aporta el ancho máximo, el espaciado vertical, el `scroll-mt` para el
 * navbar fijo y el encabezado (número + etiqueta + título + subtítulo +
 * subrayado de acento), que aparece con una animación al hacer scroll.
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
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="header" className="mb-12">
          {(index || kicker) && (
            <p className="mb-3 flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              {index && <span className="tabular-nums">{index}</span>}
              {index && kicker && (
                <span className="h-px w-8 bg-brand-500/40" aria-hidden />
              )}
              {kicker && <span>{kicker}</span>}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
          <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
        </Reveal>

        {children}
      </div>
    </section>
  );
}
