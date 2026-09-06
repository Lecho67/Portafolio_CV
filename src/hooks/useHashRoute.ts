import { useEffect, useState } from 'react';

/**
 * Router mínimo basado en el hash de la URL, sin dependencias.
 *
 * - `#/proyectos/<slug>`  → página de detalle de un proyecto
 * - cualquier otra cosa (`#about`, `#projects`, vacío…) → página principal,
 *   donde el hash sigue funcionando como ancla a una sección.
 *
 * Se usa hash (y no history API) para que los enlaces profundos funcionen
 * en hostings estáticos (GitHub Pages, Vercel…) sin configurar redirecciones.
 */
export type Route =
  | { name: 'home'; hash: string }
  | { name: 'project'; slug: string };

function parse(): Route {
  const hash = window.location.hash;
  const match = hash.match(/^#\/proyectos\/([\w-]+)$/);
  if (match) return { name: 'project', slug: match[1] };
  return { name: 'home', hash };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
