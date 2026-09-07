import { lazy, Suspense } from 'react';
import { Download, Mail } from 'lucide-react';
import { personal, socials } from '../data';
import { Reveal } from './Reveal';
import { TechIcon } from './TechIcon';

/**
 * Carga diferida del canvas 3D: mantiene fuera del bundle inicial a
 * three.js / @react-three/fiber / drei y evita bloquear el primer render.
 */
const HeroCanvas = lazy(() => import('./3d/HeroCanvas'));

/**
 * Sección de presentación (primer pantallazo).
 *
 * La escena 3D (`HeroCanvas`) ocupa todo el fondo a sangre. Encima se sitúa
 * un degradado que oscurece (o aclara) el lado del texto para que la
 * información sea siempre legible y protagonista.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 py-28"
    >
      {/* Fondo 3D a sangre */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Degradado de legibilidad:
          - móvil: vertical, más denso arriba (donde está el texto)
          - desktop: horizontal, denso a la izquierda y transparente a la derecha */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/85 to-white/60 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/55 sm:bg-gradient-to-r sm:from-white sm:via-white/80 sm:to-white/25 sm:dark:from-slate-950 sm:dark:via-slate-950/80 sm:dark:to-transparent"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 text-balance sm:text-5xl xl:text-6xl dark:text-white">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
                {personal.name}
              </span>
              .
            </h1>

            <p className="mt-4 text-pretty text-lg font-semibold text-slate-500 sm:text-xl dark:text-slate-400">
              {personal.role}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {personal.summary}
            </p>

            {/* Stack principal */}
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {personal.stack.map((tech) => (
                <li
                  key={tech.name}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 py-1.5 pl-2.5 pr-3.5 text-sm font-medium text-slate-700 backdrop-blur-sm transition-colors hover:border-brand-500/50 hover:text-brand-600 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-brand-400"
                >
                  {tech.icon && (
                    <TechIcon
                      slug={tech.icon}
                      className="h-[1.05rem] w-[1.05rem] shrink-0 text-slate-400 transition-colors group-hover:text-brand-500 dark:text-slate-500 dark:group-hover:text-brand-400"
                    />
                  )}
                  {tech.name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            {/* Botones CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                <Mail size={16} /> Contactar
              </a>
              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Download size={16} /> Descargar CV
                </a>
              )}
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
                  className="text-slate-500 transition-colors hover:text-brand-500 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  <s.icon size={22} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
