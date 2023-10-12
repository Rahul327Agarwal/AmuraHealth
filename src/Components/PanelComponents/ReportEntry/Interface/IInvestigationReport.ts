export interface InvestigationReport {
  SidNumber?: string;
  InvestigationReportId?: string;
  InvestigationTypeId?: string;
  InvestigationTypeShortName?: string;
  InvestigationTypeLongName?: string;
  InvestigationTypeDescription?: string;
  InvestigationTypeHasUnit?: number;
  InvestigationReportSampleDate?: string;
  InvestigationReportReportDate?: string;
  InvestigationReportVendorName?: string;
  IsInvestigationReportActive?: string;

  Biomarkers?: Array<IPatientBiomarker>;
}

export interface IPatientBiomarker {
  BiomarkerId: string;
  BiomarkerShortName: string;
  BiomarkerLongName: string;
  BiomarkerDescription: string;
  BiomarkerReportValue: string;
  IsBiomarkerValueActive: number;
  BiomarkerUnitId: string;
  BiomarkerGroupId: string;
  UnitId: string;
  BiomarkerType: string;
  UnitShortName: string;
  UnitLongName: string;
  state?: string;
  isDirty?: boolean;
}

export const defaultIPatientBiomarker = {
  BiomarkerId: '',
  BiomarkerShortName: '',
  BiomarkerLongName: '',
  BiomarkerDescription: '',
  BiomarkerReportValue: '',
  IsBiomarkerValueActive: 0,
  BiomarkerUnitId: '',
  UnitId: '',
  UnitShortName: '',
  UnitLongName: '',
  BiomarkerGroupId: '',
  state: 'write',
  BiomarkerType: '',
  isDirty: true,
};
