import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function Avatar() {
  const grupo = useRef();
  const fbx = useLoader(FBXLoader, "/models/avatar.fbx");
  const { actions } = useAnimations(fbx.animations, grupo);

  useEffect(() => {
    const nombres = Object.keys(actions);
    if (nombres.length > 0) {
      actions[nombres[0]].reset().play();
    }
  }, [actions]);

  return (
    <group ref={grupo}>
      <primitive object={fbx} scale={0.01} />
    </group>
  );
}