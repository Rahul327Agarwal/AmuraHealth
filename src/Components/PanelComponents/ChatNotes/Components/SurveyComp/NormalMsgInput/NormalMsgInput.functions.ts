import { checkPrivacy } from '../../../../../PanelComponents/Notes/Notes.functions';
import { ITag } from './NormalMsgInput.types';

export const disableInput = (
  props: any,
  disableSend: boolean,
  input: string,
  tagOptions: Array<ITag>,
  filesAttached: boolean
): boolean => {
  if (props.type === 'bot') return false;
  if (disableSend) return true;
  let { messageToSend, privacy } = checkPrivacy(input, tagOptions);
  messageToSend = messageToSend.trim();
  if (privacy === 'SURVEY' && !messageToSend) return false;
  if (messageToSend || filesAttached) return false;
  return true;
};
