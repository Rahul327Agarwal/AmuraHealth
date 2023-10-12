// import { IShiftSegment } from "../../../LibraryComponentsNew/ShiftSegmentCard/RoleCard/RoleCard.types";

export interface IProps {
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  role:string,
  client:string,
  data?:any,
  injectComponent:any,
  patientId:any, 

  roleId?: string;
  roleName?: string;
  reportingTo?: Array<any>;
  reportees?: Array<any>;
  shiftSegments?: Array<IShiftSegment>;
  is_active?: boolean;
  handleEdit?: (roleId: string) => void;
  handleThreedotmenu?:Function;
  handleOnCardClick?:Function;
  setMovedToEdit?:Function;
  movedToEdit:boolean;
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

export interface IOption {
 value: string;
  label: string;
}
export interface roleActualObject {
  roleId: string;
  roleName: string;
}

export interface userActualObject {
  userId: string;
  userName: string;
}
