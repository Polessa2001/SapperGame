import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../store/index';
import { minesActions } from '../store/index';
import './PlayCell.css';

const PlayCell = ({ id, onCellClick, checkTile, minesFound }) => {
  const cheese = useSelector(state => state.cheese.cheeseIsActive);
  const bombIsFound = useSelector(state => state.mines.bombIsFound);
  const initialMinesState = useSelector(state => state.mines);
  const [hasBomb, setHasBomb] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const oneCell = useRef(null);
  useEffect(() => {
    if (initialMinesState.minesLocation.includes(id)) {
      setHasBomb(true);
    }
  }, [initialMinesState.minesLocation]);

  const dispatch = useDispatch();

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
    if (initialMinesState.minesLocation.includes(id)) {
      dispatch(minesActions.revealMines());
      dispatch(gameActions.failGame());
    } else {
      onCellClick(id, checkTile);
      console.log(minesFound);
      if (oneCell.current) {
        if (minesFound > 0) {
          oneCell.current.innerHTML = minesFound;
          oneCell.current.classList.add(`x${minesFound}`);
        } else {
          oneCell.current.classList.add('x0');
        }
      }
    }
  };

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
      className={`playcell ${isActive ? 'cell-cheese-clicked' : ''} ${bombIsFound && hasBomb ? 'cell-bomb' : ''}`}
      onClick={handleClick}
    >
      {isActive && '🧀'}
      {bombIsFound && hasBomb && '🪤'}
    </div>
  );
};

export default PlayCell;
