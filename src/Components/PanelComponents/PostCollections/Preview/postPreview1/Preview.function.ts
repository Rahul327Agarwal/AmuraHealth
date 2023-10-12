import { PMS_S3 } from '../../../../../Utils';

export const getpostPreviewData = async (props: any) => {
  try {
    const response = await PMS_S3.getObject(`pms-ql-posts/${props.postId}/myPost.json`, import.meta.env.VITE_CLIENT_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    });
    return response;
  } catch (error) {
    console.error(error, 'summary error');
  }
};

export const tempData = {
  postId: '7094bf2f-1591-4f06-2222-6b07c0723',
  header: {
    name: '948aee3d-6712-48a9-a03b-c926f5f99915',
    last_updated_date: '2022-09-13T17:25:30.392Z',
  },
  topics: {
    heading: {
      snippet: 'Health of happiness',
    },
    description: {
      snippet: 'Lorem ipsum dolor sit amet...',
    },
    thumbnail: {
      snippet: 'Filename.jpg',
      isAttachment: true,
      file: 's3:path',
    },
    attachments: {
      snippet: 'Filename.mp3',
      type: 'audio',
      isAttachment: true,
      file: 's3:path',
    },
    response: {
      snippet: ['Yes', 'No', 'May Be'],
    },
    distribution_channel: {
      snippet: ['Amura chat stream', 'WhatsApp', 'Instagram chat'],
    },
  },
  postType: 'audio',
};
export const showingResponseMsgs = (data: any) => {
  if (data.type === 'select') {
    return data.snippet?.toString().replace(/,/g, ' or ');
  }
  if (data.type === 'multiSelect') {
    return data.snippet?.toString().replace(/,/g, ' and ');
  }
  if (data.type === 'textField') {
    return 'Text response';
  }
};
