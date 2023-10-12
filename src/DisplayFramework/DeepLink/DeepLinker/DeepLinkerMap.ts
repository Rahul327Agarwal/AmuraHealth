import { store } from '../../State/store';
import { DeepLinkAction } from './DeepLinker';

type DLinkerMap = Record<
  string,
  {
    parsePayload: (params: any) => DeepLinkAction[];
  }
>;

export const deepLinkerMap = {
  cmc: {
    parsePayload: (params) => {
      const loggedInID = store.getState().auth.userSession.user.id;
      if (params?.cid === loggedInID) {
        // navigate to Home
        return [
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
            loadingMessage: 'Loading Chat...',
          },
          {
            type: 'customAction',
            customActionIdentifier: 'chat-message',
            data: {
              messageId: params?.mid,
            },
          },
        ];
      }

      return [
        {
          type: 'windashNavigation',
          windashWindowId: 'MyListHome',
        },
        {
          type: 'customAction',
          customActionIdentifier: 'my-list-card',
          loadingMessage: 'Loading Client...',
          data: {
            cardId: params?.cid,
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
            messageId: params?.mid,
          },
        },
      ];
    },
  },
  scmc: {
    parsePayload: (params) => {
      const loggedInID = store.getState().auth.userSession.user.id;
      if (params?.cid === loggedInID) {
        // navigate to Home
        return [
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
            loadingMessage: 'Loading Chat...',
          },
          {
            type: 'clickAction',
            elementFinder: `#notes-chat-header > span:nth-child(5)`,
          },
          {
            type: 'customAction',
            customActionIdentifier: 'chat-message',
            data: {
              messageId: params?.mid,
            },
          },
        ];
      }

      return [
        {
          type: 'windashNavigation',
          windashWindowId: 'MyListHome',
        },
        {
          type: 'customAction',
          customActionIdentifier: 'my-list-card',
          loadingMessage: 'Loading Client...',
          data: {
            cardId: params?.cid ?? '0370a47a59b04036a8cb7d41ad37bf8a',
          },
        },
        {
          type: 'panelNavigation',
          panelId: 'C',
          loadingMessage: 'Loading Chat...',
        },
        {
          type: 'clickAction',
          elementFinder: `#notes-chat-header > span:nth-child(5)`,
        },
        {
          type: 'customAction',
          customActionIdentifier: 'chat-message',
          data: {
            messageId: params?.mid ?? 'aab680bb-ff05-419f-9855-24f77663fe8b',
          },
        },
      ];
    },
  },
} satisfies DLinkerMap;
