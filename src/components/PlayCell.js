import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './PlayCell.css';

const PlayCell = () => {
  const cheese = useSelector(state => state.cheese.cheeseIsActive);
  const [isActive, setIsActive] = useState(false);

  const setTileHandler = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={`playcell ${isActive ? 'cell-clicked' : ''}`} onClick={cheese ? setTileHandler : null}>
      {isActive && '🧀'}
    </div>
  );
};

export default PlayCell;
