export interface MediaAudioProps {
  src: string;
  fileName?: string;
  whiteTheme?: boolean;
  sessions?: any;
  dontDownloadOnClick?: boolean;
  EnableClickAwayListener?:boolean

}
export interface MediaPhotoProps {
  src: string;
  fileName?: string;
  sessions?: any;
  dontDownloadOnClick?: boolean;
}
export interface MediaVideoProps {
  src: string;
  fileName?: string;
  sessions?: any;
  dontDownloadOnClick?: boolean;
}
export interface MediaDocProps {
  src: string;
  fileName?: string;
  sessions?: any;
  dontDownloadOnClick?: boolean;
  fileSize?:number;
}
