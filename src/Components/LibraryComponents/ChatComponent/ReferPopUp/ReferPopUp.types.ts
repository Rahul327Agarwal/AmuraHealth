import { ISession } from '../../../../Common/Common.types';

export interface IDetails {
  mobile: string;
  whatsApp: boolean;
  firstName: string;
  healthObjective: string;
  lastName: string;
  email: string;
  additional: string;
}
export interface IErrors {
  mobile: string;
  firstName: string;
  healthObjective: string;
  email: string;
}

export interface ISubmitParams {
  details: IDetails;
  setErrors: Function;
  sessions: ISession;
  selectedClient: any;
  onClose: Function;
}

export interface IChangeParams {
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
  setDetails: Function;
  setErrors: Function;
  errors: IErrors;
}

export interface IProps {
  onClose: Function;
}

export interface IStyledProps {
  isMobileError: boolean;
}
