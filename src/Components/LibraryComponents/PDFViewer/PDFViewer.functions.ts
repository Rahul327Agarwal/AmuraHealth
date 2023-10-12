const DOC_TYPES = {
  pdf: 1,
};

const IMAGE_TYPES = {
  jpg: 1,
  JPG: 1,
  jpeg: 1,
  JPEG: 1,
  png: 1,
  PNG: 1,
};

export const getFileType = (url: string) => {
  let type = url.split('.').pop().toLocaleLowerCase();
  if (DOC_TYPES[type]) return 'pdf';
  if (IMAGE_TYPES[type]) return 'image';
};

export const getFileNameFromAttachmentURL = (attachmentURL: string, dontWrap?: boolean, includeExtension?: boolean) => {
  let fileName = attachmentURL?.split('/').length > 0 ? attachmentURL.split('/').pop() : 'DOC.pdf';
  if (includeExtension) return fileName;
  fileName = (fileName?.split('.').length ?? 0) > 0 ? fileName?.split('.')[0] : 'DOC';
  if (!dontWrap && (fileName?.length ?? 0) > 20) {
    fileName = fileName?.substring(0, 20) + '...';
  }
  return fileName;
};
