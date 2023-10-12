import { PMS_S3 } from '../../../../Utils';

// post collection summary - myPostCollection.json
// s3 location: https://amura-pms-qa.s3.ap-south-1.amazonaws.com/en_US/pms-ql-post-collections/2233562f-0101-1212-2323-
// 6b0733365050/myPostCollection.json

export const getpostCollectionSummaryData = async (props: any, fetchUserName?: Function) => {
  try {
    let postSummarydata = await PMS_S3.getObject(
      `pms-ql-collections/${props.cardData.collectionType}/${props.cardData.tenantId}/${props.cardData.collectionId}/myCollection.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );

    if (!postSummarydata.Error) {
      let userName;
      if (fetchUserName) {
        userName = await fetchUserName(postSummarydata?.header?.name);
      }
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

export const initialData = {
  postId: '7094bf2f-1591-4f06-2222-6b07c0723',
  header: {
    name: '948aee3d-6712-48a9-a03b-c926f5f99915',
    last_updated_date: '2022-09-13T17:25:30.392Z',
    nameFromEs: 'John Brittas T',
  },
  topics: {
    heading: {
      snippet: '+ Add a headiing',
    },
    description: {
      snippet: '+ Add a description',
    },
    thumbnail: {
      snippet: '+ Add a thumbnail',
      isAttachment: true,
      file: 's3:path',
    },
    attachment: {
      snippet: 'None',
      type: 'audio',
      isAttachment: true,
      file: 's3:path',
    },
    response: {
      snippet: ['None'],
    },
    distribution_channel: {
      snippet: ['+Add channel'],
    },
  },
};

export const PLACEHOLDER_TEXT = {
  collectionName: 'Enter title',
  description: 'Enter description',
  welcomeMessage: 'Enter welcome message',
  thankYouMessage: 'Enter thank you message',
  response: 'Type your response',
  distributionChannel: 'Select distribution channels',
};
