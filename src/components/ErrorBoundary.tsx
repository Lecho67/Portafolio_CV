import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Red de seguridad para toda la app.
 *
 * El caso concreto que motivó esto: cuando el idioma del navegador es
 * distinto de `lang="es"`, algunos navegadores ofrecen traducir la página.
 * La traducción automática reescribe los nodos de texto por fuera de React
 * y, si luego React intenta actualizar esos mismos nodos (al cambiar de
 * tema, abrir un proyecto, etc.), el DOM ya no coincide con lo que React
 * espera y lanza un error en pleno render — sin este límite, eso deja la
 * página en blanco. Con él, en el peor de los casos se ve este aviso y un
 * botón para recargar, en vez de una pantalla vacía.
 *
 * `index.html` ya pide a Chrome que no ofrezca traducir esta página
 * (`notranslate`); esto es la segunda capa, por si el usuario la traduce
 * de todos modos o hay cualquier otro error de render inesperado.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Error de render capturado por ErrorBoundary:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f6f8fb] px-6 text-center dark:bg-ink">
        <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          Algo se rompió al mostrar la página.
        </p>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
          Si tradujiste la página con el navegador, prueba a verla en el idioma original y
          recargar.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          Recargar
        </button>
      </div>
    );
  }
}
