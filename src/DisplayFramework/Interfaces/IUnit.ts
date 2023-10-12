
export interface IUnit{
    UnitId: string;
    UnitShortName: string;
    UnitLongName: string;
    constant?: number;
}

export interface IUnitConversion{
    biomarkerUnits: Array<IBiomarker>
}

export interface IBiomarker{
    biomarkerId: string;
    units: Array<IUnit>
}
