const board =[]
  const ROWS = 8;
  const COLUMNS = 8;
  const [minesCount, setMinesCount] = useState(5);
  const minesLocation = [];
  const tileClicked = 0;
  const flagEnabled = false;
  const gameOver = false;
  window.onload = function () {
    startGame();
  }
  function startGame() {
    for (let r = 0; r < ROWS; r++) {
      let row = []
      for (let c = 0; c < COLUMNS; c++) {
        let tile = <PlayCell />
      }
    }
  };
