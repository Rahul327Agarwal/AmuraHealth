import { ReactElement } from 'react';
import { IRegisterEvent, IUnRegisterEvent } from '../../../../AppSync/AppSync.types';
import { IPanel, ISelectedClient, ISelectedTenant, ISession } from '../../../../Common/Common.types';

export interface IProps {
  sessions: ISession;
  childEventTrigger: Function;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedTenant: ISelectedTenant;
  panel: IPanel;
  injectComponent?: ReactElement;
  selectedClient?: ISelectedClient;
}

export type Actions = 'MOVE_CARDS_REQUEST' | 'MOVE_CARD_DESCRIPTION' | null;
