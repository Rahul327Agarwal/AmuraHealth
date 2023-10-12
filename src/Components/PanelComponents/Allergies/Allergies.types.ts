export interface IAllergens {
    patientId: string
    Allergens: Array<IAllergenData>
}
export interface IAllergen {
    [key: string]: Array<IAllergenData>
}

export interface IAllergenHistory {
    DescriptionId: string,
    UpdatedOn: string,
    Description: string
}

export interface IAllergenState {
    IdentifiedOn: string,
    CompletedOn: string,
    IsActive: any,
    UpdatedOn: string
}
export interface IAllergenData {
    AllergenId: string,
    PatientAllergenId: string,
    ShortName: string,
    AllergenName: string,
    AllergenDescription: string,
    States: Array<IAllergenState>,
    Descriptions: Array<IAllergenHistory>,
    CurrentState: IAllergenState
}
export interface IAllAllergen {
    AllergenId: string,
    ShortName: string,
    LongName: string
}

export interface IState {
    data: IAllergens,
    allAllergens: IAllAllergen[],
    loadingFlag: boolean,
    openAdd: boolean
}

const emptyAllergen = (): IAllergens => ({
    patientId: "",
    Allergens: []
});
export const EmptyAllergen = emptyAllergen();

export interface IProps {
    injectComponent: any;
    patientId: string,
    panel: any
    registerEvent: any,
    unRegisterEvent: any,
    selectedClient: any,
    sessions: any
}
