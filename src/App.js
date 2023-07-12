import './App.css';
import Playground from './components/Playground';
import CheeseButton from './components/CheeseButton';

function App() {
  return (
    <div>
      <h1>Mines: <span className="mines-count"></span></h1>
      <Playground />
      <br />
      <CheeseButton />
    </div>
  );
}

export default App;
