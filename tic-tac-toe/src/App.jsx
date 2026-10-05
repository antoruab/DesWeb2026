import { useState } from "react";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">🎮 Desarrollo Web</a>
      <a href="/" className="navbar-link">Inicio</a>
    </nav>
  );
}

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={isWinning ? "square winning" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];

  let status;
  if (winner) {
    status = `Ganó ${winner} 🎉`;
  } else if (squares.every((square) => square !== null)) {
    status = "Empate";
  } else {
    status = `Turno de ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className={winner ? "status winner-status" : "status"}>
        {status}
      </div>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;
            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                isWinning={winningLine.includes(i)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Ir a la jugada #${move}` : "Ir al inicio";
    return (
      <li key={move}>
        <button className="history-btn" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <button className="restart-btn" onClick={restart}>
        Reiniciar partida
      </button>
      <div className="game-info">
        <h3>Historial de jugadas</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <TicTacToe />
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}
