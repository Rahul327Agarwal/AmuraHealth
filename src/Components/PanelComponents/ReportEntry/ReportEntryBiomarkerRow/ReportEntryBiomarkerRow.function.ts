import ErrorToaster from './../../../../Common/ErrorToaster';
import { IBiomarker, IBiomarkers } from '../Interface/IBiomarker';
import { IPatientBiomarker } from '../Interface/IInvestigationReport';
import { IUnit, IUnits } from '../Interface/IUnit';
import { groupoptions, option } from './ReportEntryBiomarkerRow.types';

export const constructBiomarker = (
  selectedBiomarkerId: string,
  selectedUnitId: string,
  reportValue: string,
  selectedBiomarkerGroupId: string,
  index: any,
  addPatientBiomarker: (arg0: IPatientBiomarker, arg1: any) => void,
  updateBiomarker: (arg0: IPatientBiomarker, arg1: any) => void,
  patientBiomarker: any,
  units: IUnit[],
  biomarkers: IBiomarker[],
  displayName: string,
  typeofBiomarker: string
) => {
  if (areUnitAndBiomarkerSelected(selectedBiomarkerId, selectedUnitId)) {
    let unit: Array<IUnit> = [];
    let biomarker: Array<IBiomarker> = [];
    units?.forEach((unitRec: IUnit) => {
      if (unitRec.UnitId === selectedUnitId) {
        unit.push(unitRec);
      }
    });

    biomarkers?.forEach((bioRec: IBiomarker) => {
      if (bioRec.Id === selectedBiomarkerId && bioRec.DisplayName === displayName) {
        biomarker.push(bioRec);
      }
    });

    let updatedBiomarkerRec: IPatientBiomarker = createIPatientBiomarker(
      patientBiomarker.state,
      biomarker,
      reportValue,
      selectedBiomarkerGroupId,
      typeofBiomarker,
      unit
    );
    if (updatedBiomarkerRec.state === 'edit') {
      updateBiomarker(updatedBiomarkerRec, index);
    } else {
      addPatientBiomarker(updatedBiomarkerRec, index);
    }
  }
};

export const getBioMarkerOptions = (props: any) => {
  const biomarkerOptions: any = [];
  props.biomarkers.map((item: { Id: any }) => {
    if (!props.patientBiomarkers?.find((i: { BiomarkerId: any }) => i.BiomarkerId === item.Id)) {
      biomarkerOptions.push(item);
    }
  });
  return biomarkerOptions;
};

const transformUnits = (biomarker: IBiomarker, isDefault: number): Array<IUnit> => {
  return biomarker.Units?.filter((x) => x.IsDefaultUnit === isDefault)?.map((x) => {
    return {
      UnitId: x.Id,
      UnitShortName: x.ShortName,
      UnitLongName: x.LongName,
    };
  });
};

const getUnitForBiomarker = (biomarkerId: string, allBiomarkers: IBiomarker[]): IUnits => {
  let biomarker: any = allBiomarkers?.find((x: IBiomarker) => x.Id === biomarkerId);
  if (biomarker) {
    let defaultUnits = transformUnits(biomarker, 1);
    let otherUnits = transformUnits(biomarker, 0);
    return {
      BiomarkerId: biomarkerId,
      Units: [...defaultUnits, ...otherUnits],
    };
  }
  return {
    BiomarkerId: biomarkerId,
    Units: [],
  };
};

export const getUnitOptions = async (
  panelId: string,
  selectedBiomarkerId: string,
  allBiomarkers: IBiomarker[],
  setUnitOptions: any,
  setUnits: any,
  setSelectedUnitId: Function,
  sessions: any,
  selectedClient: any
) => {
  let unitData: IUnits = getUnitForBiomarker(selectedBiomarkerId, allBiomarkers) ?? {};
  const options: Array<option> = [];
  const units = unitData && unitData.Units ? unitData.Units : [];
  units.forEach((lang: IUnit) => {
    options.push({
      value: lang.UnitId,
      label: lang.UnitShortName,
      group: '',
    });
  });
  setUnitOptions(options);
  setUnits(units);
  if (options.length > 0) {
    setSelectedUnitId(options[0].value);
  }
  if (options.length === 0 && selectedBiomarkerId != '') {
    ErrorToaster('Units are not available.', panelId, 'error');
  }
};

export const onbioMarkerSelect = (
  panelId: string,
  selectedOption: any,
  setSelectedBiomarkerGroupId: any,
  setSelectedBiomarkerId: any,
  setUnitOptions: any,
  setUnits: any,
  biomarkers: IBiomarker[],
  patientBiomarkers: any,
  setSelectedUnitId: any,
  sessions: any,
  selectedClient: any,
  setDisplayName: any,
  setTypeOfBiomarker: any
) => {
  setSelectedBiomarkerGroupId(selectedOption.BiomarkerGroupName);
  setSelectedBiomarkerId(selectedOption.Id);
  setTypeOfBiomarker(selectedOption.Type || '');
  setDisplayName(selectedOption.DisplayName || '');
  getUnitOptions(panelId, selectedOption.Id, biomarkers, setUnitOptions, setUnits, setSelectedUnitId, sessions, selectedClient);
};

export function getSelectedItem(
  selectedBiomarkerId: string,
  selectedBiomarkerGroupId: string,
  biomarkers: any[],
  displayName: string
) {
  const item = biomarkers.find((opt: { Id: any; BiomarkerGroupName: any; DisplayName: any }) => {
    if (opt.Id === selectedBiomarkerId && opt.BiomarkerGroupName === selectedBiomarkerGroupId && opt.DisplayName === displayName)
      return opt;
  });
  return item || { Id: '', BiomarkerGroupName: '' };
}

export const createIPatientBiomarker = (
  oldState: any,
  biomarker: Array<any>,
  reportValue: string,
  typeofBiomarker: string,
  selectedBiomarkerGroupId: string,
  unit: Array<any>
): IPatientBiomarker => {
  return {
    BiomarkerId: biomarker[0]?.Id,
    BiomarkerShortName: biomarker[0]?.ShortName,
    BiomarkerLongName: biomarker[0]?.DisplayName,
    BiomarkerDescription: biomarker[0]?.Description,
    BiomarkerReportValue: reportValue,
    BiomarkerType: typeofBiomarker,
    BiomarkerGroupId: selectedBiomarkerGroupId,
    IsBiomarkerValueActive: 0,
    BiomarkerUnitId: unit[0].UnitId,
    UnitId: unit[0].UnitId,
    UnitShortName: unit[0].UnitShortName,
    UnitLongName: unit[0].UnitLongName,
    state: oldState,
    isDirty: true,
  };
};

const areUnitAndBiomarkerSelected = (selectedBiomarkerId: string, selectedUnitId: string): boolean => {
  return selectedUnitId &&
    selectedBiomarkerId &&
    selectedUnitId.trim() &&
    selectedBiomarkerId.trim() &&
    selectedUnitId.trim() !== 'Select unit' &&
    selectedBiomarkerId.trim() !== 'Select biomarker'
    ? true
    : false;
};
