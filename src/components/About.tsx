import { about } from '../data';
import { Section } from './Section';

/** Sección "Sobre mí": biografía + aspectos destacados. */
export function About() {
  return (
    <Section
      id="about"
      title="Sobre mí"
      subtitle="Un poco de mi trayectoria en el desarrollo de software."
    >
      <div className="grid gap-10 md:grid-cols-5">
        {/* Biografía */}
        <div className="space-y-4 md:col-span-3">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-400">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Aspectos destacados */}
        <div className="space-y-4 md:col-span-2">
          {about.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <item.icon size={18} />
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
