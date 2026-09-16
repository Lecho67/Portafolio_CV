import { useState } from 'react';
import { about, personal, pillars } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

/** Sección "Sobre mí": foto + biografía, y los 4 pilares en los que trabajo. */
export function About() {
  return (
    <Section id="about" index="01" kicker="Sobre mí" title={about.headline}>
      {/* Foto + biografía */}
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <Reveal className="shrink-0">
          <Portrait />
        </Reveal>

        <Reveal
          delay={70}
          className="space-y-4 text-center leading-relaxed text-slate-600 sm:text-left dark:text-slate-400"
        >
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>
      </div>

      {/* 4 pilares */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal
            as="article"
            key={pillar.title}
            delay={160 + i * 70}
            className="h-full rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-500/40 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500/40"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400">
              <pillar.icon size={18} />
            </span>
            <p className="kicker mt-3">{pillar.kicker}</p>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {pillar.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Retrato de perfil, en un marco consistente con las tarjetas del sitio.
 * Si `personal.photo` todavía no existe en `public/`, cae a las iniciales
 * en vez de romper el layout con una imagen rota.
 */
function Portrait() {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(personal.photo) && !failed;

  return (
    <div className="relative h-40 w-36 sm:h-44 sm:w-40">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-br from-brand-500/25 to-brand-400/5 blur-xl dark:from-brand-500/30 dark:to-brand-400/5"
      />
      {showPhoto ? (
        <img
          src={personal.photo}
          alt={`Retrato de ${personal.name}`}
          onError={() => setFailed(true)}
          className="h-full w-full rounded-2xl border border-slate-200 object-cover object-top shadow-sm dark:border-ink-700"
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-2xl border border-slate-200 bg-brand-500/10 dark:border-ink-700">
          <span className="font-display text-4xl font-bold text-brand-500 dark:text-brand-400">
            {personal.initials}
          </span>
        </div>
      )}
    </div>
  );
}
