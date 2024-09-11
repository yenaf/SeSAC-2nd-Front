import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    addrValue: {},
  },
  reducers: {
    fetchAddList: (state, action) => {
      state.addressList = action.payload;
    },
    readAddr: (state, action) => {
      state.addrValue = action.payload;
    },
  },
});

export const { fetchAddList, readAddr } = addressSlice.actions;

export default addressSlice.reducer;
