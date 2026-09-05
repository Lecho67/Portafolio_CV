/** @type {import('tailwindcss').Config} */
export default {
  // El modo oscuro se activa añadiendo la clase `dark` al <html>.
  // Lo gestiona el hook `useTheme` (src/hooks/useTheme.ts).
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Fuente Inter cargada desde index.html. Cambia aquí si usas otra.
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
