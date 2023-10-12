import { useEffect, useRef, useState } from 'react';
import { DeepLinkActionTypes } from './DeepLinkActionsMap';
import { CustomActionIdentifier, DLCustomActionMap } from './DeepLinkCustomActionMap';

export namespace DeepLinkEventManager {
  export const DEEP_LINK_NOTIFY_EVENT = 'deep-link-event';
  export const DEEP_LINK_MODULE_EVENT = 'deep-link-module-event';

  export interface DeepLinkEvent extends CustomEvent {
    detail: {
      type: 'notify';
      notifyType: DeepLinkActionTypes;
      data?: any;
    };
  }

  export interface DeepLinkActionEvent extends CustomEvent {
    detail: {
      type: DeepLinkActionTypes;
      data?: any;
    };
  }

  export async function notifyDeepLinkProcessor(
    notifyType: DeepLinkActionTypes,
    props?: {
      data?: any;
    }
  ) {
    window.dispatchEvent(
      new CustomEvent(DEEP_LINK_NOTIFY_EVENT, {
        detail: {
          type: 'notify',
          notifyType: notifyType,
          data: props?.data,
        },
      } as DeepLinkEvent)
    );
  }

  export function listenToProcessorEvents(fn: (e: DeepLinkEvent) => void): () => void {
    window.addEventListener(DEEP_LINK_NOTIFY_EVENT, fn);
    return () => {
      window.removeEventListener(DEEP_LINK_NOTIFY_EVENT, fn);
    };
  }

  //
  //
  //

  export function triggerModuleAction(
    type: DeepLinkActionEvent['detail']['type'],
    props?: {
      data?: any;
    }
  ) {
    window.dispatchEvent(
      new CustomEvent(DEEP_LINK_MODULE_EVENT, {
        detail: {
          type: type,
          data: props?.data,
        },
      } as DeepLinkActionEvent)
    );
  }

  export function listenToActionEvents(fn: (e: DeepLinkActionEvent) => void): () => void {
    window.addEventListener(DEEP_LINK_MODULE_EVENT, fn);
    return () => {
      window.removeEventListener(DEEP_LINK_MODULE_EVENT, fn);
    };
  }
}

//TODO: Remove useState
export function useDeepLinkAction(
  action: DeepLinkActionTypes,
  fn: (
    e: DeepLinkEventManager.DeepLinkActionEvent,
    notifyComplete?: (options?: { afterMs?: number; isError?: boolean }) => void
  ) => void,
  deps?: any[]
) {
  const [actionToDo, setActionToDo] = useState<DeepLinkEventManager.DeepLinkActionEvent>(undefined);

  useEffect(() => {
    return DeepLinkEventManager.listenToActionEvents((e) => {
      if (e.detail.type === action) {
        setActionToDo(e);
      } else {
        setActionToDo(undefined);
      }
    });
  }, []);

  useEffect(() => {
    if (actionToDo?.detail?.type === action) {
      fn(actionToDo, (options) => {
        if (options?.isError) {
          DeepLinkEventManager.notifyDeepLinkProcessor('error');
          return;
        }
        if (options?.afterMs) {
          setTimeout(() => {
            DeepLinkEventManager.notifyDeepLinkProcessor(action);
          }, options?.afterMs);
        } else {
          requestAnimationFrame(() => {
            DeepLinkEventManager.notifyDeepLinkProcessor(action);
          });
        }
      });
    }
  }, [actionToDo, ...(deps ?? [])]);
}

export function useDeepLinkCustomAction<CAI extends CustomActionIdentifier>(
  actionIdentifier: CustomActionIdentifier,
  fn: (data: DLCustomActionMap[CAI], ...args: Parameters<Parameters<typeof useDeepLinkAction>['1']>) => void,
  deps?: any
) {
  useDeepLinkAction(
    'customAction',
    (e, n) => {
      if (e.detail.data?.customActionIdentifier === actionIdentifier) {
        fn(e.detail.data?.data ?? {}, e, n);
      }
    },
    deps
  );
}
