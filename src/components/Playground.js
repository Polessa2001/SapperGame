import React, { useEffect, useState } from 'react';
import PlayCell from './PlayCell';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../store/index';
import './Playground.css';

const Playground = () => {
  const rows = useSelector(state => state.game.rows);
  const columns = useSelector(state => state.game.columns);
  const initialMinesState = useSelector(state => state.mines);
  const tileIsOpen = useSelector(state => state.game.isOpen);
  const playerGained = useSelector(state => state.game.gain);
  const gameIsOver = useSelector(state => state.game.gameOver);
  const newBoard = [];
  console.log(tileIsOpen);
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

  const [minesCountMap, setMinesCountMap] = useState({});
  const [minesOpenAround, setMinesOpenAround] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (tileIsOpen === 58 && !gameIsOver) {
      const playAgain = window.confirm("You WON! Wanna play again?");
      if (playAgain) {
        dispatch(gameActions.resetGame());
      }
    }
  }, [playerGained, tileIsOpen]);

  const checkMineHandler = (id, checkTile, cellContainsX0) => {
    // Access the key of the clicked cell from the parent component
    console.log(`Clicked cell ID: ${id}`);

    const [row, col] = id.split('-').map(Number);
    if (row < 0 || row >= rows || col < 0 || col >= columns) {
      return;
    }

    if (cellContainsX0) {
      dispatch(gameActions.incrementIsOpen());
      return;
    }

    let minesCount = 0;
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
    let sumMinesCount = 0;

    for (const neighbor of neighbors) {
      minesCount = checkTile(neighbor.row, neighbor.col);
      if (minesCount > 0) {
        // updatedMinesCountMap[neighborId] = minesCount;
        sumMinesCount += minesCount;
      }
    }
    if (sumMinesCount === 0) {
      let updatedOpenAround = { ...minesOpenAround };
      for (const neighbor of neighbors) {
        const neighborRow = neighbor.row;
        const neighborCol = neighbor.col;
        const neighborId = `${neighborRow}-${neighborCol}`;
        updatedOpenAround = { ...updatedOpenAround, [neighborId]: true };
        // console.log('Sum of Empty Cells:', updatedOpenAround);
      }
      setMinesOpenAround(updatedOpenAround);
    } else {
      const updatedMinesCountMap = { ...minesCountMap, [id]: sumMinesCount };
      setMinesCountMap(updatedMinesCountMap);
      dispatch(gameActions.incrementIsOpen());
      // console.log('Sum of Mines Count:', updatedMinesCountMap);
    }
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
      {startGame().map(row =>
        row.map(element => (
          <PlayCell
            key={element}
            id={element}
            onCellClick={checkMineHandler}
            checkTile={executeFunctionInCell}
            openMine={minesOpenAround[element] || false}
            minesFound={minesCountMap[element] || 0}
            cellContainsX0={minesCountMap[element] === 0}
          />
        ))
      )}
    </div>
  );
};

export default Playground;
