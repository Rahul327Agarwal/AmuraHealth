import { IMessage } from '../../ChatComponents.types';

export interface IProps {
  message?: IMessage;
  staffList?: Array<any>;
  senderFontColor?: string;
  replySenderFontColor?: string;
  isFirstMessage?: boolean;
  sessions?: any;
  customStyle?: string;
  chatContainerRef?: React.MutableRefObject<any>;
  text?: string;
  handleOptions?: Function;
}

// constants
export const IMAGE = 'image';
export const VIDEO = 'video';
export const AUDIO = 'audio';

export const FILE_TYPES = {
  // image types
  JPEG: IMAGE,
  JPG: IMAGE,
  PNG: IMAGE,
  jpeg: IMAGE,
  jpg: IMAGE,
  png: IMAGE,

  // video types
  MOV: VIDEO,
  MP4: VIDEO,
  mov: VIDEO,
  mp4: VIDEO,
  // audio types
  aac: AUDIO,
  aiff: AUDIO,
  flac: AUDIO,
  mp3: AUDIO,
  ogg: AUDIO,
  wav: AUDIO,
};
 

export const IMAGE_TYPES = {
  JPEG: true,
  JPG: true,
  PNG: true,
  jpeg: true,
  jpg: true,
  png: true,
};
export const VIDEO_TYPES = {
  MOV: true,
  MP4: true,
  mov: true,
  mp4: true,
};
export const AUDIO_TYPES = {
  aac: true,
  aiff: true,
  flac: true,
  mp3: true,
  ogg: true,
  wav: true,
};