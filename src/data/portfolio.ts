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
  MonitorSmartphone,
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
  /** Etiqueta corta para el chip del hero, p. ej. 'Full-stack' */
  short: string;
  title: string;
  description: string;
}

export interface Skill {
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
  /** Estado y alcance: aclaraciones honestas (MVP, demo con mock, límites…) */
  notes?: string[];
  /** Capturas de pantalla. Coloca los archivos en `public/proyectos/`. */
  images?: ProjectImage[];
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
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
    'Me interesan los proyectos donde el software resuelve un problema concreto: asesoría aduanera con IA, plataformas para procesos institucionales o herramientas internas que ahorran horas de trabajo manual.',
  ],
};

/* -------------------------------------------------------------------------- */
/*  ÁREAS DE ENFOQUE  —  "en qué me enfoco / soy bueno / me gusta"             */
/*  `short` sale como chip en el hero; el resto, como tarjeta en "Sobre mí".   */
/*  Ajusta las descripciones y los ejemplos a lo que realmente has construido. */
/* -------------------------------------------------------------------------- */

export const focusAreas: FocusArea[] = [
  {
    icon: Layers,
    short: 'Full-stack',
    title: 'Desarrollo web full-stack',
    description:
      'Plataformas de extremo a extremo —base de datos, APIs, lógica de negocio e interfaz—, como BorderCheck AI, una plataforma de asesoría aduanera con IA.',
  },
  {
    icon: Smartphone,
    short: 'Apps móviles',
    title: 'Aplicaciones móviles Android',
    description:
      'Apps nativas en Kotlin y Jetpack Compose para trabajo de campo, con captura offline y sincronización, como la app de UESValle.',
  },
  {
    icon: MonitorSmartphone,
    short: 'Diseño responsive',
    title: 'Diseño responsive y accesible',
    description:
      'Interfaces que funcionan bien en cualquier pantalla, con foco en usabilidad, accesibilidad y consistencia visual.',
  },
  {
    icon: Workflow,
    short: 'Automatización',
    title: 'Automatización y herramientas internas',
    description:
      'Software a medida que sustituye trabajo manual repetitivo y ahorra horas al equipo.',
  },
  {
    icon: Sparkles,
    short: 'IA en producto',
    title: 'IA aplicada al producto',
    description:
      'Resúmenes, clasificación y asistencia con modelos de lenguaje donde aportan valor real.',
  },
  {
    icon: Building2,
    short: 'Procesos institucionales',
    title: 'Plataformas para procesos institucionales',
    description:
      'Digitalización de trámites y flujos internos: expedientes, roles y trazabilidad, como el ecosistema digital de UESValle.',
  },
];

/* -------------------------------------------------------------------------- */
/*  PROYECTOS                                                                  */
/* -------------------------------------------------------------------------- */

/*
 * NOTA — página de detalle de cada proyecto (#/proyectos/<slug>):
 *   `overview`, `contributions`, `outcomes`, `notes`, `timeline`, `team` e
 *   `images` alimentan esa página. Para las capturas, coloca los archivos en
 *   `public/proyectos/` y descomenta las entradas del array `images`.
 */
export const projects: Project[] = [
  {
    slug: 'bordercheck-ai',
    title: 'BorderCheck AI',
    description:
      'Plataforma web B2C de asesoría aduanera con IA: el usuario describe su envío internacional y la app le dice si pasará la aduana —veredicto Apto / Advertencia / Bloqueado con su justificación legal y el desglose de tributos—, con casillero virtual, KYC y auditoría humana de cada veredicto.',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL (RLS)',
      'Playwright',
      'IA / LLMs',
    ],
    featured: true,
    year: '2025',
    role: 'Frontend + Supabase',
    icon: ScanSearch,
    cover: 'from-emerald-500 via-teal-500 to-cyan-600',
    timeline: '2025 — en desarrollo activo',
    team: 'Yo: frontend + Supabase · motor de IA: un colaborador',
    context: 'Proyecto personal · MVP funcional',
    repoUrl: 'https://github.com/Lecho67/BorderCheck-AI_Frontend',
    liveUrl: 'https://border-check-ai-frontend.vercel.app',
    overview: [
      'Los envíos internacionales se retienen, devuelven o destruyen en aduana por restricciones que el remitente desconoce —baterías de litio, aerosoles, productos regulados—. Resolverlo después toma días y genera multas y sobrecostes evitables.',
      'BorderCheck AI se consulta antes del despacho: el usuario describe su envío y recibe un veredicto —Apto, Advertencia o Bloqueado— con su justificación legal, los documentos que necesita y una estimación de tributos. La IA no responde en abierto: se ancla a una base de reglas normativas y cada veredicto cita su fuente; cuando faltan datos, marca el caso para revisión humana en vez de forzar un resultado.',
      'Yo diseñé e implementé todo el frontend y la capa de datos y seguridad en Supabase. El motor de reglas aduaneras lo mantiene un colaborador en un repositorio aparte, y el frontend está pensado para funcionar sin él (usa un mock determinista), por eso la demo desplegada funciona por sí sola.',
    ],
    contributions: [
      'Frontend completo en React + TypeScript (strict) + Vite: asistente de evaluación de envíos, vista de veredicto, historial, dashboards, casillero virtual y centro de ayuda. Ruteo con code-splitting y estado con Zustand + Context.',
      'Modelo de datos y capa de seguridad en Supabase/PostgreSQL: esquema, políticas Row-Level Security, funciones SECURITY DEFINER (RPCs) y triggers. La autorización real vive en la base de datos; el frontend solo aporta la UX.',
      'RBAC de 4 roles (cliente, agente, gestor, admin): cola de revisión de casos, auditoría de veredictos de IA (override atómico y trazado vía RPC) y panel de administración con métricas globales.',
      'KYC y cumplimiento de la Ley 1581 de 2012: verificación de identidad y gating de funciones reforzado en las políticas de la base de datos, no solo en la interfaz.',
      'Notificaciones en vivo con Supabase Realtime y resiliencia de sesión: reintentos con backoff y una pantalla de «reintentar» en vez de expulsar al usuario ante fallos transitorios de red.',
      'Infraestructura de calidad: ~170 tests (unitarios, de componente y E2E con Playwright) en CI con GitHub Actions, y despliegue endurecido en Vercel (CSP, HSTS y cabeceras de seguridad) con una auditoría de readiness documentada.',
    ],
    outcomes: [
      'Un veredicto de aduana con su fundamento legal en segundos, antes de despachar, en lugar de días de gestión manual.',
      'Seguridad probada, no asumida: durante el desarrollo encontré y cerré una escalación de privilegios —un usuario podía auto-asignarse rol de admin o auto-aprobar su KYC vía la API REST— con un trigger en la base de datos, verificada con pruebas PATCH reales.',
      'Los tests E2E autenticados detectaron un bug de carrera real en la protección de rutas (sesión cargada pero perfil aún no) que los tests unitarios no veían; se corrigió con un test de regresión.',
      'Demo pública funcional sin depender del backend de IA; bundle inicial ~130 kB gzip gracias al code-splitting por ruta.',
    ],
    notes: [
      'MVP funcional en desarrollo activo, todavía sin usuarios reales.',
      'El motor de reglas de IA es de un colaborador y vive en otro repositorio; la demo pública corre contra un mock determinista, no contra el modelo.',
      'Infraestructura sobre capas gratuitas (Vercel, Supabase).',
    ],
    images: [
      // { src: '/proyectos/bordercheck-landing.png', alt: 'Landing con el pitch y los tres badges de veredicto' },
      // { src: '/proyectos/bordercheck-asistente.png', alt: 'Asistente de evaluación de envíos (formulario)' },
      // { src: '/proyectos/bordercheck-veredicto.png', alt: 'Vista de veredicto: badge de color, justificación legal y desglose de tributos' },
      // { src: '/proyectos/bordercheck-cola-revision.png', alt: 'Cola de revisión del agente con filtros y el drawer de auditoría de un caso' },
      // { src: '/proyectos/bordercheck-metricas.png', alt: 'Dashboard de métricas del admin con el volumen mensual de consultas' },
      // { src: '/proyectos/bordercheck-kyc.png', alt: 'Panel de aprobación de KYC' },
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
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Vite', icon: 'vite' },
      { name: 'React Query', icon: 'reactquery' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
      { name: 'Diseño responsive' },
    ],
  },
  {
    title: 'Backend & datos',
    icon: Database,
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'APIs REST' },
      { name: 'Auth / RLS' },
    ],
  },
  {
    title: 'Móvil',
    icon: Smartphone,
    skills: [
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Android', icon: 'android' },
      { name: 'Jetpack Compose', icon: 'jetpackcompose' },
      { name: 'Room' },
    ],
  },
  {
    title: 'Herramientas',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Linux', icon: 'linux' },
      { name: 'IA / LLMs' },
    ],
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
