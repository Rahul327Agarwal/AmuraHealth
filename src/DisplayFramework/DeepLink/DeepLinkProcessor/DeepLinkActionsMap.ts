import { sleep } from '../../../Utilities/Misc';
import { getPanelContainerRefs } from '../../State/Slices/DF';
import { DeepLinkAction, DeepLinkActionResult } from '../DeepLinker/DeepLinker';
import { DeepLinkEventManager } from './DeepLinkEventManager';

type DLActionExecutorFn = (
  action: DeepLinkAction,
  previousResult: DeepLinkActionResult,
  results: DeepLinkActionResult[]
) => Promise<void>;

type DLActionCompleterFn = (
  action: DeepLinkAction,
  previousResult?: DeepLinkActionResult,
  results?: DeepLinkActionResult[],
  event?: DeepLinkEventManager.DeepLinkEvent
) => Promise<DeepLinkActionResult | undefined> | undefined;

export type DLActionMap = Record<
  string,
  {
    actionExecutor: DLActionExecutorFn;
    onActionComplete: DLActionCompleterFn;
  }
>;

export const deepLinkActionMap = {
  waitForPanel: {
    actionExecutor: async () => {
      return;
    },
    onActionComplete: async (action) => {
      const nonStickyPanelRefs = getPanelContainerRefs().main;
      const mainPerentRef = nonStickyPanelRefs.current?.parentElement?.parentElement as HTMLDivElement;
      const res = mainPerentRef.querySelector(`#${action.panelId}`);
      return {
        result: res,
      };
    },
  },
  windashNavigation: {
    actionExecutor: async (action) => {
      //
      DeepLinkEventManager.triggerModuleAction('windashNavigation', {
        data: {
          windowId: action.windashWindowId,
        },
      });
    },
    onActionComplete: async (action, previousResult) => {
      const res = (previousResult?.result as HTMLDivElement)?.querySelector(
        `#${action.windashWindowId}[data-windash=${action.windashWindowId}]`
      );
      return {
        result: res,
      };
    },
  },
  clickAction: {
    actionExecutor: async (action, previousResult) => {
      const res = ((previousResult.result ?? document) as HTMLDivElement).querySelector(action.elementFinder);
      (res as any)?.click();
      await sleep(1000);
      DeepLinkEventManager.notifyDeepLinkProcessor('clickAction');
    },
    onActionComplete: async (event) => {
      return {
        result: undefined,
      };
    },
  },
  panelNavigation: {
    actionExecutor: async (action) => {
      DeepLinkEventManager.triggerModuleAction('panelNavigation', {
        data: {
          panelId: action.panelId,
        },
      });
    },
    onActionComplete: async (action) => {
      const nonStickyPanelRefs = getPanelContainerRefs().main;
      const mainPerentRef = nonStickyPanelRefs.current?.parentElement?.parentElement as HTMLDivElement;
      const res = mainPerentRef.querySelector(`#${action.panelId}`);
      return {
        result: res,
      };
    },
  },
  customAction: {
    actionExecutor: async (action) => {
      DeepLinkEventManager.triggerModuleAction('customAction', {
        data: {
          customActionIdentifier: action.customActionIdentifier,
          data: action.data ?? {},
        },
      });
    },
    onActionComplete: async () => {
      return {
        result: undefined,
      };
    },
  },
  error: {
    actionExecutor: async () => {},
    onActionComplete: async () => {
      return {
        result: undefined,
      };
    },
  },
} satisfies DLActionMap;

export type DeepLinkActionTypes = keyof typeof deepLinkActionMap;
