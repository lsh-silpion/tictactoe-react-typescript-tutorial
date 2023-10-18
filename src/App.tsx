import { useCallback, useState } from 'react';

type Squares = string[]

interface SquareProps {
  value: string,
  onSquareClick: () => void,
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
  );
}

interface BoardProps {
  xIsNext: boolean,
  squares: Squares,
  onPlay: (sqares: Squares) => void,
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const handleClick = useCallback((i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }, [xIsNext, squares, onPlay]);

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={useCallback(() => handleClick(0), [xIsNext, squares, onPlay])} />
          <Square value={squares[1]} onSquareClick={useCallback(() => handleClick(1), [xIsNext, squares, onPlay])} />
          <Square value={squares[2]} onSquareClick={useCallback(() => handleClick(2), [xIsNext, squares, onPlay])} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={useCallback(() => handleClick(3), [xIsNext, squares, onPlay])} />
          <Square value={squares[4]} onSquareClick={useCallback(() => handleClick(4), [xIsNext, squares, onPlay])} />
          <Square value={squares[5]} onSquareClick={useCallback(() => handleClick(5), [xIsNext, squares, onPlay])} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={useCallback(() => handleClick(6), [xIsNext, squares, onPlay])} />
          <Square value={squares[7]} onSquareClick={useCallback(() => handleClick(7), [xIsNext, squares, onPlay])} />
          <Square value={squares[8]} onSquareClick={useCallback(() => handleClick(8), [xIsNext, squares, onPlay])} />
        </div>
      </>
  );
}

export default function Game() {
  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
  });

  return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
  );
}

function calculateWinner(squares: Squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
