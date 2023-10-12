import { IAllergenData } from "../Allergies.types";

export interface IProps {
  patientId: string;
  allergenName: string;
  data: IAllergenData;
  setLoadingFlag: Function;
  callBack: Function;
  panelWidth: string;
  parentData: any;
  selectedClient: any;
  sessions: any;
}
