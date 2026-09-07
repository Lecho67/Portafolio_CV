import { about, focusAreas } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Sección "Sobre mí": biografía + áreas de enfoque. */
export function About() {
  return (
    <Section
      id="about"
      index="01"
      kicker="Perfil"
      title="Sobre mí"
      subtitle="Quién soy y en qué me enfoco."
    >
      {/* Biografía */}
      <Reveal className="max-w-3xl space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-400">
            {paragraph}
          </p>
        ))}
      </Reveal>

      {/* Áreas de enfoque */}
      <div className="mt-14">
        <Reveal>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            En qué me enfoco
          </h3>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 70} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-500/40 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                  <area.icon size={18} />
                </span>
                <h4 className="mt-3 font-display font-semibold text-slate-900 dark:text-white">
                  {area.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {area.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
