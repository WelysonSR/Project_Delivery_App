import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: [],
  },

  reducers: {
    user(_state, user) {
      return {
        user: user.payload,
      };
    },
  },
});

export const { user } = slice.actions;

export default slice.reducer;
