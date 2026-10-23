import HeroHeader from "./componentes/HeroHeader";
import "./App.css";

export default function App() {
  return (
    <>
      <HeroHeader />
      <section id="proyectos" className="proyectos">
        <h2>Proyectos</h2>
        <p>Aquí van mis proyectos.</p>
      </section>
    </>
  );
}