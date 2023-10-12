import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';

export const dummycardData = [
  {
    collectionName: 'collection name is here',
    createdOn: '2022-09-02T17:25:45.392Z',
    postCollectionId: '2233562f-0101-1212-2323-6b0733365252',
    tenantId: 'amura',
  },
];

export const getpostCollectionListData = async (panelId: string, props: any) => {
  try {
    const collectionType = 'PCM';
    const tenant = 'amura';
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${collectionType}/${tenant}/collectionList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );

    if (!response.Error) {
      response.collections.sort((a, b) => {
        const fa = a?.collectionName?.toLowerCase();
        const fb = b?.collectionName?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      return response.collections;
    }
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
