import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSliceTemp';
import loginReducer from './loginSlice';
import navigationReducer from './navigationSlice';
import pageReducer from './pageSlice';
import addressSlice from './addressSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    navigation: navigationReducer,
    page: pageReducer,
    address: addressSlice,
  },
});

export default store;
