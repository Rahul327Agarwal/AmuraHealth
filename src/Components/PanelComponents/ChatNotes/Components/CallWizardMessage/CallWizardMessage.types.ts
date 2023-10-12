import { Dispatch, SetStateAction } from 'react';
import { IChatMessageComponentProps } from '../../ChatMessage/ChatMessage.types';

export interface IProps extends IChatMessageComponentProps {}

export interface ICallWizardComp {
  message: IProps['message'];
  setScheduleURL: Dispatch<SetStateAction<string>>;
  isTimeGreaterThenNhr?: boolean;
}

export interface ICallWizardConfirmViewComp {
  message: IProps['message'];
  setScheduleURL: Dispatch<SetStateAction<string>>;
  setCallWizardFlow: Dispatch<SetStateAction<any>>;
}

export interface IMeetingDetails {
  persons: any[];
  roles: any[];
  scheduleData: any;
}

export interface IOrganizerDetails {
  organizerName: string;
  organizerRoleName: string;
}
