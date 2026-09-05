# Portafolio personal — Simón Colonia

Portafolio web personal construido con **React + TypeScript + Vite + Tailwind CSS + Lucide React**,
con una sección Hero de **dos columnas** y un **canvas 3D interactivo**
(`three` + `@react-three/fiber` + `@react-three/drei`).
Diseño minimalista y responsive, con **modo oscuro/claro** (oscuro por defecto) y acentos en indigo/violet.

Layout inspirado en la estructura de `RifqiMuhammadAliya12/portofoliov1`.

---

## Requisitos

- Node.js 18 o superior
- npm (o pnpm / yarn)

## Puesta en marcha

```bash
npm install
npm run dev      # entorno de desarrollo -> http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # sirve el build para revisarlo
```

---

## Cómo personalizarlo

**Casi todo el contenido se edita en un único archivo: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
(`src/data.ts` solo lo reexporta para no romper los imports existentes.)

| Qué quieres cambiar | Dónde |
| --- | --- |
| Nombre, rol, iniciales, resumen, ubicación, email, stack | `personal` en `src/data/portfolio.ts` |
| Enlaces a GitHub / LinkedIn / Email | `socials` en `src/data/portfolio.ts` |
| Enlaces del menú | `navItems` en `src/data/portfolio.ts` |
| Biografía y aspectos destacados | `about` en `src/data/portfolio.ts` |
| Proyectos (título, descripción, tags, repo, demo) | `projects` en `src/data/portfolio.ts` |
| Habilidades por categoría | `skillCategories` en `src/data/portfolio.ts` |
| Textos de la sección de contacto | `contact` en `src/data/portfolio.ts` |
| Objeto 3D, luces y partículas del hero | `src/components/3d/HeroCanvas.tsx` |

Otros ajustes:

- **CV descargable:** coloca tu archivo en `public/cv.pdf` (o cambia `personal.resumeUrl`).
- **Favicon:** reemplaza `public/favicon.svg`.
- **Título y metadatos SEO:** edita `index.html` (bloque `SEO / META`).
- **Color de acento:** busca y reemplaza `indigo` / `violet` por otro color de Tailwind
  (p. ej. `cyan`) en los componentes de `src/components/`.
- **Modo por defecto:** en `src/hooks/useTheme.ts`, función `getInitialTheme()`.
  Ahí también puedes activar el respeto a la preferencia del sistema.

---

## Estructura

```
portfolio-template/
├─ index.html                # HTML raíz + metadatos + anti-parpadeo de tema
├─ tailwind.config.js        # darkMode: 'class'
├─ src/
│  ├─ main.tsx               # punto de entrada
│  ├─ index.css              # directivas de Tailwind + base mínima
│  ├─ App.tsx                # ensambla las secciones y reparte el tema
│  ├─ data.ts                # barrel: reexporta src/data/portfolio.ts
│  ├─ data/
│  │  └─ portfolio.ts        # ← TODO el contenido editable (tipado)
│  ├─ hooks/
│  │  └─ useTheme.ts         # modo oscuro/claro + persistencia en localStorage
│  └─ components/
│     ├─ Section.tsx         # envoltorio reutilizable de sección
│     ├─ Navbar.tsx          # header fijo + navegación + toggle de tema
│     ├─ Hero.tsx            # hero de 2 columnas: presentación + canvas 3D
│     ├─ 3d/
│     │  └─ HeroCanvas.tsx   # escena 3D (R3F): laptop + phone + partículas
│     ├─ About.tsx           # biografía + highlights
│     ├─ Projects.tsx        # grid de tarjetas de proyecto
│     ├─ Skills.tsx          # habilidades por categoría
│     ├─ Contact.tsx         # datos directos + formulario (mailto)
│     └─ Footer.tsx          # copyright + redes
└─ public/
   ├─ favicon.svg
   └─ cv.pdf                 # (añádelo tú)
```

---

## Notas

- El **formulario de contacto** no usa backend: abre el cliente de correo del
  visitante con el mensaje redactado (`mailto:`). Para envío real, cambia
  `handleSubmit` en `src/components/Contact.tsx` por una llamada a tu API o a un
  servicio como Formspree, EmailJS o Web3Forms.
- No hay CSS personalizado complejo: todo es Tailwind salvo unas pocas líneas
  base en `src/index.css`.
