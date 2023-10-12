import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PostCollectionSlice = createSlice({
  name: 'PostCollection',
  initialState: {
    postCollectionMsgData: {
      type: '',
      headerText: '',
      msgMapper: '',
      action: 'ADD',
      message: '',
    },
    postCollectionId: '',
    disableSend: false,
    responseType: '',
    postCollectionList: [],
  },
  reducers: {
    setPostCollectionMsgData: (state, action: PayloadAction<any>) => {
      state.postCollectionMsgData = action.payload;
    },
    setPostCollectionId: (state, action: PayloadAction<string>) => {
      state.postCollectionId = action.payload;
    },
    setResponseType: (state, action: PayloadAction<any>) => {
      state.responseType = action.payload;
    },
    setDisableSend: (state, action: PayloadAction<any>) => {
      state.disableSend = action.payload;
    },
    setPostList: (state, action: PayloadAction<any>) => {
      state.postCollectionList = action.payload;
    },
  },
});
export const { setPostCollectionMsgData, setPostCollectionId, setDisableSend, setResponseType, setPostList } =
  PostCollectionSlice.actions;
export default PostCollectionSlice.reducer;
