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
  Server,
  Sparkles,
  LineChart,
  Layers,
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

/** Pilar de la sección "Sobre mí": una de las 4 áreas en las que trabajo. */
export interface Pillar {
  icon: LucideIcon;
  /** Etiqueta en mono, p. ej. 'full-stack' o 'data · ml' */
  kicker: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  /** Clave del logo en `TechIcon` (p. ej. 'react'). Opcional. */
  icon?: string;
}

/** Titulación académica de la sección "Formación". */
export interface Education {
  degree: string;
  /** Institución y año, p. ej. 'Universidad del Valle · 2024' */
  institution: string;
  /** Énfasis / áreas destacadas */
  focus: string[];
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
  /** Nota corta en mono, p. ej. 'en desarrollo' (opcional) */
  kicker?: string;
  /** Resalta la tarjeta con borde de acento (p. ej. la capa que estás creciendo) */
  featured?: boolean;
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
  /** De qué trata el curso (se muestra al abrir el detalle) */
  description?: string;
  /** Qué te aportó / qué aprendiste (lista de puntos, detalle) */
  contribution?: string[];
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
  role: 'Ingeniero Informático y desarrollador full-stack.',
  /** Ubicación (ciudad, país) — ajústala si hace falta */
  location: 'Valle del Cauca, Colombia',
  /** Estado breve para el badge del hero */
  availability: 'Disponible',
  /** Email de contacto */
  email: 'simoncolonia67@gmail.com',
  /** Presentación del hero (2-3 líneas) */
  summary:
    'Construyo plataformas de extremo a extremo —React y TypeScript en el frontend, PHP/Laravel y Supabase en el backend, Android nativo con Kotlin— y estoy llevando ese trabajo hacia los datos: machine learning y pipelines ETL sobre datos abiertos. Me interesan los proyectos donde el software resuelve un problema concreto y medible.',
  /** Chips del hero — resumen de "en qué me muevo". El detalle va en "Sobre mí". */
  badges: [
    'Full-stack',
    'IA en producto',
    'Datos y modelos',
    'Automatización',
    'Apps móviles',
    'Diseño responsive',
    'Procesos institucionales',
  ],
  /** Frase-narrativa junto al objeto 3D del hero */
  flow: ['datos', 'modelo', 'producto'],
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
  { label: 'Formación', href: '#education' },
  { label: 'Contacto', href: '#contact' },
];

/* -------------------------------------------------------------------------- */
/*  SECCIÓN "SOBRE MÍ"                                                         */
/* -------------------------------------------------------------------------- */

export const about: { headline: string; paragraphs: string[] } = {
  headline: 'Del ciclo completo de producto al modelado de datos.',
  paragraphs: [
    'Soy Ingeniero Informático y me dedico sobre todo al desarrollo web full-stack. Trabajo el ciclo completo: modelado de datos, APIs y lógica de negocio en el backend (PHP/Laravel, Supabase/PostgreSQL) e interfaz en React con TypeScript. También desarrollo apps Android nativas con Kotlin.',
    'Me interesan los proyectos donde el software resuelve un problema concreto: asesoría aduanera con IA, plataformas para procesos institucionales o herramientas internas que ahorran horas de trabajo manual.',
    'En paralelo estoy desarrollando la parte de datos: modelos tabulares de predicción de riesgo sobre datos abiertos colombianos y pipelines ETL que dejan esos datos listos para analizar. Es la misma lógica de siempre —entender el problema y construir la solución completa— aplicada a los datos.',
  ],
};

/* -------------------------------------------------------------------------- */
/*  PILARES  —  las 4 áreas en las que trabajo (tarjetas de "Sobre mí")        */
/*  El `kicker` va en mono; ajusta las descripciones a lo que de verdad haces. */
/* -------------------------------------------------------------------------- */

export const pillars: Pillar[] = [
  {
    icon: Layers,
    kicker: 'full-stack',
    title: 'Producto de extremo a extremo',
    description:
      'Base de datos, APIs, lógica de negocio e interfaz. Seguridad en la capa de datos, no solo en la UI.',
  },
  {
    icon: LineChart,
    kicker: 'data · ml',
    title: 'Modelos sobre datos reales',
    description:
      'Modelos tabulares, ingeniería de características y pipelines ETL sobre datos abiertos colombianos.',
  },
  {
    icon: Smartphone,
    kicker: 'móvil',
    title: 'Android nativo con Kotlin',
    description:
      'Apps para trabajo de campo con Jetpack Compose, captura offline y sincronización.',
  },
  {
    icon: Sparkles,
    kicker: 'ia aplicada',
    title: 'LLMs anclados a reglas',
    description:
      'IA que cita su fuente y deriva a revisión humana cuando faltan datos, en vez de improvisar.',
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
    // Repo privado por ahora — se enlaza solo la demo.
    // repoUrl: 'https://github.com/Lecho67/BorderCheck-AI_Frontend',
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
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'APIs REST' },
    ],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: [
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Android', icon: 'android' },
      { name: 'Jetpack Compose', icon: 'jetpackcompose' },
      { name: 'Room' },
    ],
  },
  {
    title: 'Data / ML',
    icon: LineChart,
    kicker: 'en desarrollo',
    featured: true,
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'pandas', icon: 'pandas' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'XGBoost' },
      { name: 'LightGBM' },
    ],
  },
  {
    title: 'Infraestructura',
    icon: Server,
    skills: [
      { name: 'Docker', icon: 'docker' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Git', icon: 'git' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  FORMACIÓN Y CERTIFICACIONES                                                */
/* -------------------------------------------------------------------------- */

// TODO: completa la institución y el año de tu titulación.
export const education: Education = {
  degree: 'Ingeniería Informática',
  institution: 'Universidad · año',
  focus: ['Ingeniería de software', 'Bases de datos'],
};

/*
 * Certificaciones reales (Coursera). Si en algún momento el array queda
 * vacío, la sección vuelve a mostrar el estado vacío elegante automáticamente.
 * `description` y `contribution` alimentan el detalle que se abre al hacer clic.
 */
export const certifications: Certification[] = [
  {
    title: 'Kotlin for Java Developers',
    issuer: 'Coursera · JetBrains',
    date: '2026',
    credentialUrl: 'https://coursera.org/verify/S9Q7WLVL6I40',
    skills: ['Kotlin', 'Java'],
    description:
      'Curso de JetBrains (creadores de Kotlin) sobre cómo pasar de Java a Kotlin: sintaxis, interoperabilidad entre ambos lenguajes y las funcionalidades que Kotlin añade sobre Java —null safety, funciones de extensión, data classes, programación funcional— con ejercicios prácticos de código.',
    contribution: [
      'Entender a fondo el porqué de las decisiones de diseño de Kotlin frente a Java, no solo la sintaxis.',
      'Null safety, funciones de extensión y data classes: los mismos fundamentos que uso en el desarrollo Android de UESValle.',
      'Escribir Kotlin más idiomático en vez de "Java traducido".',
    ],
  },
  {
    title: 'Getting Started with Azure',
    issuer: 'Coursera · LearnQuest',
    date: '2025',
    credentialUrl: 'https://coursera.org/verify/5PUTTRZHDO30',
    skills: ['Azure', 'Cloud'],
    description:
      'Introducción a Microsoft Azure: conceptos de computación en la nube, los servicios core (cómputo, almacenamiento, redes) y cómo moverse en el portal de Azure para desplegar y gestionar recursos.',
    contribution: [
      'Vocabulario y modelo mental de cloud computing más allá de Vercel/Supabase, que es donde despliego mis proyectos hoy.',
      'Panorama de los servicios base de Azure (cómputo, almacenamiento, redes) para poder evaluar cuándo tiene sentido usarlos.',
    ],
  },
  {
    title: 'Developing Interpersonal Skills',
    issuer: 'Coursera · IBM',
    date: '2025',
    credentialUrl: 'https://coursera.org/verify/NDTQSPAHMQ0K',
    skills: ['Comunicación', 'Trabajo en equipo'],
    description:
      'Curso de IBM sobre habilidades interpersonales en el trabajo: comunicación efectiva, escucha activa, inteligencia emocional y colaboración en equipos.',
    contribution: [
      'Herramientas concretas para comunicar decisiones técnicas a personas no técnicas —clientes, usuarios de UESValle— sin perder precisión.',
      'Mejor manejo de la retroalimentación al trabajar con equipos multidisciplinarios.',
    ],
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
