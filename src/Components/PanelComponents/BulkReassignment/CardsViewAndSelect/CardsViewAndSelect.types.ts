import { ReactElement } from 'react';
import { IRegisterEvent, IUnRegisterEvent } from '../../../../AppSync/AppSync.types';
import { IPanel, ISelectedClient, ISelectedTenant, ISession } from '../../../../Common/Common.types';
import { ISummaryData } from '../../BulkSummary/BulkSummary.types';
import { Actions } from '../CardsFlowHomePage/CardsFlowHomePage.types';

export interface IProps {
  sessions: ISession;
  childEventTrigger: Function;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedTenant: ISelectedTenant;
  panel: IPanel;
  injectComponent?: ReactElement;
  selectedClient?: ISelectedClient;
  headerContent: string;
  action: Actions;
  setAction: React.Dispatch<React.SetStateAction<Actions>>;
  summaryData?: ISummaryData;
  clickedSnippetIds?: Array<string>;
  setCardsToAssign?: React.Dispatch<React.SetStateAction<any>>;
  setReShowSelectSelectedCards?: React.Dispatch<React.SetStateAction<ISelectedCard>>;
  reShowSelectCards?: ISelectedCard;
}

export type TGroupBy = null | 'SF' | 'RL' | 'TN';
export interface IStaff {
  currentStaffRoleId: string;
  newStaffId: string;
  updatedOn: string;
  isPermanent: boolean;
  readyToAssign: boolean;
  tenantId: string;
  failedMessage: string;
  newStaffRoleId: string;
  updatedBy: string;
  cardType: string;
  createdBy: string;
  cardId: string;
  isCompleted: boolean;
  isFailed: boolean;
  patientId: string;
  currentStaffHierarchyId: string;
  createdOn: string;
  newStaffHierarchyId: string;
  startDate: string;
  description: string;
  completedMessage: string;
  currentStaffId: string;
  readyToMove: boolean;
  assignerHierarchyId?: string;
  assignerRoleId?: string;
  assignerId?: string;
}
export interface ISelectedCard {
  [currentStaffRoleId: string]: Array<string>;
}
export interface IUserNames {
  [userId: string]: string;
}
