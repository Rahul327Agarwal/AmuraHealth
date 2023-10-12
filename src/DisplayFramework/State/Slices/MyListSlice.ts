import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MyListSlice = createSlice({
  name: 'MyList',
  initialState: {
    myList: []
  },
  reducers: {
    setMyList: (state, action: PayloadAction<any>) => {
      state.myList = action.payload;
    },
  },
});
export const { setMyList } = MyListSlice.actions;
export default MyListSlice.reducer;
