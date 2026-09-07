import { ArrowRight, ArrowUpRight, ExternalLink, Github, Layers } from 'lucide-react';
import { projects, socials, type Project } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

const githubProfile = socials.find((s) => s.label === 'GitHub')?.href;

/** Grid responsive de tarjetas de proyecto. Cada tarjeta enlaza a su detalle. */
export function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      kicker="Trabajo"
      title="Proyectos"
      subtitle="Proyectos en los que he trabajado. Abre cualquiera para ver el detalle."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 90}
            className={`group ${project.featured ? 'sm:col-span-2' : ''}`}
          >
            <article
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-slate-900/5 dark:bg-slate-900/50 dark:group-hover:shadow-black/40 ${
                project.featured
                  ? 'border-brand-500/40 sm:flex-row dark:border-brand-500/30'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <ProjectCover project={project} />
              <ProjectBody project={project} />
            </article>
          </Reveal>
        ))}
      </div>

      {githubProfile && (
        <Reveal delay={120} className="mt-8">
          <a
            href={githubProfile}
            target="_blank"
            rel="noreferrer"
            className="group/gh inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <Github size={16} />
            Ver todos los repositorios en GitHub
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
            />
          </a>
        </Reveal>
      )}
    </Section>
  );
}

/** Portada visual de la tarjeta (gradiente + icono, cuando no hay captura). */
function ProjectCover({ project }: { project: Project }) {
  const Icon = project.icon ?? Layers;

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${
        project.cover ?? 'from-brand-500 to-accent-600'
      } ${
        project.featured ? 'aspect-[16/10] sm:aspect-auto sm:w-2/5' : 'aspect-[16/9]'
      }`}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <span
        aria-hidden
        className="absolute -bottom-6 -right-2 font-display text-[7rem] font-bold leading-none text-white/15"
      >
        {project.title.charAt(0)}
      </span>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon size={28} />
        </span>
      </div>
    </div>
  );
}

/** Contenido textual de la tarjeta. */
function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="flex flex-1 flex-col p-6">
      {/* Meta: año · rol */}
      {(project.year || project.role) && (
        <p className="mb-2 flex items-center gap-2 font-display text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {project.year && <span className="tabular-nums">{project.year}</span>}
          {project.year && project.role && <span aria-hidden>·</span>}
          {project.role && <span>{project.role}</span>}
        </p>
      )}

      {/* Título (enlace que cubre toda la tarjeta) + enlaces externos */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          <a
            href={`#/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-brand-600 dark:hover:text-brand-400"
          >
            {project.title}
          </a>
        </h3>
        {(project.repoUrl || project.liveUrl) && (
          <div className="relative z-10 flex shrink-0 items-center gap-3 text-slate-400">
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
                className="transition-colors hover:text-brand-500"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        )}
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

      {/* Llamada a ver el detalle */}
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
        Ver proyecto
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </p>
    </div>
  );
}
