import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, personal } from '../data';
import type { Theme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

/**
 * Header fijo con logo, navegación a las secciones y toggle de tema.
 * Resalta el enlace de la sección visible ("scroll spy") y colapsa en un menú
 * desplegable en móvil.
 */
export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () => navItems.map((item) => item.href.slice(1)),
    [],
  );
  const active = useActiveSection(sectionIds);

  // Fondo translúcido + borde cuando se hace scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-[#f6f8fb]/80 backdrop-blur-md dark:border-ink-700/70 dark:bg-ink/80'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Nombre */}
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display font-bold text-slate-900 dark:text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-sm text-white">
            {personal.initials}
          </span>
          <span className="hidden sm:block">{personal.name}</span>
        </a>

        {/* Navegación (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500 transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden
                />
              </a>
            );
          })}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        {/* Controles (móvil) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menú desplegable (móvil) */}
      {open && (
        <div className="border-t border-slate-200 bg-[#f6f8fb] px-6 py-4 md:hidden dark:border-ink-700 dark:bg-ink">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

/** Toggle de tema como etiqueta en mono (muestra el tema al que cambiar). */
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="ml-2 rounded-md px-2 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
    >
      {theme === 'dark' ? 'Claro' : 'Oscuro'}
    </button>
  );
}
