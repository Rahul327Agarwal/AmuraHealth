export interface IProps {
  audioUrl: string;
  recordingMinutes: number;
  recordingSeconds: number;
  audioName?: string;
  isSmall?: boolean;
  voiceNote?: boolean;
  messageId?: string;
  hidePlaybackControl?: boolean;
  EnableClickAwayListener?:boolean;
}
