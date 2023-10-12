import moment from 'moment';
import { IProps, rampingRequest } from './PrescriptionView.types';
import {
  setAppliedConditionsPrescription,
  setAppliedProductsPrescription,
  setIsPreviewDisabled,
  setIsProtocolsLoaded,
  setPrescriptionHistory,
  setPrescriptionLength,
} from '../../../../DisplayFramework/State/Slices/PrescriptionSlice';
import { getFormattedDate } from '../../../../Common/Common.functions';
import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from '../../../../Common/ErrorToaster';

export async function generatePrescription(panelId: string, props: IProps, region: any, cuisine: any) {
  const { sessions, selectedClient, patientId } = props;
  const reqBody = {
    PatientId: patientId,
    StartingDate: getFormattedDate(new Date().toString()),
    TenantId: selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    Cusine: cuisine ? cuisine : '',
    Region: region,
    url: import.meta.env.VITE_MYWORK_GENERATE_PRESCRIPTION_API,
    token: sessions.id_token,
    method: 'POST',
    headers: {},
  };
  let response = await PMS_S3.postData(reqBody);
  if (!response?.Error) {
    return response;
  } else {
    ErrorToaster(response.Error.data, panelId, 'error');
    return null;
  }
}

export const invokeApprovePrescriptionAPI = async (
  panelId: string,
  props: IProps,
  prescriptionDays: number,
  region: string,
  conditionsPayLoad: Array<any>,
  protocolPayLoad: Array<any>,
  productsPayload: Array<any>,
  ambroProduct: Array<any>
) => {
  var endingDate = new Date();
  endingDate.setDate(endingDate.getDate() + prescriptionDays - 1);
  const reqBody = {
    EventName: 'approve_prescription',
    PatientId: props.patientId,
    StartingDate: getFormattedDate(new Date().toString()),
    PrescriptionLength: prescriptionDays,
    PrescriptionStartDate: getFormattedDate(new Date().toString()),
    PrescriptionEndDate: getFormattedDate(endingDate.toString()),
    Conditions: conditionsPayLoad,
    Protocols: protocolPayLoad,
    RegionName: region,
    Products: productsPayload,
    ambroNutrition: ambroProduct,
    assortedNutrition: productsPayload,
    TenantId: props.selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_MYWORK_APPROVE_PRESCRIPTION_API,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const response = await PMS_S3.postData(reqBody);
  if (response.Error) {
    ErrorToaster(response.Error.data, panelId, 'error');
    return Promise.reject(false);
  } else {
    return Promise.resolve(response);
  }
};

export const isRampingApplied = (productsPayload: Array<any>) => {
  for (let i = 0; i < productsPayload.length; i++) {
    let value = productsPayload[i];
    if ((value.hasRampDown && !value.selectedRampDown) || (value.hasRampUp && !value.selectedRampUp)) {
      return false;
    }
  }
  return true;
};

export const isRampingExceedingPrescriptionLength = (products: Array<any>) => {
  for (let i = 0; i < products.length; i++) {
    let value = products[i];
    let minimumRampDownDays = 0;
    let rampingUpObject = value.ProductRamping.find((ramping) => ramping.ramp_id === value.selectedRampUp && ramping.is_ramp_up);
    if (rampingUpObject) {
      if (value.selectedRampDown) {
        minimumRampDownDays = value.minimumRampDownDays;
      }
      let minimumRampingDays = Number(rampingUpObject.length_in_days) + minimumRampDownDays;
      let prescribedDays = Number(value.daysRange[1]) - Number(value.daysRange[0]) + 1;
      if (minimumRampingDays > prescribedDays) {
        return true;
      }
    }
    let minimumRampUpDays = 0;
    let rampingDownObject = value.ProductRamping.find(
      (ramping) => ramping.ramp_id === value.selectedRampDown && ramping.is_ramp_down
    );
    if (rampingDownObject) {
      if (value.selectedRampUp) {
        minimumRampUpDays = value.minimumRampUpDays;
      }
      let minimumRampingDays = Number(rampingDownObject.length_in_days) + minimumRampUpDays;
      let prescribedDays = Number(value.daysRange[1]) - Number(value.daysRange[0]) + 1;
      if (minimumRampingDays > prescribedDays) {
        return true;
      }
    }
  }
  return false;
};

export const formatCondtions = (conditions: Array<any>) => {
  let conditionsArray = [];
  conditionsArray = conditions.map((value) => {
    var endingDate = new Date();
    endingDate.setDate(endingDate.getDate() + value.daysRange[1] - 1);
    return {
      ConditionId: value.ConditionId,
      StageId: value.ConditionStageId,
      StartDate: getFormattedDate(new Date().toString()),
      EndDate: getFormattedDate(endingDate.toString()),
      StartDay: value.daysRange[0],
      EndDay: value.daysRange[1],
    };
  });
  return conditionsArray;
};

export const formatProducts = (products: Array<any>) => {
  let tempObj = JSON.parse(JSON.stringify(products));
  let requestProducts = [];
  tempObj.forEach((productObj) => {
    let isProductAlreadyPresent = requestProducts.find((value) => value.ProductId === productObj.ProductId);
    if (isProductAlreadyPresent) {
      requestProducts = requestProducts.map((alreadyProductObj) => {
        let product = JSON.parse(JSON.stringify(alreadyProductObj));
        if (hasSameProductID(product, productObj)) {
          // console.log("Before modification", product, productObj);
          const dosage = getDosageWithRamping(productObj);
          if (product.StartDay > productObj.daysRange[0]) {
            product.StartDate = getDosageStartDate(productObj);
            product.StartDay = productObj.daysRange[0];
          }
          if (product.EndDay < productObj.daysRange[1]) {
            product.EndDate = getDosageEndDate(productObj);
            product.EndDay = productObj.daysRange[1];
          }
          // console.log("Added dose", dosage)
          let dose = JSON.parse(JSON.stringify(product.Dose));
          dose.push(dosage);
          product.Dose = JSON.parse(JSON.stringify(dose));
        }
        // console.log("Modified product", product);
        return product;
      });
    } else {
      const dosage = getDosageWithRamping(productObj);
      productObj.Dose = JSON.parse(JSON.stringify([dosage]));
      productObj.StartDate = getDosageStartDate(productObj);
      productObj.EndDate = getDosageEndDate(productObj);
      productObj.StartDay = productObj.daysRange[0];
      productObj.EndDay = productObj.daysRange[1];
      // console.log("Already New product to request", productObj.ProductId, productObj, dosage);
      requestProducts.push(productObj);
    }
  });
  return requestProducts;
};

export const previewPrescription = async (props: IProps, generatedPrescriptionFileName: string, typeOfDownload: any) => {
  const { sessions, patientId, selectedClient } = props;
  let prescriptionNumber = generatedPrescriptionFileName.substring(0, generatedPrescriptionFileName.indexOf('.')).split('_');
  let prescriptionTitle = `${selectedClient.client_name}-${moment(parseInt(prescriptionNumber[0])).format('YYMMDD')}-${
    prescriptionNumber[1]
  }`;
  if (typeOfDownload === 'prescription' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      fileName: `${prescriptionTitle}-prescription`,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/prescription/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'shoppingList' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/shoppingList/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-shoppinglist`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'consumption 1-7d' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/consumptionSheet/firstWeekConsumptionSheet/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-consumption sheet 1-7d`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'consumption 8d+' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/consumptionSheet/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-consumption sheet 8d+`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  return true;
};

const getDosageStartDate = (product: any): string => {
  let dosageStartDate = new Date();
  dosageStartDate.setDate(dosageStartDate.getDate() + product.daysRange[0] - 1);
  return getFormattedDate(dosageStartDate.toString());
};

const getDosageEndDate = (product: any): string => {
  let dosageEndDate = new Date();
  dosageEndDate.setDate(dosageEndDate.getDate() + product.daysRange[1] - 1);
  return getFormattedDate(dosageEndDate.toString());
};

const getDosage = (product: any) => {
  return {
    PartOfTheDay: product.dosageTime,
    ProductWithFood: product.ProductWithFood,
    Dosage: product.dosage,
    StartDate: getDosageStartDate(product),
    EndDate: getDosageEndDate(product),
    IsRampingProtocol: false,
    Ramping: [],
    StartDay: product.startDay,
    EndDay: product.endDay,
  };
};

const hasSameProductID = (firstProduct: any, secondProduct: any): boolean => {
  return firstProduct.ProductId === secondProduct.ProductId;
};

const hasAnyRampingSelected = (product: any): boolean => {
  return product.selectedRampUp || product.selectedRampDown;
};

const hasRampUpSelected = (product: any): boolean => {
  return product.selectedRampUp ? true : false;
};
const hasRampDownSelected = (product: any): boolean => {
  return product.selectedRampDown ? true : false;
};

const getRampingObject = (ramping: any, typeOfRamping: string) => {
  let rampingObject = rampingRequest;
  rampingObject.IsRampUp = typeOfRamping === 'rampUp' ? 1 : 0;
  rampingObject.IsRampDown = typeOfRamping === 'rampDown' ? 1 : 0;
  rampingObject.RampId = ramping.ramp_id;
  rampingObject.LengthInDays = ramping.length_in_days;
  rampingObject.Fraction = ramping.fraction;
  rampingObject.IsDifferentialRamping = ramping.ramp_id.includes(',');
  return rampingObject;
};

const getDosageWithRamping = (productObj: any) => {
  let dosage = getDosage(productObj);
  if (hasAnyRampingSelected(productObj)) {
    dosage.IsRampingProtocol = true;
    let rampUpObject: any, rampDownObject: any;
    if (hasRampUpSelected(productObj)) {
      rampUpObject = productObj.ProductRamping.find(
        (ramping: any) => ramping.ramp_id === productObj.selectedRampUp && ramping.is_ramp_up
      );
      if (rampUpObject) {
        let rampingObject = getRampingObject(rampUpObject, 'rampUp');
        dosage.Ramping.push(rampingObject);
      }
    }
    if (hasRampDownSelected(productObj)) {
      rampDownObject = productObj.ProductRamping.find(
        (ramping: any) => ramping.ramp_id === productObj.selectedRampDown && ramping.is_ramp_down
      );
      if (rampDownObject) {
        let rampingObject = getRampingObject(rampUpObject, 'rampDown');
        dosage.Ramping.push(rampingObject);
      }
    }
  } else {
    dosage.IsRampingProtocol = false;
    dosage.Ramping = [];
  }
  return dosage;
};

export const fetchLatestPrescription = async (
  sessions: { id_token: any },
  selectedClient: { tenant_id: any },
  patientId: string,
  prescriptionKey: string,
  dispatch: any
) => {
  const prescriptionsData: any = await PMS_S3.listS3Files(
    `pms-ql-prescription/${patientId}/${prescriptionKey.substring(prescriptionKey.lastIndexOf('/') + 1)}`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: sessions.id_token,
      headers: {},
    },
    []
  );

  dispatch(setAppliedConditionsPrescription(prescriptionsData.conditions));
  dispatch(setAppliedProductsPrescription(prescriptionsData.products));
  dispatch(setIsPreviewDisabled(false));
  dispatch(setIsProtocolsLoaded(true));
  dispatch(setPrescriptionLength(prescriptionsData.prescription_length));
  dispatch(setPrescriptionHistory(prescriptionsData));
  return prescriptionsData;
  // setPrescriptionHistory(prescriptionsData),
  // setAppliedConditions(prescriptionsData.conditions),
  // setPrescriptionLength(prescriptionsData.prescription_length),
  // setAppliedProducts(prescriptionsData.products),
  // setIsProtocolsLoaded(true),
  // setIsPreviewDisabled(false)
};
