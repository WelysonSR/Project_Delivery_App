import { configureStore } from '@reduxjs/toolkit';
import login from '../reducer/login';
import products from '../reducer/products';

const store = configureStore({
  reducer: {
    login,
    products,
  },
});

export default store;
