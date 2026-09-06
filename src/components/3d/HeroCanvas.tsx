/**
 * ============================================================================
 *  HeroCanvas — escena 3D interactiva de la sección Hero
 * ----------------------------------------------------------------------------
 *  "Átomo de React" procedural: núcleo icosaédrico con brillo y 3 órbitas
 *  elípticas (a 0° / 60° / 120°, como el logo de React) con un electrón
 *  recorriendo cada una. Rotación suave con OrbitControls (auto-rotate) y
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
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Html,
  Line,
  OrbitControls,
  Sparkles,
  useProgress,
} from '@react-three/drei';
import type { Group, Mesh } from 'three';

/* Paleta (coincide con los acentos indigo/violet del resto del sitio). */
const INDIGO = '#6366f1';
const VIOLET = '#8b5cf6';
const SKY = '#38bdf8';
const RIM = '#c7d2fe';

/* Semiejes de las órbitas elípticas del átomo. */
const RX = 2.15;
const RY = 0.82;

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

/** Puntos de una elipse en el plano XY (para dibujar cada órbita). */
function ellipsePoints(rx: number, ry: number, segments = 128): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(a) * rx, Math.sin(a) * ry, 0]);
  }
  return pts;
}

interface OrbitProps {
  /** Giro del plano de la órbita sobre Z (0° / 60° / 120°, como el logo de React). */
  spin: number;
  color: string;
  /** Velocidad angular del electrón. */
  speed: number;
  /** Desfase inicial del electrón. */
  phase: number;
}

/** Una órbita elíptica con su electrón. */
function Orbit({ spin, color, speed, phase }: OrbitProps) {
  const electron = useRef<Mesh>(null);
  const points = useMemo(() => ellipsePoints(RX, RY), []);

  useFrame((state) => {
    if (!electron.current) return;
    const t = state.clock.getElapsedTime() * speed + phase;
    electron.current.position.set(Math.cos(t) * RX, Math.sin(t) * RY, 0);
  });

  return (
    <group rotation={[0, 0, spin]}>
      <Line points={points} color={color} lineWidth={2.5} transparent opacity={0.6} />
      <mesh ref={electron}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Átomo de React: núcleo icosaédrico + 3 órbitas con electrones. */
function ReactAtom() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.z = t * 0.25;
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
  });

  return (
    <group ref={group} rotation={[0.32, 0, 0]}>
      {/* Núcleo emisivo */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={INDIGO}
          emissive={INDIGO}
          emissiveIntensity={1.5}
          flatShading
          toneMapped={false}
        />
      </mesh>
      {/* Malla de alambre sobre el núcleo */}
      <mesh scale={1.06}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={RIM} wireframe transparent opacity={0.35} />
      </mesh>

      {/* 3 órbitas a 0° / 60° / 120° */}
      <Orbit spin={0} color={INDIGO} speed={0.9} phase={0} />
      <Orbit spin={Math.PI / 3} color={VIOLET} speed={1.15} phase={2.1} />
      <Orbit spin={-Math.PI / 3} color={SKY} speed={0.7} phase={4.2} />
    </group>
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
  /** Escala del átomo (se reduce en móvil para que no se recorte). */
  scale: number;
}

function Scene({ interactive, autoRotate, scale }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={2} color={RIM} />
      <pointLight position={[-4, -2, -3]} intensity={1.5} color={VIOLET} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <group scale={scale}>
          <ReactAtom />
        </group>
      </Float>

      {/* Destellos de partículas en el fondo */}
      <Sparkles count={80} scale={[11, 7, 7]} size={2.2} speed={0.3} color={RIM} />

      <OrbitControls
        makeDefault
        enabled={interactive}
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
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
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0.3, 6.3], fov: 42 }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Scene
              interactive={!isMobile}
              autoRotate={!reducedMotion}
              scale={isMobile ? 0.82 : 1}
            />
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
