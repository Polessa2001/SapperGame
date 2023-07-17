import React, { useState } from 'react';
import PlayCell from './PlayCell';
import { useSelector } from 'react-redux';
import './Playground.css';

const Playground = () => {
  const rows = useSelector(state => state.game.rows);
  const columns = useSelector(state => state.game.columns);
  const initialMinesState = useSelector(state => state.mines);
  const newBoard = [];

  function startGame() {
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
  const [minesState, setMinesState] = useState({});

  const checkMineHandler = (id, checkTile) => {
    // Access the key of the clicked cell from the parent component
    console.log(`Clicked cell ID: ${id}`);

    const [row, col] = id.split('-').map(Number);
    if (row < 0 || row >= rows || col < 0 || col >= columns) {
      return;
    }

    const neighbors = [
      { row: row - 1, col: col - 1 },
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      { row, col: col - 1 },
      { row, col: col + 1 },
      { row: row + 1, col: col - 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
    ];
    const minesCountMap = {};
    let minesCount = 0;

    for (const neighbor of neighbors) {
      const neighborId = `${neighbor.row}-${neighbor.col}`;
      minesCount += checkTile(neighbor.row, neighbor.col);
      if (minesCount > 0) {
        minesCountMap[neighborId] = minesCount;
        console.log(neighborId);
      }
    }
    // console.log('Mines Count:', minesCount);
    setMinesState(prevState => ({ ...prevState, ...minesCountMap }));
  };

  const executeFunctionInCell = (r, c) => {
    // Function to execute in the cell component
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
      return 0;
    }
    if (initialMinesState.minesLocation.includes(`${r}-${c}`)) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="playground">
      {startGame().map((row) =>
        row.map((element) => (
          <PlayCell
            key={element}
            id={element}
            onCellClick={checkMineHandler}
            checkTile={executeFunctionInCell}
            minesFound={minesState[element] || 0}
          >
          </PlayCell>
        ))
      )}
    </div>
  );
};

export default Playground;
