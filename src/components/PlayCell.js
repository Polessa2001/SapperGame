import { useState } from 'react';
import './PlayCell.css';

const PlayCell = () => {
  const [isActive, setIsActive] = useState(false);
  const setTileHandler = () => {
    setIsActive(!isActive);
  }

  return (
    <div  className={`playcell ${isActive ? 'cell-clicked' : ''}`} onClick={setTileHandler}>
      {isActive && '🧀'}
    </div>
  );
};
export default PlayCell;
