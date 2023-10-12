export const getTimeIn12HrFormat = (date: number | string | Date) => {
  if (new Date(date).toString() === 'Invalid Date') return '';
  let hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'
  let hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let strTime = `${hoursStr}:${minutesStr} ${ampm}`;
  return strTime;
};
export const getFileFormatFromAttachmentURL = (attachmentURL: string) => {
  let fileExtension = attachmentURL?.split('.').length > 0 ? attachmentURL.split('.').pop() : '';
  return fileExtension;
};

export const getFileNameFromAttachmentURL = (attachmentURL: string, dontWrap?: boolean, includeExtension?: boolean) => {
  let fileName = attachmentURL.split('/').pop() || 'DOC.pdf';
  if (includeExtension) return fileName;
  fileName = fileName?.split('.')[0] || 'DOC';
  if (!dontWrap && fileName?.length > 20) {
    fileName = fileName?.substring(0, 20) + '...';
  }
  return fileName;
};

export const getMBFromKB = (bytes: number | string, decimals = 2) => {
  bytes = parseInt(bytes as string);
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
