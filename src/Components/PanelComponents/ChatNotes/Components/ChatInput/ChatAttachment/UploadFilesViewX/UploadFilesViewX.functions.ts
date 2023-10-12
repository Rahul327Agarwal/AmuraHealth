import { PickerFile } from './UploadFilesViewX.types';

export namespace UploadFilesViewXUtils {
  export function makePickerFile(file: File) {
    return {
      file: file,
      sourceFile: file,
      fileName: file?.name ?? '',
      fileSize: file?.size ?? 0,
      fileType: file?.type ?? '',
      fileTypeCategory: getFileTypeCategory(file?.type ?? ''),
      fileURL: URL.createObjectURL(file),
      fileExtension: file?.name?.split('.')?.pop() ?? '',
      sourceFileURL: URL.createObjectURL(file),
    } as PickerFile;
  }

  export const formatFileSize = (sizeInByte: number): string => {
    const unitArray = ['Bytes', 'KB', 'MB'];
    let index = 0;
    while (Math.round(sizeInByte / 1024) >= 1) {
      sizeInByte = sizeInByte / 1024;
      index++;
    }
    return Math.round(sizeInByte) + '' + unitArray[index];
  };

  export function getFileTypeCategory(fileType: string): PickerFile['fileTypeCategory'] {
    const split = fileType.split('/');
    if (split.length < 2) return 'unknown';
    const mainType = split[0];
    const actualType = split[1];
    if (mainType === 'image') return 'image';
    if (mainType === 'video') return 'video';
    if (mainType === 'audio') return 'audio';
    if (mainType === 'application' && actualType === 'pdf') return 'pdf';
    return 'unknown';
  }

  export async function getFileFromLocalURL(url: string, fileName: string, fileType: string) {
    const res: Response = await fetch(url);
    const blob: Blob = await res.blob();
    var file = new File([blob], fileName, {
      type: fileType,
      lastModified: Date.now(),
    });
    return file;
  }
}
