import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const ChatScrollSlice = createSlice({
  name: 'ChatScroll',
  initialState: {
    scrollIconStatus: false,
    currentUserResponse: {},
  },
  reducers: {
    setScrollIconStatus: (state, action: PayloadAction<any>) => {
      state.scrollIconStatus = action.payload;
    },
    setCurrentUserResponse: (state, action: PayloadAction<any>) => {
      state.currentUserResponse = action.payload;
    },
  },
});
export const { setScrollIconStatus, setCurrentUserResponse } = ChatScrollSlice.actions;
export default ChatScrollSlice.reducer;
