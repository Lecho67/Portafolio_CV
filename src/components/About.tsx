import { about, pillars } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Sección "Sobre mí": biografía + los 4 pilares en los que trabajo. */
export function About() {
  return (
    <Section id="about" index="01" kicker="Sobre mí" title={about.headline}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Biografía */}
        <Reveal className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>

        {/* 4 pilares */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {pillars.map((pillar, i) => (
            <Reveal
              as="article"
              key={pillar.title}
              delay={i * 70}
              className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-500/40 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                  <pillar.icon size={18} />
                </span>
                <div>
                  <p className="kicker">{pillar.kicker}</p>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                </div>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
