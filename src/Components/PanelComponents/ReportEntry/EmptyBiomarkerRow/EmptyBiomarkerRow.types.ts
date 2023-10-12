import { IPatientBiomarker } from "../Interface/IInvestigationReport";
export interface IProps {
  index: number;
  patientBiomarker: IPatientBiomarker;
  editPatientBiomarker(index: number): void;
  deletePatientBiomarker(index: number): void;
  editReport: boolean
}
