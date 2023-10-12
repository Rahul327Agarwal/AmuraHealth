export interface IProps {
  conditions: Array<any>;
  setTreatedConditions: Function;
  setShowLoader: Function;
  prescriptionLength: string;
  prescriptionKey?: string;
}
