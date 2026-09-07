/**
 * HeroCanvas — escena 3D que hace de fondo a sangre de la sección Hero.
 *
 * Cinta de Möbius procedural revestida de dígitos binarios que fluyen, con un
 * cabezal de lectura que la recorre. Solo auto-rotación (sin controles): es un
 * elemento decorativo detrás del texto, con `pointer-events: none`.
 *
 * - Respeta `prefers-reduced-motion` (para el giro).
 * - Pausa el bucle de render cuando la sección sale de pantalla.
 * - Si no hay WebGL, no renderiza nada (el degradado del Hero cubre el hueco).
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
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, PointLight } from 'three';

/* Paleta (coincide con los acentos brand/accent —emerald/teal— del sitio).
   Si cambias `brand`/`accent` en tailwind.config.js, actualiza estos hex. */
const BRAND = '#10b981'; // emerald-500
const SCAN = '#22d3ee'; // cyan-400 — haz de lectura del cabezal
const RIM = '#a7f3d0'; // emerald-200 — luz de contorno

/* Geometría de la cinta: radio central y ancho del listón. */
const R = 2;
const STRIP_W = 0.92;

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

/** Respeta la preferencia de "reducir movimiento" del sistema. */
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

/** `true` mientras el elemento esté (al menos en parte) en el viewport. */
function useInViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* -------------------------------------------------------------------------- */
/*  Geometría procedural                                                       */
/* -------------------------------------------------------------------------- */

/** Punto de la cinta de Möbius para los parámetros (u, v). */
function mobiusPoint(u: number, v: number): [number, number, number] {
  const half = u / 2;
  const rad = R + v * Math.cos(half);
  return [rad * Math.cos(u), rad * Math.sin(u), v * Math.sin(half)];
}

/** Malla de la cinta de Möbius (con UV repetido para la textura de bits). */
function makeMobiusGeometry(uSeg = 260, vSeg = 24): THREE.BufferGeometry {
  const position: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  const row = vSeg + 1;

  for (let i = 0; i <= uSeg; i++) {
    const u = (i / uSeg) * Math.PI * 2;
    for (let j = 0; j <= vSeg; j++) {
      const v = (j / vSeg - 0.5) * STRIP_W;
      const [x, y, z] = mobiusPoint(u, v);
      position.push(x, y, z);
      uv.push((i / uSeg) * 8, j / vSeg);
    }
  }

  for (let i = 0; i < uSeg; i++) {
    for (let j = 0; j < vSeg; j++) {
      const a = i * row + j;
      const b = a + row;
      index.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  // Cierre del medio giro: el último anillo (u = 2π) coincide en el espacio con
  // el primero pero con el ancho invertido. Estas caras (de área nula) unen la
  // topología para que las normales sean continuas, sin costura visible.
  const last = uSeg * row;
  for (let j = 0; j < vSeg; j++) {
    const a = last + j;
    const a1 = last + j + 1;
    const b = vSeg - j;
    const b1 = vSeg - j - 1;
    index.push(a, b, a1, b, b1, a1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(index);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.computeVertexNormals();
  return geometry;
}

/** Textura de dígitos binarios dibujada en un <canvas> 2D. */
function makeBinaryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '700 26px ui-monospace, "DM Mono", monospace';
    ctx.textBaseline = 'middle';
    const rows = 6;
    for (let r = 0; r < rows; r++) {
      const y = ((r + 0.5) / rows) * canvas.height;
      for (let x = 4; x < canvas.width; x += 20) {
        const one = Math.random() > 0.5;
        ctx.fillStyle = one ? '#a7f3d0' : '#0f766e';
        ctx.fillText(one ? '1' : '0', x, y);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

/** Marco ortonormal (tangente, normal, "ancho") de la superficie en el parámetro u. */
interface SurfaceFrame {
  p: THREE.Vector3;
  tangent: THREE.Vector3;
  normal: THREE.Vector3;
  across: THREE.Vector3;
}

function writeSurfaceFrame(u: number, f: SurfaceFrame): void {
  const eps = 0.015;
  const p0 = mobiusPoint(u, 0);
  const pa = mobiusPoint(u + eps, 0);
  const pb = mobiusPoint(u - eps, 0);
  const wa = mobiusPoint(u, STRIP_W * 0.5);
  const wb = mobiusPoint(u, -STRIP_W * 0.5);

  f.p.set(p0[0], p0[1], p0[2]);
  f.tangent.set(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]).normalize();
  f.across.set(wa[0] - wb[0], wa[1] - wb[1], wa[2] - wb[2]).normalize();
  f.normal.crossVectors(f.tangent, f.across).normalize();
  // Re-ortogonaliza el ancho (las líneas u/v de la cinta no son perpendiculares).
  f.across.crossVectors(f.normal, f.tangent).normalize();
}

/**
 * Cinta de Möbius revestida de bits que fluyen, con un cabezal de lectura que
 * la recorre como el de una máquina de Turing.
 */
function MobiusComputer({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const head = useRef<Group>(null);
  const headLight = useRef<PointLight>(null);

  const geometry = useMemo(() => makeMobiusGeometry(), []);
  const texture = useMemo(() => makeBinaryTexture(), []);
  const frame = useMemo<SurfaceFrame>(
    () => ({
      p: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      across: new THREE.Vector3(),
    }),
    [],
  );
  const basis = useMemo(() => new THREE.Matrix4(), []);

  useEffect(
    () => () => {
      geometry.dispose();
      texture.dispose();
    },
    [geometry, texture],
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Los bits "corren" a lo largo de la cinta.
    texture.offset.x -= delta * 0.12;

    if (group.current) {
      if (!reducedMotion) group.current.rotation.z += delta * 0.18;
      group.current.rotation.x = 0.5 + Math.sin(t * 0.3) * 0.1;
      group.current.rotation.y = Math.sin(t * 0.22) * 0.15;
    }

    // El cabezal se apoya en la superficie y se orienta con ella.
    writeSurfaceFrame(t * 0.75, frame);
    if (head.current) {
      head.current.position.copy(frame.p);
      basis.makeBasis(frame.across, frame.normal, frame.tangent);
      head.current.quaternion.setFromRotationMatrix(basis);
    }
    headLight.current?.position.copy(frame.p).addScaledVector(frame.normal, 0.35);
  });

  return (
    <group ref={group} rotation={[0.5, 0, 0]}>
      {/* Listón con dígitos binarios */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Malla de alambre muy tenue sobre el listón */}
      <mesh geometry={geometry} scale={1.006}>
        <meshBasicMaterial color={RIM} wireframe transparent opacity={0.1} />
      </mesh>

      {/* Cabezal de lectura */}
      <group ref={head}>
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[STRIP_W * 1.2, 0.06, 0.12]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.9}
            roughness={0.3}
            emissive={BRAND}
            emissiveIntensity={0.35}
          />
        </mesh>
        {[-1, 1].map((dir) => (
          <mesh key={dir} position={[dir * STRIP_W * 0.6, 0, 0]}>
            <boxGeometry args={[0.07, 0.38, 0.14]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.3}
              emissive={BRAND}
              emissiveIntensity={0.35}
            />
          </mesh>
        ))}
        {/* Haz de lectura sobre la superficie */}
        <mesh position={[0, 0.028, 0]}>
          <boxGeometry args={[STRIP_W * 1.05, 0.02, 0.05]} />
          <meshStandardMaterial
            color={SCAN}
            emissive="#cffafe"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </group>
      <pointLight ref={headLight} color={RIM} intensity={3} distance={4.5} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Escena                                                                     */
/* -------------------------------------------------------------------------- */

interface SceneProps {
  /** Escala del objeto (menor en móvil). */
  scale: number;
  /** Desplazamiento horizontal para dejar espacio al texto del Hero. */
  offsetX: number;
  reducedMotion: boolean;
}

function Scene({ scale, offsetX, reducedMotion }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={2.1} color={BRAND} />
      <pointLight position={[-5, -2, -3]} intensity={1.5} color="#14b8a6" />

      <group position={[offsetX, 0, 0]}>
        <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.4}>
          <group scale={scale}>
            <MobiusComputer reducedMotion={reducedMotion} />
          </group>
        </Float>
      </group>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Límite de error (si falla la creación del contexto WebGL)                  */
/* -------------------------------------------------------------------------- */

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Componente público                                                         */
/* -------------------------------------------------------------------------- */

export function HeroCanvas() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { ref, visible } = useInViewport<HTMLDivElement>();

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 h-full w-full">
      <CanvasErrorBoundary>
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          dpr={isMobile ? 1 : [1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0.4, 8], fov: 42 }}
        >
          <Suspense fallback={null}>
            <Scene
              scale={isMobile ? 0.7 : 0.95}
              offsetX={isMobile ? 0 : 1.7}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default HeroCanvas;
