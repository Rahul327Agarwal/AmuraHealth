import { Dispatch, SetStateAction } from 'react';
import { ISelectedClient, ISession } from '../../../../Common/Common.types';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';

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

interface IConversionParams {
  value: number;
  fromUnit: string;
  toUnit: string;
}

export const convertGlucose = ({ value, fromUnit, toUnit }: IConversionParams) => {
  if (fromUnit !== 'mg/dL' && fromUnit !== 'mmol/L') return;
  if (toUnit !== 'mg/dL' && toUnit !== 'mmol/L') return;

  let conversionFactor = 1;
  if (fromUnit === 'mg/dL' && toUnit === 'mmol/L') {
    conversionFactor = 0.0555;
    return (value * conversionFactor).toFixed(1);
  }
  if (fromUnit === 'mmol/L' && toUnit === 'mg/dL') {
    conversionFactor = 18.0182;
  }
  return Number(value * conversionFactor);
};

// if there is a meaning value after decimal only then keep the decimal
export const formatDecimalTillNthPlace = (val: number | string, n = 1) => {
  let number = Number(val);
  if (number % 1 !== 0 && parseFloat(number.toFixed(1)) !== 0) {
    return Number(number.toFixed(n));
  } else {
    return Math.floor(number);
  }
};

// TODO: creates new array where values are of one singular unit
export const uniformDataUnit = (data: any, unit: string) => {
  return data.map((data) => ({
    before:
      data.before &&
      Number(convertGlucose({ value: Number(data.before.split(' ')[0]), fromUnit: data.before.split(' ')[1], toUnit: unit })),
    after:
      data.after &&
      Number(convertGlucose({ value: Number(data.after.split(' ')[0]), fromUnit: data.after.split(' ')[1], toUnit: unit })),
    updatedOn: data.updatedOn,
  }));
};

interface IgenerateValuesForAllUnitsExceptCurrentParams {
  value: string;
  allUnits: string[];
  currentUnit: string;
}

// todo: generate a new
export const generateValuesForAllUnitsExceptCurrent = ({
  value,
  allUnits,
  currentUnit,
}: IgenerateValuesForAllUnitsExceptCurrentParams) => {
  let newValues = {};
  // when field is empty
  if (!value) {
    allUnits.forEach((unit) => (newValues[unit] = ''));
  } else {
    allUnits.forEach((unit) => {
      if (unit !== currentUnit && value !== '.') {
        newValues[unit] = formatDecimalTillNthPlace(
          convertGlucose({ value: Number(value), fromUnit: currentUnit, toUnit: unit })
        ).toString();
      } else {
        newValues[unit] = value;
      }
    });
  }

  return newValues;
};
