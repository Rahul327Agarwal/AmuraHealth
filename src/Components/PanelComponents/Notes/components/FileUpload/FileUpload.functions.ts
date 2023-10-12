import { PMS_LOCALE } from '../../../../../Utils';
import ErrorToaster from './../../../../../Common/ErrorToaster';

export const removeFile = (file: any, setRerenderFlag: any, files: any, setFiles: any, setCaptions: any, captions: any) => {
  let filteredFile: any = [];
  let filteredCaptions = JSON.parse(JSON.stringify(captions));
  files.forEach((fileObj: any) => {
    if (fileObj.name !== file.name) {
      filteredFile.push(fileObj);
    }
  });
  setFiles(filteredFile);
  delete filteredCaptions[file.name];
  setCaptions(filteredCaptions);
  setRerenderFlag(new Date().getTime());
};
export const validateFiles = (
  panelId: string,
  filesArray: any,
  setRerenderFlag: any,
  setFiles: any,
  setCaptions: any,
  captions: any
) => {
  let acceptedFiles: any = [];
  let captionsToBeAdded: any = {};
  let failedFiles: any = [];
  if (filesArray && filesArray.length > 0) {
    // filesArray.map((value: any) => {
    //   if (
    //     value.path.search(/^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|xps|XPS)$/) >
    //     -1
    //   ) {
    //     acceptedFiles.push(value);
    //   } else {
    //     failedFiles.push(value);
    //   }
    // });
    const flags: any = {};
    var removeDuplicates = filesArray.filter((entry: any) => {
      if (flags[entry.name]) {
        return false;
      }
      flags[entry.name] = true;
      captionsToBeAdded[`${entry.name}`] = captions[`${entry.name}`] || '';
      return true;
    });
    setFiles(removeDuplicates);
    setCaptions(captionsToBeAdded);
    if (removeDuplicates.length !== filesArray.length) {
      let errorObj: any = { error: false, msg: {} };
      let listArray: any = [];
      let errMessage = ``;
      failedFiles.map((value: any, index: number) => {
        if (index < failedFiles.length - 1) {
          errMessage = `${errMessage} ${value.name},`;
        } else {
          errMessage = `${errMessage} ${value.name}`;
        }
      });
      if (failedFiles.length === 1) {
        errMessage = `${errMessage} ${PMS_LOCALE.translate('file is not supported.')}`;
      } else {
        errMessage = `${errMessage} ${PMS_LOCALE.translate('files are not supported.')}`;
      }
      if (failedFiles.length > 0) {
        ErrorToaster(errMessage, panelId, 'error');
      }
      setRerenderFlag(new Date().getTime());
    } else {
      setRerenderFlag(0);
    }
  } else {
    setFiles([]);
  }
};

export function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
