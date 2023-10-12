import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const calenderSliderSlice = createSlice({
  name: 'CalenderSlider',
  initialState: {
    eventOpacity: 0.3,
    reporteeEventOpacity: 0.3,
  },
  reducers: {
    setEventOpacity: (state, action: PayloadAction<any>) => {
      state.eventOpacity = action.payload;
    },
    setReporteeEventOpacity: (state, action: PayloadAction<any>) => {
      state.reporteeEventOpacity = action.payload;
    },
  },
});
export const { setEventOpacity, setReporteeEventOpacity } = calenderSliderSlice.actions;
export default calenderSliderSlice.reducer;
