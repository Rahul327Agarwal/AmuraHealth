import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILabs } from '../../../Components/PanelComponents/ReportEntry/Interface/ILabs';

const InvestigationEntrySlice = createSlice({
  name: 'Investigation',
  initialState: {
    loadingFlag: true,
    labs: { Vendors: [] },
    investigationReport: {
      SidNumber: '',
      InvestigationReportId: '',
      InvestigationTypeId: '',
      InvestigationTypeShortName: '',
      InvestigationTypeLongName: '',
      InvestigationTypeDescription: '',
      InvestigationTypeHasUnit: 0,
      InvestigationReportSampleDate: '',
      InvestigationReportReportDate: '',
      InvestigationReportVendorName: '',
      IsInvestigationReportActive: '',
      Biomarkers: [],
    },
    biomarker: {
      Biomarkers: [],
    },
    filesList: [],
    editReport: false,
  },
  reducers: {
    setLoadingFlag: (state, action: PayloadAction<boolean>) => {
      state.loadingFlag = action.payload;
    },
    setLabs: (state, action: PayloadAction<ILabs>) => {
      state.labs = action.payload as any;
    },
    setInvestigationReport: (state, action: PayloadAction<any>) => {
      state.investigationReport = action.payload;
    },
    setBiomarker: (state, action: PayloadAction<any>) => {
      state.biomarker = action.payload;
    },
    setFilesList: (state, action: PayloadAction<any[]>) => {
      state.filesList = action.payload as any;
    },
    setEditReport: (state, action: PayloadAction<boolean>) => {
      state.editReport = action.payload;
    },
    resetInvestigationreport: (state, action: PayloadAction<any>) => {
      state.investigationReport = {
        SidNumber: '',
        InvestigationReportId: '',
        InvestigationTypeId: '',
        InvestigationTypeShortName: '',
        InvestigationTypeLongName: '',
        InvestigationTypeDescription: '',
        InvestigationTypeHasUnit: 0,
        InvestigationReportSampleDate: '',
        InvestigationReportReportDate: '',
        InvestigationReportVendorName: '',
        IsInvestigationReportActive: '',
        Biomarkers: [],
      };
      state.biomarker = {
        Biomarkers: [],
      };
      state.filesList = [];
      state.editReport = false;
    },
  },
});
export const {
  setLoadingFlag,
  setLabs,
  setInvestigationReport,
  setBiomarker,
  setFilesList,
  setEditReport,
  resetInvestigationreport,
} = InvestigationEntrySlice.actions;
export default InvestigationEntrySlice.reducer;
