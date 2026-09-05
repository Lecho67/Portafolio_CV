/**
 * ============================================================================
 *  HeroCanvas — escena 3D interactiva de la sección Hero
 * ----------------------------------------------------------------------------
 *  Objeto procedural (laptop + smartphone flotantes) construido con mesh
 *  primitives de Three.js, rotación suave con OrbitControls (auto-rotate) y
 *  destellos de partículas de fondo.
 *
 *  Responsivo y seguro en móvil:
 *   - En pantallas < lg los controles quedan deshabilitados y el <canvas>
 *     recibe `pointer-events: none`, de modo que el gesto de scroll nunca se
 *     queda "atrapado" dentro del lienzo.
 *   - Respeta `prefers-reduced-motion` (desactiva el auto-rotate).
 *   - Si el navegador no puede crear el contexto WebGL, se muestra un
 *     fallback estático (CanvasErrorBoundary).
 * ============================================================================
 */

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  Sparkles,
  useProgress,
} from '@react-three/drei';
import type { Group } from 'three';

/* Paleta (coincide con los acentos indigo/violet del resto del sitio). */
const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const CHASSIS = '#334155';
const CHASSIS_DARK = '#1e293b';

/* Líneas de "código" pintadas sobre la pantalla de la laptop. */
const CODE_LINES: { x: number; y: number; w: number; color: string }[] = [
  { x: -0.62, y: 0.44, w: 0.5, color: '#c7d2fe' },
  { x: -0.3, y: 0.29, w: 1.0, color: '#e0e7ff' },
  { x: -0.18, y: 0.14, w: 1.24, color: '#a5b4fc' },
  { x: -0.42, y: -0.01, w: 0.8, color: '#e0e7ff' },
  { x: -0.24, y: -0.16, w: 1.12, color: '#c7d2fe' },
  { x: -0.52, y: -0.31, w: 0.6, color: '#a5b4fc' },
];

/* -------------------------------------------------------------------------- */
/*  Hooks de entorno                                                           */
/* -------------------------------------------------------------------------- */

/** `true` mientras el viewport sea de tipo móvil/tablet (< 1024px). */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}

/** Respeta la preferencia de "reducir movimiento" del sistema operativo. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/*  Geometría procedural                                                       */
/* -------------------------------------------------------------------------- */

/** Laptop minimalista: base + teclado + pantalla con brillo y líneas de código. */
function Laptop() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Ligero vaivén sobre la orientación base, además del auto-rotate de la cámara.
    group.current.rotation.y = -0.5 + Math.sin(t * 0.35) * 0.12;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]} rotation={[0.1, -0.5, 0]} scale={0.95}>
      {/* Base / chasis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.12, 1.7]} />
        <meshStandardMaterial color={CHASSIS} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Superficie del teclado */}
      <mesh position={[0, 0.062, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.35]} />
        <meshStandardMaterial color={CHASSIS_DARK} metalness={0.5} roughness={0.7} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.063, 0.52]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 0.42]} />
        <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Tapa + pantalla — bisagra en el borde trasero, reclinada ~20° */}
      <group position={[0, 0.02, -0.85]} rotation={[-0.36, 0, 0]}>
        {/* Carcasa de la tapa */}
        <mesh castShadow position={[0, 0.78, -0.04]}>
          <boxGeometry args={[2.5, 1.56, 0.07]} />
          <meshStandardMaterial color={CHASSIS} metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Panel emisivo (el "glow" de la pantalla, mirando a la cámara) */}
        <mesh position={[0, 0.78, 0.02]}>
          <planeGeometry args={[2.3, 1.38]} />
          <meshStandardMaterial
            color={INDIGO}
            emissive={INDIGO}
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>

        {/* Líneas de código */}
        {CODE_LINES.map((line, i) => (
          <mesh key={i} position={[line.x, 0.78 + line.y, 0.03]}>
            <planeGeometry args={[line.w, 0.08]} />
            <meshBasicMaterial color={line.color} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Smartphone flotante (representa el desarrollo móvil en Kotlin). */
function Phone() {
  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={1.4}>
      <group position={[1.7, 0.75, 0.9]} rotation={[0.2, -0.55, 0.14]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 1.25, 0.07]} />
          <meshStandardMaterial color={CHASSIS} metalness={0.9} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.54, 1.14]} />
          <meshStandardMaterial
            color={VIOLET}
            emissive={VIOLET}
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* -------------------------------------------------------------------------- */
/*  Escena                                                                     */
/* -------------------------------------------------------------------------- */

interface SceneProps {
  /** En móvil los controles se desactivan para no bloquear el scroll. */
  interactive: boolean;
  /** Auto-rotación (se apaga con prefers-reduced-motion). */
  autoRotate: boolean;
}

function Scene({ interactive, autoRotate }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight intensity={0.6} color="#c7d2fe" groundColor="#1e293b" />
      <directionalLight position={[4, 6, 5]} intensity={2} castShadow />
      <pointLight position={[0, 2.5, 5]} intensity={2.4} distance={20} />
      <pointLight position={[-5, 2, -3]} intensity={3.5} distance={20} color={INDIGO} />
      <pointLight position={[5, -1, 3]} intensity={3} distance={20} color={VIOLET} />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <Laptop />
      </Float>
      <Phone />

      {/* Destellos de partículas / "código" en el fondo */}
      <Sparkles count={60} scale={[9, 5, 5]} size={2.4} speed={0.35} color="#a5b4fc" />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.3}
        scale={12}
        blur={2.8}
        far={4.5}
      />

      <OrbitControls
        makeDefault
        enabled={interactive}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.9}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Estados de carga / error                                                   */
/* -------------------------------------------------------------------------- */

/** Indicador de progreso mientras se inicializa la escena (dentro del Canvas). */
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
        Cargando escena 3D… {Math.round(progress)}%
      </div>
    </Html>
  );
}

/** Fallback estático si WebGL no está disponible o el render 3D falla. */
function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 text-center">
      <div>
        <div className="mx-auto mb-4 h-20 w-28 rounded-lg border-2 border-indigo-500/50 bg-indigo-500/10" />
        <p className="max-w-[16rem] text-sm text-slate-500 dark:text-slate-400">
          Tu navegador no puede mostrar la escena 3D, pero el resto del sitio
          funciona con normalidad.
        </p>
      </div>
    </div>
  );
}

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Componente público                                                         */
/* -------------------------------------------------------------------------- */

export function HeroCanvas() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative h-full w-full" style={{ touchAction: 'pan-y' }}>
      <CanvasErrorBoundary fallback={<CanvasFallback />}>
        <Canvas
          className={isMobile ? 'pointer-events-none' : ''}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 1.4, 7], fov: 42 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Scene interactive={!isMobile} autoRotate={!reducedMotion} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {isMobile ? 'Vista previa 3D' : 'Arrastra para rotar'}
      </p>
    </div>
  );
}

export default HeroCanvas;
