import { contact, personal, socials } from '../data';
import { Section } from './Section';
import { Reveal } from './Reveal';

const linkedin = socials.find((s) => s.label === 'LinkedIn');
const github = socials.find((s) => s.label === 'GitHub');

/** Handle legible a partir de una URL (última parte del path). */
function handleOf(url?: string) {
  if (!url) return '';
  return url.replace(/\/$/, '').split('/').pop() ?? url;
}

const rows = [
  { kicker: 'correo', value: personal.email, href: `mailto:${personal.email}`, external: false },
  { kicker: 'linkedin', value: handleOf(linkedin?.href), href: linkedin?.href ?? '', external: true },
  { kicker: 'github', value: handleOf(github?.href), href: github?.href ?? '', external: true },
].filter((r) => r.href);

/** "05 — Contacto": encabezado + accesos directos (correo, LinkedIn, GitHub). */
export function Contact() {
  return (
    <Section id="contact" index="05" kicker="Contacto" title={contact.heading} subtitle={contact.message}>
      <Reveal className="mt-2 grid gap-3 sm:max-w-lg">
        {rows.map((row) => (
          <a
            key={row.kicker}
            href={row.href}
            target={row.external ? '_blank' : undefined}
            rel={row.external ? 'noreferrer' : undefined}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-brand-500"
          >
            <span>
              <span className="kicker block">{row.kicker}</span>
              <span className="text-[0.95rem] text-slate-900 dark:text-white">{row.value}</span>
            </span>
            <span className="text-brand-500" aria-hidden>
              →
            </span>
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
