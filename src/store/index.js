import { createSlice, configureStore } from '@reduxjs/toolkit';
// INITIAL GAME CONDITIONS //
const startGame = {
  rows: 8,
  columns: 8,
  gameOver: false,
}
const gameSlice = createSlice({
  name: 'game',
  initialState: startGame,
  reducers: {
    failGame(state) {
      state.gameOver = !state.gameOver;
      alert("GAME OVER");
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
  minesLocation: ["2-1","2-2","5-2","6-4","4-2","2-1","3-3"],
  bombIsFound: false,
  minesLeft: 7,
}
const minesSlice = createSlice({
  name: 'mines',
  initialState: initialMinesState,
  reducers: {
    setMines(state) {
      while (state.minesLeft > 0) {
        let r = Math.floor(Math.random() * 8);
        let c = Math.floor(Math.random() * 8);
        let id = r.toString() + "-" - c.toString();
        if (!state.minesLocation.includes(id)) {
          state.minesLocation.push(id);
          state.minesLeft -= 1;
        }
      }
    },

    decrementMines(state) {
      state.amountOfMines--;
    },

    incrementMines(state) {
      state.amountOfMines++;
    },

    revealMines(state) {
      state.bombIsFound = true;
    }
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
