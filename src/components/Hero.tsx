import { lazy, Suspense } from 'react';
import { Download, Mail } from 'lucide-react';
import { personal, socials } from '../data';
import { Reveal } from './Reveal';

/**
 * Carga diferida del canvas 3D: mantiene fuera del bundle inicial a
 * three.js / @react-three/fiber / drei y evita bloquear el primer render.
 */
const HeroCanvas = lazy(() => import('./3d/HeroCanvas'));

/**
 * Hero. La escena 3D (`HeroCanvas`) ocupa todo el fondo a sangre —la cinta de
 * código en espiral con los dos fragmentos origami— y NO se toca: geometría,
 * color y posición se mantienen. Encima va un degradado de legibilidad y, a la
 * derecha, la narrativa `datos → modelo → producto` que el propio objeto insinúa.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden px-6 pb-24 pt-28"
    >
      {/* Fondo 3D a sangre — se mantiene tal cual */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Degradado de legibilidad (denso en el lado del texto) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-[#f6f8fb] via-[#f6f8fb]/85 to-[#f6f8fb]/60 dark:from-ink dark:via-ink/85 dark:to-ink/55 sm:bg-gradient-to-r sm:from-[#f6f8fb] sm:via-[#f6f8fb]/80 sm:to-[#f6f8fb]/25 sm:dark:from-ink sm:dark:via-ink/80 sm:dark:to-transparent"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-6">
              {personal.location} — {personal.availability}
            </p>

            <h1 className="text-balance font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-[4rem] xl:leading-[1.05] dark:text-white">
              Hola, soy{' '}
              <span className="text-brand-600 dark:text-brand-400">
                {personal.name}.
              </span>
            </h1>

            <p className="mt-5 font-display text-lg font-semibold text-slate-500 sm:text-xl dark:text-slate-400">
              {personal.role}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-[1.05rem] dark:text-slate-300">
              {personal.summary}
            </p>

            {/* Chips — resumen de "en qué me muevo" (detalle en Sobre mí) */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {personal.badges.map((badge) => (
                <li key={badge}>
                  <a
                    href="#about"
                    className="inline-block rounded-md border border-slate-200 bg-white/70 px-2.5 py-1 font-mono text-xs text-slate-600 backdrop-blur-sm transition-colors hover:border-brand-500/50 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-900/70 dark:text-slate-300 dark:hover:text-brand-400"
                  >
                    {badge}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
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
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-slate-100 dark:border-ink-600 dark:bg-ink-900/50 dark:text-slate-200 dark:hover:bg-ink-800"
                >
                  <Download size={16} /> Descargar CV
                </a>
              )}
            </div>

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

      {/* Narrativa datos → modelo → producto, junto al objeto 3D */}
      <p className="absolute inset-x-0 bottom-7 z-10 hidden items-center justify-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-slate-500 sm:flex dark:text-slate-500">
        {personal.flow.map((word, i) => (
          <span key={word} className="flex items-center gap-3">
            <span className={i === personal.flow.length - 1 ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'}>
              {word}
            </span>
            {i < personal.flow.length - 1 && <span className="text-brand-500">→</span>}
          </span>
        ))}
      </p>
    </section>
  );
}
