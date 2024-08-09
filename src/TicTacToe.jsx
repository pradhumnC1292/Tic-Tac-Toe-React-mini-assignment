import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Playing");
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const calculateWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[index]) return;

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(winner === "Draw" ? "Draw" : `Winner: ${winner}`);
      if (winner === "Draw") {
        setScore({ ...score, draws: score.draws + 1 });
      } else {
        setScore({ ...score, [winner]: score[winner] + 1 });
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const handleRematch = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Playing");
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="status">Status: {status}</div>
      <div className="scoreboard">
        <div>
          X <br /> {score.X} Wins
        </div>
        <div>
          O <br /> {score.O} Wins
        </div>
        <div>
          = <br /> {score.draws} Draws
        </div>
      </div>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`square ${value === "X" ? "X" : ""} ${
              value === "O" ? "O" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <button className="rematch" onClick={handleRematch}>
        Rematch
      </button>
    </div>
  );
};

export default TicTacToe;
