import { ISession } from '../../../Common/Common.types';

export interface Shift {
  startTime: string;
  endTime: string;
}
export interface Staff {
  id: number | string;
  displayOrder: string;
  name: string;
  role: string;
  rating: string;
  profilePicture: string;
  shiftTimings: Array<Shift>;
}

export interface MyTeamData extends Staff {
  nextStaff: Array<Staff>;
}
export interface MyTeamProps {
  selectedClient: any;
  sessions: ISession;
  registerEvent: any;
  unRegisterEvent: any;
}
