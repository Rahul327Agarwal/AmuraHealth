import { InvestigationReport } from './IInvestigationReport';

export interface IResult {
  Biomarker: IBiomarkers;
  InvestigationReport: InvestigationReport;
}

export interface IBiomarkers {
  Biomarkers?: Array<IBiomarker>;
}

export interface IBiomarker {
  Id: string;
  ShortName: string;
  LongName: string;
  Description: string;
  DisplayName: string;
  Type: string;
  Units: Array<IUnit>;
  BiomarkerGroupName: string;
}

export interface IUnit {
  Id: string;
  LongName: string;
  ShortName: string;
  IsDefaultUnit: number;
}
