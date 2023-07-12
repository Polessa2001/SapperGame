import './CheeseButton.css';
import { useState } from 'react';

const CheeseButton = () => {
  const [availableTickleCell, setAvailableTickleCell] = useState(false);
  const CheeseButtonHandler = () => {
    setAvailableTickleCell(!availableTickleCell);
  }
  return (
    <button className ="cheese-button" onClick={CheeseButtonHandler}>🧀</button>
  );
}
export default CheeseButton;
