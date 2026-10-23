import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";

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

function Nube({ position }) {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.position.x += delta * 0.3;
    if (ref.current.position.x > 10) {
      ref.current.position.x = -10;
    }
  });

  return (
    <group ref={ref} position={position}>
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

export default function Escena() {
  return (
    <>
      <Sky sunPosition={[100, 40, 100]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />

      <Suelo />

      <Arbol position={[-4, 0, -3]} escala={1.2} />
      <Arbol position={[4, 0, -4]} />
      <Arbol position={[-6, 0, -6]} escala={1.4} />
      <Arbol position={[6, 0, -2]} escala={0.9} />
      <Arbol position={[0, 0, -8]} escala={1.5} />

      <Nube position={[-6, 5, -6]} />
      <Nube position={[3, 6, -8]} />

      <Globo position={[-2.5, 2.5, 0]} colorInicial={0} />
      <Globo position={[2.5, 3, -1]} colorInicial={2} />
      <Globo position={[1.2, 2, 1.5]} colorInicial={3} />
    </>
  );
}