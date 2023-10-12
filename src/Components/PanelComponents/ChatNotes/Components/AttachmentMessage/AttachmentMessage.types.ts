import { IChatMessage, IChatMessageComponentProps } from '../../ChatMessage/ChatMessage.types';

export interface IProps extends IChatMessageComponentProps {}

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
