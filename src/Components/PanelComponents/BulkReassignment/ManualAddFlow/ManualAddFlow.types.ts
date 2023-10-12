import { ICardtoAssign } from '../CardsFlowHomePage/CardsFlowHomePage.types';
import { ISelectedCard } from '../SelectStaffPoolViewAndAssign/SelectStaffPoolViewAndAssign.types';
import { Actions } from '../CardsFlowHomePage/CardsFlowHomePage.types';
import { IPanel, ISelectedClient, ISelectedTenant, ISession } from '../../../../Common/Common.types';
import { ReactElement } from 'react';
import { IRegisterEvent, IUnRegisterEvent } from '../../../../AppSync/AppSync.types';
export interface IProps {
  sessions: ISession;
  childEventTrigger: Function;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedTenant: ISelectedTenant;
  panel: IPanel;
  injectComponent?: ReactElement;
  selectedClient?: ISelectedClient;

  eligibleRolesCheck?: boolean;
  cardsToAssign?: ICardtoAssign;
  staffPoolData?: ISelectedCard;
  setAction?: React.Dispatch<React.SetStateAction<Actions>>;
}
export interface SelectRoleProps extends IProps {
  setActionType: Function;
  setSelectedRole: Function;
  setIsLoading: Function;
  isLoading: boolean;
  roles: Array<any>;
}
export interface TeamAssignmentProps {
  setActionType: Function;
  selectedProfile: Array<any>;
  setIsLoading: Function;
  isLoading: boolean;
}

export interface StaffTeamProps extends IProps {
  setActionType: Function;
  allProfiles: Array<StaffCard>;
  setIsLoading: Function;
  isLoading: boolean;
  setTransferData: React.Dispatch<React.SetStateAction<ITransferData | null>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<{ value: string; label: string }>>;
}

export interface ITransferData {
  id: string;
  roleId: string;
  hierarchyId?: string;
}

export interface profileCard {
  role: string;
  profiles: Array<any>;
}
export interface AssignLeadDoctorProps extends IProps {
  setActionType: Function;
  selectedRole: { value: string; label: string };
  // setIsLoading?: Function;
  // isLoading?: boolean;
  allProfiles: Array<StaffCard>;
}

export interface NoResultsProps extends IProps {
  setActionType: Function;
  selectedRole: { value: string; label: string };
}

export interface ManualSelectProps extends IProps {
  setActionType: Function;
  selectedRole: { value: string; label: string };
  // setIsLoading: Function;
  // isLoading: boolean;
  allProfiles: Array<StaffCard>;
  transferData: ITransferData | null;
}

export interface StaffCard {
  name: string;
  id: string;
  roleName: string;
  roleId: string;
  lastSeen?: string;
  rating?: string;
  tenantId?: string;
  hierarchyId: string;
}

export type ActionsManualAdd =
  | 'STAFF_HOME'
  | 'SELECT_ROLE'
  | 'SELECT_ROLE'
  | 'ASSIGN_LEAD'
  | 'NO_RESULTS'
  | 'ADD_MANUALLY'
  | 'STAFF_SEARCH';
