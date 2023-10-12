import { notifyEvent, registerEvent, unRegisterEvent } from '../AppSync/AppSync.functions';
import { ISession } from '../Common/Common.types';
import { IEventName } from '../DisplayFramework/Events/Data/DisplayFrameworkEventsMap';
import { useDFEvent } from '../DisplayFramework/Events/DFEvents';
import { useSelectedClient, useSelectedTenant } from '../DisplayFramework/State/Slices/DisplayFramework';

export type ChildEventTriggerFn = (
  sourcePanelName: null,
  sourceComponentName: null,
  eventName: IEventName,
  paramerters: any
) => void;

/**
 * should be removed in future
 */
export function useOldProps(sessions: ISession) {
  const selectedClient = useSelectedClient();
  const selectedTenant = useSelectedTenant();

  const sendEvent = useDFEvent();

  /**
   * @deprecated
   * use `useDFEvent()` instead
   */
  const childEventTrigger = (
    /** Not Used */
    sourcePanelName: string | null,
    /** Not Used */
    sourceComponentName: string | null,
    eventName: IEventName,
    paramerters: any,
    clearAll?: boolean
  ) => {
    sendEvent(eventName, paramerters, clearAll);
  };

  return {
    selectedClient: selectedClient ?? {},
    selectedTenant: selectedTenant ?? {},
    registerEvent: registerEvent,
    unRegisterEvent: unRegisterEvent,
    sessions: sessions,
    childEventTrigger: childEventTrigger,
    notifyEvent: notifyEvent,
  };
}
