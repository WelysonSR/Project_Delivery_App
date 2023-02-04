import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    users: [],
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
    users(_state, user) {
      return {
        users: user.payload,
      };
    },
  },
});

export const { password, user, users } = slice.actions;

export default slice.reducer;
