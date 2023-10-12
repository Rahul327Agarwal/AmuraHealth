import { v4 as uuid } from 'uuid';
export interface BrowsePage {
  isClientSelected?: boolean;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  patientId: string;
  panel: any;
  injectComponent: any;
}
export interface IProps {
  roles: any;
  handleEdit?: (roleId: string) => void;
  handleThreedotmenu: Function;
  handleOnCardClick?: Function;
}

export interface RoleDetails {
  tenantId?: string;
  roleId: string;
  roleName: string;
  reportingTo: Array<any>;
  reportees: Array<any>;
  shiftSegments: Array<IShiftSegment>;
  is_active: boolean;
  action: any;
}
export interface IRole {
  roleId: string;
  roleName: string;
  reportingTo: Array<any>;
  reportees: Array<any>;
  shiftSegments: Array<IShiftSegment>;
  is_active: boolean;
}

export interface IShiftSegment {
  segmentId: string;
  segmentName: string;
  weekDays: Array<number>;
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  is_active: boolean;
  neverEnds: boolean;
}
export const createDefaultRoleObject = (): IRole => {
  return {
    roleId: uuid(),
    roleName: '',
    reportingTo: [],
    reportees: [],
    shiftSegments: [],
    is_active: true,
  };
};
