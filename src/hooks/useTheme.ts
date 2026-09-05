import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

/** Clave usada en localStorage (debe coincidir con el script de index.html). */
const STORAGE_KEY = 'portfolio-theme';

/**
 * Lee el tema inicial: primero lo guardado por el usuario, si no, MODO OSCURO
 * por defecto (tal como pide el diseño). Si prefieres respetar la preferencia
 * del sistema, descomenta la línea de `matchMedia`.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;

  // return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  return 'dark';
}

/**
 * Hook para gestionar el modo oscuro/claro.
 * - Añade / quita la clase `dark` en <html> (Tailwind `darkMode: 'class'`).
 * - Persiste la elección en localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* localStorage no disponible (modo incógnito, etc.) */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
