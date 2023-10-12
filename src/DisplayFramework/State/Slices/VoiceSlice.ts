import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const voiceSlice = createSlice({
  name: 'VoiceNote',
  initialState: {
    voiceState: '',
  },
  reducers: {
    setVoiceState: (state, action: PayloadAction<any>) => {
      state.voiceState = action.payload;
    },
  },
});
export const { setVoiceState } = voiceSlice.actions;
export default voiceSlice.reducer;
