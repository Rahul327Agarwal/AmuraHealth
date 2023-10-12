import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const RolesDataSlice = createSlice({
  name: 'RolesData',
  initialState: {
    disabledbutton: false,
    isEditOpen: false,
  },
  reducers: {
    setDisabledButton: (state, action: PayloadAction<any>) => {
      state.disabledbutton = action.payload;
    },
    setIsEditOpen: (state, action: PayloadAction<any>) => {
      state.isEditOpen = action.payload;
    },
  },
});
export const { setDisabledButton, setIsEditOpen } = RolesDataSlice.actions;
export default RolesDataSlice.reducer;
