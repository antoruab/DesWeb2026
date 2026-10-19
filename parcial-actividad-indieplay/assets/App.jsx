import Header from "./componentes/Header";
import Sidebar from "./componentes/Sidebar";
import GameCard from "./componentes/GameCard";
import "./App.css";

export default function App() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <main className="game-grid">
          <GameCard title="Hollow Nights" studio="Dusk Studios" />
          <GameCard title="Pixel Quest" studio="Retro Forge" />
          <GameCard title="Starbound Drift" studio="Nova Games" />
          <GameCard title="Moonlit Garden" studio="Lantern Co." />
          <GameCard title="Iron Grove" studio="Oakwood Interactive" />
          <GameCard title="Echoes of Vale" studio="Silent Pixel" />
        </main>
      </div>
    </div>
  );
}
