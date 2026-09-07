import { createElement, type ElementType, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** Etiqueta a renderizar (`div` por defecto, también `header`, `section`…). */
  as?: ElementType;
  /** Retardo en ms para escalonar la aparición de elementos hermanos. */
  delay?: number;
  className?: string;
}

/**
 * Envuelve contenido y lo hace aparecer con un fundido + desplazamiento hacia
 * arriba la primera vez que entra en pantalla. Respeta `prefers-reduced-motion`
 * (en ese caso aparece sin animación). Ver `useInView`.
 *
 * Solo anima `opacity` y `transform`, así que las transiciones propias del
 * contenido (colores al hover, etc.) no se ven afectadas por el `delay`.
 */
export function Reveal({ children, as = 'div', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      style: { transitionDelay: inView ? `${delay}ms` : '0ms' },
      className: [
        'transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none',
        inView ? 'opacity-100 translate-y-0' : 'translate-y-4 opacity-0',
        className,
      ].join(' '),
    },
    children,
  );
}
