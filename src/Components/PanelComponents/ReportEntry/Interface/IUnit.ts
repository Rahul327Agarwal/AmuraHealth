export interface IUnits {
  BiomarkerId?: string;
  Units?: Array<IUnit>;
}

export interface IUnit {
  UnitId: string;
  UnitShortName: string;
  UnitLongName: string;
}

export interface IVendor {
  Name: string;
}
