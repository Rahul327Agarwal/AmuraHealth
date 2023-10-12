import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BranchingSlice = createSlice({
  name: 'Branching',
  initialState: {
    BranchingCardData: {
      heading: '',
      description: '',
      postId: '',
      postType: '',
      branching: [],
      subCollectionId: '',
    },
  },
  reducers: {
    setBranchingCardData: (state, action: PayloadAction<any>) => {
      state.BranchingCardData = action.payload;
    },
  },
});
export const { setBranchingCardData } = BranchingSlice.actions;
export default BranchingSlice.reducer;
