import { skillCategories } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';
import { TechIcon } from './TechIcon';

/** "Stack por capa": habilidades agrupadas, con logo de marca cuando existe. */
export function Skills() {
  return (
    <Section id="skills" index="03" kicker="Habilidades" title="Stack por capa.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal key={category.title} delay={i * 70} className="h-full">
            <article
              className={`h-full rounded-xl border p-5 transition-colors ${
                category.featured
                  ? 'border-brand-500/45 bg-brand-500/[0.06] dark:border-brand-500/40 dark:bg-brand-500/10'
                  : 'border-slate-200 bg-white hover:border-brand-500/40 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/40'
              }`}
            >
              <div className="mb-3.5 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
                  <category.icon size={18} />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                  {category.kicker && <p className="kicker">{category.kicker}</p>}
                </div>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
                  >
                    <TechIcon
                      slug={skill.icon}
                      className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
                    />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
