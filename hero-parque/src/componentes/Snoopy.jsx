import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Snoopy() {
  const grupo = useRef();
  const { scene } = useGLTF("/models/snoopy.glb");

  const { escala, centro } = useMemo(() => {
    const caja = new THREE.Box3().setFromObject(scene);
    const tamano = new THREE.Vector3();
    const centro = new THREE.Vector3();
    caja.getSize(tamano);
    caja.getCenter(centro);
    const escala = 2 / Math.max(tamano.x, tamano.y, tamano.z);
    return { escala, centro };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4;
    const casa = grupo.current;

    casa.position.x = Math.cos(t) * 5;
    casa.position.z = -3 + Math.sin(t) * 4;
    casa.position.y = 3.5 + Math.sin(t * 3) * 0.3;

    // si Snoopy va de espaldas, súmale Math.PI a esta línea
    casa.rotation.y = Math.atan2(-Math.sin(t) * 5, Math.cos(t) * 4);
    casa.rotation.z = Math.sin(t * 3) * 0.1;
  });

  return (
    <group ref={grupo}>
      <primitive
        object={scene}
        scale={escala}
        position={[-centro.x * escala, -centro.y * escala, -centro.z * escala]}
      />
    </group>
  );
}