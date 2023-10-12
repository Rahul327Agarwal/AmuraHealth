// export interface INameCard {
//   hierarchyId?: string;
//   tenantId?: string;
//   userId?: string;
//   firstName?: string;
//   lastName?: string;
//   nickName?: string;
//   userCreatedOn: string;
//   roleId: string;
//   type: string;
//   assignment?: IAssignment;
//   bluedots: Array<any>;
//   hasBlueDots: boolean;
//   status: Array<IStatus>;
//   staffId?: string;
// }

export interface ILeaveCard {
  ID?: string;
  tenantId?: string;
  user_created_on: string;
  status: Array<IStatus>;
  userInfo: IUserInfo;
  Owner: IOwner;
  bluedots: Array<IUserBluedot>;
  protocol: any;
  SLA: ISLA;
  roleId: string;
  assignment?: IAssignment;
  leaveType?: string;
  leaveDesription?: string;
  leaveFrom: Date | string;
  leaveTo: Date | string;
  type?: ICardType;
}

export interface IAssignment {
  targetRole: string;
  currentStaff: string;
  type: string;
  startTime: string;
  reasonForFailure: string;
  assignerRole: string;
  assignerId: string;
}

// export interface IBlueDot {
//   user: { [key: string]: IUserBluedot };
// }

export interface IUserBluedot {
  owner: boolean;
  resolved: boolean;
  bluedotId: string;
  typeOfTask: 'BLUEDOT';
  endTime?: string;
  description: string;
  transactionId: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  action: string;
  hierarchyId: string;
  partKey: string;
  sortKey: string;
  tenantId: string;
  userId: string;
  ownerId: string;
  ownerRoleId: string;
  notifiedUsers: Array<string>;
  isTransferred?: boolean;
  previousOwners?: Array<any>;
}

export interface IUserGreendot {
  owner: boolean;
  partKey: string;
  sortKey: string;
  count: number;
  latestMessageTimeStamp: string;
  lastSeenTimeStamp: string;
}

export interface IUserInfo {
  Name: string;
  username: string;
  FirstName: string;
  LastName: string;
}

export interface IStatus {
  statusType: string;
  current_status: string;
  previous_status: string;
  roleId: string;
  tenantId: string;
  patientId: string;
}

export interface IOwner {
  userId: string;
  userName: string;
}

export interface ISLA {
  StartTime: number;
  EndTime: number;
  Title: string;
  CreatedTime: number;
}

export const sampleMyList = {
  amura_consulting_physician: [
    {
      ID: '127dee0b-b185-4a4f-a0f2-2024f8a881b4',
      tenantId: 'amura',
      user_created_on: '2022-06-27T12:10:41.715Z',
      status: [],
      userInfo: {
        Name: '',
        username: 'Ashwin  Physician +919x390',
        FirstName: 'Ashwin ',
        LastName: 'Physician',
      },
      Owner: {
        userId: '4f8e993c-c7d6-4ffb-bcb6-31792b33bb75',
        userName: 'Mujahid Ahamad +919x509',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1659454360591,
        EndTime: 1659540760591,
        Title: 'Client status change',
        CreatedTime: 1659529960591,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: '2a23d4e2-6e0b-403a-b2f3-9d0861056be3',
      tenantId: 'amura',
      user_created_on: '2022-06-27T16:12:18.202Z',
      status: [],
      userInfo: {
        Name: '',
        username: 'Ashw Test +918x335',
        FirstName: 'Ashw',
        LastName: 'Test',
      },
      Owner: { userId: '', userName: '' },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656333383094,
        EndTime: 1656419783094,
        Title: 'Client status change',
        CreatedTime: 1656408983094,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: '4c430ebb-be44-4598-9711-e3ce1aabd67d',
      tenantId: 'amura',
      user_created_on: '2022-04-18T20:07:10.715Z',
      status: [],
      userInfo: {
        Name: '',
        username: 'Manidhar123 DSunksay123 +918x251',
        FirstName: 'Manidhar123',
        LastName: 'DSunksay123',
      },
      Owner: {
        userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
        userName: 'Mano Menam +918x733',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1660212589054,
        EndTime: 1660298989054,
        Title: 'Client status change',
        CreatedTime: 1660288188997,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: '5a67529b-0a3d-4699-a996-f57f597a50a4',
      tenantId: 'amura',
      user_created_on: '2021-12-11T17:30:27.188000+05:30',
      status: [],
      userInfo: {
        Name: '',
        username: 'Mano 8811 +918x877',
        FirstName: 'Mano',
        LastName: '8811',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656234113352,
        EndTime: 1656320513352,
        Title: 'Client status change',
        CreatedTime: 1656309713333,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: '735f4963-c08e-4634-9242-a03639eba077',
      tenantId: 'amura',
      user_created_on: '2022-04-22T12:43:41.663Z',
      status: [],
      userInfo: {
        Name: '',
        username: 'Mani 65462 +918x462',
        FirstName: 'Mani',
        LastName: '65462',
      },
      Owner: {
        userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
        userName: 'Mano Menam +918x733',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1655913518034,
        EndTime: 1655999918034,
        Title: 'Client status change',
        CreatedTime: 1655989118034,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: '9938ae62-3232-41b1-bc12-492e1e81bc00',
      tenantId: 'amura',
      user_created_on: '2021-04-16T13:03:49.299000+05:30',
      status: [],
      userInfo: {
        Name: '',
        username: 'Albert Chan +852x369',
        FirstName: 'Albert',
        LastName: 'Chan',
      },
      Owner: {
        userId: '70180060-106a-4124-9a13-fe90c7e15b4a',
        userName: 'Mano AmuraGC +919x599',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656337323342,
        EndTime: 1656423723342,
        Title: 'Client status change',
        CreatedTime: 1656412923302,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: 'bcfbddc8-3692-44d0-818e-a6f81f125be1',
      tenantId: 'amura',
      user_created_on: '2021-11-26T11:44:40.045000+05:30',
      status: [],
      userInfo: {
        Name: '',
        username: 'Mano 289 +918x289',
        FirstName: 'Mano',
        LastName: '289',
      },
      Owner: {
        userId: '70180060-106a-4124-9a13-fe90c7e15b4a',
        userName: 'Mano AmuraGC +919x599',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656256092116,
        EndTime: 1656342492116,
        Title: 'Client status change',
        CreatedTime: 1656331692116,
      },
      roleId: 'amura_consulting_physician',
    },
    {
      ID: 'fe7578d4-9f2b-409a-9cb8-37e173e0b03c',
      tenantId: 'amura',
      user_created_on: '2021-09-29T19:43:24.835000+05:30',
      status: [],
      userInfo: {
        Name: '',
        username: 'Client Mani 70 +919x470',
        FirstName: 'Client Mani',
        LastName: '70',
      },
      Owner: { userId: '', userName: '' },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656259090056,
        EndTime: 1656345490056,
        Title: 'Client status change',
        CreatedTime: 1656334690036,
      },
      roleId: 'amura_consulting_physician',
    },
  ],
  amura_guidance_counselor_level2: [
    {
      ID: '5b4d52e7-1b00-4da4-aeab-0203f13e2fd9',
      tenantId: 'amura',
      user_created_on: '2022-06-27T17:34:53.107Z',
      status: [{ statusType: 'edgeColor', current_status: 'New', previous_status: '' }],
      userInfo: {
        Name: '',
        username: 'Test @ Prod 3 +918x259',
        FirstName: 'Test @',
        LastName: 'Prod 3',
      },
      Owner: {
        userId: '3ea11d64-0fa9-4f07-9787-dffbaa3acc65',
        userName: 'Manidhar Sunkara +919x464',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1656275702414,
        EndTime: 1656362102414,
        Title: 'Client status change',
        CreatedTime: 1656351302414,
      },
      roleId: 'amura_guidance_counselor_level2',
    },
    {
      ID: 'ec7f0583-4cef-408d-a999-f30820883419',
      tenantId: 'amura',
      user_created_on: '2022-07-06T08:55:14.060Z',
      status: [{ statusType: 'edgeColor', current_status: 'New', previous_status: '' }],
      userInfo: {
        Name: '',
        username: 'Deepa Balajee +919x472',
        FirstName: 'Deepa',
        LastName: 'Balajee',
      },
      Owner: {
        userId: '3ea11d64-0fa9-4f07-9787-dffbaa3acc65',
        userName: 'Manidhar Sunkara +919x464',
      },
      bluedot: {},
      protocol: {},
      SLA: {
        StartTime: 1657022126539,
        EndTime: 1657108526539,
        Title: 'Client status change',
        CreatedTime: 1657097726501,
      },
      roleId: 'amura_guidance_counselor_level2',
    },
  ],
  amura_guidance_counselor_level1: [],
  'basic-user': [],
  amura_primary_health_coach: [],
  '9d830acd-4853-48d7-bdf2-dabddcf7728a': [],
  amura_coaching_team_lead: [],
  'a79002f5-76b9-4366-ab82-1c55f71a45fb': [],
};

export interface IAssignDB {
  partKey?: string;
  sortKey?: string;
  eventName: string;
  ownerId: string;
  ownerRoleId: string;
  transactionId: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  action: 'ADD' | 'NONE' | 'REMOVE' | 'UPDATE' | 'RESOLVED';
  task?: 'ADD' | 'UPDATE' | 'DELETE';
  hierarchyId: string;
  owner: boolean;
}

//NEW API TYPE OBJECT DETAILS//

export type ICard = INameCard | IMoveCard | IEventCard;

export interface INameCard extends ICommonCardKeys {
  type: ICardType;
  additionalKeys: INameCardKeys;
}
export interface IMoveCard extends ICommonCardKeys {
  type: ICardType;
  additionalKeys: IMoveCardKeys;
}
export interface IMoveCardLastMessage {
  task: string;
  cardId: string;
  roleId: string;
  tenantId: string;
  staffId: string;
}

export interface IEventCard extends ICommonCardKeys {
  type: ICardType;
  additionalKeys: IEventCardKeys;
}
export interface ICommonCardKeys {
  id: string;
  createdOn: string;
  title: string;
  searchString: string;
  tenantId: string;
  roleId: string;
  staffId: string;
}

export interface IBlueDotsStatus {
  blueToExpireNext: string;
  blueDotsCount: number;
  blackDotsCount: number;
  lastExpiredBluedot: string;
  indirectBlueDotsCount: number;

  isExpiredBluedotTransferred: boolean;
  isNextBluedotTransferred: boolean;
  indirectBlackDotsCount: number;
}
export interface INameCardKeys {
  greenDotCount?: number;
  latestMessageTimeStamp?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  mobileNumber: string;
  hierarchyId: string;
  patientId: string;
  bluedots: IBlueDotsStatus;
  status: Array<IStatus>;
  isWatching?: boolean;
}
export interface IMoveCardKeys {
  cardId: string;
  cardType: string;
  startDate: string;
  endDate?: string;
  isPermanent: boolean;
  patientIds: Array<string>;
  description: string;
  bluedots?: IBlueDotsStatus;
  createdBy: string;
}
export interface IEventCardKeys {
  title: string;
  description: string;
  others: string;
  eventType: string;
  callType: string;
  eventDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  duration: number | string;
  tenantId: string;
  parentId: string;
  eventId: string;
  updatedBy: string;
  bluedots: IBlueDotsStatus;
  participantIds: Array<string>;
  isAFB: string;
  beforeActivityEventId: string;
  afterActivityEventId: string;
}
export interface IStatus {
  statusType: string;
  current_status: string;
  previous_status: string;
  roleId: string;
  tenantId: string;
}

export type ICardType = 'nameCard' | 'moveCard' | 'eventCard';

export interface ITeam {
  Id: string;
  Salutation: string;
  LastName: string;
  FirstName: string;
  Roles: Array<string>; //This will have role labels
  UserName: string;
  hierarchyId: string;
  originalRoles: Array<string>; //This will have role ids
  isWatching?: boolean;
}
export interface IAllRoleDetails {
  acronym: string;
  created_by: string;
  tenantId: string;
  part_key: string;
  sort_key: string;
  is_active: boolean;
  description: string;
  created_on: string;
  roleId: string;
  roleName: string;
}

// export type ICard = ICommonCardKeys &
//   ({ type: 'nameCard'; additionalKeys: INameCardKeys } | { type: 'moveCard'; additionalKeys: IMoveCardKeys });

// export interface ILeaveCard {
//   ID?: string;
//   tenantId?: string;
//   user_created_on: string;
//   status: Array<IStatus>;
//   userInfo: IUserInfo;
//   Owner: IOwner;
//   bluedots: Array<IUserBluedot>;
//   protocol: any;
//   SLA: ISLA;
//   roleId: string;
//   assignment?: IAssignment;
//   leaveType?: string;
//   leaveDesription?: string;
//   leaveFrom: Date | string;
//   leaveTo: Date | string;
//   type?: ICardType;
// }

interface TenantParticipant {
  userId: string;
  roleId: string;
}

export interface IEventLastMessage {
  userId: string;
  organizer: string;
  title: string;
  eventType: string;
  tenantName: string;
  eventDate: Date;
  fromTime: Date;
  toDate: Date;
  toTime: Date;
  duration: number;
  timeZone: string;
  repeatType: string; // TODO: verify and confirm types later for recurrance

  reccurance: any;
  tenantId: string;
  notify: string[];
  tenantParticipants: TenantParticipant[];
  externalParticipants: any[];
  isExcludeMeFromEvent: boolean;
  visibility: string;
  status: string;
  callType: string;
  others: string;
  description: string;
  permissons: string[];
  createdOn: Date;
  parentId: string;
  eventId: string;
  updatedBy: string;
  // TODO: verify and confirm types later for rsvp
  rsvp: any;
  acceptedParticipants: any[];
  task: string;
}

export interface IEventLastMessageForBooked {
  deleteObject: IDeleteObject;
  eventId: string;
  parentId: string;
  bookableIds: IBookableID[];
  eventType: string;
  tenantId: string;
  REQ_ID: string;
  organizer: string;
  tenantParticipants: TenantParticipant[];
  task: string;
  rsvp?: any;
}

interface IBookableID {
  eventId: string;
  parentEventId: string;
}

interface IDeleteObject {
  thisEvent: boolean;
  allEvents: boolean;
}
