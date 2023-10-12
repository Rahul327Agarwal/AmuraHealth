export interface IProps {
  audioUrl?: string;
  recordingMinutes?: number;
  recordingSeconds?: number;
  audioName?: string;
  isSmall?: boolean;
  src:any,
  fileName?:any,
  sessions?:any;
  messageId?:string;
  EnableClickAwayListener?:boolean;
  stopPlaying?:boolean;
}
