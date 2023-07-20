import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../store/index';
import { minesActions } from '../store/index';
import './PlayCell.css';

const PlayCell = ({ id, onCellClick, checkTile, minesFound, cellContainsX0, openMine }) => {
  const cheese = useSelector(state => state.cheese.cheeseIsActive);
  const initialMinesState = useSelector(state => state.mines);
  const resetGame = useSelector(state => state.game.resetData);
  const gameIsOver = useSelector(state => state.game.gameOver);
  const [isClicked, setIsClicked] = useState(false);
  // const [hasBomb, setHasBomb] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const oneCell = useRef(null);
  const dispatch = useDispatch();

  const hasBomb = initialMinesState.minesLocation.includes(id);

  useEffect(() => {
    if (resetGame) {
      setIsActive(false);
      setIsClicked(false);
      oneCell.current.innerHTML = null;
      oneCell.current.classList.remove('x0');
      oneCell.current.classList.remove((`x${minesFound.toString()}`));
    };
  }, [resetGame]);

  const setTileHandler = () => {
    setIsActive(!isActive);
    if (initialMinesState.minesLocation.includes(id) && !isActive) {
      dispatch(minesActions.decrementMines());
    }
    if (initialMinesState.minesLocation.includes(id) && isActive) {
      dispatch(minesActions.incrementMines());
    }
  };

  const setClickHandler = () => {
    console.log('HABOMB', hasBomb);
    setIsClicked(true);

    if (isClicked) {
      return;
    }

    if (initialMinesState.minesLocation.includes(id)) {
      dispatch(minesActions.revealMines());
      dispatch(minesActions.decrementMines());
      dispatch(gameActions.failGame());
    } else {
      onCellClick(id, checkTile);
    }
  };

  useEffect(() => {
    if (oneCell.current && isClicked && !hasBomb) {
      if (minesFound > 0) {
        oneCell.current.innerHTML = minesFound;
        oneCell.current.classList.add(`x${minesFound.toString()}`);
      } else {
        oneCell.current.classList.add('x0');
        oneCell.current.innerHTML = null;
        if (oneCell.current.classList.contains('x0')) {
          // Pass the information to the parent component
          onCellClick(id, checkTile, true);
        }
      }
    }
  }, [oneCell, isClicked, hasBomb, minesFound]);

  const handleClick = () => {
    if (cheese) {
      setTileHandler();
    } else {
      setClickHandler();
    }
  };
    return (
    <div
      ref={oneCell}
      className={`playcell ${isActive ? 'cell-cheese-clicked' : ''} ${gameIsOver && hasBomb ? 'cell-bomb' : ''}`}
      onClick={handleClick}
    >
      {isActive && '🧀'}
      {gameIsOver && hasBomb && '🪤'}
    </div>
  );
};

export default PlayCell;
