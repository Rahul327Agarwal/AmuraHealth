export interface IProps {
  message: any;
  children: React.ReactElement | string;
  maxWidth?: string;
  isLoading?: boolean;
  actionOptions?: { label: string; value: string }[];
  actionRenderIcon?: React.ReactElement;
  showActionIconAlways?: boolean;
  onMessageAction?: (v: string) => void;
  isFirstMessage?: boolean;
  actionIconPosition?: 'unset' | 'absolute';
  isCommonMessage?: boolean;
  bgColor?: string;
  isOurMessage?: boolean;
}
