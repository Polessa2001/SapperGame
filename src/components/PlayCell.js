import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../store/index';
import { minesActions } from '../store/index';
import './PlayCell.css';

const PlayCell = ({ id, onCellClick, checkTile, minesFound, cellContainsX0, openMine }) => {
  const cheese = useSelector(state => state.cheese.cheeseIsActive);
  const bombIsFound = useSelector(state => state.mines.bombIsFound);
  const initialMinesState = useSelector(state => state.mines);
  const [isClicked, setIsClicked] = useState(false);
  const [hasBomb, setHasBomb] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const oneCell = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialMinesState.minesLocation.includes(id)) {
      setHasBomb(true);
    }
  }, [initialMinesState.minesLocation, id]);

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
    setIsClicked(true);

    if (isClicked) {
      return;
    }
    // dispatch(gameActions.incrementIsOpen());
    // console.log(tileIsOpen);

    if (initialMinesState.minesLocation.includes(id)) {
      dispatch(minesActions.revealMines());
      dispatch(gameActions.failGame());
    } else {
      onCellClick(id, checkTile);
    }
  };

  if (openMine && !isClicked) {
    setIsClicked(true);
    oneCell.current.classList.add('x0');
  }

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
    }},[oneCell, isClicked, hasBomb]);

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
      {openMine && null}
      {isActive && '🧀'}
      {bombIsFound && hasBomb && '🪤'}
    </div>
  );
};

export default PlayCell;
