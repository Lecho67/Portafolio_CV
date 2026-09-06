import { useEffect, useState } from 'react';

/**
 * Observa las secciones cuyos `id` se pasan y devuelve el `id` de la que está
 * más centrada en la pantalla. Se usa para resaltar el enlace activo del navbar
 * mientras se hace scroll ("scroll spy").
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>('');
  const key = ids.join(',');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // La "banda" activa es una franja horizontal en el centro del viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
