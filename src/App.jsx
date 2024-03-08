import React, { useState } from 'react';

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Player = { X: 'X', O: 'O' };

const CELL_SIZE = 50; // Adjust for desired size

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(Player.X);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winningPlayer = checkWinner(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
    } else {
      setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const condition = WIN_CONDITIONS[i];
      const player = board[condition[0]];
      if (player && player === board[condition[1]] && player === board[condition[2]]) {
        return player;
      }
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player.X);
    setWinner(null);
  };

  const renderCell = (index, content) => (
    <div
      key={index}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: CELL_SIZE / 2,
        backgroundColor: board[index] ? 'lightblue' : 'white',
        cursor: winner || board[index] ? 'default' : 'pointer',
      }}
      onClick={() => handleClick(index)}
    >
      {content}
    </div>
  );

  const renderBoard = () => {
    return board.map((square, index) => renderCell(index, square));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <h2>Next Player: {currentPlayer}</h2>
      )}
      {renderBoard()}
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
