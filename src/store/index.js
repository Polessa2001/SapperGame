import { createSlice, configureStore } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: {
    cheese: cheeseSlice.reducer
  }
});
export const cheeseActions = cheeseSlice.actions;
export default store;
