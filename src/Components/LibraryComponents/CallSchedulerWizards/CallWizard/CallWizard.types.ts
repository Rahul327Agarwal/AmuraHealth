import { IMessage } from '../../ChatComponent/ChatComponents.types';

export interface IProps {
  message?: IMessage;
  roomUsers?: Array<any>;
  sessions?: any;
  setCallWizardFlow?: any;
  isFirstMessage?: boolean;
  setOpenReply?: Function;
  setRepliedToMessage?: Function;
  msgHighlight?: string;
}

export interface BookingAvaibilityProps {
  calenderDate: Date;
  setCalenderDate: Function;
  selectedTimeSlot: Date;
  setSelectedTimeSlot: Function;
  openDrawer: Function;
}

export interface IMeetingDetails {
  persons: Array<any>;
  roles: Array<any>;
  scheduleData: any;
}
