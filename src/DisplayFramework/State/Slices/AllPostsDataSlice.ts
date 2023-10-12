import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const AllPostDataSlice = createSlice({
  name: 'AllPostData',
  initialState: {
    storeData: {
      type: '',
      headerText: '',
      msgMapper: '',
      action: 'ADD',
      message: '',
      placeHolderText: '',
    },
    tenantId: '',
    uniqueId: '',
    uniqueType: '',
    disableSend: false,
    responseType: '',
    datalist: [],
    disabledbutton: false,
    disabledprePreviewbutton: false,
    disabledaddBtnInList: false,
    disabledaddBtnInLMS: false,
    disabledaddBtnInPolls: false,
    disabledaddBtnInQMT: false,
    disabledaddtBtnInPreview: false,
    snippetStartTime: null,
    snippetCloseTime: null,
    previewDataInRedux: [],
  },
  reducers: {
    setStoreData: (state, action: PayloadAction<any>) => {
      state.storeData = action.payload;
    },
    setUniqueId: (state, action: PayloadAction<string>) => {
      state.uniqueId = action.payload;
    },
    setTenantId: (state, action: PayloadAction<string>) => {
      state.tenantId = action.payload;
    },
    setUniqueType: (state, action: PayloadAction<string>) => {
      state.uniqueType = action.payload;
    },
    setDisableSend: (state, action: PayloadAction<any>) => {
      state.disableSend = action.payload;
    },
    setDisabledButton: (state, action: PayloadAction<any>) => {
      state.disabledbutton = action.payload;
    },
    setprePreviewDisabledButton: (state, action: PayloadAction<any>) => {
      state.disabledprePreviewbutton = action.payload;
    },
    setResponseType: (state, action: PayloadAction<any>) => {
      state.responseType = action.payload;
    },
    setDataList: (state, action: PayloadAction<any>) => {
      state.datalist = action.payload;
    },
    setDisabledaddBtnInList: (state, action: PayloadAction<any>) => {
      state.disabledaddBtnInList = action.payload;
    },
    setDisabledaddBtnInLMS: (state, action: PayloadAction<any>) => {
      state.disabledaddBtnInLMS = action.payload;
    },
    setDisabledaddBtnInPolls: (state, action: PayloadAction<any>) => {
      state.disabledaddBtnInPolls = action.payload;
    },
    setDisabledaddBtnInQMT: (state, action: PayloadAction<any>) => {
      state.disabledaddBtnInQMT = action.payload;
    },
    setDisabledaddtBtnInPreview: (state, action: PayloadAction<any>) => {
      state.disabledaddtBtnInPreview = action.payload;
    },
    setSnippetStartTime: (state, action: PayloadAction<any>) => {
      state.snippetStartTime = action.payload;
    },
    setSnippetCloseTime: (state, action: PayloadAction<any>) => {
      state.snippetCloseTime = action.payload;
    },
    setPreviewDataInRedux: (state, action: PayloadAction<any>) => {
      state.previewDataInRedux = action.payload;
    },
  },
});
export const {
  setStoreData,
  setUniqueId,
  setUniqueType,
  setDisableSend,
  setTenantId,
  setResponseType,
  setDataList,
  setDisabledButton,
  setDisabledaddBtnInLMS,
  setDisabledaddBtnInPolls,
  setDisabledaddBtnInQMT,
  setprePreviewDisabledButton,
  setDisabledaddBtnInList,
  setDisabledaddtBtnInPreview,
  setSnippetCloseTime,
  setSnippetStartTime,
  setPreviewDataInRedux,
} = AllPostDataSlice.actions;
export default AllPostDataSlice.reducer;
