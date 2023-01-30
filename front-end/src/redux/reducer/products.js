import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'checkout',
  initialState: {
    checkout: [],
  },

  reducers: {
    checkout(_state, checkout) {
      return {
        checkout: checkout.payload,
      };
    },
  },
});

export const { checkout } = slice.actions;

export default slice.reducer;
