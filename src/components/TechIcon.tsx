import {
  siReact,
  siTypescript,
  siTailwindcss,
  siVite,
  siReactquery,
  siHtml5,
  siCss,
  siPhp,
  siLaravel,
  siNodedotjs,
  siSupabase,
  siPostgresql,
  siMysql,
  siKotlin,
  siAndroid,
  siJetpackcompose,
  siNestjs,
  siGit,
  siGithub,
  siFigma,
  siVercel,
  siLinux,
  siDocker,
  siPython,
  siPandas,
  siScikitlearn,
  siNumpy,
  siJupyter,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Logos de marca (monocromo, `currentColor`) para el stack y las habilidades.
 * Vienen de `simple-icons`. Para añadir una tecnología: importa su icono
 * (`si<Nombre>`), añádelo a este mapa y referencia la clave desde
 * `src/data/portfolio.ts`. Si una clave no está aquí, `TechIcon` no pinta nada
 * y solo se muestra el texto.
 */
const ICONS: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  vite: siVite,
  reactquery: siReactquery,
  html5: siHtml5,
  css: siCss,
  php: siPhp,
  laravel: siLaravel,
  nodejs: siNodedotjs,
  supabase: siSupabase,
  postgresql: siPostgresql,
  mysql: siMysql,
  kotlin: siKotlin,
  android: siAndroid,
  jetpackcompose: siJetpackcompose,
  nestjs: siNestjs,
  git: siGit,
  github: siGithub,
  figma: siFigma,
  vercel: siVercel,
  linux: siLinux,
  docker: siDocker,
  python: siPython,
  pandas: siPandas,
  scikitlearn: siScikitlearn,
  numpy: siNumpy,
  jupyter: siJupyter,
};

interface TechIconProps {
  /** Clave del mapa de arriba, p. ej. 'react'. Si no existe, no renderiza nada. */
  slug?: string;
  className?: string;
}

export function TechIcon({ slug, className = 'h-4 w-4' }: TechIconProps) {
  const icon = slug ? ICONS[slug] : undefined;
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
