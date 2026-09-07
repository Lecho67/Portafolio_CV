import { useEffect, useRef, useState } from 'react';

/**
 * Devuelve un `ref` para adjuntar a un elemento y un booleano `inView` que pasa
 * a `true` la primera vez que el elemento entra en el viewport (y se queda así).
 *
 * Se usa para las animaciones de aparición al hacer scroll. Si el usuario tiene
 * activada la preferencia "reducir movimiento", `inView` arranca en `true` y no
 * se crea ningún observer: el contenido aparece sin animación.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // Las `options` se fijan en el primer render (objeto literal por defecto).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
