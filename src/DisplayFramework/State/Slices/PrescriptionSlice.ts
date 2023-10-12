import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const PrescriptionSlice = createSlice({
  name: 'Prescription',
  initialState: {
    prescriptionFileName: '',
    appliedConditionsPrescription: [],
    appliedProductsPrescription: [],
    appliedAmbroProducts: [],
    isProtocolsLoaded: false,
    prescriptionHistory: {} as any,
    isPreviewDisabled: true,
    treatedProducts: [],
    treatedConditions: [],
    prescriptionLength: `${import.meta.env.VITE_DEFAULT_PRESCRIPTION_DAYS}`,
    isPrescriptionApproved: false,
    patientId: '',
  },
  reducers: {
    setAppliedConditionsPrescription: (state, action: PayloadAction<any>) => {
      state.appliedConditionsPrescription = action.payload;
    },
    setAppliedProductsPrescription: (state, action: PayloadAction<any>) => {
      state.appliedProductsPrescription = action.payload;
    },
    setAppliedAmbroProducts: (state, action: PayloadAction<any>) => {
      state.appliedAmbroProducts = action.payload;
    },
    setIsProtocolsLoaded: (state, action: PayloadAction<any>) => {
      state.isProtocolsLoaded = action.payload;
    },
    setPrescriptionHistory: (state, action: PayloadAction<any>) => {
      state.prescriptionHistory = action.payload;
    },
    setIsPreviewDisabled: (state, action: PayloadAction<any>) => {
      state.isPreviewDisabled = action.payload;
    },
    setPrescriptionFileName: (state, action: PayloadAction<any>) => {
      state.prescriptionFileName = action.payload;
    },
    setTreatedConditions: (state, action: PayloadAction<any>) => {
      state.treatedConditions = action.payload;
    },
    setTreatedProducts: (state, action: PayloadAction<any>) => {
      state.treatedProducts = action.payload;
    },
    setPrescriptionLength: (state, action: PayloadAction<any>) => {
      state.prescriptionLength = action.payload;
    },
    setIsPrescriptionApproved: (state, action: PayloadAction<any>) => {
      state.isPrescriptionApproved = action.payload;
    },
    resetPrescription: (state, action: PayloadAction<any>) => {
      state.patientId = action.payload;
      state.prescriptionFileName = '';
      state.appliedConditionsPrescription = [];
      state.appliedProductsPrescription = [];
      state.isProtocolsLoaded = false;
      state.prescriptionHistory = {} as any;
      state.isPreviewDisabled = true;
      state.treatedProducts = [];
      state.treatedConditions = [];
      state.prescriptionLength = `${import.meta.env.VITE_DEFAULT_PRESCRIPTION_DAYS}`;
      state.isPrescriptionApproved = false;
    },
  },
});
export const {
  setAppliedConditionsPrescription,
  setAppliedProductsPrescription,
  setIsProtocolsLoaded,
  setPrescriptionHistory,
  setIsPreviewDisabled,
  setPrescriptionFileName,
  setTreatedConditions,
  setTreatedProducts,
  setPrescriptionLength,
  setIsPrescriptionApproved,
  resetPrescription,
  setAppliedAmbroProducts,
} = PrescriptionSlice.actions;
export default PrescriptionSlice.reducer;
