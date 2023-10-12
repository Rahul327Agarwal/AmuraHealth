import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BlueDotsViewSlice = createSlice({
  name: 'BlueDotsView',
  initialState: {
    userBlueDotsInfo: {
      patientName:'',
      blueDots:[]
    },
  },
  reducers: {
    setUserBlueDotInfo: (state, action: PayloadAction<any>) => {
      state.userBlueDotsInfo = action.payload;
    },
  },
});
export const { setUserBlueDotInfo } = BlueDotsViewSlice.actions;
export default BlueDotsViewSlice.reducer;
