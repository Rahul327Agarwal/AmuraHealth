import { ISession } from '../../../Common/Common.types';
import { INameCard, IUserBluedot } from '../../PanelComponents/MyListPanel/MyList/MyList.types';
import { IReporteesTabProps } from '../../PanelComponents/ReporteesListView/ReporteesTab/ReporteesTab.types';

export interface IProps {
  cardData: INameCard;
  isExtend?: boolean;
  isBgWhite?: boolean;
  noThreeDot?: boolean;
  customStyle?: string;
  isBorderRadius?: boolean;
  isSelected?: boolean;
  handleSelect?: Function;
  openClient?: Function;
  setSelectedCard?: Function;
  setAction?: Function;
  isClientSelected?: boolean;
  message?: IMessage;
  edgeColor?: string;
  showBlueDot?: boolean;
  bluedot?: any;
  isEmergency?: any;
  sessions?: ISession;
  isReportee?: boolean;
  reporteesData?: {
    staffName?: string;
    staffId?: string;
    roleId?: string;
    reportingStaffId?: string;
    reportingRoleId?: string;
    handleBackToReportees?: () => void;
  };
  bluedotClick: Function;
  currentCardRole?: string;
  activeTab?: IReporteesTabProps;
}

export interface IMessage {
  message: string;
  receivedTime: string;
  isUnread: string;
}
