import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BulkReassignment = createSlice({
  name: 'BulkReassignment',
  initialState: {
    isCancedReassignment: false,
  },
  reducers: {
    setCancelRessignment: (state, action: PayloadAction<any>) => {
      state.isCancedReassignment = action.payload;
    },
  },
});
export const { setCancelRessignment } = BulkReassignment.actions;
export default BulkReassignment.reducer;
