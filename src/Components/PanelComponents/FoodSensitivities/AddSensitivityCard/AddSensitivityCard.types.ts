import { IAllSensitivities, IFoodSensitivityData } from '../FoodSensitivities.types';

export interface IProps {
  sensitivity: Array<IFoodSensitivityData>;
  AllSensitivities: IAllSensitivities[];
  onAddSensitivity: (ev: any) => void;
  loadingFlag: boolean;
  handleClose: Function;
  sessions: any;
  panelWidth: any;
}
