import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'Status',
  initialState: {
    statusCollection: {},
  },
  reducers: {
    setStatusCollection: (state, action: PayloadAction<any>) => {
      state.statusCollection = action.payload;
    },
  },
});
export const { setStatusCollection } = statusSlice.actions;
export default statusSlice.reducer;
