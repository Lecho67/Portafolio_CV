import { ArrowUp } from 'lucide-react';
import { personal, socials } from '../data';

/** Pie de página: copyright + redes sociales + volver arriba. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} {personal.name}. Construido con React, TypeScript y Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="text-slate-400 transition-colors hover:text-brand-500"
            >
              <s.icon size={18} />
            </a>
          ))}
          <a
            href="#top"
            aria-label="Volver arriba"
            className="ml-1 grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-400 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-slate-800"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
