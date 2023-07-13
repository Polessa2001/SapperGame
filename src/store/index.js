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

// MINES PART //

const initialMinesState = {
  amountOfMines: 5,
  minesLocation: ["2-2"]
}
const minesSlice = createSlice({
  name: 'mines',
  initialState: initialMinesState,
  reducers: {
    setMines(state) {
      state.minesLocation.push("2-2");
      state.minesLocation.push("2-3");
      state.minesLocation.push("5-6");
      state.minesLocation.push("3-4");
      state.minesLocation.push("1-1");
    },
    decrementMines(state) {
      state.amountOfMines--;
    },
    incrementMines(state) {
      state.amountOfMines++;
    }
  }
})

// STORE //

const store = configureStore({
  reducer: {
    cheese: cheeseSlice.reducer,
    mines: minesSlice.reducer,
    game: gameSlice.reducer
  }
});

export const gameActions = gameSlice.actions;
export const cheeseActions = cheeseSlice.actions;
export const minesActions = minesSlice.actions;
export default store;
