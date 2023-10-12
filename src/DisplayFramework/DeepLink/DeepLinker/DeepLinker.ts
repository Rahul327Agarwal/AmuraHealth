import { IPanelId } from '../../Core/DFCore.types';
import { DeepLinkActionTypes } from '../DeepLinkProcessor/DeepLinkActionsMap';
import { CustomActionIdentifier, DLCustomActionMap } from '../DeepLinkProcessor/DeepLinkCustomActionMap';
import { deepLinkerMap } from './DeepLinkerMap';

export interface DeepLinkAction<CAI extends CustomActionIdentifier = CustomActionIdentifier> {
  type: DeepLinkActionTypes;
  panelId?: IPanelId;
  windashWindowId?: string;
  elementFinder?: string;
  loadingMessage?: string;
  customActionIdentifier?: CAI;
  data?: DLCustomActionMap[CAI];
}

export interface DeepLinkActionResult {
  result: any;
}

export namespace DeepLinker {
  export const sampleLink1: DeepLinkAction[] = [
    {
      type: 'windashNavigation',
      windashWindowId: 'HomePage',
    },
    {
      type: 'customAction',
      customActionIdentifier: 'homeModuleClick',
      loadingMessage: 'Loading Chat...',
    },
    {
      type: 'panelNavigation',
      panelId: 'C',
    },
    {
      type: 'clickAction',
      elementFinder: `#notes-chat-header > span:nth-child(5)`,
    },
  ];

  export const sampleLink2: DeepLinkAction[] = [
    {
      type: 'windashNavigation',
      windashWindowId: 'MyListHome',
    },
    {
      type: 'customAction',
      customActionIdentifier: 'my-list-card',
      loadingMessage: 'Loading Client...',
      data: {
        cardId: 'c8fd01d15bd849e2a13e30cd9575c1ac',
      },
    },
    {
      type: 'panelNavigation',
      panelId: 'C',
      loadingMessage: 'Loading Chat...',
    },
    {
      type: 'customAction',
      customActionIdentifier: 'chat-message',
      data: {
        messageId: '0f18b057-0528-4b73-a7ae-c08425a72846',
      },
    },
    // {
    //   type: 'clickAction',
    //   elementFinder: (el) => {
    //     return `#notes-chat-header > span:nth-child(5)`;
    //   },
    // },
  ];

  export const sampleLink3: DeepLinkAction[] = [
    {
      type: 'windashNavigation',
      windashWindowId: 'MyListHome',
    },
    {
      type: 'customAction',
      customActionIdentifier: 'my-list-card',
      loadingMessage: 'Loading Client...',
      data: {
        cardId: 'c8fd01d15bd849e2a13e30cd9575c1ac',
      },
    },
    {
      type: 'panelNavigation',
      panelId: 'S',
    },
    {
      type: 'clickAction',
      elementFinder: `:scope > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(2)`,
      loadingMessage: 'Loading Notes...',
    },
  ];

  //
  //
  //

  export function makeDeepLink(actions: DeepLinkAction[]): string {
    const linkString = JSON.stringify(actions);
    const encoded = encodeURIComponent(linkString);
    return window.location.origin + '/?deepLink=' + encoded;
  }

  export function parseDeepLink(url: string): DeepLinkAction[] {
    const params = new URLSearchParams(url);
    const encoded = params.get('deepLink');
    if (encoded) {
      const decoded = decodeURIComponent(encoded);
      const parsed = JSON.parse(decoded);
      return parsed;
    }

    // deeplink key
    const deepLinkKey = params.get('dlk') as keyof typeof deepLinkerMap;
    if (deepLinkKey) {
      const allParamsObj = {};
      for (const [key, value] of params) {
        allParamsObj[key] = value;
      }
      try {
        const parsed = deepLinkerMap[deepLinkKey].parsePayload(allParamsObj);
        return parsed;
      } catch {
        return [];
      }
    }

    return [];
  }
}
