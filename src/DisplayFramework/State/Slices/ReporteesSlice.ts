import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReporteesTab } from '../../../Components/PanelComponents/ReporteesListView/ReporteesListViewHome.types';

const ReporteesSlice = createSlice({
  name: 'Reportees',
  initialState: {
    progress: 0,
    showProgress: false,
    reporteesTabs: [],
  },
  reducers: {
    setReporteesTabs: (state, action: PayloadAction<IReporteesTab[]>) => {
      state.reporteesTabs = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setShowProgress: (state, action: PayloadAction<boolean>) => {
      state.showProgress = action.payload;
    },
  },
});
export const { setProgress, setShowProgress, setReporteesTabs } = ReporteesSlice.actions;
export default ReporteesSlice.reducer;
