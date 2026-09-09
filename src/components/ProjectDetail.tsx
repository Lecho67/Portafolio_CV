import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, ExternalLink, ImageOff, X } from 'lucide-react';
import { getProjectBySlug, projects, type ProjectImage } from '../data';
import { Reveal } from './Reveal';

/** Oculta los valores de ejemplo que aún empiezan por "TODO". */
const real = (value?: string) =>
  value && !value.trim().startsWith('TODO') ? value : undefined;
const realList = (list?: string[]) =>
  (list ?? []).filter((item) => !item.trim().startsWith('TODO'));

interface ProjectDetailProps {
  slug: string;
}

/**
 * Página de detalle de un proyecto (`#/proyectos/<slug>`). Usa el mismo
 * sistema de diseño que el resto del portafolio (navy + esmeralda, mono para
 * marcadores y chips). Si el slug no existe, muestra un aviso con enlace.
 */
export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          Proyecto no encontrado
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          El proyecto que buscas no existe o cambió de dirección.
        </p>
        <a
          href="#projects"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        >
          <ArrowLeft size={16} /> Volver a proyectos
        </a>
      </div>
    );
  }

  const overview = realList(project.overview);
  const contributions = realList(project.contributions);
  const outcomes = realList(project.outcomes);
  const notes = realList(project.notes);
  const images = project.images ?? [];

  const meta = [
    { label: 'Duración', value: real(project.timeline) },
    { label: 'Equipo', value: real(project.team) },
    { label: 'Rol', value: real(project.role) },
    { label: 'Contexto', value: real(project.context) },
  ].filter((m) => m.value);

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-24">
      <Reveal>
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Proyectos
        </a>

        {/* Cabecera */}
        <header className="mt-7">
          {(project.year || project.role) && (
            <p className="eyebrow">
              {[project.year, project.role].filter(Boolean).join(' · ')}
            </p>
          )}
          <h1 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
        </header>

        {/* Acciones */}
        {project.liveUrl && (
          <div className="mt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
            >
              <ExternalLink size={16} /> Ver demo
            </a>
          </div>
        )}
      </Reveal>

      {/* Ficha rápida */}
      {meta.length > 0 && (
        <Reveal delay={80}>
          <dl className="mt-10 flex flex-wrap gap-3">
            {meta.map((m) => (
              <div
                key={m.label}
                className="min-w-[8rem] flex-1 rounded-xl border border-slate-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-900"
              >
                <dt className="kicker">{m.label}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {/* Galería */}
      <Reveal delay={120}>
        <Gallery images={images} />
      </Reveal>

      {/* Contenido */}
      <div className="mt-14 space-y-12">
        {overview.length > 0 && (
          <Reveal>
            <Block title="El contexto">
              <div className="space-y-4">
                {overview.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-400">
                    {p}
                  </p>
                ))}
              </div>
            </Block>
          </Reveal>
        )}

        {contributions.length > 0 && (
          <Reveal>
            <Block title="Qué aporté">
              <ul className="space-y-3">
                {contributions.map((c, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <Check size={18} className="mt-0.5 shrink-0 text-brand-500 dark:text-brand-400" />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        )}

        {outcomes.length > 0 && (
          <Reveal>
            <Block title="Resultados">
              <ul className="space-y-3">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <ArrowRight size={18} className="mt-0.5 shrink-0 text-brand-500 dark:text-brand-400" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        )}

        <Reveal>
          <Block title="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-ink-700 dark:bg-ink-800 dark:text-slate-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        {notes.length > 0 && (
          <Reveal>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 dark:border-ink-700 dark:bg-ink-900/60">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Estado y alcance
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {notes.map((n, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>

      {/* Navegación entre proyectos */}
      {next && next.slug !== slug && (
        <Reveal>
          <a
            href={`#/proyectos/${next.slug}`}
            className="group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-500/45 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/45"
          >
            <span>
              <span className="kicker">Siguiente proyecto</span>
              <span className="mt-1 block font-display text-lg font-semibold text-slate-900 dark:text-white">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={20}
              className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
            />
          </a>
        </Reveal>
      )}
    </article>
  );
}

/** Bloque de contenido con título en mono. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Galería de capturas + visor a pantalla completa                            */
/* -------------------------------------------------------------------------- */

function Gallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  // Con el visor abierto: navegación por teclado y bloqueo del scroll de fondo.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft')
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, images.length]);

  if (images.length === 0) {
    return (
      <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 py-14 dark:border-ink-600 dark:bg-ink-900/50">
        <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
          <ImageOff size={24} />
          <p className="font-mono text-xs uppercase tracking-[0.14em]">Capturas próximamente</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`mt-10 grid gap-4 ${images.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-ink-700 dark:bg-ink-800"
          >
            <GalleryImage img={img} />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <img
            src={images[active].src}
            alt={images[active].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

/** Imagen con marcador de reserva si el archivo no existe todavía. */
function GalleryImage({ img }: { img: ProjectImage }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500">
        <ImageOff size={22} />
        <span className="px-4 text-center text-xs">{img.alt}</span>
      </span>
    );
  }

  return (
    <img
      src={img.src}
      alt={img.alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}
