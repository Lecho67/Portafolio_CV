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

export interface Project {
  title: string;
  /** Qué hace y qué problema resuelve (2-3 líneas) */
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

export const projects: Project[] = [
  {
    title: 'BorderCheck AI',
    description:
      'Plataforma web full-stack para evaluación logística con integración de IA: analiza y prioriza operaciones de frontera, centraliza la documentación y asiste la toma de decisiones con modelos de lenguaje.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'IA'],
    featured: true,
    year: '2024',
    role: 'Full-stack',
    icon: ScanSearch,
    cover: 'from-emerald-500 via-teal-500 to-cyan-600',
    // TODO: añade los enlaces reales cuando estén disponibles.
    // repoUrl: 'https://github.com/tu-usuario/bordercheck-ai',
    // liveUrl: 'https://bordercheck.example.com',
  },
  {
    title: 'UESVALLE App',
    description:
      'Aplicación móvil nativa en Kotlin para el monitoreo e inspección de la calidad del agua en campo: registro de muestras, checklists de inspección y sincronización de datos para los equipos de saneamiento.',
    tags: ['Kotlin', 'Android', 'Jetpack Compose', 'PostgreSQL'],
    featured: true,
    year: '2023',
    role: 'Desarrollo Android',
    icon: Droplets,
    cover: 'from-teal-500 via-cyan-500 to-sky-600',
    // repoUrl: 'https://github.com/tu-usuario/uesvalle-app',
  },
];

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
