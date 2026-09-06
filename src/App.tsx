import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { useTheme } from './hooks/useTheme';
import { useHashRoute } from './hooks/useHashRoute';

/**
 * Componente raíz. Ensambla las secciones, reparte el estado del tema y
 * decide qué vista mostrar según el hash de la URL:
 *  - `#/proyectos/<slug>` → página de detalle del proyecto
 *  - cualquier otra cosa   → página principal (una sola página con secciones)
 *
 * TODO el contenido editable vive en `src/data/portfolio.ts`.
 */
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const route = useHashRoute();

  // Al abrir un proyecto: subir arriba del todo. Al volver a la home con un
  // ancla (#projects, #contact…): saltar a esa sección cuando ya esté montada.
  useEffect(() => {
    if (route.name === 'project') {
      window.scrollTo(0, 0);
      return;
    }
    if (route.hash && !route.hash.startsWith('#/')) {
      const id = route.hash.slice(1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()),
      );
    }
  }, [route]);

  return (
    <div className="min-h-screen bg-white text-slate-700 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-300">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {route.name === 'project' ? (
        <main>
          <ProjectDetail slug={route.slug} />
        </main>
      ) : (
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      )}

      <Footer />
    </div>
  );
}
