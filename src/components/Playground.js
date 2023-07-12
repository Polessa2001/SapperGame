import { useState, useEffect } from 'react';
import PlayCell from './PlayCell';
import './Playground.css';

const Playground = () => {
  const board = [];
  const rows = 8;
  const columns = 8;
  const [minesCount, setMinesCount] = useState(5);
  const minesLocation = [];
  const tileClicked = 0;
  const flagEnabled = false;
  const gameOver = false;

  startGame();

  function startGame() {
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        let id = `${r}-${c}`;

        row.push(id);
      }
      board.push(row);
      console.log(row);
    }
  }

  return (
    <div className="playground">
    {board.map((row) => (
      row.map((element) => <PlayCell key={element.value}/>)
    ))}
  </div>
  );
};

export default Playground;
