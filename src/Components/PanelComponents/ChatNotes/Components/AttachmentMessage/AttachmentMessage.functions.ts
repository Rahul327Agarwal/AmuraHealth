import ErrorToaster from '../../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../../Utils';
import { getFileFormatFromAttachmentURL } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';

export const downloadFromAPI = async (panelId: string, attachmentURL: string, sessions: any, fileName: string) => {
  /********download File Api Call*********/
  const ext = attachmentURL.split('.').pop().toLowerCase();
  const videoType = ['mp4', 'MP4', 'mov', 'MOV'].some((term) => getFileFormatFromAttachmentURL(attachmentURL).includes(term));
  const imgType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'].some((term) =>
    getFileFormatFromAttachmentURL(attachmentURL).includes(term)
  );
  const audioType = ['mp3', 'mp4'].some((term) => getFileFormatFromAttachmentURL(attachmentURL).includes(term));
  let typeOfFile = videoType ? 'video' : imgType ? 'image' : audioType ? 'audio' : '';

  const mediaExtensions = {
    video: [
      { ext: 'mp4', mime: 'video/mp4' },
      { ext: 'avi', mime: 'video/x-msvideo' },
      { ext: 'wmv', mime: 'video/x-ms-wmv' },
      { ext: 'mkv', mime: 'video/x-matroska' },
    ],
    audio: [
      { ext: 'mp3', mime: 'audio/mpeg' },
      { ext: 'wav', mime: 'audio/x-wav' },
      { ext: 'flac', mime: 'audio/flac' },
      { ext: 'aac', mime: 'audio/aac' },
    ],
    image: [
      { ext: 'jpg', mime: 'image/jpeg' },
      { ext: 'png', mime: 'image/png' },
      { ext: 'gif', mime: 'image/gif' },
      { ext: 'bmp', mime: 'image/bmp' },
    ],
  };
  let mimeType = videoType
    ? mediaExtensions[typeOfFile].find((value) => value.ext === ext)?.mime || `video/${ext}`
    : audioType
    ? mediaExtensions[typeOfFile].find((value) => value.ext === ext)?.mime || `audio/${ext}`
    : mediaExtensions[typeOfFile].find((value) => value.ext === ext)?.mime || `image/${ext}`;

  let reqBody = {
    isDownloadRequired: true,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${attachmentURL}`,
    token: sessions.id_token,
    fileName: `${fileName}`,
    type: mimeType,
  };
  PMS_S3.previewObject(reqBody).catch((error) => {
    ErrorToaster(`Unable to download!`, panelId, 'error');
  });
};
