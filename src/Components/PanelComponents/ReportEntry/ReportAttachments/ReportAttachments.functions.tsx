import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';

export const downloadFile = (panelId: string, obj: any, sessions: any) => {
  var ext = obj.url.split('.').pop();
  let header = 'application/pdf';
  if (ext === 'jpg' || ext === 'jpeg') {
    header = 'image/jpeg';
  } else if (ext === 'png') {
    header = 'image/png';
  }
  let reqBody = {
    url: obj.url,
    token: sessions.id_token,
    header: {
      accept: header,
    },
  };
  PMS_S3.previewObject(reqBody).catch(() => {
    ErrorToaster(`Unable to download!`, panelId, 'error');
  });
};
