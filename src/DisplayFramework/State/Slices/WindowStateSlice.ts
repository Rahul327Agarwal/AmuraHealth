import { createSlice } from '@reduxjs/toolkit';

export interface MyListState {}

const windowStateSlice = createSlice({
  name: 'WindowState',
  initialState: {
    windows: {
      uniqueIds: [],
    },
  },
  reducers: {},
});
export default windowStateSlice.reducer;
