import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function Avatar() {
  const grupo = useRef();
  const fbx = useLoader(FBXLoader, "./models/avatar.fbx");
  const { mixer } = useAnimations(fbx.animations, grupo);

  useEffect(() => {
    let mejor = fbx.animations[0];

    fbx.animations.forEach((clip) => {
      console.log("Animación:", clip.name, "| pistas:", clip.tracks.length, "| duración:", clip.duration);
      if (clip.tracks.length > mejor.tracks.length) {
        mejor = clip;
      }
    });

    if (!mejor) {
      return;
    }

    const accion = mixer.clipAction(mejor, grupo.current);
    accion.reset().play();

    return () => {
      accion.stop();
    };
  }, [fbx, mixer]);

  return (
    <group ref={grupo}>
      <primitive object={fbx} scale={0.01} />
    </group>
  );
}