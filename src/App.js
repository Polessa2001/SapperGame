import './App.css';
import { useState , useEffect} from 'react';
import Playground from './components/Playground';
import CheeseButton from './components/CheeseButton';
import { useSelector, useDispatch } from 'react-redux';
import { minesActions, gameActions } from './store';
import '../src/assets/Mouse.css';

function App() {
  const dispatch = useDispatch();
  const mines = useSelector(state => state.mines.amountOfMines);
  const gameStarted = useSelector(state => state.mines.gameStarted);
  const resetData = useSelector(state => state.game.resetData); // Add resetData from the game state
  const [showPlayground, setShowPlayground] = useState(false); // Added state to control Playground rendering

  useEffect(() => {
    if (!gameStarted) {
      dispatch(minesActions.setInitial());
    }

    // Use setTimeout to set the showPlayground state to true after 2 seconds (2000 milliseconds)
    const timer = setTimeout(() => {
      setShowPlayground(true);
    }, 1200);

    // Clear the timer on component unmount to avoid any unexpected behavior
    return () => clearTimeout(timer);
  }, [dispatch, gameStarted]);

  // Function to reset the game
  const handleStartAgain = () => {
    dispatch(gameActions.resetGame());// Reset game state
    setShowPlayground(false); // Reset showPlayground state to hide Playground
    dispatch(minesActions.setInitial());// Reset mines
  };

  return (
    <div className="custom-cursor">
      <h1>Mouse Traps: <span className="mines-count">{ mines }</span></h1>
      <>
        {showPlayground ? (
          <Playground />
        ) : (
          <div className="rendering">
            <img src ="https://media.tenor.com/FKT55Bbhfc4AAAAi/mouse-pizza.gif"></img>
          </div>
        )}
        <br />
        <CheeseButton />
        <br />
        <button onClick={handleStartAgain} className = "start">Again</button> {/* Add Start Again button */}
      </>
    </div>
  );
}

export default App;
