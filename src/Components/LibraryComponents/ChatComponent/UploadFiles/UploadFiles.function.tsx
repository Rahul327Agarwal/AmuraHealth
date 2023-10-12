import { FileIcon, MusicIcon, PicturesIcon, VideoIcon } from '../../../SVGs/Common';
import { fileOptions, optionsType } from './UploadFiles.types';

export const options: Array<optionsType> = [
  {
    id: 'FILES',
    label: 'Files',
    icon: <FileIcon />,
    accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt',
    multiple: true,
  },
  {
    id: 'PHOTOS',
    label: 'Photos',
    icon: <PicturesIcon />,
    accept: 'image/*',
    multiple: true,
  },
  {
    id: 'VIDEOS',
    label: 'Videos',
    icon: <VideoIcon />,
    accept: 'video/*',
    multiple: true,
  },
  {
    id: 'AUDIO',
    label: 'Music',
    icon: <MusicIcon />,
    accept: 'audio/*',
    multiple: true,
  },
];

export function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const EXPECTED_FILE_TYPES = {
  FILES: ['pdf', 'xlsx', 'docx'],
  PHOTOS: ['png', 'jpeg', 'jpg', 'gif', 'webp'],
  VIDEOS: ['mp4', 'mkv'],
  AUDIO: ['mp3'],
};
const EXPECTED_FILE_SIZE_IN_KB = {
  FILES: 100000,
  PHOTOS: 100000,
  VIDEOS: 100000,
  AUDIO: 100000,
};
const ONE_BYTE_TO_KB = 1000;

export const isValidFiles = (filesList: Array<File>, fileOptions: fileOptions) => {
  const errorObject: any[] = [];
  const validFiles: any[] = [];
  const filesArray = Array.from(filesList || []);

  if (!filesArray.length && !fileOptions) return { validFiles, errorObject };
  filesArray.forEach((file, index) => {
    const fileName = file.name;
    const fileSize = Number(file.size) / ONE_BYTE_TO_KB;
    const fileType = fileName?.split('.')?.pop()?.toLowerCase();
    if (!EXPECTED_FILE_TYPES[fileOptions].includes(fileType!)) {
      errorObject.push({ id: index, message: 'File type not supported!', errorType: 'TYPE' });
      return;
    }
    if (EXPECTED_FILE_SIZE_IN_KB[fileOptions] <= fileSize) {
      errorObject.push({ id: index, message: 'File size not supported!', errorType: 'SIZE' });
      return;
    }
    validFiles.push(file);
  });
  return { validFiles, errorObject };
};
