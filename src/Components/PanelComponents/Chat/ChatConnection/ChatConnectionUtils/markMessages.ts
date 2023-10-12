import { globalChannelVariables, IFormattedMessage, IMessage } from '../../Chat.types';
import { PMS_S3 } from '../../../../../Utils';
import axios from 'axios';

export const markMessages = (channelId: string, messageIds: Array<any>, props: any) => {
  let payload = PMS_S3.encryptData({
    EventName: 'chat-message-room-mark',
    UserName: props.sessions.user.id,
    MessageIds: messageIds,
    RoomId: channelId,
    TenantId: props.selectedClient.tenant_id,
  });
  axios
    .post(`${import.meta.env.VITE_ROCKET_CHAT}markMessage`, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    })
    .then((response: any) => {
      if (!response?.data?.Error) {
      }
    });
};
