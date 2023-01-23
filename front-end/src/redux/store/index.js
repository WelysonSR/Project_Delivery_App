import { configureStore } from '@reduxjs/toolkit';
import login from '../reducer/login';

const store = configureStore({
  reducer: {
    login,
  },
});

export default store;
