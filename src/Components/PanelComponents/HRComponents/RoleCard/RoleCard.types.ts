export interface IProps {
  roleId: string;
  roleName: string;
  reportingTo: Array<any>;
  reportees: Array<any>;
  shiftSegments: Array<IShiftSegment>;
  is_active: boolean;
  handleEdit: (roleId: string) => void;
  handleActivation: (roleId: string, value: boolean) => void;
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
