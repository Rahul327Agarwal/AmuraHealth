import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';

export const getpostListData = async (panelId: string, props: any) => {
  try {
    const response = await PMS_S3.getObject(`pms-ql-posts/amura/postList.json`, import.meta.env.VITE_CLIENT_BUCKET, {
      TenantId: '',
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
    });
    if (!response.Error) {
      response.posts.sort((a, b) => {
        const fa = a?.heading?.toLowerCase();
        const fb = b?.heading?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      return response.posts;
    }
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
