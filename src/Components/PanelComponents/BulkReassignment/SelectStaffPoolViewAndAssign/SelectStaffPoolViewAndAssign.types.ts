import { IRegisterEvent, IUnRegisterEvent } from '../../../../AppSync/AppSync.types';
import { ISession } from '../../../../Common/Common.types';
import { ISummaryData } from '../../BulkSummary/BulkSummary.types';
import { ICardtoAssign } from '../CardsFlowHomePage/CardsFlowHomePage.types';

export interface IProps {
  sessions: ISession;
  childEventTrigger: Function;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedTenant: any;
  panel: any;
  injectComponent?: any;
  selectedClient?: any;
  selectedCardAssignType?: any; // TCardAssign;
  headerContent: string;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  summaryData?: ISummaryData;
  clickedSnippetIds?: Array<string>;
  cardsToAssign?: Array<ICardtoAssign>;
  setReShowStaffPollCards?: React.Dispatch<React.SetStateAction<ISelectedCard>>;
  reShowStaffPollCards?: ISelectedCard;
}

export type TGroupBy = null | 'SF' | 'RL' | 'TN';
export interface IcardData {
  patientId: string;
  currentStaffRoleId: string;
}
export interface IStaffpoolData {
  roles: Role[];
}

export interface Role {
  tenantId: string;
  roleId: string;
  staff: Staff;
}

export interface Staff {
  [id: string]: number;
}
export interface ISelectedCard {
  [currentStaffRoleId: string]: Array<string>;
}
export interface IUserNames {
  [userId: string]: string;
}
