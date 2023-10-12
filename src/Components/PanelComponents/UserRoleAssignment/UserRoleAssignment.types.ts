import { v4 as uuid } from 'uuid';
export interface IProps {
  roleId: string;
  roleName: string;
  reportsTo: Array<any>;
  reportees: Array<any>;
  shiftSegments: Array<IShiftSegment>;
  roles: Array<IRole>;
  isEdit: boolean;
  injectComponent: any;
  handleBackButton: () => void;
  handleSubmitButton: () => void;
  panel: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  patientId: string;
  is_active: boolean;
  childEventTrigger?: any;
  autoAssignment?: boolean;
  manualAssignment?: boolean;
  handleActiveState?: Function;
}

export interface IRole {
  roleId: string;
  roleName: string;
  reportingTo: Array<any>;
  reportees: Array<any>;
  shiftSegments: Array<IShiftSegment>;
  is_active: boolean;
  autoAssignment?: boolean;
  manualAssignment?: boolean;
}

export interface IShiftSegment {
  segmentId: string;
  segmentName: string;
  weekDays: Array<number>;
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  neverEnds: boolean;
  is_active: boolean;
}

export interface IRolesError {
  roleId: string;
  roleName: string;
  reportsTo: string;
  reportees: string;
  shiftSegmentError: string;
  shiftSegments: Array<IShiftSegmentError>;
}

export interface IShiftSegmentError {
  segmentId: string;
  segmentName: string;
  weekDays: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  neverEnds: boolean;
  is_active: boolean;
}

export const createDefaultError = (): IRolesError => {
  return {
    roleId: '',
    roleName: '',
    reportsTo: '',
    reportees: '',
    shiftSegmentError: '',
    shiftSegments: [],
  };
};

export const createDefaultShiftSegment = (): IShiftSegment => {
  return {
    segmentId: uuid(),
    segmentName: '',
    weekDays: [],
    startDate: new Date(),
    endDate: null as any,
    startTime: '',
    endTime: '',
    neverEnds: true,
    is_active: true,
  };
};

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

export interface roleActualObject {
  roleId: string;
  roleName: string;
}

export interface userActualObject {
  userId: string;
  userName: string;
}
export interface userActualObjectNew {
  staffId: string;
  staffName: string;
  roleName: string;
  roleId: string;
}
export interface IOptionNew {
  value: string;
  label: string;
}
export interface optionsType {
  label: string;
  value: string;
  roleId?: string;
  roleName?: string;
}
