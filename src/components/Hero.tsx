import { lazy, Suspense } from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { personal, socials } from '../data';

/**
 * Carga diferida del canvas 3D: mantiene fuera del bundle inicial a
 * three.js / @react-three/fiber / drei y evita bloquear el primer render.
 */
const HeroCanvas = lazy(() => import('./3d/HeroCanvas'));

/**
 * Sección de presentación (primer pantallazo).
 *
 * Layout de dos columnas en desktop:
 *  - Izquierda: badge de estado, nombre, rol, resumen, stack, CTAs y redes.
 *  - Derecha: canvas 3D interactivo (`HeroCanvas`).
 * En móvil colapsa a una sola columna (el canvas se apila debajo del texto).
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-24">
      {/* Fondo decorativo sutil (no interfiere con el contenido) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      >
        <div className="absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 min-h-[85vh]">
        {/* ---------------------------------------------------------------- */}
        {/*  COLUMNA IZQUIERDA — presentación                                 */}
        {/* ---------------------------------------------------------------- */}
        <div className="py-12 lg:py-0">
          {/* Estado / disponibilidad */}
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {personal.availability}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white">
            Hola, soy {personal.name}.
          </h1>

          <p className="mt-3 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
            {personal.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {personal.summary}
          </p>

          {/* Stack principal */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {personal.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Botones CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            >
              <Mail size={16} /> Contactar
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Download size={16} /> Descargar CV
            </a>
          </div>

          {/* Redes rápidas */}
          <div className="mt-8 flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                <s.icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*  COLUMNA DERECHA — canvas 3D                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[560px]">
          {/* Marco / fondo del lienzo */}
          <div className="absolute inset-0 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white dark:border-slate-800/70 dark:from-slate-900 dark:to-slate-950" />
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />

          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Suspense fallback={<CanvasSkeleton />}>
              <HeroCanvas />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#about"
        aria-label="Ir a la sección Sobre mí"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-400 transition-colors hover:text-indigo-500 sm:block"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </a>
    </section>
  );
}

/** Placeholder mientras se descarga el chunk del canvas 3D. */
function CanvasSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
        Preparando escena 3D…
      </div>
    </div>
  );
}
