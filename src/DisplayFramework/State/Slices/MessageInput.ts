import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MessageInput = createSlice({
  name: "MessageInput",
  initialState: {
    MessageInputData: [],
    currentIndex:0,
  },
  reducers: {
    setMessageInputData: (state, action: PayloadAction<any>) => {
      state.MessageInputData = action.payload;
    },
    setIndexData: (state, action: PayloadAction<any>) => {
      state.currentIndex = action.payload;
    },

  },
});
export const { setMessageInputData, setIndexData } =
  MessageInput.actions;
export default MessageInput.reducer;
