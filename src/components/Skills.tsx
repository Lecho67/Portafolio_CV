import { skillCategories } from '../data';
import { Section } from './Section';

/** Habilidades técnicas agrupadas por categoría. */
export function Skills() {
  return (
    <Section
      id="skills"
      title="Habilidades técnicas"
      subtitle="Tecnologías con las que trabajo a diario."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500 dark:text-indigo-400">
                <category.icon size={20} />
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white">{category.title}</h3>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
