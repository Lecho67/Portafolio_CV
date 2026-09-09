import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  // El modo oscuro se activa añadiendo la clase `dark` al <html>.
  // Lo gestiona el hook `useTheme` (src/hooks/useTheme.ts).
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* ------------------------------------------------------------------ */
      /*  Paleta de acento                                                   */
      /*  Cambia estas dos líneas para re-teñir TODO el sitio. Cada una      */
      /*  acepta una escala de color de Tailwind (`colors.sky`, `colors.rose`*/
      /*  …) o un objeto propio { 50: '#…', … 950: '#…' }.                   */
      /* ------------------------------------------------------------------ */
      colors: {
        brand: colors.emerald,
        accent: colors.emerald,
        // Fondo azul marino profundo del modo oscuro (#0A0E1B y variantes).
        ink: {
          DEFAULT: '#0A0E1B',
          950: '#0A0E1B',
          900: '#111726',
          800: '#161D30',
          700: '#232C42',
          600: '#33405E',
        },
      },
      fontFamily: {
        // Cuerpo de texto. Fuente Inter cargada desde index.html.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Títulos y cifras. Space Grotesk cargada desde index.html.
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Etiquetas técnicas, números de sección y chips de stack.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
