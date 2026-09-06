import { skillCategories } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Habilidades técnicas agrupadas por categoría. */
export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      kicker="Stack"
      title="Habilidades técnicas"
      subtitle="Tecnologías con las que trabajo a diario."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, i) => (
          <Reveal key={category.title} delay={i * 80} className="h-full">
            <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-500/40 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-brand-500 dark:text-brand-400">
                  <category.icon size={20} />
                </span>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-brand-500/50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
