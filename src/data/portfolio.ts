/**
 * ============================================================================
 *  DATOS DEL PORTAFOLIO  —  edita SOLO este archivo
 * ----------------------------------------------------------------------------
 *  Todos los componentes leen su contenido desde aquí (a través del barrel
 *  `src/data.ts`, que reexporta este módulo). Cambia los textos, los enlaces
 *  y los proyectos y el sitio se actualiza sin tocar el JSX.
 * ============================================================================
 */

import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Smartphone,
  Wrench,
  Sparkles,
  Workflow,
  Layers,
  Building2,
  ScanSearch,
  Droplets,
  type LucideIcon,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  TIPOS                                                                      */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  /** Ancla a una sección, p. ej. '#about' */
  href: `#${string}`;
}

export interface FocusArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Tech {
  name: string;
  /** Clave del logo en `TechIcon` (p. ej. 'react'). Opcional. */
  icon?: string;
}

export interface ProjectImage {
  /** Ruta dentro de `public/`, p. ej. '/proyectos/bordercheck-1.png' */
  src: string;
  /** Texto alternativo accesible (describe qué se ve en la captura) */
  alt: string;
}

export interface Project {
  /** Identificador para la URL de detalle: '#/proyectos/<slug>'. Sin espacios. */
  slug: string;
  title: string;
  /** Resumen corto para la tarjeta (2-3 líneas) */
  description: string;
  /** Tecnologías mostradas como badges */
  tags: string[];
  /** URL al repositorio (opcional) */
  repoUrl?: string;
  /** URL a la demo en vivo (opcional) */
  liveUrl?: string;
  /** Resalta la tarjeta a lo ancho, con portada más grande */
  featured?: boolean;
  /** Año o rango, p. ej. '2024' o '2023 — 2024' */
  year?: string;
  /** Tu rol en el proyecto, p. ej. 'Full-stack' o 'Desarrollo Android' */
  role?: string;
  /** Icono grande de la portada (cuando no hay captura) */
  icon?: LucideIcon;
  /** Clases de gradiente Tailwind para la portada */
  cover?: string;

  /* ---- Página de detalle (#/proyectos/<slug>) ------------------------- */
  /** Duración / dedicación, p. ej. '3 meses · 2025' */
  timeline?: string;
  /** Contexto del equipo, p. ej. 'Proyecto individual' o 'Equipo de 4' */
  team?: string;
  /** Cliente / contexto, p. ej. 'Proyecto académico' o 'UESVALLE' */
  context?: string;
  /** Párrafos de contexto: qué problema había y por qué se construyó */
  overview?: string[];
  /** Qué hiciste tú / qué aporta el proyecto (lista de puntos) */
  contributions?: string[];
  /** Resultados e impacto medible o cualitativo (lista de puntos) */
  outcomes?: string[];
  /** Capturas de pantalla. Coloca los archivos en `public/proyectos/`. */
  images?: ProjectImage[];
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface Certification {
  title: string;
  /** Entidad que la emite, p. ej. 'Coursera · Meta' */
  issuer: string;
  /** Año de obtención, p. ej. '2024' */
  date: string;
  /** Enlace a la credencial verificable (opcional) */
  credentialUrl?: string;
  /** Temas / tecnologías cubiertas (opcional) */
  skills?: string[];
}

/* -------------------------------------------------------------------------- */
/*  INFORMACIÓN PERSONAL                                                       */
/* -------------------------------------------------------------------------- */

export const personal = {
  /** Nombre completo — navbar, hero y footer */
  name: 'Simón Colonia',
  /** Iniciales para el logo */
  initials: 'SC',
  /** Rol profesional principal */
  role: 'Ingeniero Informático · Desarrollador Full-Stack',
  /** Ubicación (ciudad, país) — ajústala si hace falta */
  location: 'Valle del Cauca, Colombia',
  /** Email de contacto */
  email: 'simoncolonia67@gmail.com',
  /** Presentación del hero (2-3 líneas) */
  summary:
    'Ingeniero Informático especializado en desarrollo web full-stack. Construyo plataformas de extremo a extremo con React y TypeScript en el frontend y PHP/Laravel o Supabase en el backend. También trabajo Android nativo con Kotlin.',
  /**
   * Stack principal — pills con logo en el hero. El `icon` referencia una
   * clave de `src/components/TechIcon.tsx` (déjalo sin `icon` si no hay logo).
   */
  stack: [
    { name: 'React', icon: 'react' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHP', icon: 'php' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Kotlin', icon: 'kotlin' },
  ] as Tech[],
  /** Ruta al CV. Coloca el archivo en `public/cv.pdf`. */
  resumeUrl: '/cv.pdf',
};

/* -------------------------------------------------------------------------- */
/*  REDES SOCIALES (hero, contacto y footer)                                   */
/* -------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Lecho67', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simon-colonia-amador/', icon: Linkedin },
  { label: 'Email', href: `mailto:${personal.email}`, icon: Mail },
];

/* -------------------------------------------------------------------------- */
/*  NAVEGACIÓN (el `href` debe coincidir con el `id` de cada sección)          */
/* -------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Certificaciones', href: '#certifications' },
  { label: 'Contacto', href: '#contact' },
];

/* -------------------------------------------------------------------------- */
/*  SECCIÓN "SOBRE MÍ"                                                         */
/* -------------------------------------------------------------------------- */

export const about: { paragraphs: string[] } = {
  // Uno o varios párrafos de biografía / trayectoria.
  paragraphs: [
    'Soy Ingeniero Informático y me dedico sobre todo al desarrollo web full-stack. Trabajo el ciclo completo: modelado de datos, APIs y lógica de negocio en el backend (PHP/Laravel, Supabase/PostgreSQL) e interfaz en React con TypeScript. También desarrollo apps Android nativas con Kotlin.',
    'Me interesan los proyectos donde el software resuelve un problema concreto: evaluación logística con apoyo de IA, plataformas para procesos institucionales o herramientas internas que ahorran horas de trabajo manual.',
  ],
};

/* -------------------------------------------------------------------------- */
/*  ÁREAS DE ENFOQUE  —  "en qué me enfoco / soy bueno"                        */
/*  Se muestran como tarjetas dentro de la sección "Sobre mí".                */
/* -------------------------------------------------------------------------- */

export const focusAreas: FocusArea[] = [
  {
    icon: Layers,
    title: 'Aplicaciones web full-stack',
    description:
      'Plataformas completas de extremo a extremo: base de datos, APIs, lógica de negocio e interfaz.',
  },
  {
    icon: Building2,
    title: 'Plataformas para procesos institucionales',
    description:
      'Digitalización de trámites y flujos internos: formularios, expedientes, roles y trazabilidad.',
  },
  {
    icon: Workflow,
    title: 'Automatización y herramientas internas',
    description:
      'Software a medida que sustituye trabajo manual repetitivo y ahorra horas al equipo.',
  },
  {
    icon: Sparkles,
    title: 'IA aplicada al producto',
    description:
      'Resúmenes, clasificación y asistencia con modelos de lenguaje donde aportan valor real.',
  },
  {
    icon: Smartphone,
    title: 'Apps Android nativas',
    description:
      'Kotlin y Jetpack Compose para trabajo de campo: captura de datos, offline y sincronización.',
  },
  {
    icon: Database,
    title: 'Modelado de datos y APIs',
    description:
      'Esquemas relacionales en PostgreSQL/MySQL, APIs REST y control de acceso por rol.',
  },
];

/* -------------------------------------------------------------------------- */
/*  PROYECTOS                                                                  */
/* -------------------------------------------------------------------------- */

/*
 * NOTA — página de detalle de cada proyecto (#/proyectos/<slug>):
 *   Los campos `overview`, `contributions`, `outcomes`, `timeline`, `team` e
 *   `images` alimentan esa página. He redactado un borrador a partir de la
 *   información que ya había; REVÍSALO y ajústalo a lo que realmente hiciste
 *   (sobre todo los datos concretos: duración, tamaño del equipo, resultados).
 *   Para las capturas, coloca los archivos en `public/proyectos/` y añádelos
 *   al array `images`. Si lo dejas vacío, la galería muestra un marcador.
 */
export const projects: Project[] = [
  {
    slug: 'bordercheck-ai',
    title: 'BorderCheck AI',
    description:
      'Plataforma web full-stack que digitaliza la evaluación de operaciones logísticas en frontera: centraliza la documentación, prioriza los casos por complejidad y riesgo, y usa modelos de lenguaje para resumir expedientes y sugerir la siguiente acción.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'IA / LLMs'],
    featured: true,
    year: '2025',
    role: 'Full-stack',
    icon: ScanSearch,
    cover: 'from-emerald-500 via-teal-500 to-cyan-600',
    timeline: 'TODO: p. ej. «3 meses · 2025»',
    team: 'TODO: p. ej. «Proyecto individual» o «Equipo de 3»',
    context: 'TODO: académico / empresa / cliente',
    // TODO: añade los enlaces reales cuando estén disponibles.
    // repoUrl: 'https://github.com/Lecho67/bordercheck-ai',
    // liveUrl: 'https://bordercheck.example.com',
    overview: [
      'La evaluación de operaciones logísticas en frontera dependía de revisar manualmente documentación dispersa (facturas, permisos, manifiestos) para decidir qué casos necesitaban una inspección más detallada. El proceso era lento, difícil de auditar y variaba según quién lo hiciera.',
      'BorderCheck AI reúne toda esa información en un expediente por operación y añade una capa de asistencia con IA para que el equipo se enfoque primero en los casos de mayor riesgo.',
    ],
    contributions: [
      'Modelado de datos en PostgreSQL/Supabase: esquema de operaciones, documentos y usuarios con políticas de seguridad a nivel de fila (RLS).',
      'Interfaz completa en React + TypeScript + Tailwind: carga de expedientes, tablero de priorización y vista de detalle de cada operación.',
      'Integración con modelos de lenguaje para resumir la documentación de un expediente y proponer la siguiente acción.',
      'Autenticación, control de acceso por rol y despliegue.',
    ],
    outcomes: [
      'TODO: resultado medible, p. ej. «reduce de X a Y minutos la revisión de un expediente».',
      'Un único lugar de consulta y trazabilidad para cada operación.',
      'Criterio de priorización consistente entre revisores.',
    ],
    images: [
      // { src: '/proyectos/bordercheck-tablero.png', alt: 'Tablero de priorización de operaciones' },
      // { src: '/proyectos/bordercheck-detalle.png', alt: 'Vista de detalle de un expediente con el resumen de IA' },
    ],
  },
  {
    slug: 'uesvalle',
    title: 'UESValle',
    description:
      'Plataforma web y app Android para el ecosistema digital de UESValle. En web participé en todo el ciclo —análisis de requerimientos, diseño de interfaces, frontend y backend en PHP/Laravel e integración de servicios— y en móvil desarrollé funcionalidades de la app nativa en Kotlin, siempre partiendo de necesidades reales de usuarios y procesos institucionales.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Kotlin', 'Android', 'REST'],
    featured: true,
    year: '2023', // TODO: confirma el año o rango
    role: 'Full-stack + Android',
    icon: Droplets,
    cover: 'from-teal-500 via-cyan-500 to-sky-600',
    timeline: 'TODO: p. ej. «6 meses · 2023»',
    team: 'Equipo de desarrollo multidisciplinario',
    context: 'UESValle — saneamiento del Valle del Cauca',
    // repoUrl: 'https://github.com/Lecho67/...',
    overview: [
      'UESValle mantiene un conjunto de herramientas digitales —web y móviles— para sus procesos institucionales y para la atención a los usuarios. El trabajo consistió en construir nuevas funcionalidades y hacer evolucionar las existentes, siempre partiendo de las necesidades reales de los usuarios y de los procesos de la entidad.',
      'Cada solución seguía el mismo recorrido: entender la necesidad, analizar los requerimientos, definir una solución funcional y técnica, diseñar los flujos e interfaces, desarrollarla, integrarla con el resto del sistema y ajustarla con la retroalimentación recibida.',
    ],
    contributions: [
      'Análisis de requerimientos: traducir necesidades de negocio y de usuarios en especificaciones funcionales y técnicas para el equipo.',
      'Diseño y desarrollo de interfaces web con foco en usabilidad, accesibilidad, consistencia visual y adaptación a distintos dispositivos.',
      'Desarrollo frontend y backend en PHP/Laravel de funcionalidades en varios módulos de la plataforma, con su lógica de negocio y gestión de información.',
      'Integración entre frontend, servicios backend y fuentes de datos: consumo de APIs, procesamiento de datos y manejo de estados y respuestas.',
      'Desarrollo de funcionalidades para la app Android nativa en Kotlin.',
      'Mejora continua de funcionalidades existentes y resolución de problemas técnicos durante el ciclo de desarrollo.',
    ],
    outcomes: [
      'Herramientas digitales que agilizan procesos internos y facilitan la interacción de los usuarios con los servicios de la entidad.',
      'Un enfoque integral en cada solución: análisis funcional, experiencia de usuario y desarrollo técnico.',
      'Sistemas mantenibles y preparados para seguir evolucionando con nuevos requerimientos.',
      'TODO: añade un dato concreto si lo tienes (nº de módulos, usuarios, reducción de tiempos…).',
    ],
    images: [
      // { src: '/proyectos/uesvalle-1.png', alt: 'Descripción de la captura' },
    ],
  },
];

/** Busca un proyecto por su `slug` (para la página de detalle). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*  HABILIDADES TÉCNICAS                                                       */
/* -------------------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Query', 'HTML / CSS'],
  },
  {
    title: 'Backend & datos',
    icon: Database,
    skills: ['PHP', 'Laravel', 'Node.js', 'Supabase', 'PostgreSQL', 'MySQL', 'REST', 'Auth / RLS'],
  },
  {
    title: 'Móvil',
    icon: Smartphone,
    skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room'],
  },
  {
    title: 'Herramientas',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Figma', 'Vercel', 'IA / LLMs', 'Linux'],
  },
];

/* -------------------------------------------------------------------------- */
/*  CERTIFICACIONES                                                            */
/*  TODO: sustituye estos ejemplos por tus certificados reales. Añade el       */
/*  `credentialUrl` para que cada tarjeta enlace a la credencial verificable.  */
/* -------------------------------------------------------------------------- */

export const certifications: Certification[] = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Coursera · Meta',
    date: '2024',
    skills: ['React', 'JavaScript', 'UX/UI'],
    // credentialUrl: 'https://coursera.org/verify/professional-cert/XXXX',
  },
  {
    title: 'Google Data Analytics',
    issuer: 'Coursera · Google',
    date: '2023',
    skills: ['SQL', 'Análisis de datos', 'Visualización'],
    // credentialUrl: 'https://coursera.org/verify/professional-cert/XXXX',
  },
  {
    title: 'Scrum Foundation (SFPC)',
    issuer: 'CertiProf',
    date: '2023',
    skills: ['Agile', 'Scrum'],
    // credentialUrl: 'https://www.credly.com/badges/XXXX',
  },
];

/* -------------------------------------------------------------------------- */
/*  SECCIÓN "CONTACTO"                                                         */
/* -------------------------------------------------------------------------- */

export const contact = {
  heading: '¿Trabajamos juntos?',
  message:
    'Si tienes un proyecto en mente o quieres hablar sobre una oportunidad, escríbeme y te respondo pronto.',
};
