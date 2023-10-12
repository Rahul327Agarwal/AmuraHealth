import { PMS_LOCALE } from '../../../Utils';
import React from 'react';
// import MultipleToaster from "./../../../Common/MultipleToaster";
import ErrorToaster from './../../../Common/ErrorToaster';
import { IPatientBiomarker } from './Interface/IInvestigationReport';

export function addBiomarkerValidate(
  reportId: string | undefined,
  biomarkerShortName?: string,
  biomarkerValue?: string,
  biomarkerId?: string,
  patientBioMarkers?: Array<IPatientBiomarker> | undefined,
  biomarkerGroupName?: string
) {
  let errorObj = false;
  let listArray = [];
  if (reportId?.trim() === '') {
    listArray.push(<div>{PMS_LOCALE.translate('Please Fill Lab Details.')}</div>);
    errorObj = true;
  } else if (typeof biomarkerValue == 'undefined' || biomarkerValue === '') {
    listArray.push(<div>{biomarkerShortName + PMS_LOCALE.translate(' Report value cannot be blank')}</div>);
    errorObj = true;
  } else if (patientBioMarkers && patientBioMarkers?.find((i) => i.BiomarkerId === biomarkerId)) {
    let patientBiomarker = patientBioMarkers?.find(
      (i) => i.BiomarkerId === biomarkerId && i.BiomarkerGroupId === biomarkerGroupName
    );
    if (patientBiomarker) {
      listArray.push(patientBiomarker.BiomarkerShortName + PMS_LOCALE.translate(' Already added in this report'));
      errorObj = true;
    }
  }
  if (errorObj) {
    // TODO: MultipleToaster(listArray);
  }
  return errorObj;
}

export function validateAddRequest(labName: string, sampleDate: string, reportDate: string) {
  let errorObj = false;
  let errorElement: any = [];
  if ((labName && labName != '') || sampleDate || reportDate) {
    let validatedDates = validateSampleAndReportDates(sampleDate, reportDate, errorElement as any);
    if (validatedDates?.error) {
      errorObj = true;
      errorElement = validatedDates.listArray;
    }
    let validatedLabName = validateLabName(labName, errorElement);
    if (validatedLabName?.error) {
      errorObj = true;
      errorElement = validatedLabName.listArray;
    }
  }
  if (errorObj) {
    //TODO: MultipleToaster(errorElement);
  }
  return errorObj;
}

export const validateSampleAndReportDates = (sampleDate: any, reportDate: any, elementArray: any) => {
  let currDate = new Date();
  let sampDate = new Date(sampleDate);
  let repDate = new Date(reportDate);
  currDate.setHours(0, 0, 0, 0);
  sampDate.setHours(0, 0, 0, 0);
  repDate.setHours(0, 0, 0, 0);
  let errorObj = { error: false, listArray: elementArray };
  if (sampleDate || reportDate) {
    if (reportDate) {
      if (currDate < repDate) {
        errorObj.error = true;
        errorObj.listArray.push('Report Date should be lesser than or equal to current date');
      }
      if (repDate < sampDate) {
        errorObj.error = true;
        errorObj.listArray.push('Report Date should be greater than or equal to sample date');
      }
    }

    if (sampleDate) {
      if (currDate < sampDate) {
        errorObj.error = true;
        errorObj.listArray.push('Sample Date should be lesser than or equal to current date');
      }
    }
  }
  return errorObj;
};

export const validateLabName = (labName: any, elementArray: any) => {
  let errorObj = { error: false, listArray: elementArray };
  if (labName && labName != '') {
    let lbname = labName;
    let remText = lbname.replace(/\s/g, '');
    if (remText.length >= 65) {
      errorObj.error = true;
      errorObj.listArray.push('Lab name should not exceed 64 characters');
    }
    if (remText.length < 3) {
      errorObj.error = true;
      errorObj.listArray.push('Lab name should be minimum of 3 characters');
    }
  }
  return errorObj;
};

export function validateDeleteReport(panelId: string, reportId: string | undefined) {
  let errorObj = false;
  let listArray: any = [];
  if (reportId?.trim() == '' || typeof reportId === null || typeof reportId === 'undefined') {
    errorObj = true;
    ErrorToaster('No Report To Delete.', panelId, 'error');
  }
  return errorObj;
}

export const validateFiles = (panelId: string, filesArray: any, setRerenderFlag: any, setFiles: any) => {
  let acceptedFiles: any = [];
  let failedFiles: any = [];
  if (filesArray && filesArray.length > 0) {
    filesArray.map((value: any) => {
      if (value.path.search(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|xps|XPS)$/) > -1) {
        acceptedFiles.push(value);
      } else {
        failedFiles.push(value);
      }
    });
    const flags: any = {};
    var removeDuplicates = acceptedFiles.filter((entry: any) => {
      if (flags[entry.path]) {
        return false;
      }
      flags[entry.path] = true;
      return true;
    });
    setFiles(removeDuplicates);
    if (removeDuplicates.length !== filesArray.length) {
      let errorObj: any = { error: false, msg: {} };
      let listArray: any = [];
      let errMessage = ``;
      failedFiles.map((value: any, index: number) => {
        if (index < failedFiles.length - 1) {
          errMessage = `${errMessage} ${value.path},`;
        } else {
          errMessage = `${errMessage} ${value.path}`;
        }
      });
      if (failedFiles.length === 1) {
        errMessage = `${errMessage} ${PMS_LOCALE.translate('file is not supported.')}`;
      } else {
        errMessage = `${errMessage} ${PMS_LOCALE.translate('files are not supported.')}`;
      }
      if (failedFiles.length > 0) {
        ErrorToaster(errMessage, panelId, 'error');
      }
      setRerenderFlag(new Date().getTime());
    } else {
      setRerenderFlag(0);
    }
  } else {
    setFiles([]);
  }
};
