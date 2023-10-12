import { format } from 'date-fns';
import { IErrorsState, IFieldState, TAutoDecline } from './MoveCardRequest.types';

export const DECLINE_TYPE: { label: string; value: TAutoDecline }[] = [
  { label: 'Only new meeting invitations', value: 'ONLY_NEW' },
  { label: 'New and existing meetings', value: 'NEW_AND_EXISTING' },
];

export const DEFAULT_FIELDSTATE: IFieldState = {
  // title: '',
  // description: '',
  // startDate: null,
  // startTime: '',
  // endDate: null,
  // endTime: '',
  // timeZone: '',
  // autoDecline: false,
  // autoDeclineType: DECLINE_TYPE[0].value,
  // attachment: [],
  permanentCheck: true,
};

export const DEFAULT_ERRORSTATE: IErrorsState = {
  // title: '',
  // description: '',
  // startDate: '',
  // startTime: '',
  // endDate: '',
  // endTime: '',
  // timeZone: '',
};

export const validateFields = (fields: IFieldState) => {
  let errorsObject: IErrorsState = JSON.parse(JSON.stringify(DEFAULT_ERRORSTATE));
  let isValid = true;
  // if (!fields.startDate) {
  //   errorsObject.startDate = 'The field is empty/invalid.';
  //   isValid = false;
  // }
  // if (!fields.startTime) {
  //   errorsObject.startTime = 'The field is empty/invalid.';
  //   isValid = false;
  // }
  return { isValid, errorsObject };
};
