import { IFoodSensitivityData } from "../FoodSensitivities.types";

export interface IProps {
    patientId: string;
    sensitivityName: string;
    data: IFoodSensitivityData;
    setLoadingFlag: Function;
    callBack: Function;
    panelWidth: string;
    parentData: any;
    sessions: any;
    selectedClient: any;
}