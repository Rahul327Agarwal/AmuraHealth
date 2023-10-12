import axios from 'axios';
import { v4 } from 'uuid';
import { PMS_S3 } from '../../../Utils';
import { IAllRoleDetails } from '../MyListPanel/MyList/MyList.types';
import ErrorToaster from './../../../Common/ErrorToaster';
import { IProps, ISurveyCollectionDataObj } from './Notes.types';

export const uploadAttachment = async (file: File, props: IProps) => {
  const token = props.sessions.id_token;
  let url = `${import.meta.env.VITE_S3_IR_UPLOAD_API}`;
  /********Upload File Api Call*********/
  const headers = {
    Authorization: `Bearer ${token}`,
    'file-name': file.name,
    'patient-id': props.selectedClient.client_id,
    'user-id': props.sessions.user.id,
    'tenant-id': props.selectedClient.tenant_id,
    'notes-file': 'YES',
    'note-id': v4(),
    'Content-Type': 'multipart/form-data',
  };
  let formData = new FormData();
  formData.append('input_files', file);
  let response = await axios.post(url, formData, {
    headers: headers,
    onUploadProgress: (progressEvent) => {},
    onDownloadProgress: (progressEvent) => {},
  });
  console.log('response', response);
  if (response?.data) {
    if (response.data.Status === 'Success') {
      return Promise.resolve(response.data.FileLocation);
    }
    console.log(response, 'response for reject success');
    return Promise.reject(response);
  }
  console.log('fail call');
  return Promise.reject('Unable to upload file');
};

export const checkPrivacy = (message: string, privacyOptions: Array<any>) => {
  let contextType = '';
  let messageToSend = (message || '').replace('&nbsp;', '').trim();

  // Remove HTML tags using a safer regex pattern
  messageToSend = messageToSend.replace(/(<([^>]+)>)/gi, '');

  for (const option of privacyOptions) {
    const optionLabel = `@${option.label}`;
    const optionLabelWithSpace = `@${option.label}&nbsp;`;

    if (message.startsWith(optionLabel) || message.startsWith(optionLabelWithSpace)) {
      contextType = `@${option.id}`;
      messageToSend = message.substring(optionLabel.length).replace('&nbsp;', '').trim();

      // Remove HTML tags again from the modified message
      messageToSend = messageToSend.replace(/(<([^>]+)>)/gi, '');

      break; // Exit the loop after finding the first match
    }
  }

  return { privacy: contextType, messageToSend };
};

export const getAttachmentAPI = async (panelId: string, attachmentURL: string, sessions: any) => {
  /********download File Api Call*********/
  let reqBody = {
    isDownloadRequired: true,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${attachmentURL}`,
    token: sessions.id_token,
  };
  PMS_S3.previewObject(reqBody).catch(() => {
    ErrorToaster(`Unable to download!`, panelId, 'error');
  });
};

export const dontAllowAttachmentAsNote = (text, tagOptions): boolean => {
  let { privacy } = checkPrivacy(text, tagOptions);
  if (privacy === '@note') return true;
  if (privacy === '@call intake') return true;
  return false;
};

export const Default_Survey_CollectionData = {
  pendingSurveyCollections: 0,
  closedSurveyCollections: 0,
  totalSurveyCollections: 0,
};

export const getUserCollectionsData = async (selectedClient, sessions) => {
  try {
    let tenantId = selectedClient?.tenant_id || 'amura';
    const payload = {
      payLoad: {
        tableName: 'distributions',
        partKey: 'part_key',
        partKeyValue: `${tenantId}~${selectedClient?.client_id}`,
      },
    };
    const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (response?.data.length > 0) {
      let creatingSurveyDataObj = formatSurveyObject(response?.data);
      return creatingSurveyDataObj;
    }
    return Default_Survey_CollectionData;
  } catch (error) {
    console.log(error, 'Error in api call');
    return Default_Survey_CollectionData;
  }
};
export const formatSurveyObject = (suveyCollectionsData): ISurveyCollectionDataObj => {
  let pending = 0;
  let total = suveyCollectionsData.length;
  let closed = 0;
  suveyCollectionsData.map((each) => {
    if (each?.STATUS === 'STARTED') {
      pending += 1;
    }
    if (each?.STATUS === 'CLOSED') {
      closed += 1;
    }
    return each;
  });

  return {
    pendingSurveyCollections: pending,
    closedSurveyCollections: closed,
    totalSurveyCollections: total,
  };
};
export const roleToClientCheck = (role: string): boolean => {
  return role === 'amura_guidance_counselor_level2';
};

export const formatTeamDataFunction = async (
  staffData: Array<any>,
  roles: Array<IAllRoleDetails>,
  fetchMultipleUserNames: Function
) => {
  try {
    let roomDetails = [];
    let staffIds = [];
    staffData.forEach((eachOne) => {
      staffIds.push(eachOne?.staffId);
      if (eachOne?.Roles?.length > 0) {
        eachOne?.Roles.map((each) => {
          roomDetails.push({
            staffId: eachOne?.staffId,
            roleId: each,
            hierarchyId: eachOne?.hierarchyId,
            isWatching: Boolean(eachOne?.isWatching),
          });
          return each;
        });
        return eachOne;
      }
      roomDetails.push({
        staffId: eachOne?.staffId,
        roleId: '',
        hierarchyId: eachOne?.hierarchyId,
        isWatching: Boolean(eachOne?.isWatching),
      });
      return eachOne;
    });
    const userNameObject = await fetchMultipleUserNames(staffIds);

    let detailsToSend = roomDetails.map(({ staffId, roleId, hierarchyId, isWatching }) => {
      return {
        value: `~${staffId}~${roleId}~`,
        label: `${userNameObject[staffId] || staffId} - ${
          (roles || []).find((role) => role?.roleId === roleId)?.roleName || roleId
        }`,
        hierarchyId: hierarchyId,
        isWatching: Boolean(isWatching),
      };
    });
    return detailsToSend;
  } catch (e) {
    console.log('Error while formating teams data', e);
    return [];
  }
};
