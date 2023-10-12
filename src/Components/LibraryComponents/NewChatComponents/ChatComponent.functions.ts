import { DateFilterList } from 'aws-sdk/clients/inspector2';

export const getSenderName = (userList: Array<any>, senderId: string) => {
  const user = userList.find((user) => user.userId === senderId);
  return user ? user.userName : senderId;
};

export const getTimeIn24HrFormat = (date: number | string | Date) => {
  if (new Date(date).toString() === 'Invalid Date') return '';
  return `${new Date(date).getHours().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${new Date(date).getMinutes().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
};

export const getFileFormatFromAttachmentURL = (attachmentURL: string) => {
  let fileExtension = attachmentURL?.split('.').length > 0 ? attachmentURL.split('.').pop() : 'DOC';
  fileExtension = fileExtension!.toUpperCase();
  if (fileExtension.length > 3) fileExtension = fileExtension.substring(0, 3);
  return fileExtension;
};

export const getFileNameFromAttachmentURL = (attachmentURL: string, dontWrap?: boolean, includeExtension?: boolean) => {
  let fileName = attachmentURL?.split('/').length > 0 ? attachmentURL.split('/').pop() : 'DOC.pdf';
  if (includeExtension) return fileName;
  fileName = fileName!.split('.').length > 0 ? fileName!.split('.')[0] : 'DOC';
  if (!dontWrap && fileName.length > 20) {
    fileName = fileName.substring(0, 20) + '...';
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
