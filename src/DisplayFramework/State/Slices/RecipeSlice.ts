import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITempFilter } from '../../../Components/PanelComponents/RecipeHome/RecipeHome.types';
// import { IReporteesTab } from '../../../Components/PanelComponents/ReporteesListView/ReporteesListViewHome.types';

const RecipeSlice = createSlice({
  name: 'Recipe',
  initialState: {
    tempFilters: { sliderValue: 30, diet: [], filters: [] },
    diet: [],
    rangeSliderValue: 30,
  },
  reducers: {
    setTempFilters: (state, action: PayloadAction<ITempFilter>) => {
      state.tempFilters = action.payload;
    },
    setDiet: (state, action: PayloadAction<string[]>) => {
      state.diet = action.payload;
    },
    setRangeSliderValue: (state, action: PayloadAction<number>) => {
      state.rangeSliderValue = action.payload;
    },
  },
});
export const { setTempFilters, setDiet, setRangeSliderValue } = RecipeSlice.actions;
export default RecipeSlice.reducer;
