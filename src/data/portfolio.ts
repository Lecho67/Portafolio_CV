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
  Rocket,
  Sparkles,
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

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
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
  role: 'Ingeniero Informático · Full Stack & Mobile Developer',
  /** Ubicación (ciudad, país) — ajústala si hace falta */
  location: 'Valle del Cauca, Colombia',
  /** Email de contacto */
  email: 'simoncolonia67@gmail.com',
  /** Texto del badge de estado en el hero */
  availability: 'Disponible para nuevos proyectos',
  /** Presentación del hero (2-3 líneas) */
  summary:
    'Ingeniero Informático enfocado en desarrollo web full-stack y móvil. Construyo plataformas de extremo a extremo con React, TypeScript y Supabase, y aplicaciones nativas Android en Kotlin, integrando IA y datos cuando aportan valor real al producto.',
  /**
   * Stack principal — se muestra como pills en el hero.
   */
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Kotlin', 'PostgreSQL'],
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

export const about: { paragraphs: string[]; highlights: Highlight[] } = {
  // Uno o varios párrafos de biografía / trayectoria.
  paragraphs: [
    'Soy Ingeniero Informático y me dedico al desarrollo full-stack y móvil. En web trabajo el ciclo completo —modelado de datos en PostgreSQL/Supabase, APIs e interfaz en React con TypeScript— y en móvil desarrollo aplicaciones nativas Android con Kotlin.',
    'Me interesan los proyectos donde el software resuelve un problema concreto: evaluación logística con apoyo de IA, monitoreo de la calidad del agua en campo o herramientas internas que ahorran horas de trabajo manual.',
  ],

  // Aspectos destacados en formato tarjeta.
  highlights: [
    {
      icon: Rocket,
      title: 'Producto de punta a punta',
      description:
        'Desde el modelo de datos y las APIs hasta la interfaz final y el despliegue en producción.',
    },
    {
      icon: Smartphone,
      title: 'Móvil nativo con Kotlin',
      description:
        'Aplicaciones Android para trabajo de campo: captura de datos offline, sincronización y flujos de inspección.',
    },
    {
      icon: Sparkles,
      title: 'Integración de IA y datos',
      description:
        'Uso de modelos de lenguaje y análisis de datos para asistir decisiones dentro del producto.',
    },
  ],
};

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
    slug: 'uesvalle-app',
    title: 'UESVALLE App',
    description:
      'App Android nativa en Kotlin y Jetpack Compose para las cuadrillas de saneamiento de UESVALLE. Digitaliza la inspección de la calidad del agua en campo —registro de muestras, checklists y captura sin conexión— y sincroniza los datos al recuperar la señal, sustituyendo el registro en papel.',
    tags: ['Kotlin', 'Android', 'Jetpack Compose', 'Room', 'PostgreSQL'],
    featured: true,
    year: '2023',
    role: 'Desarrollo Android',
    icon: Droplets,
    cover: 'from-teal-500 via-cyan-500 to-sky-600',
    timeline: 'TODO: p. ej. «4 meses · 2023»',
    team: 'TODO: p. ej. «Proyecto individual» o «Equipo de 2»',
    context: 'UESVALLE (servicios de saneamiento del Valle del Cauca)',
    // repoUrl: 'https://github.com/Lecho67/uesvalle-app',
    overview: [
      'Las cuadrillas que inspeccionan la calidad del agua trabajan en zonas donde muchas veces no hay cobertura. El registro se hacía en papel y luego había que transcribirlo en oficina, lo que retrasaba los reportes e introducía errores.',
      'La app lleva todo el flujo de inspección al teléfono: se puede trabajar sin conexión y los datos suben solos cuando el dispositivo vuelve a tener red.',
    ],
    contributions: [
      'Desarrollo de la app Android nativa en Kotlin con interfaz en Jetpack Compose.',
      'Persistencia local con Room para que la captura funcione 100 % sin conexión.',
      'Sincronización automática con el backend (PostgreSQL) al recuperar la conexión, con manejo de conflictos.',
      'Flujos guiados de registro de muestras y checklists de inspección para estandarizar el trabajo en campo.',
    ],
    outcomes: [
      'Elimina la doble digitación: del papel a la transcripción en oficina.',
      'TODO: dato concreto, p. ej. «N inspecciones registradas» o «reduce en X el tiempo hasta el reporte».',
      'Datos más completos y consistentes gracias a los formularios guiados.',
    ],
    images: [
      // { src: '/proyectos/uesvalle-registro.png', alt: 'Pantalla de registro de una muestra' },
      // { src: '/proyectos/uesvalle-checklist.png', alt: 'Checklist de inspección' },
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
    skills: ['Supabase', 'PostgreSQL', 'Node.js', 'REST', 'Auth / RLS'],
  },
  {
    title: 'Móvil',
    icon: Smartphone,
    skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room', 'Coroutines'],
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
    'Estoy abierto a nuevas oportunidades en desarrollo web full-stack y móvil. Si tienes un proyecto en mente o solo quieres saludar, escríbeme y te respondo lo antes posible.',
};
