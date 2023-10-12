import moment from 'moment';
import { getNumberOfDays } from '../../../../../Common/Common.functions';

export const splitProducts = (
  products: any,
  prescriptionLength: string,
  setErrorMessage: Function,
  setIsProtocolsLoaded: Function,
  prescriptionKey: string,
  prescriptionHistory: any
) => {
  let productsArray = [];
  let productList = JSON.parse(JSON.stringify(products));
  if (prescriptionKey) {
    return splitProductsForHistory(productList, prescriptionLength, prescriptionHistory);
  } else {
    let doseTiming = ['MorningDose', 'NoonDose', 'EveningDose', 'NightDose'];
    let prompt = false;
    for (const element of productList) {
      let value = element;
      doseTiming.forEach((time) => {
        let obj = JSON.parse(JSON.stringify(value));
        if (obj[time]) {
          let filteredDoseTiming = doseTiming.filter((timeStr) => timeStr !== time);
          filteredDoseTiming.forEach((timingStr) => {
            delete obj[timingStr];
          });
          if (value.ProductRamping && value.ProductRamping.length > 0) {
            obj.hasRamping = true;
            let ramingArray = value.ProductRamping;
            let rampUpDropdown = [];
            let rampDownDropdown = [];
            ramingArray.map((rampingObj: { is_ramp_up: any; is_ramp_down: any }) => {
              if (rampingObj.is_ramp_up) {
                obj.hasRampUp = true;
                rampUpDropdown.push(rampingObj);
              }
              if (rampingObj.is_ramp_down) {
                obj.hasRampDown = true;
                rampDownDropdown.push(rampingObj);
              }
            });
            obj.rampUpDropdown = rampUpDropdown;
            obj.rampDownDropdown = rampDownDropdown;
          }
          if (1 + obj.Order > Number(prescriptionLength)) {
            setErrorMessage('Prescription days are less than order of products.');
            setIsProtocolsLoaded(false);
            return [];
          }
          let startDay = 1 + obj.Order > Number(prescriptionLength) ? Number(prescriptionLength) : 1 + obj.Order;
          obj.startDay = 1;
          obj.endDay = Number(prescriptionLength);
          obj.daysRange = [startDay, Number(prescriptionLength)];
          obj.selectedRampUp = '';
          obj.selectedRampDown = '';
          obj.dosage = Number(obj[time]);
          obj.dosageTime =
            time === 'MorningDose'
              ? 'M'
              : time === 'NoonDose'
              ? 'A'
              : time === 'EveningDose'
              ? 'E'
              : time === 'NightDose'
              ? 'N'
              : '';
          productsArray.push(obj);
        }
      });
    }
  }
  return productsArray;
};

export const splitProductsForHistory = (products: any, prescriptionLength: string, prescriptionHistory: any) => {
  let productsArray = [];
  for (const element of products) {
    let value = element;

    value?.dose.map(
      (eachDose: {
        start_day: moment.MomentInput;
        start_date: any;
        end_date: string;
        ramping: any[];
        daysRange: any[];
        end_day: any;
        dosageTime: any;
        part_of_the_day: any;
        startDay: number;
        endDay: number;
        ProductName: any;
        ProductWithFood: any;
        selectedRampUp: any;
        selectedRampDown: any;
      }) => {
        let rampUp = eachDose.ramping.find((eachRamping: { is_ramp_up: any }) => eachRamping.is_ramp_up);
        let rampDown = eachDose.ramping.find((eachRamping: { is_ramp_down: any }) => eachRamping.is_ramp_down);
        eachDose.daysRange = [
          getNumberOfDays(prescriptionHistory.prescription_start_date, eachDose.start_date) + 1,
          Number(prescriptionLength) + getNumberOfDays(eachDose.end_date, prescriptionHistory.prescription_end_date),
        ];
        eachDose.dosageTime = eachDose.part_of_the_day;
        eachDose.startDay = 1;
        eachDose.endDay = Number(prescriptionLength);
        eachDose.ProductName = value.name;
        eachDose.ProductWithFood = value.productWithFood;
        eachDose.selectedRampUp = rampUp ? rampUp.ramp_id : '';
        eachDose.selectedRampDown = rampDown ? rampDown.ramp_id : '';
        productsArray.push(eachDose);
      }
    );
  }
  return productsArray;
};

export const updateProducts = (value: Array<number>, index: number, products: Array<number>) => {
  let tempObj = JSON.parse(JSON.stringify(products));
  tempObj[index].daysRange = value;
  return tempObj;
};

export const updateRamping = (value: string, index: number, products: Array<any>, updateRamping: string) => {
  let tempObj = JSON.parse(JSON.stringify(products));
  if (updateRamping === 'rampUp') {
    tempObj[index].selectedRampUp = value;
    let rampingObject = tempObj[index].ProductRamping.find(
      (ramping: { ramp_id: string; is_ramp_up: any }) => ramping.ramp_id === value && ramping.is_ramp_up
    );
    if (rampingObject) {
      tempObj[index].minimumRampUpDays = Number(rampingObject.length_in_days);
    } else {
      tempObj[index].minimumRampUpDays = 0;
    }
  } else {
    tempObj[index].selectedRampDown = value;
    let rampingObject = tempObj[index].ProductRamping.find(
      (ramping: { ramp_id: string; is_ramp_down: any }) => ramping.ramp_id === value && ramping.is_ramp_down
    );
    if (rampingObject) {
      tempObj[index].minimumRampDownDays = Number(rampingObject.length_in_days);
    } else {
      tempObj[index].minimumRampDownDays = 0;
    }
  }
  return tempObj;
};

export const validateRampingDays = (value: string, index: number, products: Array<any>, updateRamping: string) => {
  let result = true;
  let tempObj = JSON.parse(JSON.stringify(products));
  if (updateRamping === 'rampUp') {
    let minimumRampDownDays = 0;
    let rampingObject = tempObj[index].ProductRamping.find(
      (ramping: { ramp_id: string; is_ramp_up: any }) => ramping.ramp_id === value && ramping.is_ramp_up
    );
    if (rampingObject) {
      if (tempObj[index].selectedRampDown) {
        minimumRampDownDays = tempObj[index].minimumRampDownDays;
      }
      let minimumRampingDays = Number(rampingObject.length_in_days) + minimumRampDownDays;
      let prescribedDays = Number(tempObj[index].daysRange[1]) - Number(tempObj[index].daysRange[0]) + 1;
      if (minimumRampingDays > prescribedDays) {
        result = false;
      }
    }
  } else {
    let minimumRampUpDays = 0;
    let rampingObject = tempObj[index].ProductRamping.find(
      (ramping: { ramp_id: string; is_ramp_down: any }) => ramping.ramp_id === value && ramping.is_ramp_down
    );
    if (rampingObject) {
      if (tempObj[index].selectedRampUp) {
        minimumRampUpDays = tempObj[index].minimumRampUpDays;
      }
      let minimumRampingDays = Number(rampingObject.length_in_days) + minimumRampUpDays;
      let prescribedDays = Number(tempObj[index].daysRange[1]) - Number(tempObj[index].daysRange[0]) + 1;
      if (minimumRampingDays > prescribedDays) {
        result = false;
      }
    }
  }
  return result;
};

export const sortingProducts = (value: string, products: Array<any>) => {
  let tempObj = JSON.parse(JSON.stringify(products));
  if (value === 'A-Z') {
    tempObj.sort((a: { ProductName: string }, b: { ProductName: any }) => a.ProductName.localeCompare(b.ProductName));
  } else {
    tempObj.sort((a: { Order: number; daysRange: any }, b: { Order: number; daysRange: any }) =>
      a.Order && b.Order ? a.Order - b.Order : a.daysRange[0] - b.daysRange[0]
    );
  }
  return tempObj;
};

export const setNoRamping = (products: any) => {
  let tempObj = JSON.parse(JSON.stringify(products));
  tempObj.map((value: { hasRampUp: any; selectedRampUp: string; hasRampDown: any; selectedRampDown: string }) => {
    if (value.hasRampUp && !value.selectedRampUp) {
      value.selectedRampUp = 'No Ramping';
    }
    if (value.hasRampDown && !value.selectedRampDown) {
      value.selectedRampDown = 'No Ramping';
    }
  });
  return tempObj;
};

export const getSortingOptions = (): Array<any> => {
  return [
    {
      id: 'A-Z',
    },
    {
      id: 'Phasing',
    },
  ];
};
