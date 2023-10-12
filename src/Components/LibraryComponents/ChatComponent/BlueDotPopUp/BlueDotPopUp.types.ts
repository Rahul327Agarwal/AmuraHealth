import { z } from 'zod';
import { IRegisterEvent, IUnRegisterEvent } from '../../../../AppSync/AppSync.types';

export const ITasksENUM = z.enum(['BLUEDOT', 'REDDOT', 'STATUS']);

export type ITasks = z.infer<typeof ITasksENUM>;

export const IAssignActionsENUM = z.enum(['ADD', 'NONE', 'REMOVE', 'UPDATE']);

export type IAssignActions = z.infer<typeof IAssignActionsENUM>;

export const IBlueDotENUM = z.enum(['ADD', 'RESOLVED', 'UPDATE', 'TRANSFER', 'TRANSFERRED']);

export type IBlueDotActions = z.infer<typeof IBlueDotENUM>;

export const IDataBaseKeyObject = z.object({
  partKey: z.string(),
  sortKey: z.string(),
  eventName: z.string(),
  transactionId: z.string(),
});
export type IDataBaseKey = z.infer<typeof IDataBaseKeyObject>;

export const IAuditObject = z.object({
  createdBy: z.string(),
  createdOn: z.string(),
  updatedBy: z.string(),
  updatedOn: z.string(),
  action: z.enum([...IAssignActionsENUM.options, ...IBlueDotENUM.options]),
});
export const ITaskDBObject = IDataBaseKeyObject.merge(IAuditObject).merge(
  z.object({
    owner: z.boolean(),
    resolved: z.boolean(),
    bluedotId: z.string(),
    reasonToClose: z.string().optional(),
    reasonToTransfer: z.string().optional(),
    typeOfTask: z.enum(ITasksENUM.options),
    endTime: z.string().datetime(),
    description: z.string(),
    hierarchyId: z.string(),
    ownerId: z.string(),
    ownerRoleId: z.string(),
    notifiedUsers: z.array(z.string()),
  })
);
export type ITaskDB = z.infer<typeof ITaskDBObject>;

export interface IUITaskDB extends ITaskDB {
  displayName: string;
}

export interface IProps {
  selectedClient: any;
  sessions: any;
  userDetails: Array<any>;
  onClose: Function;
  blueDotEditInfo?: IblueEditInfo;
  reporteesData?: {
    staffName?: string;
    staffId?: string;
    roleId?: string;
    reportingStaffId?: string;
    reportingRoleId?: string;
    handleBackToReportees?: () => void;
  };
}
export interface IblueEditInfo {
  isEdit?: boolean;
  blueDotInfo?: IBlueDotInfo;
  messageId?: string;
}
export interface IRolesData {
  created_by?: string; // '948aee3d-6712-48a9-a03b-c926f5f99915';
  tenantId?: string; // 'amura';
  part_key?: string; // '~roles~master~amura~';
  sort_key?: string; // 'Amura_CEO';
  is_active?: boolean; // false;
  description?: string; // 'Amura_CEO';
  created_on?: string; // '2023-02-22T16:00:35.171Z';
  roleId?: string; // 'Amura_CEO';
  roleName?: string; // 'Amura_CEO';
}

export interface IBlueDotInfo {
  isTransferred?: boolean;
  reasonToTransfer?: string;
  reasonToClose?: string;
  previousOwners?: any;
  owner?: boolean; // true;
  updatedBy?: string; // '08021e90-e706-47f2-ace1-db5fec7d7d65';
  hierarchyId?: string; // '15546b8d-bcd4-4806-accc-6e580b6870c2';
  roleId?: string; // 'L1 - Treating Doctor';
  description?: string; // 'bluedot created & updated';
  EventName?: string; // 'assign-bluedot';
  updatedOn?: string; // '2023-03-02T01:00:00.000Z';
  createdOn?: string; // '2023-02-03T01:00:00.000Z';
  userId?: string; // '08021e90-e706-47f2-ace1-db5fec7d7d65';
  bluedotId?: string; // '9e36f8a1-a503-4f9b-889a-5c7661898599';
  createdBy?: string; // 'c67f7031-9864-4e0a-846d-9336e94aa1a4';
  tenantId?: string; // 'amura';
  action?: string; // 'UPDATE';
  endTime?: string; // '2023-03-28T17:51:44.977Z';
  staffId?: string; // '99570c98-9811-4b8a-ae71-a78b3bf17cfd';
}

export const TimeOptions = [
  '12:00 AM',
  '12:15 AM',
  '12:30 AM',
  '12:45 AM',
  '01:00 AM',
  '01:15 AM',
  '01:30 AM',
  '01:45 AM',
  '02:00 AM',
  '02:15 AM',
  '02:30 AM',
  '02:45 AM',
  '03:00 AM',
  '03:15 AM',
  '03:30 AM',
  '03:45 AM',
  '04:00 AM',
  '04:15 AM',
  '04:30 AM',
  '04:45 AM',
  '05:00 AM',
  '05:15 AM',
  '05:30 AM',
  '05:45 AM',
  '06:00 AM',
  '06:15 AM',
  '06:30 AM',
  '06:45 AM',
  '07:00 AM',
  '07:15 AM',
  '07:30 AM',
  '07:45 AM',
  '08:00 AM',
  '08:15 AM',
  '08:30 AM',
  '08:45 AM',
  '09:00 AM',
  '09:15 AM',
  '09:30 AM',
  '09:45 AM',
  '10:00 AM',
  '10:15 AM',
  '10:30 AM',
  '10:45 AM',
  '11:00 AM',
  '11:15 AM',
  '11:30 AM',
  '11:45 AM',
  '12:00 PM',
  '12:15 PM',
  '12:30 PM',
  '12:45 PM',
  '01:00 PM',
  '01:15 PM',
  '01:30 PM',
  '01:45 PM',
  '02:00 PM',
  '02:15 PM',
  '02:30 PM',
  '02:45 PM',
  '03:00 PM',
  '03:15 PM',
  '03:30 PM',
  '03:45 PM',
  '04:00 PM',
  '04:15 PM',
  '04:30 PM',
  '04:45 PM',
  '05:00 PM',
  '05:15 PM',
  '05:30 PM',
  '05:45 PM',
  '06:00 PM',
  '06:15 PM',
  '06:30 PM',
  '06:45 PM',
  '07:00 PM',
  '07:15 PM',
  '07:30 PM',
  '07:45 PM',
  '08:00 PM',
  '08:15 PM',
  '08:30 PM',
  '08:45 PM',
  '09:00 PM',
  '09:15 PM',
  '09:30 PM',
  '09:45 PM',
  '10:00 PM',
  '10:15 PM',
  '10:30 PM',
  '10:45 PM',
  '11:00 PM',
  '11:15 PM',
  '11:30 PM',
  '11:45 PM',
];

export type IError = {
  descriptionError: string;
  userError: string;
  dateError: string;
  timeError: string;
  default: string;
};
