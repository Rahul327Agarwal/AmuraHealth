import { PMS_S3 } from '../../../../Utils';
export const getVoiceNoteFromURL = async (sessions: any, fileUrl: string) => {
  let reqBody = {
    isDownloadRequired: false,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${fileUrl}`,
    token: sessions.id_token,
    dontPreview: true,
  };
  const audioBlob = await PMS_S3.previewObject(reqBody);
  return audioBlob;
};

export const showingResponseMsgs = (data: any, message: string) => {
  if (data.type === 'select') {
    return data?.options?.join(' or ');
  }
  if (data.type === 'multiSelect') {
    return data?.options?.join(' and ');
  }
  if (data.type === 'textField') {
    return 'Text response';
  }
};
