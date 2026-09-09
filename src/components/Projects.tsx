import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import { projects, type Project } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Tarjetas de proyecto en formato caso de estudio. Cada una abre su detalle. */
export function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      kicker="Trabajo"
      title="Proyectos"
      subtitle="Proyectos en los que he trabajado. Abre cualquiera para ver el problema, las decisiones de arquitectura y el resultado."
    >
      <div className="space-y-5">
        {projects.map((project, i) => (
          <Reveal
            as="article"
            key={project.slug}
            delay={i * 90}
            className="group/case relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-brand-500/45 sm:flex-row dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/45"
          >
            <ProjectCover project={project} index={i} />
            <ProjectBody project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Portada: gradiente + índice mono (B / 01) + icono. */
function ProjectCover({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon ?? Layers;
  const tag = `${project.title.charAt(0)} / ${String(index + 1).padStart(2, '0')}`;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${
        project.cover ?? 'from-brand-500 to-brand-700'
      } aspect-[16/10] sm:aspect-auto sm:w-[38%]`}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <span
        aria-hidden
        className="absolute left-4 top-4 font-mono text-xs font-semibold text-white/85 transition-transform duration-300 group-hover/case:-translate-y-0.5"
      >
        {tag}
      </span>
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover/case:scale-110">
        <Icon size={28} />
      </span>
    </div>
  );
}

/** Cuerpo textual de la tarjeta. */
function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="flex flex-1 flex-col p-6">
      {(project.year || project.role) && (
        <p className="kicker mb-1.5">
          {[project.year, project.role].filter(Boolean).join(' · ')}
        </p>
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          <a
            href={`#/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-brand-600 dark:hover:text-brand-400"
          >
            {project.title}
          </a>
        </h3>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Demo en vivo de ${project.title}`}
            className="relative z-10 shrink-0 text-slate-400 transition-colors hover:text-brand-500"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
        Ver caso
        <ArrowRight
          size={15}
          className="transition-transform duration-200 ease-out group-hover/case:translate-x-1"
        />
      </p>
    </div>
  );
}
