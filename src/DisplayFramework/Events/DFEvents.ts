import { useEffect, useState } from 'react';
import { useCurrentPanel } from '../Components/Panel/Panel.hooks';
import { IPanelId } from '../Core/DFCore.types';
import { useHeaderShown, usePanelsData, useSamePanelEventShown, useSetPanelsData } from '../State/Slices/DF';
import { IEventName } from './Data/DisplayFrameworkEventsMap';
import { IPanelComponentData, IPanelData } from '../Components/Panel/Panel.types';
import {
  useSelectedClient,
  useSelectedTenant,
  useSetSelectedClient,
  useSetSelectedTenant,
} from '../State/Slices/DisplayFramework';
import { useAppDispatch } from '../State/store';
import { setCurrentChannel } from '../State/Slices/ChatSlice';

const DISPLAY_FRAMEWORK_EVENT_NAME = 'DisplayFrameworkEvent';
const DISPLAY_FRAMEWORK_GOBACK_EVENT_NAME = 'DisplayFrameworkGoBackEvent';

export type DisplayFrameworkEventDetails = {
  eventName: IEventName | IEventName[];
  params?: any;
  clearAll?: boolean;
  singlePanel?: boolean;
  sourcePanelId?: IPanelId;
};
interface DisplayFrameworkEvent extends CustomEvent {
  detail: DisplayFrameworkEventDetails;
}

/**
 * Listener for the Display Framework events
 *
 * @returns {object} The event name and params of the last event that was triggered
 */
export function useDFEventsReciever(initialEvent: IEventName) {
  const [dfEvent, setDFEvent] = useState<DisplayFrameworkEventDetails | undefined>({
    eventName: initialEvent,
  });

  useEffect(() => {
    const eventCallback = (event: Event) => {
      const eventDetails = (event as DisplayFrameworkEvent).detail;
      setDFEvent(eventDetails);
    };

    window.addEventListener(DISPLAY_FRAMEWORK_EVENT_NAME, eventCallback);

    return () => {
      window.removeEventListener(DISPLAY_FRAMEWORK_EVENT_NAME, eventCallback);
    };
  }, []);

  return dfEvent;
}

/**
 *
 * @returns {function} The function to trigger an event in the DisplayFramework
 */
export function useDFEvent() {
  const setSelectedClient = useSetSelectedClient();
  const setSelectedTenant = useSetSelectedTenant();
  const dispatch = useAppDispatch();
  const currentPanelInfo = useCurrentPanel();

  // This is copied over from previous `childEventTrigger` function
  const setClientDataFromParams = (paramerters?: any) => {
    let clientDataToSet: any = undefined;
    let tenantDataToSet: any = undefined;
    if (paramerters?.clientData) {
      let client = {
        client_id: paramerters?.clientData?.client_id || '',
        client_name: `${paramerters?.clientData?.client_name || ''}`,
        tenant_id: paramerters?.clientData?.tenant_id || '',
        channelId: paramerters?.clientData?.channelId || '',
        roleId: paramerters?.clientData?.roleId || '',
      };
      dispatch(setCurrentChannel(client.channelId));
      clientDataToSet = client;
    }
    if (paramerters?.tenantData) {
      let tenant = {
        tenant_id: paramerters.tenantData.tenant_id,
        tenant_name: paramerters.tenantData.tenant_name ? paramerters.tenantData.tenant_name : '',
      };
      tenantDataToSet = tenant;
    }

    //
    if (clientDataToSet) {
      setSelectedClient(clientDataToSet);
    }
    if (tenantDataToSet) {
      setSelectedTenant(tenantDataToSet);
    }
  };

  /**
   *
   * @param eventName  The name of the event to trigger
   * @param params  The params to pass to the event (params will be passed to the all the components)
   * @param clearAll  If true, all the panels will be cleared (except the static ones) before triggering the event
   */
  const triggerEvent = <T extends any>(
    eventName: IEventName | IEventName[],
    params?: T & {
      clientData?: any;
      tenantData?: any;
      overridePanelID?: IPanelId;
    },
    clearAll?: boolean
  ) => {
    setClientDataFromParams(params);

    const event = new CustomEvent(DISPLAY_FRAMEWORK_EVENT_NAME, {
      detail: {
        eventName,
        params,
        clearAll,
        sourcePanelId: params?.overridePanelID ?? currentPanelInfo?.id,
      } as DisplayFrameworkEventDetails,
    });
    window.dispatchEvent(event);
  };

  return triggerEvent;
}

/**
 * Go back to the previous panel if event was a `samePanelEvent`
 */
export function useDFGoBack() {
  const setPanelData = useSetPanelsData();
  const currentPanelInfo = useCurrentPanel();

  // STC
  const [_, setHeaderShown] = useHeaderShown();
  const [__, setSamePanelEventShown] = useSamePanelEventShown();

  /**
   *
   * @param panelId The id of the panel to go back to (if not provided, will go back to the current panel)
   */
  const goBack = (panelId?: IPanelId) => {
    setPanelData((prevState) => {
      const newPanelsData = {};

      Object.keys(prevState).forEach((row) => {
        newPanelsData[row] = prevState[row].map((panel: IPanelData) => {
          if (panel.id === (panelId ?? currentPanelInfo?.id)) {
            if (panel.panelComponentData?.length > 1) {
              const poppedPanel = panel.panelComponentData.pop();

              window.dispatchEvent(
                new CustomEvent(DISPLAY_FRAMEWORK_GOBACK_EVENT_NAME, {
                  detail: poppedPanel,
                })
              );
            }

            //
            if (panel.panelComponentData?.length === 1) {
              setHeaderShown(true);
              setSamePanelEventShown(false);
            }
          }
          return panel;
        });
      });

      return newPanelsData;
    });
  };
  return goBack;
}

/**
 * Waits for a go back event to be triggered on the given opened EventName
 *
 * @param eventName EventName which is opened, therefore will trigger the go back
 * @param callback Callback to be called when the go back event is triggered in the opened EventName
 */
export function useWaitForGoBack(eventName: IEventName, callback: () => void) {
  useEffect(() => {
    const eventCallback = (event: CustomEvent) => {
      const eventDetails = event.detail as IPanelComponentData;
      if (eventDetails?.eventDetails?.eventName === eventName) {
        callback();
      }
    };
    window.addEventListener(DISPLAY_FRAMEWORK_GOBACK_EVENT_NAME, eventCallback);
    return () => {
      window.removeEventListener(DISPLAY_FRAMEWORK_GOBACK_EVENT_NAME, eventCallback);
    };
  }, []);
}

/**
 * Get the current event data of the given panel (the last event that was triggered in the panel)
 * ****Listens to All Events Changes***
 *
 * @param panelId ID of the panel to get the current event data from
 * @returns {object} The event name and params of the last event that was triggered in the given panel
 */
export function useCurrentEventData(panelId: IPanelId) {
  const panelsData = usePanelsData();
  const panelData = panelsData.main?.find((panel) => panel.id === panelId);
  const lastEventDetails = panelData?.panelComponentData?.[panelData?.panelComponentData?.length - 1];
  return {
    eventName: lastEventDetails?.eventDetails?.eventName,
    params: lastEventDetails?.eventDetails?.params,
  };
}
