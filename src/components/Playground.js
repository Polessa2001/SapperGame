import React from 'react';
import PlayCell from './PlayCell';
import { useSelector } from 'react-redux';
import './Playground.css';

const Playground = () => {
  const rows = useSelector(state => state.game.rows);
  const columns = useSelector(state => state.game.columns);

  function startGame() {
    const newBoard = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        let id = `${r}-${c}`;
        row.push(id);
      }
      newBoard.push(row);
    }
    return newBoard;
  }

  return (
    <div className="playground">
      {startGame().map((row) => (
        row.map((element) => <PlayCell key={element} id={element} />)
      ))}
    </div>
  );
};

export default Playground;
