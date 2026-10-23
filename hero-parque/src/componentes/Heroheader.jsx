import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Escena from "./Escena";

export default function HeroHeader() {
  return (
    <header className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 1.8, 6], fov: 50 }}>
          <Escena />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            target={[0, 1, 0]}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.1}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Canvas>
      </div>

      <div className="hero-overlay">
        <div className="hero-card">
          <p className="hero-saludo">Hola, soy</p>
          <h1 className="hero-nombre">Antonia Rúa</h1>
          <p className="hero-titulo">Estudiante de Ingeniería Multimedia</p>
          <a href="#proyectos" className="hero-boton">Ver Proyectos</a>
        </div>
      </div>
    </header>
  );
}