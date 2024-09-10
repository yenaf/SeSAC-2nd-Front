import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
  },
  reducers: {
    fetchAddList: (state, action) => {
      state.addressList = action.payload;
    },
  },
});

export const { fetchAddList } = addressSlice.actions;

export default addressSlice.reducer;
