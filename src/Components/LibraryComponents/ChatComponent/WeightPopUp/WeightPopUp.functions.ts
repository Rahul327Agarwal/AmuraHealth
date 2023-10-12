import { Dispatch, SetStateAction } from 'react';
import { ISelectedClient, ISession } from '../../../../Common/Common.types';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import { IHistoryData, IWeightUnitTypes } from './WeightPopUp.types';

export const getProfileKeysHistoryData = async (
  panelId: string,
  sessions: ISession,
  selectedClient: ISelectedClient,
  keyName: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const payload = {
      tenantId: selectedClient.tenant_id,
      userId: selectedClient.client_id,
      keyName,
      url: import.meta.env.VITE_GET_PROFILE_KEYS_HISTORY,
      token: sessions.id_token,
      method: 'POST',
    };
    const response = await PMS_S3.postData(payload);
    if (!response.Error) {
      return response;
    }
  } catch (error) {
    ErrorToaster(error, panelId, 'error');
    console.error(error);
    return [];
  } finally {
    setIsLoading(false);
  }
};

export const dataConveriosnAndDataCehck = (data: IHistoryData[], WEIGHT_UNIT_OPTIONS: any) => {
  let modifiedData = WEIGHT_UNIT_OPTIONS.reduce((acc, units) => {
    acc[units.value] = [];
    return acc;
  }, {});
  (data || []).forEach((item) => {
    if (item.before || item.after) {
      modifiedData[WEIGHT_UNIT_OPTIONS[0].value].push({
        before: convetingValuesBasedOnUnits(item.before, 'kgs'),
        after: convetingValuesBasedOnUnits(item.after, 'kgs'),
        updatedOn: item.updatedOn,
      });
      modifiedData[WEIGHT_UNIT_OPTIONS[1].value].push({
        before: convetingValuesBasedOnUnits(item.before, 'lbs'),
        after: convetingValuesBasedOnUnits(item.after, 'lbs'),
        updatedOn: item.updatedOn,
      });
      return true;
    }
    return true;
  });
  return modifiedData;
};

export const convetingValuesBasedOnUnits = (weightValue: string, convetedUnit: string) => {
  if (!weightValue.trim()) return weightValue.trim();
  let weightValueUnit = weightValue.split(' ')[1] || convetedUnit;
  let weightValueOnly = Number(weightValue.split(' ')[0] || 0);
  if (convetedUnit === 'kgs') {
    if (weightValueUnit === 'lbs') {
      weightValueOnly = weightValueOnly * 0.453592;
    }
    return numberUnitlFirstDecimalPoint(weightValueOnly, convetedUnit);
  } else {
    if (weightValueUnit === 'kgs') {
      weightValueOnly = weightValueOnly * 2.20462;
    }
    return numberUnitlFirstDecimalPoint(weightValueOnly, convetedUnit);
  }
};

export const numberUnitlFirstDecimalPoint = (value, unitChange) => {
  if (Number.isInteger(value)) {
    return value;
  } else {
    let digitsShows = unitChange === 'lbs' ? 2 : 1;
    let decimalValue = value.toFixed(digitsShows);
    return Number(decimalValue);
  }
};
export const convertInputValues = (value, unit) => {
  if (unit === 'kgs') {
    return numberUnitlFirstDecimalPoint(value * 0.453592, unit);
  } else {
    return numberUnitlFirstDecimalPoint(value * 2.20462, unit);
  }
};
export const generateValuesForAllUnitsExceptCurrent = (value: string, allUnits: string[], currentUnit: string) => {
  let newValues = {};
  if (!value) {
    allUnits.forEach((unit) => (newValues[unit] = ''));
  } else {
    allUnits.forEach((unit) => {
      if (unit !== currentUnit) {
        newValues[unit] = convertInputValues(value, unit);
      } else {
        newValues[unit] = value;
      }
    });
  }
  return newValues;
};
