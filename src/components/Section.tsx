import type { ReactNode } from 'react';

interface SectionProps {
  /** id para el ancla del navbar (#about, #projects, ...) */
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Envoltorio reutilizable para las secciones de la página:
 * aporta el ancho máximo, el espaciado vertical, el `scroll-mt` para el
 * navbar fijo y el encabezado (título + subtítulo + subrayado de acento).
 */
export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{subtitle}</p>
          )}
          <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </header>

        {children}
      </div>
    </section>
  );
}
