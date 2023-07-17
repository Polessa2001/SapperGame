import './App.css';
import Playground from './components/Playground';
import CheeseButton from './components/CheeseButton';
import { useSelector } from 'react-redux';
function App() {
  const mines = useSelector(state => state.mines.amountOfMines);
  return (
    <div>
      <h1>Mouse Traps: <span className="mines-count">{mines}</span></h1>
      <Playground />
      <br />
      <CheeseButton />
    </div>
  );
}

export default App;
