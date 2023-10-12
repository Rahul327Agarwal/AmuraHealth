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
