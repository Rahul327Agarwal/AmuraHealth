import { DeepLinkAction, DeepLinkActionResult, DeepLinker } from '../DeepLinker/DeepLinker';
import { DeepLinkEventManager } from './DeepLinkEventManager';
import { sleep } from '../../../Utilities/Misc';
import { DLActionMap, deepLinkActionMap } from './DeepLinkActionsMap';
import { DeepLinkState } from '../DeepLinkManager.state';

export namespace DeepLinkProcessor {
  /** Mutable Stack of actions to be processed */
  let currentStack: DeepLinkAction[] = [];
  /** stores results of each action () */
  let resultStack: DeepLinkActionResult[] = [];

  let isDone = false;

  let currentActionIndex = 0;
  let prevActionIndex = -1;

  /** if no event is notified within 10s after processing the action, stop processing */
  let processTimeout: NodeJS.Timeout;

  /** flag if the processing is already started */
  let isDeeplinkProcessed = false;

  /**
   * Checks in storage and processes it
   */
  export async function checkDeeplink() {
    if (isDeeplinkProcessed) return;
    const savedLink = DeepLinkState.getSavedDeepLink();
    if (!savedLink) return;
    isDeeplinkProcessed = true;
    try {
      DeepLinkState.setLoading(true);
      setTimeout(() => {
        const parsed = DeepLinker.parseDeepLink(savedLink);
        processDeepLink(parsed);
      }, 500);
    } catch {
      DeepLinkState.setLoading(false);
    }
  }

  /**
   *
   */
  export async function processDeepLink(deepLink: DeepLinkAction[]) {
    currentStack = [...deepLink];

    await setInitialData();

    let action = currentStack.shift();

    const unsubscribe = DeepLinkEventManager.listenToProcessorEvents((e) => {
      const {
        detail: { type, notifyType, data },
      } = e;

      if (notifyType === 'error') {
        isDone = true;
      }

      if (notifyType === action?.type) {
        try {
          const prevRes = (resultStack as any).findLast((e) => e?.result !== undefined || e?.result !== null) as
            | DeepLinkActionResult
            | undefined;
          (deepLinkActionMap as DLActionMap)[notifyType].onActionComplete(action, prevRes, resultStack, e)?.then((v) => {
            // console.log('DL:ACTION COMPLETE', action.type, (v as any)?.result);
            resultStack[currentActionIndex] = v as any;
            action = currentStack.shift();
            currentActionIndex++;
          });
        } catch {
          isDone = true;
        }
      }
    });

    while (action !== undefined) {
      if (isDone) break;
      if (prevActionIndex !== currentActionIndex) {
        if (processTimeout) clearTimeout(processTimeout);
        processTimeout = setTimeout(() => {
          isDone = true;
        }, 15000);
        // console.log('DL: Processing', action?.type);
        prevActionIndex = currentActionIndex;
        processAction(action);
        DeepLinkState.deepLinkAtomStore.set(DeepLinkState.loadingTextAtom, (p) => action.loadingMessage ?? p);
      }
      await sleep(10);
    }

    DeepLinkState.deepLinkAtomStore.set(DeepLinkState.loadingAtom, false);
    unsubscribe();
  }

  async function processAction(action: DeepLinkAction) {
    try {
      const prevRes = (resultStack as any).findLast((e) => e?.result !== undefined || e?.result !== null) as
        | DeepLinkActionResult
        | undefined;
      await (deepLinkActionMap as DLActionMap)[action.type].actionExecutor(action, prevRes, resultStack);
    } catch {
      isDone = true;
    }
  }

  /**
   * set initial data before processing,
   * like setting up H panel as the initial result to be processed futher by other actions
   */
  async function setInitialData() {
    const data = await deepLinkActionMap.waitForPanel.onActionComplete({
      panelId: 'H',
      type: 'waitForPanel',
    });
    resultStack[currentActionIndex] = data as any;
    currentActionIndex++;
  }
}
