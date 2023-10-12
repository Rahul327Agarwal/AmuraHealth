import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../Utils';
import { IUserBluedot } from '../MyListPanel/MyList/MyList.types';
import {
  IReporteesFilterAPIPayload,
  IReporteesKey,
  IReporteesObject,
  IReporteesPayload,
  IReporteesResponse,
  IReporteesTab,
  ITabOptionObj,
} from './ReporteesListViewHome.types';

export const getReporteesList = async (
  panelId: string,
  payload: IReporteesPayload,
  session_id: string
): Promise<IReporteesResponse> => {
  let reporteesResponse: IReporteesResponse = {
    countDetails: [],
    reportees: [],
    level: 0,
    roleId: undefined,
    staffId: undefined,
  };
  try {
    const reqBody = {
      EventName: 'get_matched_staff',
      method: 'POST',
      notifyUser: payload.staffId,
      url: import.meta.env.VITE_FETCH_REPORTEES_LIST,
      token: session_id,
      ...payload,
    };
    let response = await PMS_S3.postData(reqBody);
    if (response?.reportees) {
      reporteesResponse = response;
    } else {
      ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    }
  } catch (error) {
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
  }

  return reporteesResponse;
};

export const createReporteesObject = (
  preReporteesObject: IReporteesObject,
  incomingList: IReporteesResponse
): IReporteesObject => {
  const { reportees = [] } = incomingList;
  const subReporteesKey = createReporteesKey(incomingList);

  if (!reportees.length) return { [subReporteesKey]: reportees };

  let currentReportees;

  for (const key in preReporteesObject) {
    if (currentReportees) break;
    if (!Object.prototype.hasOwnProperty.call(preReporteesObject, key)) continue;
    const element = preReporteesObject[key].find((data) => {
      const objectKey = createReporteesKey(data);
      return objectKey === subReporteesKey;
    });
    if (element) {
      currentReportees = element;
      break;
    }
  }

  if (!currentReportees) return { [subReporteesKey]: reportees };
  const { lastChild, parentLastChildIndex = [], level } = currentReportees;

  const reporteesModified = reportees.map((value) => {
    return {
      ...value,
      parentIsLastChild: lastChild,
      parentLastChildIndex: lastChild ? [...parentLastChildIndex, level - 1] : parentLastChildIndex,
    };
  });
  return { [subReporteesKey]: reporteesModified };
};

export const createReporteesKey = ({ roleId, staffId, level }: IReporteesKey): string => {
  return `${roleId}~${staffId}~${level}`;
};

export const updateTheBackupList = (backupList: any, bluedot: IUserBluedot) => {
  let ownerId = bluedot.ownerId;
  let ownerRoleId = bluedot.ownerRoleId;
  let newList: any = {};
  Object.keys(backupList).forEach((key) => {
    let [roleId, staffId, level] = key.split('~');
    if (bluedot.notifiedUsers.indexOf(`${staffId}~${roleId}`) > -1) {
      let modifiedList = backupList[key].map((reportee) => {
        if (bluedot.notifiedUsers.indexOf(`${reportee.staffId}~${reportee.roleId}`) > -1) {
          let count = 0;
          if (bluedot.action === 'ADD') {
            count = 1;
          }
          if (bluedot.action === 'RESOLVED') {
            count = -1;
          }
          if (`${reportee.staffId}~${reportee.roleId}` === `${ownerId}~${ownerRoleId}`) {
            reportee.blueDot = reportee.blueDot + count;
            return reportee;
          }
          // if (`${reportee.staffId}~${reportee.roleId}` !== `${ownerId}~${ownerRoleId}`) {
          //   reportee.inDirectBlueDot = reportee.inDirectBlueDot + count;
          //   return reportee;
          // }
        }
        return reportee;
      });
      newList[key] = modifiedList;
      return;
    }
    newList[key] = backupList[key];
    return;
  });
  return newList;
};

export const reporteeFilterAPI = async (panelId: string, sessions: any, params: IReporteesFilterAPIPayload) => {
  try {
    const payload = {
      ...params,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      EventName: 'mytab',
      tabType: 'REPORTEES_TAB',
      userId: sessions?.user?.id,
      created_on: new Date().toDateString(),
      created_by: sessions?.user?.id,
    };

    const response = await PMS_S3.postData(payload);
    if (response?.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
    SuccessToaster(
      `Filter ${payload.Action === 'ADD' ? 'created' : payload.Action === 'UPDATE' ? 'updated' : 'deleted'} successfully!`,
      panelId,
      'success'
    );
    return true;
  } catch (error) {
    console.error('err', error);
  }
};

export const getMyReporteesTabs = async (panelId: string, sessions: any): Promise<IReporteesTab[]> => {
  try {
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_REPORTEES_TAB,
      userId: sessions?.user?.id,
      tabType: 'REPORTEES_TAB',
    };
    let response = await PMS_S3.postData(reqBody);
    if (response) {
      response.sort((a: IReporteesTab, b: IReporteesTab) => {
        return a.sortingOrder - b.sortingOrder;
      });
      return response || [];
    }
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return [];
  } catch (error) {
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return [];
  }
};

export const DUMMY_REPORTEES_ARR: any = [
  {
    level: 1,
    firstChild: true,
    lastChild: false,
    hasChildren: true,
    uniqueKey:
      'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor',
    blueDot: 0,
    inDirectBlueDot: 0,
    clientCount: 0,
    inDirectClientCount: 3,
    staffId: '109a9a4d-164a-410d-b7b8-523455a45008',
    roleId: 'L3 - Treating Doctor',
    staffName: 'Emma TD-3',
  },
  {
    level: 1,
    firstChild: false,
    lastChild: true,
    hasChildren: true,
    uniqueKey:
      'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor',
    blueDot: 0,
    inDirectBlueDot: 0,
    clientCount: 0,
    inDirectClientCount: 10,
    staffId: '2776c1e2-a8f5-4915-a544-339c0eaf8c0c',
    roleId: 'L3 - Treating Doctor',
    staffName: 'Jacob TD-3',
  },
];

export const DUMMY_BACKUP_LIST: any = {
  'undefined~cc6d8568-fd9b-4cbd-9d39-885974764eb5~0': [
    {
      level: 1,
      firstChild: true,
      lastChild: false,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 3,
      staffId: '109a9a4d-164a-410d-b7b8-523455a45008',
      roleId: 'L3 - Treating Doctor',
      staffName: 'Emma TD-3',
    },
    {
      level: 1,
      firstChild: false,
      lastChild: true,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 10,
      staffId: '2776c1e2-a8f5-4915-a544-339c0eaf8c0c',
      roleId: 'L3 - Treating Doctor',
      staffName: 'Jacob TD-3',
    },
  ],
  'L3 - Treating Doctor~2776c1e2-a8f5-4915-a544-339c0eaf8c0c~1': [
    {
      level: 2,
      firstChild: true,
      lastChild: false,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###0252f58d-de78-4f67-bb2d-34d5aff2c406~L2 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 1,
      staffId: '0252f58d-de78-4f67-bb2d-34d5aff2c406',
      roleId: 'L2 - Treating Doctor',
      staffName: 'William TD-2',
      parentIsLastChild: true,
      parentLastChildIndex: [0],
    },
    {
      level: 2,
      firstChild: false,
      lastChild: false,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###4a7c53d4-7a4d-4f99-b009-2a86f4ab7c1c~L2 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 2,
      staffId: '4a7c53d4-7a4d-4f99-b009-2a86f4ab7c1c',
      roleId: 'L2 - Treating Doctor',
      staffName: 'James TD-2',
      parentIsLastChild: true,
      parentLastChildIndex: [0],
    },
    {
      level: 2,
      firstChild: false,
      lastChild: true,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###b0e8fc23-a9e9-49f6-849a-cb68336f0ae8~L2 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 7,
      staffId: 'b0e8fc23-a9e9-49f6-849a-cb68336f0ae8',
      roleId: 'L2 - Treating Doctor',
      staffName: 'Sophia TD-2',
      parentIsLastChild: true,
      parentLastChildIndex: [0],
    },
  ],
  'L3 - Treating Doctor~109a9a4d-164a-410d-b7b8-523455a45008~1': [
    {
      level: 2,
      firstChild: true,
      lastChild: false,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor###8f22ca79-d20c-4eb9-b7ca-f6e06f8c0275~L2 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 0,
      staffId: '8f22ca79-d20c-4eb9-b7ca-f6e06f8c0275',
      roleId: 'L2 - Treating Doctor',
      staffName: 'Jack TD-2',
      parentIsLastChild: false,
      parentLastChildIndex: [],
    },
    {
      level: 2,
      firstChild: false,
      lastChild: true,
      hasChildren: true,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor###d59ad090-c79f-468d-ad26-4b78a8c842fd~L2 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 3,
      staffId: 'd59ad090-c79f-468d-ad26-4b78a8c842fd',
      roleId: 'L2 - Treating Doctor',
      staffName: 'Lilly TD-2',
      parentIsLastChild: false,
      parentLastChildIndex: [],
    },
  ],
  'L2 - Treating Doctor~4a7c53d4-7a4d-4f99-b009-2a86f4ab7c1c~2': [
    {
      level: 3,
      firstChild: true,
      lastChild: true,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###4a7c53d4-7a4d-4f99-b009-2a86f4ab7c1c~L2 - Treating Doctor###4fd2e353-5f73-450e-9fa3-39f1fde117f0~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 2,
      inDirectClientCount: 0,
      staffId: '4fd2e353-5f73-450e-9fa3-39f1fde117f0',
      roleId: 'L1 - Treating Doctor',
      staffName: 'Nick TD-1',
      parentIsLastChild: false,
      parentLastChildIndex: [0],
    },
  ],
  'L2 - Treating Doctor~d59ad090-c79f-468d-ad26-4b78a8c842fd~2': [
    {
      level: 3,
      firstChild: true,
      lastChild: true,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor###d59ad090-c79f-468d-ad26-4b78a8c842fd~L2 - Treating Doctor###056550ad-1840-4e57-bec8-ae5f8b2d49de~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 3,
      inDirectClientCount: 0,
      staffId: '056550ad-1840-4e57-bec8-ae5f8b2d49de',
      roleId: 'L1 - Treating Doctor',
      staffName: 'Charlotte TD-1',
      parentIsLastChild: true,
      parentLastChildIndex: [1],
    },
  ],
  'L1 - Treating Doctor~f3d9544e-48f7-4b1e-9e69-db79f7df635e~3': [],
  'L2 - Treating Doctor~8f22ca79-d20c-4eb9-b7ca-f6e06f8c0275~2': [
    {
      level: 3,
      firstChild: true,
      lastChild: true,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###109a9a4d-164a-410d-b7b8-523455a45008~L3 - Treating Doctor###8f22ca79-d20c-4eb9-b7ca-f6e06f8c0275~L2 - Treating Doctor###1556259a-6cf1-44c7-84e9-c7195ea1ffc3~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 0,
      inDirectClientCount: 0,
      staffId: '1556259a-6cf1-44c7-84e9-c7195ea1ffc3',
      roleId: 'L1 - Treating Doctor',
      staffName: 'Bran TD-1',
      parentIsLastChild: false,
      parentLastChildIndex: [],
    },
  ],
  'L1 - Treating Doctor~4fd2e353-5f73-450e-9fa3-39f1fde117f0~3': [],
  'L2 - Treating Doctor~b0e8fc23-a9e9-49f6-849a-cb68336f0ae8~2': [
    {
      level: 3,
      firstChild: true,
      lastChild: false,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###b0e8fc23-a9e9-49f6-849a-cb68336f0ae8~L2 - Treating Doctor###0ed69933-8a1c-49e7-9062-d3d6f2cd4dae~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 3,
      inDirectClientCount: 0,
      staffId: '0ed69933-8a1c-49e7-9062-d3d6f2cd4dae',
      roleId: 'L1 - Treating Doctor',
      staffName: 'Angel TD-1',
      parentIsLastChild: true,
      parentLastChildIndex: [0, 1],
    },
    {
      level: 3,
      firstChild: false,
      lastChild: true,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###b0e8fc23-a9e9-49f6-849a-cb68336f0ae8~L2 - Treating Doctor###d593f4cb-1046-4f75-893b-b67f561e080b~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 4,
      inDirectClientCount: 0,
      staffId: 'd593f4cb-1046-4f75-893b-b67f561e080b',
      roleId: 'L1 - Treating Doctor',
      staffName: 'saritha kuppili',
      parentIsLastChild: true,
      parentLastChildIndex: [0, 1],
    },
  ],
  'L1 - Treating Doctor~0ed69933-8a1c-49e7-9062-d3d6f2cd4dae~3': [],
  'L1 - Treating Doctor~d593f4cb-1046-4f75-893b-b67f561e080b~3': [],
  'L2 - Treating Doctor~0252f58d-de78-4f67-bb2d-34d5aff2c406~2': [
    {
      level: 3,
      firstChild: true,
      lastChild: true,
      hasChildren: false,
      uniqueKey:
        'cc6d8568-fd9b-4cbd-9d39-885974764eb5~L4 - Treating Doctor###2776c1e2-a8f5-4915-a544-339c0eaf8c0c~L3 - Treating Doctor###0252f58d-de78-4f67-bb2d-34d5aff2c406~L2 - Treating Doctor###f3d9544e-48f7-4b1e-9e69-db79f7df635e~L1 - Treating Doctor',
      blueDot: 0,
      inDirectBlueDot: 0,
      clientCount: 1,
      inDirectClientCount: 0,
      staffId: 'f3d9544e-48f7-4b1e-9e69-db79f7df635e',
      roleId: 'L1 - Treating Doctor',
      staffName: 'Raju Meesa',
      parentIsLastChild: false,
      parentLastChildIndex: [0],
    },
  ],
  'L1 - Treating Doctor~056550ad-1840-4e57-bec8-ae5f8b2d49de~3': [],
  'L1 - Treating Doctor~1556259a-6cf1-44c7-84e9-c7195ea1ffc3~3': [],
};

export const TAB_OPTIONS: ITabOptionObj[] = [
  { value: 'MODIFY_FILTER', label: 'Modify Filter' },
  { value: 'CREATE_FILTER', label: 'Create Filter' },
];

export const REPORTEES_STAFF_GP = [
  {
    groupId: 'REPORTEES_STAFF_GROUP',
    groupName: 'Reportees',
    shortName: 'R',
    groupedBy: 'staffId-roleId',
    created_by: 'CUSTOM',
    created_on: new Date().toDateString(),
  },
];

export const getTimestamp = () => new Date().getTime();
