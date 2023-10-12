import { ISelectedClient } from '../../../../../../Common/Common.types';
import { store } from '../../../../../../DisplayFramework/State/store';
import { getSchedulerRolesData } from '../../../../../LibraryComponents/ChatComponent/CallPopUp/CallPopUp.functions';

export namespace ChatPrivacy {
  export const chatPrivacies = ['@me', '@team', '@note', '@call intake'] as const;

  export type ChatPrivacyType = (typeof chatPrivacies)[number];

  type ModifierMap = Record<
    ChatPrivacyType,
    {
      modifyPayloadFn?: (
        payload: any,
        props: {
          selectedClient: ISelectedClient;
          message: string;
        }
      ) => Promise<any>;
    }
  >;

  export const payloadModifierMap: ModifierMap = {
    '@me': {
      modifyPayloadFn: (payload) => {
        return {
          ...payload,
          privacy: '@me',
        };
      },
    },
    '@team': {
      modifyPayloadFn: (payload) => {
        return {
          ...payload,
          privacy: '@team',
        };
      },
    },
    '@note': {
      modifyPayloadFn: (payload, props) => {
        return {
          ...payload,
          privacy: '',
          EventName: 'chat-notes',
          ContextType: '@chat-notes',
          patientId: props.selectedClient.client_id,
          action: 'ADD',
        };
      },
    },
    '@call intake': {
      modifyPayloadFn: async (originalPayload, props) => {
        const payload = { ...originalPayload };
        const session = store.getState().auth.userSession;

        const regExpression = /^(?:\d+)?$/;
        const isPass = regExpression.test(props.message);
        if (!isPass) {
          throw new Error('Please enter a valid number');
        }
        if (isPass && (Number(props.message) < 1 || Number(props.message) >= 1440)) {
          throw new Error('Only number between 0 and 1440 are allowed');
        }

        const data = await getSchedulerRolesData(session);
        const rolesData = data.map((e) => e.value);

        //
        let scheduleDataTemp = {
          channel: 'voice',
          duration: Number(props.message).toString(),
          timeUnits: 'mins',
          participants: [],
          title: 'Intake Calls',
          roleIds: rolesData,
          patientId: props.selectedClient.client_id,
          organizer: session.user.id,
          // organizerRoleId: taggedObject?.roleToClient,
          organizerRoleId: {},
        };
        payload.scheduleData = scheduleDataTemp;
        payload.ContextType = '@call';
        payload.operation = '@UPDATE_ENTITY';
        return payload;
      },
    },
  };
}
