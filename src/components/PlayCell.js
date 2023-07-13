import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameActions } from '../store/index';
import { minesActions } from '../store/index';
import './PlayCell.css';

const PlayCell = ({ id }) => {
  const cheese = useSelector(state => state.cheese.cheeseIsActive);
  const initialMinesState = useSelector(state => state.mines);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch(gameActions.failGame);

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
    console.log(id); // Output the id value
    if (initialMinesState.minesLocation.includes(id)) {
      dispatch(gameActions.failGame());
    }
  };

  return (
    <div className={`playcell ${isActive ? 'cell-cheese-clicked' : ''}`} onClick={cheese ? setTileHandler : setClickHandler}>
      {isActive && '🧀'}
    </div>
  );
};

export default PlayCell;
