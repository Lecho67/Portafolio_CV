import {
  siReact,
  siTypescript,
  siTailwindcss,
  siLaravel,
  siPhp,
  siSupabase,
  siPostgresql,
  siKotlin,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Logos de marca (monocromo, `currentColor`) para el stack del hero.
 * Vienen de `simple-icons`. Para añadir una tecnología: importa su icono
 * (`si<Nombre>`) y añádelo al mapa; luego referencia la clave desde
 * `personal.stack` en `src/data/portfolio.ts`.
 */
const ICONS: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  laravel: siLaravel,
  php: siPhp,
  supabase: siSupabase,
  postgresql: siPostgresql,
  kotlin: siKotlin,
};

interface TechIconProps {
  /** Clave del mapa de arriba, p. ej. 'react'. Si no existe, no renderiza nada. */
  slug: string;
  className?: string;
}

export function TechIcon({ slug, className = 'h-4 w-4' }: TechIconProps) {
  const icon = ICONS[slug];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
