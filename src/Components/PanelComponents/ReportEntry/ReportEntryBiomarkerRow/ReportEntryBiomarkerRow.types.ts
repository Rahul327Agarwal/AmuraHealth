import { IBiomarker } from '../Interface/IBiomarker';
import { IPatientBiomarker } from '../Interface/IInvestigationReport';
import { IUnits, IUnit } from '../Interface/IUnit';
export interface IProps {
  index: number;
  biomarkers?: Array<IBiomarker>;
  patientBiomarker: IPatientBiomarker;
  patientBiomarkers?: Array<IPatientBiomarker>;
  defaultUnitId: string;
  defaultBioMarkerId: string;
  defaultBioMarkerGroupId: string;
  cmpstate: string;
  addPatientBiomarker(biomarker: IPatientBiomarker, index: number): void;
  updateBiomarker(biomarker: IPatientBiomarker, index: number): void;
  sessions: any;
  selectedClient: any;
  defaultBioMarkerDisplayName: string;
}

export interface option {
  value: string;
  label: string;
  group: string;
}
export interface groupoptions {
  label: string;
  options: Array<option>;
}
export interface IState {
  selectedUnitId: string;
  selectedBiomarkerId: string;
  selectedBiomarkerGroupId: string;
  reportValue: string;
  biomarkers?: Array<IBiomarker>;
  units?: Array<IUnit>;
  unitsOptions: Array<option>;
  patientBiomarker: IPatientBiomarker;
  cmpstate: string;
  error: string;
}
