import { IAllAllergen, IAllergenData } from "../Allergies.types";

export interface IProps {
  Allergens: Array<IAllergenData>;
  AllAllergens: IAllAllergen[];
  onAddAlergen: (ev: any) => void;
  loadingFlag: boolean;
  handleClose: Function;
  panelWidth: any;
}
