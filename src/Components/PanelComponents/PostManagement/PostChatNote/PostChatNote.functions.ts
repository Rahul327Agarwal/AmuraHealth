import axios from 'axios';
import { IMessage } from './../../../LibraryComponents/ChatComponent/ChatComponents.types';

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
      return addVisibiltyToMessage(loggedInUserId, message.senderId, message.privacy, staffList, message);
    })
    .filter((message: IMessage) => message.isVisible);
};

export const getDistributionChannels = async (props) => {
  const payload = {
    payLoad: {
      partKey: 'lov_name',
      partKeyValue: '~distributionList~master~',
      tableName: 'platform-lov-master',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response?.data || [];
  } catch (error) {
    console.log(error, 'summary error');
    return [];
  }
};

export const BOT_TAG_OPTIONS = [{ id: 'CREATE_ENTITY', label: 'CREATE_ENTITY' }];
export const TAG_OPTIONS = [
  { id: 'me', label: 'me' },
  { id: 'team', label: 'team' },
  { id: 'call', label: 'call' },
];

export const postQuestionType = (message) => {
  switch (message) {
    case 'heading':
    case 'description':
    case 'distributionChannel':
    case 'response':
      return 'QUESTION_ANSWER';
    case 'thumbnail':
      return 'THUMBNAIL';
    case 'attachment':
      return 'ATTACHMENT';
  }
};

export const convertIdStringToLabelString = (id: string): string => {
  let label = id
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/^ /, '')
    .replace(/^./, (str) => str.toUpperCase());
  const newLable = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  return newLable || id;
};
