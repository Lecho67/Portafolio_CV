import { ArrowUp } from 'lucide-react';
import { personal, socials } from '../data';

/** Pie de página: copyright + stack + redes + volver arriba. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-ink-700">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} {personal.name} · {personal.location}
        </p>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs tracking-wide text-slate-400 sm:inline dark:text-slate-600">
            React · TypeScript · Tailwind · Vercel
          </span>
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
            className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-400 transition-colors hover:border-brand-500 hover:text-brand-500 dark:border-ink-700"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
