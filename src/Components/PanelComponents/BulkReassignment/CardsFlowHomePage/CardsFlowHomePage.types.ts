import { ReactElement } from "react";
import { IRegisterEvent, IUnRegisterEvent } from "../../../../AppSync/AppSync.types";
import { IPanel, ISelectedClient, ISelectedTenant, ISession } from "../../../../Common/Common.types";
import { ISummaryData } from "../../BulkSummary/BulkSummary.types";

export interface IProps {
  sessions: ISession;
  childEventTrigger: Function;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedTenant: ISelectedTenant;
  panel: IPanel;
  injectComponent?: ReactElement;
  selectedClient?: ISelectedClient;
  summaryData?: ISummaryData;
}
export interface ICardtoAssign {
  assignerHierarchyId: string;
  assignerRoleId: string;
  currentStaffHierarchyId: string;
  currentStaffId: string;
  currentStaffRoleId: string;
  patientId: string;
  assignerId: string;
  tenantId: string;
  cardId: string;
}

export type Actions = 'HOME' | 'STAFFPOOLVIEW' | 'MANUALADD';
