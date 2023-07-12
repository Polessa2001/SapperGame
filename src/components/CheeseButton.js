import './CheeseButton.css';
import { useDispatch } from 'react-redux';
import { cheeseActions } from '../store/index';
import { useState } from 'react';

const CheeseButton = () => {
  const dispatch = useDispatch();
  const CheeseButtonHandler = () => {
    dispatch(cheeseActions.toggle());
  }
  return (
    <button className ="cheese-button" onClick={CheeseButtonHandler}>🧀</button>
  );
}
export default CheeseButton;
