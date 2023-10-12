export interface IProps {
  url: string;
  type: string;
  senderId: string;
  receivedTime: string | number | Date;
  // parentRef: React.MutableRefObject<any>;
  setOpenReply?: Function;
  setRepliedToMessage?: Function;
  onClose?: Function;
  text?: string;
  openFrom: IPosition | null;
  handleOptions?: (data: string) => void;
}

interface IPosition {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
}

export const threeDotOptions = [
  { label: 'Reply', value: 'REPLY' },
  { label: 'Download', value: 'DOWNLOAD' },
] as const;

export interface IStyleProps {
  isTextExpanded: boolean;
  areDetailsHidden: boolean;
  progress: number;
  type: string;
  isZoomActive: boolean;
  showReadMore?: boolean;
}
