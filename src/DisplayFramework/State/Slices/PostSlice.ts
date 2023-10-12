import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PostSlice = createSlice({
  name: 'Post',
  initialState: {
    postMsgData: {
      type: '',
      headerText: '',
      msgMapper: '',
      action: 'ADD',
      message: '',
    },
    postId: '',
    postRefresh: '',
    disableSend: false,
    disabledbutton: false,
    responseType: '',
    postList: [],
  },
  reducers: {
    setPostMsgData: (state, action: PayloadAction<any>) => {
      state.postMsgData = action.payload;
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    setPostRefresh: (state, action: PayloadAction<string>) => {
      state.postRefresh = action.payload;
    },
    setDisableAttachmentSend: (state, action: PayloadAction<any>) => {
      state.disableSend = action.payload;
    },
    setDisabledButton: (state, action: PayloadAction<any>) => {
      state.disabledbutton = action.payload;
    },
    setResponseType: (state, action: PayloadAction<any>) => {
      state.responseType = action.payload;
    },
    setPostList: (state, action: PayloadAction<any>) => {
      state.postList = action.payload;
    },
  },
});
export const {
  setPostMsgData,
  setPostId,
  setPostRefresh,
  setDisableAttachmentSend,
  setResponseType,
  setDisabledButton,
  setPostList,
} = PostSlice.actions;
export default PostSlice.reducer;
