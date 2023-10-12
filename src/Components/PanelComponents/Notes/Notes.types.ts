import { ITab } from '../MyListPanel/ManageTab/ManageTab.types';

// TODO: remove this and use the one in the library
type IMessage = any;
type ITag = any;

export interface IProps {
  activeTab: ITab;
  messagesList: IMessage[];
  possibleTags: ITag[];
  staffList: Array<any>;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  injectComponent: any;
  panel: any;
  type: any;
  botData: any;
  notifyEvent: any;
  isReportee?: any;
  reporteesData?: {
    staffName?: string;
    staffId?: string;
    roleId?: string;
    reportingStaffId?: string;
    reportingRoleId?: string;
    handleBackToReportees?: () => void;
  };
}
export class ChatVariables {
  public static showScrollDownIcon = false;
  public static scrollPosition = 0;
  public static networkConnection = null;
  public static chatConnection = true;
  public static subscription = null;
  public static clientSubscription = null;
  public static chatId = '';
  public static chatUserNames = {} as any;
  public static unsentMessages = [];
}

export interface ISurveyCollectionDataObj {
  closedSurveyCollections: number;
  pendingSurveyCollections: number;
  totalSurveyCollections: number;
}
