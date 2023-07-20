import { createSlice, configureStore } from '@reduxjs/toolkit';
// INITIAL GAME CONDITIONS //
const startGame = {
  rows: 8,
  columns: 8,
  gameOver: false,
  isOpen: 0,
  resetdata: false
}
const gameSlice = createSlice({
  name: 'game',
  initialState: startGame,
  reducers: {
    failGame(state) {
      state.gameOver = !state.gameOver;
      alert("GAME OVER");
    },

    incrementIsOpen(state) {
      state.isOpen++;
    },
    resetGame(state) {
      state.rows = startGame.rows;
      state.columns = startGame.columns;
      state.gameOver = startGame.gameOver;
      state.isOpen = startGame.isOpen;
      state.resetData = !startGame.resetData;
    }
  }
});


// CHEESE BUTTON PART //

const initialCheeseButtonState = {
  cheeseIsActive: false
}

const cheeseSlice = createSlice({
  name: 'cheese',
  initialState: initialCheeseButtonState,
  reducers: {
    toggle(state) {
      state.cheeseIsActive = !state.cheeseIsActive;
    }
  }
});

const initialMinesState = {
  amountOfMines: 7,
  minesLocation: [],
  bombIsFound: false,
  minesLeft: 7,
  gameStarted:false,
}
const minesSlice = createSlice({
  name: 'mines',
  initialState: initialMinesState,
  reducers: {
    setInitial(state) {
      while (state.minesLeft > 0) {
        let r = Math.floor(Math.random() * 8);
        let c = Math.floor(Math.random() * 8);
        let id = r.toString() + "-" + c.toString();
        if (!state.minesLocation.includes(id)) {
          state.minesLocation.push(id);
          state.minesLeft--;
        }
      }
      state.amountOfMines = 7;
      state.gameStarted = !state.gameStarted;
    },
    decrementMines(state) {
      state.amountOfMines--;
    },

    incrementMines(state) {
      state.amountOfMines++;
    },

    revealMines(state) {
      state.bombIsFound = true;
    },
  }
})

// STORE //

const store = configureStore({
  reducer: {
    cheese: cheeseSlice.reducer,
    mines: minesSlice.reducer,
    game: gameSlice.reducer,
  }
});

export const gameActions = gameSlice.actions;
export const cheeseActions = cheeseSlice.actions;
export const minesActions = minesSlice.actions;
export default store;
