import axios from 'axios';
import { MyActions } from './PrescriptionCard.types';
export const getFile = async (url: any, fileName: string, actionCode: string) => {
  try {
    const axiosObj: any = axios.create({
      baseURL: url,
      responseType: 'blob',
    });
    const response = await axiosObj.get('', '');
    const object = response.data;
    let type = fileName.split('.').pop()!.toLowerCase();
    let header = 'application/pdf';
    if (type === 'jpg' || type === 'jpeg') {
      header = 'image/jpeg';
    } else if (type === 'png') {
      header = 'image/png';
    } else if (type === 'xps' || actionCode === 'DOWNLOAD') {
      let urlLink = window.URL.createObjectURL(
        new Blob([object], {
          type: type === 'xps' ? 'application/oxps' : header,
        })
      );
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = urlLink;
      link.setAttribute('download', '' + fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return {};
    }
    var myURL = window.URL || window.webkitURL;
    let objectUrlReview = myURL.createObjectURL(new Blob([object], { type: header }));
    if (actionCode === 'GET_BLOB_URL') {
      return objectUrlReview;
    }
    if (actionCode === 'PREVIEW_IN_NEW_TAB') {
      window.open(objectUrlReview, '_blank');
    }
  } catch (ex) {
    console.error('Exception in getObject: ', ex);
    return Promise.reject({});
  }
  return {};
};
