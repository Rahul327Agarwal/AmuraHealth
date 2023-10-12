import { PMS_S3 } from '../../../../Utils';

export const getpostSummaryData = async (props: any, fetchUserName?: Function) => {
  try {
    let postSummarydata = await PMS_S3.getObject(
      `pms-ql-posts/${props.selectedClient.client_id}/myPost.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    if (!postSummarydata.Error) {
      let userName = await fetchUserName(postSummarydata?.header?.name);
      const newObj = {
        ...postSummarydata,
        header: { ...postSummarydata.header, nameFromEs: userName || postSummarydata?.header?.name },
      };
      return newObj;
    }
  } catch (error) {
    console.log(error, 'summary error');
  }
};

export const showingResponseMsgs = (data: any) => {
  if (data.type === 'select') {
    // return data.snippet?.toString().replace(/,/g, ' or ');
    return data.snippet?.join(' or ');
  }
  if (data.type === 'multiSelect') {
    // return data.snippet?.toString().replace(/,/g, ' and ');
    return data.snippet?.join(' and ');
  }
  if (data.type === 'textField') {
    return 'Text response';
  }
};

export const PLACEHOLDER_TEXT = {
  heading: 'Type heading',
  description: 'Type description',
  thumbnail: 'Upload thumbnail image',
  attachment: 'Attach file',
  response: 'Type your response',
  distributionChannel: 'distribution channel',
};
