import axios from 'axios';

export const invisibleUpdateAPI = async (props: any, collectionPayload: any) => {
  try {
    const params = {
      userId: props.sessions?.user?.id,
      tenantId: 'amura',
      collectionPayload,
    };

    const url = `${import.meta.env.VITE_PC_UPDATE_VISIBILITY}`;
    return await axios.put(url, params, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
  } catch (error) {
    console.error('!!error', error);
  }
};
