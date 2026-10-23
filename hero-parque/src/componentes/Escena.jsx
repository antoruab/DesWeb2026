import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import Avatar from "./Avatar";

const colores = ["#ff6b6b", "#ffd166", "#6bcb77", "#4d96ff", "#c77dff"];

function Suelo() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial color="#7ec850" />
    </mesh>
  );
}

function Arbol({ position, escala = 1 }) {
  return (
    <group position={position} scale={escala}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 1, 8]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.7, 1.4, 8]} />
        <meshStandardMaterial color="#2e8b57" />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#3cb371" />
      </mesh>
    </group>
  );
}

function Nube({ position, velocidad = 0.3, escala = 1 }) {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.position.x += delta * velocidad;
    if (ref.current.position.x > 12) {
      ref.current.position.x = -12;
    }
  });

  return (
    <group ref={ref} position={position} scale={escala}>
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.8, -0.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.8, -0.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

function Globo({ position, colorInicial }) {
  const ref = useRef();
  const [indiceColor, setIndiceColor] = useState(colorInicial);
  const [encima, setEncima] = useState(false);

  useFrame((state) => {
    const tiempo = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(tiempo + position[0]) * 0.3;
    ref.current.rotation.z = Math.sin(tiempo + position[0]) * 0.15;
  });

  return (
    <group
      ref={ref}
      position={position}
      scale={encima ? 1.3 : 1}
      onClick={() => setIndiceColor(indiceColor + 1)}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <mesh scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={colores[indiceColor % colores.length]} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}

const coloresFlores = ["#ff6b6b", "#ffd166", "#ffffff", "#ff9ecd", "#c77dff", "#4d96ff"];

function centroSendero(z) {
  return Math.sin(z * 0.45) * 1.5;
}

function estaEnEstanque(x, z) {
  return Math.hypot(x - 3.8, z + 0.5) < 2.3;
}

const posicionesFlores = [];

for (let i = 0; i < 19; i++) {
  const z = 5 - i * 0.6;
  const cx = centroSendero(z);
  posicionesFlores.push([cx + 1 + (i % 3) * 0.15, z, i % 6]);
  if (i % 2 === 0) {
    posicionesFlores.push([cx - 1 - (i % 3) * 0.12, z + 0.2, (i + 2) % 6]);
  }
}

for (let i = 0; i < 50; i++) {
  const angulo = i * 2.4;
  const radio = 2.5 + (i % 10) * 0.9;
  const x = Math.cos(angulo) * radio;
  const z = Math.sin(angulo) * radio - 2;
  const lejosDelSendero = Math.abs(x - centroSendero(z)) > 1.3;
  if (lejosDelSendero && z < 5 && Math.hypot(x, z) < 11 && !estaEnEstanque(x, z)) {
    posicionesFlores.push([x, z, i % 6]);
  }
}

function Sendero() {
  const piedras = [];
  for (let i = 0; i < 19; i++) {
    const z = 5 - i * 0.6;
    piedras.push(
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[centroSendero(z), 0.02, z]}>
        <circleGeometry args={[0.7, 24]} />
        <meshStandardMaterial color="#e6d3a3" />
      </mesh>
    );
  }
  return <>{piedras}</>;
}

function Flor({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
        <meshStandardMaterial color="#3d8b3d" />
      </mesh>
      <mesh position={[0, 0.42, 0]} scale={[1, 0.45, 1]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#ffcc00" />
      </mesh>
    </group>
  );
}

function Estanque({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#b8b8b8" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <circleGeometry args={[1.7, 32]} />
        <meshStandardMaterial color="#5ab8f0" roughness={0.2} />
      </mesh>
    </group>
  );
}

function Banco({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.4, 0.08, 0.5]} />
        <meshStandardMaterial color="#a0693a" />
      </mesh>
      <mesh position={[0, 0.8, -0.22]}>
        <boxGeometry args={[1.4, 0.45, 0.06]} />
        <meshStandardMaterial color="#a0693a" />
      </mesh>
      <mesh position={[-0.6, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.44, 0.45]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0.6, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.44, 0.45]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
}

function Farola({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 2, 8]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#fff3b0" emissive="#ffe066" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Arbusto({ position, escala = 1 }) {
  return (
    <group position={position} scale={escala}>
      <mesh position={[0, 0.3, 0]} scale={[1, 0.8, 1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#3f9c4f" />
      </mesh>
      <mesh position={[0.45, 0.22, 0.1]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4fb35f" />
      </mesh>
      <mesh position={[-0.4, 0.22, -0.1]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4fb35f" />
      </mesh>
    </group>
  );
}

export default function Escena() {
  return (
    <>
      <Sky sunPosition={[100, 40, 100]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />

      <Suelo />
      <Sendero />
      <Estanque position={[3.8, 0, -0.5]} />

      {posicionesFlores.map(([x, z, c], i) => (
        <Flor key={i} position={[x, 0, z]} color={coloresFlores[c]} />
      ))}

      <Banco position={[2.7, 0, 1.4]} rotation={[0, -Math.PI / 2, 0]} />
      <Farola position={[1.9, 0, 0.6]} />
      <Farola position={[-1.9, 0, -2.2]} />

      <Arbusto position={[-2.8, 0, -1]} />
      <Arbusto position={[1.8, 0, -4.5]} escala={1.3} />
      <Arbusto position={[-1.2, 0, -5.5]} escala={1.1} />
      <Arbusto position={[5, 0, -5]} />

      <Suspense fallback={null}>
        <Avatar />
      </Suspense>

      <Arbol position={[-4, 0, -3]} escala={1.2} />
      <Arbol position={[4, 0, -4]} />
      <Arbol position={[-6, 0, -6]} escala={1.4} />
      <Arbol position={[6, 0, -2]} escala={0.9} />
      <Arbol position={[0, 0, -8]} escala={1.5} />

      <Nube position={[-8, 5, -6]} velocidad={0.3} escala={1.2} />
      <Nube position={[3, 6.5, -9]} velocidad={0.2} escala={1.6} />
      <Nube position={[-2, 4.5, -12]} velocidad={0.25} escala={1.8} />
      <Nube position={[9, 5.5, -7]} velocidad={0.35} escala={1} />
      <Nube position={[-11, 7, -10]} velocidad={0.15} escala={1.5} />
      <Nube position={[6, 3.8, -14]} velocidad={0.22} escala={2} />

      <Globo position={[-2.5, 2.5, 0]} colorInicial={0} />
      <Globo position={[2.5, 3, -1]} colorInicial={2} />
      <Globo position={[1.2, 2, 1.5]} colorInicial={3} />
    </>
  );
}