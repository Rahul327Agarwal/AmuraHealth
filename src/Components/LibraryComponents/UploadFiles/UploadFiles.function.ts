export const isValidSize = (actualSize, expectedSize) => {
  const ONE_BYTE_TO_KB = 1000;
  if (Number(actualSize / ONE_BYTE_TO_KB) <= expectedSize) {
    return true;
  }
  return false;
};
export const isValidType = (actualType, acceptedFiles) => acceptedFiles?.includes(actualType);

export const defaulttype = [
  'jpg',
  'jpeg',
  'png',
  'tif',
  'tiff',
  'bmp',
  'eps',
  'psd',
  'gif',
  'mp4',
  'mov',
  'wmv',
  'flv',
  'avi',
  'webm',
  'mkv',
];
