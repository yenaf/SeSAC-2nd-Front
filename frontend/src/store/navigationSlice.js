import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    previousUrl: '',
  },
  reducers: {
    setPreviousUrl: (state, action) => {
      state.previousUrl = action.payload;
    },
  },
});

export const { setPreviousUrl } = navigationSlice.actions;
export default navigationSlice.reducer;
