import axios from 'axios';
import { v4 } from 'uuid';
import { PMS_S3 } from '../../../../Utils';
import { IMessage } from '../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { SNIPPETS_ID } from '../Summary/Summary.function';
import ErrorToaster from './../../../../Common/ErrorToaster';

export const sendMessageSnippetAPI = async (
  panelId: string,
  sessions: any,
  tenantId: string,
  collectionId: string,
  collectionType: string,
  storeData: any,
  snippetPayload: any
) => {
  try {
    const payload: any = {
      Locale: sessionStorage.getItem('locale'),
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: sessions.id_token,
      method: 'POST',

      EventName: 'chat-categorizer',
      tenantId: tenantId || 'amura',
      senderId: sessions?.user?.id || '',
      messageId: v4(),
      receivedTime: new Date().toISOString(),
      ContextType: '@collection',

      action: storeData.action,
      collectionPayload: {
        collectionId: collectionId,
        collectionType: collectionType,
        snippet: snippetPayload,
      },
    };
    console.log('!!payload', payload);

    const response = await PMS_S3.postData(payload);
    if (!response.Error) {
      return true;
    }
    ErrorToaster(response.Error, panelId, 'error');
  } catch (error) {
    ErrorToaster((error as Error).message, panelId, 'error');
  }
};

export const getDistributionChannels = async (sessions: any) => {
  try {
    const payload = {
      payLoad: {
        partKey: 'lov_name',
        partKeyValue: '~distributionList~master~',
        tableName: 'platform-lov-master',
      },
    };
    const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    return response?.data || [];
  } catch (error) {}
};

export const addVisibiltyToMessage = (
  loggedInUserId: string,
  sender: string,
  privacy: string,
  staffList: Array<any>,
  message: IMessage
): IMessage => {
  let canSeeMessage = false;
  //if(type===)
  if (!privacy) canSeeMessage = true;
  if (privacy === '@me') canSeeMessage = loggedInUserId === sender;
  staffList.forEach((staff: any) => {
    if (privacy === '@team' && loggedInUserId === staff.userId) canSeeMessage = true;
  });
  if (message.ContextType === '@bot-start' && !message?.answer && message.senderId === 'SYSTEM') canSeeMessage = false;
  if (message.ContextType === '@bot-start' && message.senderId === 'SYSTEM' && message.promptResponseCode) canSeeMessage = true;
  return { ...message, isVisible: canSeeMessage };
};

export const addVisibiltyToMessages = (loggedInUserId: string, staffList: Array<any>, messages: IMessage[]) => {
  return messages
    .map((message: IMessage) => {
      return addVisibiltyToMessage(loggedInUserId, message.senderId, message.privacy as any, staffList, message);
    })
    .filter((message: IMessage) => message.isVisible);
};

export const getUsersList = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data?.body || [];
};

export const BOT_TAG_OPTIONS = [{ id: 'CREATE_ENTITY', label: 'CREATE_ENTITY' }];
export const TAG_OPTIONS = [
  { id: 'me', label: 'me' },
  { id: 'team', label: 'team' },
  { id: 'call', label: 'call' },
];

export const postQuestionType = (message: any) => {
  switch (message) {
    case SNIPPETS_ID.HEADING:
    case SNIPPETS_ID.DESCRIPTON:
    case SNIPPETS_ID.RESPONSE:
    case SNIPPETS_ID.SEE_RESPONSE:
    case SNIPPETS_ID.TO_BE_SHARED:
    case SNIPPETS_ID.DIS_CHANNEL:
    case SNIPPETS_ID.CONSUMERS:
    case SNIPPETS_ID.TITLE:
      return 'QUESTION_ANSWER';
    case SNIPPETS_ID.THUMBNAIL:
      return 'THUMBNAIL';
    case SNIPPETS_ID.ATTACHMENT:
      return 'ATTACHMENT';
  }
};

export const getSearchUsers = async (props: any, searchText?: string) => {
  try {
    const payload = {
      index: 'users',
      _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
      query: {
        bool: {
          filter: [
            {
              bool: {
                must: [
                  {
                    bool: {
                      should: [
                        { match_phrase_prefix: { 'profile.nick_name': `${searchText}` } },
                        { match_phrase_prefix: { 'profile.first_name': `${searchText}` } },
                        { match_phrase_prefix: { 'profile.last_name': `${searchText}` } },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      size: 10000,
    };
    return await getUsersList(props, payload);
  } catch (error) {}
};
export const convertingTimeToMinutes = (time: number, units: string) => {
  switch (units) {
    case 'Hour':
      return time * 60;
    case 'Day':
      return time * 60 * 24;
    default:
      return time;
  }
};
