import axios from 'axios';
import { Deactivate, EditIcon } from '../NotesBrowse.svg';

export const myListOptions = [
  { id: 'Edit', label: 'Edit', value: 'Edit', icon: <EditIcon /> },
  { id: 'Deactivate', label: 'Deactivate', value: 'Deactivate', icon: <Deactivate /> },
];

export const getcurrentUserdata = async (props: any, userId?: string) => {
  const payload = {
    index: 'users',
    _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
    query: {
      match: {
        _id: `${userId}`,
      },
    },
  };
  const response = await getUsersList(props, payload);
  return `${response[0]?._source?.profile?.first_name} ${response[0]?._source?.profile?.last_name}`;
};

export const getUsersList = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data?.body || [];
};
