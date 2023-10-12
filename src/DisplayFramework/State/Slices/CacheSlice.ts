import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userNames: {},
  statuses: {},
};
const CacheSlice = createSlice({
  name: 'Cache',
  initialState,
  reducers: {
    setUsernames: (state, action: PayloadAction<{ [id: string]: string }>) => {
      state.userNames = { ...state.userNames, ...action.payload };
    },
    setStatuses: (state, action: PayloadAction<{ [id: string]: string }>) => {
      state.statuses = { ...state.statuses, ...action.payload };
    },
  },
});
export const { setUsernames, setStatuses } = CacheSlice.actions;
export default CacheSlice.reducer;
