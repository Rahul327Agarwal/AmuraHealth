export interface IProps {
  patientId?: any;
  panel: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  selectedTenant: any;
  childEventTrigger: Function;
  injectComponent: any;
  eligibleRolesCheck?: boolean;
  assignRolesLength?: any;
  setRemoveSelectedRole?: any;

  defaultScreen?: Actions;
  selectedBulkRole?: { value: string; label: string };
  selectedBulkClient?: ISelectedClient;

  showCancleToSearchUsers?: boolean;
}

export interface ISelectedClient {
  tenant_id: string;
  client_id: string;
  roleId: string;
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
  setIsLoading: Function;
  isLoading: boolean;
  allProfiles: Array<StaffCard>;
}

export interface NoResultsProps extends IProps {
  setActionType: Function;
  selectedRole: { value: string; label: string };
}

export interface ManualSelectProps extends IProps {
  setActionType: Function;
  selectedRole: { value: string; label: string };
  setIsLoading: Function;
  isLoading: boolean;
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
  isWatching?: boolean;
}

export type Actions =
  | 'STAFF_HOME'
  | 'SELECT_ROLE'
  | 'SELECT_ROLE'
  | 'ASSIGN_LEAD'
  | 'NO_RESULTS'
  | 'ADD_MANUALLY'
  | 'STAFF_SEARCH';
