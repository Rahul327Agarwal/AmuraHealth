import { IBookablesForSchedule, ISchedule } from '../ChatComponent/ChatComponents.types';

export interface IMettingDetails {
  persons: IPersonsData[];
  scheduleData: ISchedule;
}
export interface IPersonsData {
  id: string;
  label: string;
  color: string;
  fullName?: string;
}

export interface IAvailableSlots {
  startTime: string;
  endTime: string;
  pool: Array<any>;
  userIds: Array<any>;
  tenantId: string;
  participantsQuery: Array<{ userId: string; roleId: string }>;
  allowedMaximumDays: number;
  bookables?: IBookablesForSchedule;
}

export interface IModifiedSlots extends IAvailableSlots {
  usersWithcolordata?: IPersonsData[];
}
export interface IOrganizerDetails {
  id: string;
  label: string;
  roleId?: string;
  roleName?: string;
  fullName?: string;
}
