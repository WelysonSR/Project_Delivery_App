import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
  },

  reducers: {
    user(state, email) {
      return {
        ...state,
        email: email.payload,
      };
    },
    password(state, password) {
      return {
        ...state,
        password: password.payload,
      };
    },
  },
});

export const { password, user } = slice.actions;

export default slice.reducer;
