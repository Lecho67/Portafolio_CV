import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data';
import { Section } from './Section';

/** Grid responsive de tarjetas de proyecto. */
export function Projects() {
  return (
    <Section
      id="projects"
      title="Proyectos"
      subtitle="Una selección de trabajos que representan cómo pienso y construyo."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`group flex flex-col rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/50 ${
              project.featured
                ? 'border-indigo-500/40 dark:border-indigo-500/30'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Título + enlaces externos */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <div className="flex shrink-0 items-center gap-3 text-slate-400">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Código fuente de ${project.title}`}
                    className="transition-colors hover:text-slate-900 dark:hover:text-white"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Demo en vivo de ${project.title}`}
                    className="transition-colors hover:text-indigo-500"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Descripción */}
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {project.description}
            </p>

            {/* Badges de tecnologías */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
